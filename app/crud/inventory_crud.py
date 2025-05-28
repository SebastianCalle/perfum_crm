from sqlalchemy.orm import Session
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

# We will add more CRUD functions here for Fragrance (get, get_by_id, update, delete)
# and then for Bottle, Alcohol, etc. 

def get_fragrance_by_internal_name(db: Session, internal_name: str) -> inventory_model.Fragrance:
    """
    Get a fragrance by its internal name.
    """
    return db.query(inventory_model.Fragrance).filter(inventory_model.Fragrance.internal_name == internal_name).first()
