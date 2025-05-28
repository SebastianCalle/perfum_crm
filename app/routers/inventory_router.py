from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List # Kept for future use, e.g., for listing items

from ..schemas import inventory_schema
from ..crud import inventory_crud
from ..database import get_db # Dependency to get DB session

router = APIRouter(
    prefix="/inventory", # All routes in this router will start with /inventory
    tags=["Inventory"], # Tag for API documentation
    responses={404: {"description": "Not found"}}, # Default response for 404
)

# Endpoint to create a new fragrance
@router.post("/fragrances/", response_model=inventory_schema.Fragrance, status_code=201)
def create_new_fragrance(
    fragrance: inventory_schema.FragranceCreate, 
    db: Session = Depends(get_db)
):
    """
    Create a new fragrance.

    - **internal_name**: Internal name for the fragrance (required)
    - **inspiration_name**: Optional name of the original perfume inspiration
    - **house**: Optional perfume house of the inspiration
    - **description**: Optional description
    - **supplier_name**: Optional supplier name
    - **cost_per_g**: Cost per gram (required)
    - **stock_g**: Current stock in grams (defaults to 0.0)
    - **min_stock_g**: Optional minimum stock in grams (defaults to 0.0)
    """
    # Optional: Check if fragrance with the same internal_name already exists.
    # This would require a get_fragrance_by_internal_name function in inventory_crud.py.
    existing_fragrance = inventory_crud.get_fragrance_by_internal_name(db, internal_name=fragrance.internal_name)
    if existing_fragrance:
        raise HTTPException(status_code=400, detail=f"Fragrance with internal name '{fragrance.internal_name}' already exists.")
    
    created_fragrance = inventory_crud.create_fragrance(db=db, fragrance=fragrance)
    return created_fragrance

@router.get("/fragrances/", response_model=List[inventory_schema.Fragrance])
def read_fragrances(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of fragrances with pagination.
    - **skip**: Number of items to skip (for pagination).
    - **limit**: Maximum number of items to return (for pagination).
    """
    fragrances = inventory_crud.get_fragrances(db, skip=skip, limit=limit)
    return fragrances

@router.get("/fragrances/{fragrance_id}", response_model=inventory_schema.Fragrance)
def read_fragrance(fragrance_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific fragrance by its ID.
    - **fragrance_id**: The ID of the fragrance to retrieve.
    """
    db_fragrance = inventory_crud.get_fragrance(db, fragrance_id=fragrance_id)
    if db_fragrance is None:
        raise HTTPException(status_code=404, detail=f"Fragrance with ID {fragrance_id} not found")
    return db_fragrance

@router.put("/fragrances/{fragrance_id}", response_model=inventory_schema.Fragrance)
def update_existing_fragrance(
    fragrance_id: int, 
    fragrance_update: inventory_schema.FragranceUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update an existing fragrance by its ID.

    - **fragrance_id**: The ID of the fragrance to update.
    - **Request body**: Fragrance fields to update (all optional).
    """
    updated_fragrance = inventory_crud.update_fragrance(db, fragrance_id=fragrance_id, fragrance_update=fragrance_update)
    if updated_fragrance is None:
        raise HTTPException(status_code=404, detail=f"Fragrance with ID {fragrance_id} not found for update")
    return updated_fragrance

@router.delete("/fragrances/{fragrance_id}", response_model=inventory_schema.Fragrance)
def delete_existing_fragrance(fragrance_id: int, db: Session = Depends(get_db)):
    """
    Delete a fragrance by its ID.
    - **fragrance_id**: The ID of the fragrance to delete.
    """
    deleted_fragrance = inventory_crud.delete_fragrance(db, fragrance_id=fragrance_id)
    if deleted_fragrance is None:
        raise HTTPException(status_code=404, detail=f"Fragrance with ID {fragrance_id} not found for deletion")
    return deleted_fragrance # Returns the deleted item as confirmation

# --- Bottle Endpoints ---

@router.post("/bottles/", response_model=inventory_schema.Bottle, status_code=201)
def create_new_bottle(bottle: inventory_schema.BottleCreate, db: Session = Depends(get_db)):
    """
    Create a new bottle type.

    - **name**: Name of the bottle (required, unique)
    - **capacity_ml**: Capacity in milliliters (required)
    - **bottle_type**: e.g., "Generic", "Replica", "Original" (optional)
    - **color**: e.g., "Transparent", "Amber" (optional)
    - **supplier_name**: Optional supplier name
    - **cost_per_unit**: Cost per bottle (required)
    - **stock_units**: Current stock in units (defaults to 0)
    - **min_stock_units**: Optional minimum stock (defaults to 0)
    """
    existing_bottle = inventory_crud.get_bottle_by_name(db, name=bottle.name)
    if existing_bottle:
        raise HTTPException(status_code=400, detail=f"Bottle with name '{bottle.name}' already exists.")
    return inventory_crud.create_bottle(db=db, bottle=bottle)

@router.get("/bottles/", response_model=List[inventory_schema.Bottle])
def read_bottles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of bottle types with pagination.
    """
    bottles = inventory_crud.get_bottles(db, skip=skip, limit=limit)
    return bottles

@router.get("/bottles/{bottle_id}", response_model=inventory_schema.Bottle)
def read_bottle(bottle_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific bottle type by its ID.
    """
    db_bottle = inventory_crud.get_bottle(db, bottle_id=bottle_id)
    if db_bottle is None:
        raise HTTPException(status_code=404, detail=f"Bottle with ID {bottle_id} not found")
    return db_bottle

@router.put("/bottles/{bottle_id}", response_model=inventory_schema.Bottle)
def update_existing_bottle(
    bottle_id: int, 
    bottle_update: inventory_schema.BottleUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update an existing bottle type by its ID.
    """
    updated_bottle = inventory_crud.update_bottle(db, bottle_id=bottle_id, bottle_update=bottle_update)
    if updated_bottle is None:
        raise HTTPException(status_code=404, detail=f"Bottle with ID {bottle_id} not found for update")
    return updated_bottle

@router.delete("/bottles/{bottle_id}", response_model=inventory_schema.Bottle)
def delete_existing_bottle(bottle_id: int, db: Session = Depends(get_db)):
    """
    Delete a bottle type by its ID.
    """
    deleted_bottle = inventory_crud.delete_bottle(db, bottle_id=bottle_id)
    if deleted_bottle is None:
        raise HTTPException(status_code=404, detail=f"Bottle with ID {bottle_id} not found for deletion")
    return deleted_bottle

# We will add more endpoints here for other inventory items (Alcohol, Additive, etc.). 