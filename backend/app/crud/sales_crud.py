from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import sales_model
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