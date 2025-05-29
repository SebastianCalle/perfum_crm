from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import sales_model, inventory_model
from ..schemas import sales_schema

# CRUD operations for Customer

def create_customer(db: Session, customer: sales_schema.CustomerCreate) -> sales_model.Customer:
    """
    Create a new customer in the database.
    """
    db_customer = sales_model.Customer(
        name=customer.name,
        whatsapp=customer.whatsapp,
        email=customer.email,
        notes=customer.notes
    )
    
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

def get_customer(db: Session, customer_id: int) -> Optional[sales_model.Customer]:
    """
    Get a single customer by ID.
    """
    return db.query(sales_model.Customer).filter(sales_model.Customer.id == customer_id).first()

def get_customers(db: Session, skip: int = 0, limit: int = 100) -> List[sales_model.Customer]:
    """
    Get a list of customers with pagination.
    """
    return db.query(sales_model.Customer).offset(skip).limit(limit).all()

def update_customer(db: Session, customer_id: int, customer_update: sales_schema.CustomerUpdate) -> Optional[sales_model.Customer]:
    """
    Update an existing customer.
    """
    db_customer = get_customer(db, customer_id)
    if not db_customer:
        return None
    
    # Update only the fields that are provided
    update_data = customer_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_customer, field, value)
    
    db.commit()
    db.refresh(db_customer)
    return db_customer

def delete_customer(db: Session, customer_id: int) -> bool:
    """
    Delete a customer from the database.
    """
    db_customer = get_customer(db, customer_id)
    if not db_customer:
        return False
    
    db.delete(db_customer)
    db.commit()
    return True

def search_customers(db: Session, search_term: str) -> List[sales_model.Customer]:
    """
    Search customers by name or WhatsApp.
    """
    return db.query(sales_model.Customer).filter(
        (sales_model.Customer.name.ilike(f"%{search_term}%")) |
        (sales_model.Customer.whatsapp.ilike(f"%{search_term}%"))
    ).all()

# CRUD operations for Recipe

def create_recipe(db: Session, recipe: sales_schema.RecipeCreate) -> sales_model.Recipe:
    """
    Create a new recipe in the database.
    """
    db_recipe = sales_model.Recipe(
        name=recipe.name,
        size_ml=recipe.size_ml,
        fragrance_type=recipe.fragrance_type,
        bottle_type=recipe.bottle_type,
        fragrance_grams=recipe.fragrance_grams,
        fijador_drops=recipe.fijador_drops,
        potencializador_drops=recipe.potencializador_drops,
        concentrado_drops=recipe.concentrado_drops,
        base_price=recipe.base_price,
        pheromone_addition_price=recipe.pheromone_addition_price,
        estimated_cost=recipe.estimated_cost,
        is_active=recipe.is_active
    )
    
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def get_recipe(db: Session, recipe_id: int) -> Optional[sales_model.Recipe]:
    """
    Get a single recipe by ID.
    """
    return db.query(sales_model.Recipe).filter(sales_model.Recipe.id == recipe_id).first()

def get_recipes(db: Session, skip: int = 0, limit: int = 100, active_only: bool = True) -> List[sales_model.Recipe]:
    """
    Get a list of recipes with pagination. By default, only active recipes.
    """
    query = db.query(sales_model.Recipe)
    if active_only:
        query = query.filter(sales_model.Recipe.is_active == "true")
    return query.offset(skip).limit(limit).all()

def get_recipe_by_specs(db: Session, size_ml: int, fragrance_type: str, bottle_type: str) -> Optional[sales_model.Recipe]:
    """
    Get a recipe by its specifications (size, fragrance type, bottle type).
    """
    return db.query(sales_model.Recipe).filter(
        sales_model.Recipe.size_ml == size_ml,
        sales_model.Recipe.fragrance_type == fragrance_type,
        sales_model.Recipe.bottle_type == bottle_type,
        sales_model.Recipe.is_active == "true"
    ).first()

def update_recipe(db: Session, recipe_id: int, recipe_update: sales_schema.RecipeUpdate) -> Optional[sales_model.Recipe]:
    """
    Update an existing recipe.
    """
    db_recipe = get_recipe(db, recipe_id)
    if not db_recipe:
        return None
    
    # Update only the fields that are provided
    update_data = recipe_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_recipe, field, value)
    
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def delete_recipe(db: Session, recipe_id: int) -> bool:
    """
    Delete (deactivate) a recipe from the database.
    """
    db_recipe = get_recipe(db, recipe_id)
    if not db_recipe:
        return False
    
    # Instead of deleting, we deactivate the recipe
    db_recipe.is_active = "false"
    db.commit()
    return True

def calculate_recipe_cost(db: Session, recipe: sales_model.Recipe) -> float:
    """
    Calculate the estimated cost of a recipe based on current ingredient prices.
    This is a placeholder function - you'll need to implement based on your additive costs.
    """
    # TODO: Implement actual cost calculation based on:
    # - fragrance_grams * fragrance_cost_per_gram
    # - fijador_drops * fijador_cost_per_drop
    # - potencializador_drops * potencializador_cost_per_drop
    # - concentrado_drops * concentrado_cost_per_drop
    
    # For now, return a placeholder cost
    estimated_cost = recipe.fragrance_grams * 0.5  # Placeholder: $0.5 per gram of fragrance
    return round(estimated_cost, 2)

# CRUD operations for Sale

def create_sale(db: Session, sale: sales_schema.SaleCreateSimple) -> sales_model.Sale:
    """
    Create a new sale with items, calculating prices automatically.
    """
    # Create the main sale record
    db_sale = sales_model.Sale(
        customer_id=sale.customer_id,
        payment_method=sale.payment_method,
        discount_amount=sale.discount_amount,
        discount_reason=sale.discount_reason,
        notes=sale.notes
    )
    
    db.add(db_sale)
    db.flush()  # Get the sale ID without committing
    
    # Process sale items
    total_subtotal = 0.0
    for item_data in sale.sale_items:
        # Calculate price based on product type
        if item_data.product_type == "perfume":
            # Get recipe and calculate price
            recipe = get_recipe_by_specs(
                db, 
                size_ml=item_data.size_ml,
                fragrance_type=item_data.fragrance_type,
                bottle_type="generico"  # Default to generic
            )
            
            if recipe:
                unit_price = recipe.base_price
                if item_data.has_pheromones:
                    unit_price += recipe.pheromone_addition_price
                
                # Add extra fragrance cost if specified
                if item_data.extra_fragrance_grams > 0:
                    # TODO: Get actual fragrance cost from inventory
                    extra_cost = item_data.extra_fragrance_grams * 500  # Placeholder: $500 per gram
                    unit_price += extra_cost
                
                line_total = unit_price * item_data.quantity
                
                # Create sale item
                db_sale_item = sales_model.SaleItem(
                    sale_id=db_sale.id,
                    product_type=item_data.product_type,
                    fragrance_id=item_data.fragrance_id,
                    bottle_id=item_data.bottle_id,
                    recipe_id=recipe.id,
                    size_ml=item_data.size_ml,
                    fragrance_type=item_data.fragrance_type,
                    has_pheromones=item_data.has_pheromones,
                    extra_fragrance_grams=item_data.extra_fragrance_grams,
                    item_name=item_data.item_name,
                    quantity=item_data.quantity,
                    unit_price=unit_price,
                    line_total=line_total,
                    recipe_used={
                        "fragrance_grams": recipe.fragrance_grams,
                        "fijador_drops": recipe.fijador_drops,
                        "potencializador_drops": recipe.potencializador_drops,
                        "concentrado_drops": recipe.concentrado_drops
                    }
                )
            else:
                # No recipe found, use provided price
                line_total = item_data.unit_price * item_data.quantity
                db_sale_item = sales_model.SaleItem(
                    sale_id=db_sale.id,
                    product_type=item_data.product_type,
                    item_name=item_data.item_name,
                    quantity=item_data.quantity,
                    unit_price=item_data.unit_price,
                    line_total=line_total
                )
        else:
            # For finished products, use provided price
            line_total = item_data.unit_price * item_data.quantity
            db_sale_item = sales_model.SaleItem(
                sale_id=db_sale.id,
                product_type=item_data.product_type,
                finished_product_id=item_data.finished_product_id,
                humidifier_id=item_data.humidifier_id,
                humidifier_essence_id=item_data.humidifier_essence_id,
                item_name=item_data.item_name,
                quantity=item_data.quantity,
                unit_price=item_data.unit_price,
                line_total=line_total
            )
        
        db.add(db_sale_item)
        total_subtotal += line_total
    
    # Calculate totals
    db_sale.subtotal = total_subtotal - sale.discount_amount
    
    # Apply card surcharge if payment method is "Tarjeta"
    if sale.payment_method.lower() == "tarjeta":
        db_sale.card_surcharge_applied = True
        db_sale.surcharge_amount = db_sale.subtotal * 0.05  # 5%
    
    db_sale.total_amount = db_sale.subtotal + db_sale.surcharge_amount
    
    db.commit()
    db.refresh(db_sale)
    return db_sale

def get_sale(db: Session, sale_id: int) -> Optional[sales_model.Sale]:
    """
    Get a single sale by ID with all related data.
    """
    return db.query(sales_model.Sale).filter(sales_model.Sale.id == sale_id).first()

def get_sales(db: Session, skip: int = 0, limit: int = 100) -> List[sales_model.Sale]:
    """
    Get a list of sales with pagination.
    """
    return db.query(sales_model.Sale).offset(skip).limit(limit).all()

def get_sales_by_date_range(db: Session, start_date: str, end_date: str) -> List[sales_model.Sale]:
    """
    Get sales within a date range.
    """
    return db.query(sales_model.Sale).filter(
        sales_model.Sale.sale_date >= start_date,
        sales_model.Sale.sale_date <= end_date
    ).all()

def get_daily_sales_summary(db: Session, date: str) -> dict:
    """
    Get daily sales summary.
    """
    sales = db.query(sales_model.Sale).filter(
        sales_model.Sale.sale_date >= f"{date} 00:00:00",
        sales_model.Sale.sale_date <= f"{date} 23:59:59"
    ).all()
    
    total_sales = len(sales)
    total_revenue = sum(sale.total_amount for sale in sales)
    
    # Payment methods breakdown
    payment_methods = {}
    for sale in sales:
        method = sale.payment_method
        if method not in payment_methods:
            payment_methods[method] = {"count": 0, "amount": 0.0}
        payment_methods[method]["count"] += 1
        payment_methods[method]["amount"] += sale.total_amount
    
    return {
        "date": date,
        "total_sales": total_sales,
        "total_revenue": total_revenue,
        "payment_methods": payment_methods
    } 