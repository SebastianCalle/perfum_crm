from sqlalchemy.orm import Session
from typing import List, Optional # Added for type hinting
from ..models import inventory_model # Import your SQLAlchemy models
from ..schemas import inventory_schema # Import your Pydantic schemas

# CRUD operations for Fragrance

def create_fragrance(db: Session, fragrance: inventory_schema.FragranceCreate) -> inventory_model.Fragrance:
    """
    Create a new fragrance in the database.
    """
    # Create an instance of the SQLAlchemy model from the Pydantic schema data
    db_fragrance = inventory_model.Fragrance(
        internal_name=fragrance.internal_name,
        inspiration_name=fragrance.inspiration_name,
        house=fragrance.house,
        description=fragrance.description,
        supplier_name=fragrance.supplier_name,
        cost_per_g=fragrance.cost_per_g,
        stock_g=fragrance.stock_g,
        min_stock_g=fragrance.min_stock_g
    ) # Pydantic V2 model_dump() can also be used: inventory_model.Fragrance(**fragrance.model_dump())
    
    db.add(db_fragrance)
    db.commit()
    db.refresh(db_fragrance)
    return db_fragrance

def get_fragrance(db: Session, fragrance_id: int) -> inventory_model.Fragrance | None:
    """
    Retrieve a single fragrance by its ID.
    Returns the Fragrance object or None if not found.
    """
    return db.query(inventory_model.Fragrance).filter(inventory_model.Fragrance.id == fragrance_id).first()

def get_fragrances(db: Session, skip: int = 0, limit: int = 100) -> List[inventory_model.Fragrance]:
    """
    Retrieve a list of fragrances with pagination.
    """
    return db.query(inventory_model.Fragrance).offset(skip).limit(limit).all()

def get_fragrance_by_internal_name(db: Session, internal_name: str) -> inventory_model.Fragrance | None:
    """
    Retrieve a single fragrance by its internal name.
    Used to check for duplicates before creation or for other lookup needs.
    """
    return db.query(inventory_model.Fragrance).filter(inventory_model.Fragrance.internal_name == internal_name).first()

def update_fragrance(db: Session, fragrance_id: int, fragrance_update: inventory_schema.FragranceUpdate) -> inventory_model.Fragrance | None:
    """
    Update an existing fragrance by its ID.
    Only updates fields that are provided in the fragrance_update schema.
    """
    db_fragrance = get_fragrance(db, fragrance_id=fragrance_id) # Re-use existing function to get the fragrance
    if not db_fragrance:
        return None

    # Get the update data as a dictionary, excluding unset values to prevent overwriting with None if not provided
    update_data = fragrance_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_fragrance, key, value) # Set the new values on the SQLAlchemy model instance
    
    db.add(db_fragrance) # Mark the instance as dirty (SQLAlchemy often detects changes automatically too)
    db.commit() # Commit the transaction to the database
    db.refresh(db_fragrance) # Refresh the instance with data from the database (e.g., updated_at)
    return db_fragrance

def delete_fragrance(db: Session, fragrance_id: int) -> inventory_model.Fragrance | None:
    """
    Delete a fragrance by its ID.
    Returns the deleted fragrance object (before commit) or None if not found.
    """
    db_fragrance = get_fragrance(db, fragrance_id=fragrance_id)
    if not db_fragrance:
        return None
        
    db.delete(db_fragrance) # Mark for deletion
    db.commit() # Commit the deletion
    return db_fragrance # The object still holds data before the session expires or is closed


def create_bottle(db: Session, bottle: inventory_schema.BottleCreate) -> inventory_model.Bottle:
    db_bottle = inventory_model.Bottle(**bottle.model_dump())
    db.add(db_bottle)
    db.commit()
    db.refresh(db_bottle)
    return db_bottle

def get_bottle(db: Session, bottle_id: int) -> inventory_model.Bottle | None:
    return db.query(inventory_model.Bottle).filter(inventory_model.Bottle.id == bottle_id).first()

def get_bottles(db: Session, skip: int = 0, limit: int = 100) -> List[inventory_model.Bottle]:
    return db.query(inventory_model.Bottle).offset(skip).limit(limit).all()

def get_bottle_by_name(db: Session, name: str) -> inventory_model.Bottle | None:
    return db.query(inventory_model.Bottle).filter(inventory_model.Bottle.name == name).first()

def update_bottle(db: Session, bottle_id: int, bottle_update: inventory_schema.BottleUpdate) -> inventory_model.Bottle | None:
    db_bottle = get_bottle(db, bottle_id=bottle_id)
    if not db_bottle:
        return None

def delete_bottle(db: Session, bottle_id: int) -> inventory_model.Bottle | None:
    db_bottle = get_bottle(db, bottle_id=bottle_id)
    if not db_bottle:
        return None
    db.delete(db_bottle)
    db.commit()
    return db_bottle

# CRUD operations for Alcohol (Purchase/Batch Tracking)

def create_alcohol(db: Session, alcohol: inventory_schema.AlcoholCreate) -> inventory_model.Alcohol:
    """Create a new alcohol purchase/batch record."""
    
    db_alcohol_data = alcohol.model_dump(exclude_none=True) # Excluir valores None para no sobrescribir defaults del modelo si no se envían

    # Calculate cost_per_ml safely
    if alcohol.purchase_unit_volume_ml is not None and alcohol.purchase_unit_volume_ml > 0:
        calculated_cost_per_ml = alcohol.purchase_unit_cost / alcohol.purchase_unit_volume_ml
    else:
        calculated_cost_per_ml = 0  # O None, o levantar un HTTPException si se considera un error de validación
    
    db_alcohol_data['cost_per_ml'] = calculated_cost_per_ml

    # Si purchase_date es un string del frontend, Pydantic/FastAPI ya debería haberlo convertido a datetime.
    # Si aún hay problemas con purchase_date, se necesitaría ver el error exacto de Pydantic.

    db_alcohol = inventory_model.Alcohol(**db_alcohol_data)
    db.add(db_alcohol)
    db.commit()
    db.refresh(db_alcohol)
    return db_alcohol

def get_alcohol(db: Session, alcohol_id: int) -> inventory_model.Alcohol | None:
    """Retrieve a specific alcohol purchase/batch by its ID."""
    return db.query(inventory_model.Alcohol).filter(inventory_model.Alcohol.id == alcohol_id).first()

def get_alcohols(db: Session, skip: int = 0, limit: int = 100) -> List[inventory_model.Alcohol]:
    """Retrieve a list of alcohol purchase/batch records with pagination."""
    return db.query(inventory_model.Alcohol).order_by(inventory_model.Alcohol.purchase_date.desc()).offset(skip).limit(limit).all()

def get_alcohols_by_name(db: Session, name: str, skip: int = 0, limit: int = 100) -> List[inventory_model.Alcohol]:
    """Retrieve alcohol purchase/batch records of a specific type/name with pagination."""
    return db.query(inventory_model.Alcohol).filter(inventory_model.Alcohol.name == name).order_by(inventory_model.Alcohol.purchase_date.desc()).offset(skip).limit(limit).all()

def update_alcohol(db: Session, alcohol_id: int, alcohol_update: inventory_schema.AlcoholUpdate) -> inventory_model.Alcohol | None:
    """Update an existing alcohol purchase/batch record."""
    db_alcohol = get_alcohol(db, alcohol_id=alcohol_id)
    if not db_alcohol:
        return None

    update_data = alcohol_update.model_dump(exclude_unset=True)

    # If purchase_unit_cost or purchase_unit_volume_ml are being updated, recalculate cost_per_ml
    new_purchase_cost = update_data.get('purchase_unit_cost', db_alcohol.purchase_unit_cost)
    new_purchase_volume = update_data.get('purchase_unit_volume_ml', db_alcohol.purchase_unit_volume_ml)
    
    if 'purchase_unit_cost' in update_data or 'purchase_unit_volume_ml' in update_data:
        if new_purchase_volume > 0: # Avoid division by zero
            update_data['cost_per_ml'] = new_purchase_cost / new_purchase_volume
        else:
            # Handle error or set a default/None if volume can be zero post-update
            update_data['cost_per_ml'] = 0 # Or some other appropriate value/error handling
    
    for key, value in update_data.items():
        setattr(db_alcohol, key, value)
    
    db.add(db_alcohol)
    db.commit()
    db.refresh(db_alcohol)
    return db_alcohol

def delete_alcohol(db: Session, alcohol_id: int) -> inventory_model.Alcohol | None:
    """Delete an alcohol purchase/batch record."""
    db_alcohol = get_alcohol(db, alcohol_id=alcohol_id)
    if not db_alcohol:
        return None
    db.delete(db_alcohol)
    db.commit()
    return db_alcohol

# CRUD operations for Additive

def create_additive(db: Session, additive: inventory_schema.AdditiveCreate) -> inventory_model.Additive:
    db_additive = inventory_model.Additive(**additive.model_dump())
    db.add(db_additive)
    db.commit()
    db.refresh(db_additive)
    return db_additive

def get_additive(db: Session, additive_id: int) -> inventory_model.Additive | None:
    return db.query(inventory_model.Additive).filter(inventory_model.Additive.id == additive_id).first()

def get_additives(db: Session, additive_type: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[inventory_model.Additive]: # Added Optional from typing
    query = db.query(inventory_model.Additive)
    if additive_type:
        query = query.filter(inventory_model.Additive.type == additive_type)
    return query.order_by(inventory_model.Additive.name).offset(skip).limit(limit).all()

def get_additive_by_name(db: Session, name: str) -> inventory_model.Additive | None:
    return db.query(inventory_model.Additive).filter(inventory_model.Additive.name == name).first()

def update_additive(db: Session, additive_id: int, additive_update: inventory_schema.AdditiveUpdate) -> inventory_model.Additive | None:
    db_additive = get_additive(db, additive_id=additive_id)
    if not db_additive:
        return None
    update_data = additive_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_additive, key, value)
    db.add(db_additive)
    db.commit()
    db.refresh(db_additive)
    return db_additive

def delete_additive(db: Session, additive_id: int) -> inventory_model.Additive | None:
    db_additive = get_additive(db, additive_id=additive_id)
    if not db_additive:
        return None
    db.delete(db_additive)
    db.commit()
    return db_additive

# CRUD operations for Humidifier

def create_humidifier(db: Session, humidifier: inventory_schema.HumidifierCreate) -> inventory_model.Humidifier:
    db_humidifier = inventory_model.Humidifier(**humidifier.model_dump())
    db.add(db_humidifier)
    db.commit()
    db.refresh(db_humidifier)
    return db_humidifier

def get_humidifier(db: Session, humidifier_id: int) -> inventory_model.Humidifier | None:
    return db.query(inventory_model.Humidifier).filter(inventory_model.Humidifier.id == humidifier_id).first()

def get_humidifiers(db: Session, skip: int = 0, limit: int = 100) -> List[inventory_model.Humidifier]:
    return db.query(inventory_model.Humidifier).order_by(inventory_model.Humidifier.name).offset(skip).limit(limit).all()

def get_humidifier_by_name(db: Session, name: str) -> inventory_model.Humidifier | None:
    return db.query(inventory_model.Humidifier).filter(inventory_model.Humidifier.name == name).first()

def update_humidifier(db: Session, humidifier_id: int, humidifier_update: inventory_schema.HumidifierUpdate) -> inventory_model.Humidifier | None:
    db_humidifier = get_humidifier(db, humidifier_id=humidifier_id)
    if not db_humidifier:
        return None
    update_data = humidifier_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_humidifier, key, value)
    db.add(db_humidifier)
    db.commit()
    db.refresh(db_humidifier)
    return db_humidifier

def delete_humidifier(db: Session, humidifier_id: int) -> inventory_model.Humidifier | None:
    db_humidifier = get_humidifier(db, humidifier_id=humidifier_id)
    if not db_humidifier:
        return None
    db.delete(db_humidifier)
    db.commit()
    return db_humidifier

# CRUD operations for HumidifierEssence

def create_humidifier_essence(db: Session, hf_essence: inventory_schema.HumidifierEssenceCreate) -> inventory_model.HumidifierEssence:
    db_hf_essence = inventory_model.HumidifierEssence(**hf_essence.model_dump())
    db.add(db_hf_essence)
    db.commit()
    db.refresh(db_hf_essence)
    return db_hf_essence

def get_humidifier_essence(db: Session, hf_essence_id: int) -> inventory_model.HumidifierEssence | None:
    return db.query(inventory_model.HumidifierEssence).filter(inventory_model.HumidifierEssence.id == hf_essence_id).first()

def get_humidifier_essences(db: Session, skip: int = 0, limit: int = 100) -> List[inventory_model.HumidifierEssence]:
    return db.query(inventory_model.HumidifierEssence).order_by(inventory_model.HumidifierEssence.name).offset(skip).limit(limit).all()

def get_humidifier_essence_by_name(db: Session, name: str) -> inventory_model.HumidifierEssence | None:
    return db.query(inventory_model.HumidifierEssence).filter(inventory_model.HumidifierEssence.name == name).first()

def update_humidifier_essence(db: Session, hf_essence_id: int, hf_essence_update: inventory_schema.HumidifierEssenceUpdate) -> inventory_model.HumidifierEssence | None:
    db_hf_essence = get_humidifier_essence(db, hf_essence_id=hf_essence_id)
    if not db_hf_essence:
        return None
    update_data = hf_essence_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_hf_essence, key, value)
    db.add(db_hf_essence)
    db.commit()
    db.refresh(db_hf_essence)
    return db_hf_essence

def delete_humidifier_essence(db: Session, hf_essence_id: int) -> inventory_model.HumidifierEssence | None:
    db_hf_essence = get_humidifier_essence(db, hf_essence_id=hf_essence_id)
    if not db_hf_essence:
        return None
    db.delete(db_hf_essence)
    db.commit()
    return db_hf_essence

# CRUD operations for FinishedProduct

def create_finished_product(db: Session, product: inventory_schema.FinishedProductCreate) -> inventory_model.FinishedProduct:
    db_product = inventory_model.FinishedProduct(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def get_finished_product(db: Session, product_id: int) -> inventory_model.FinishedProduct | None:
    return db.query(inventory_model.FinishedProduct).filter(inventory_model.FinishedProduct.id == product_id).first()

def get_finished_products(db: Session, product_type: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[inventory_model.FinishedProduct]:
    query = db.query(inventory_model.FinishedProduct)
    if product_type:
        query = query.filter(inventory_model.FinishedProduct.product_type == product_type)
    return query.order_by(inventory_model.FinishedProduct.name).offset(skip).limit(limit).all()

def get_finished_product_by_name(db: Session, name: str) -> inventory_model.FinishedProduct | None:
    return db.query(inventory_model.FinishedProduct).filter(inventory_model.FinishedProduct.name == name).first()

def update_finished_product(db: Session, product_id: int, product_update: inventory_schema.FinishedProductUpdate) -> inventory_model.FinishedProduct | None:
    db_product = get_finished_product(db, product_id=product_id)
    if not db_product:
        return None
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_finished_product(db: Session, product_id: int) -> inventory_model.FinishedProduct | None:
    db_product = get_finished_product(db, product_id=product_id)
    if not db_product:
        return None
    db.delete(db_product)
    db.commit()
    return db_product

# End of CRUD functions for inventory
