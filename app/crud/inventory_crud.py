from sqlalchemy.orm import Session
from typing import List # Added for type hinting
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

# We will add more CRUD functions here for Bottle, Alcohol, etc.
