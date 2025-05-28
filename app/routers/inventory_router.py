from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional # Kept for future use, e.g., for listing items

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

# --- Alcohol Endpoints (Purchase/Batch Tracking) ---

@router.post("/alcohols/", response_model=inventory_schema.Alcohol, status_code=201)
def create_new_alcohol_purchase(
    alcohol: inventory_schema.AlcoholCreate, 
    db: Session = Depends(get_db)
):
    """
    Record a new alcohol purchase/batch.
    `cost_per_ml` will be calculated from `purchase_unit_cost` and `purchase_unit_volume_ml`.
    `purchase_date` defaults to now if not provided and model has server_default.
    """
    # No unique name check needed here as 'name' is the type and can be repeated for different batches
    return inventory_crud.create_alcohol(db=db, alcohol=alcohol)

@router.get("/alcohols/", response_model=List[inventory_schema.Alcohol])
def read_alcohol_purchases(
    skip: int = 0, 
    limit: int = 100, 
    name: Optional[str] = None, # Allow filtering by alcohol type name
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of alcohol purchase/batch records, optionally filtered by type name.
    """
    if name:
        alcohols = inventory_crud.get_alcohols_by_name(db, name=name, skip=skip, limit=limit)
    else:
        alcohols = inventory_crud.get_alcohols(db, skip=skip, limit=limit)
    return alcohols

@router.get("/alcohols/{alcohol_id}", response_model=inventory_schema.Alcohol)
def read_single_alcohol_purchase(alcohol_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific alcohol purchase/batch record by its ID.
    """
    db_alcohol = inventory_crud.get_alcohol(db, alcohol_id=alcohol_id)
    if db_alcohol is None:
        raise HTTPException(status_code=404, detail=f"Alcohol purchase/batch with ID {alcohol_id} not found")
    return db_alcohol

@router.put("/alcohols/{alcohol_id}", response_model=inventory_schema.Alcohol)
def update_existing_alcohol_purchase(
    alcohol_id: int, 
    alcohol_update: inventory_schema.AlcoholUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update an existing alcohol purchase/batch record.
    `cost_per_ml` will be recalculated if `purchase_unit_cost` or `purchase_unit_volume_ml` are changed.
    """
    updated_alcohol = inventory_crud.update_alcohol(db, alcohol_id=alcohol_id, alcohol_update=alcohol_update)
    if updated_alcohol is None:
        raise HTTPException(status_code=404, detail=f"Alcohol purchase/batch with ID {alcohol_id} not found for update")
    return updated_alcohol

@router.delete("/alcohols/{alcohol_id}", response_model=inventory_schema.Alcohol)
def delete_existing_alcohol_purchase(alcohol_id: int, db: Session = Depends(get_db)):
    """
    Delete an alcohol purchase/batch record by its ID.
    """
    deleted_alcohol = inventory_crud.delete_alcohol(db, alcohol_id=alcohol_id)
    if deleted_alcohol is None:
        raise HTTPException(status_code=404, detail=f"Alcohol purchase/batch with ID {alcohol_id} not found for deletion")
    return deleted_alcohol

# We will add more endpoints here for other inventory items (Alcohol, Additive, etc.). 

@router.get("/alcohols/", response_model=List[inventory_schema.Alcohol])
def read_alcohols(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    alcohols = inventory_crud.get_alcohols(db, skip=skip, limit=limit)
    return alcohols

@router.post("/alcohols/", response_model=inventory_schema.Alcohol, status_code=201)
def create_new_alcohol(alcohol: inventory_schema.AlcoholCreate, db: Session = Depends(get_db)):
    return inventory_crud.create_alcohol(db=db, alcohol=alcohol)

@router.put("/alcohols/{alcohol_id}", response_model=inventory_schema.Alcohol)
def update_existing_alcohol(alcohol_id: int, alcohol_update: inventory_schema.AlcoholUpdate, db: Session = Depends(get_db)):
    updated_alcohol = inventory_crud.update_alcohol(db, alcohol_id=alcohol_id, alcohol_update=alcohol_update)
    if updated_alcohol is None:
        raise HTTPException(status_code=404, detail=f"Alcohol with ID {alcohol_id} not found for update")
    return updated_alcohol

@router.delete("/alcohols/{alcohol_id}", response_model=inventory_schema.Alcohol)
def delete_existing_alcohol(alcohol_id: int, db: Session = Depends(get_db)):
    deleted_alcohol = inventory_crud.delete_alcohol(db, alcohol_id=alcohol_id)
    if deleted_alcohol is None:
        raise HTTPException(status_code=404, detail=f"Alcohol with ID {alcohol_id} not found for deletion")
    return deleted_alcohol

# --- Additive Endpoints ---

@router.post("/additives/", response_model=inventory_schema.Additive, status_code=201)
def create_new_additive(additive: inventory_schema.AdditiveCreate, db: Session = Depends(get_db)):
    """
    Create a new additive.
    - **name**: Name of the additive (required, unique).
    - **type**: e.g., "Enhancer", "Fixative", "Pheromone" (optional).
    - **cost_per_application_estimate**: Estimated cost for one application (optional).
    """
    existing_additive = inventory_crud.get_additive_by_name(db, name=additive.name)
    if existing_additive:
        raise HTTPException(status_code=400, detail=f"Additive with name '{additive.name}' already exists.")
    return inventory_crud.create_additive(db=db, additive=additive)

@router.get("/additives/", response_model=List[inventory_schema.Additive])
def read_additives(
    additive_type: Optional[str] = None, # Query parameter for filtering by type
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    Retrieve a list of additives, optionally filtered by type.
    """
    additives = inventory_crud.get_additives(db, additive_type=additive_type, skip=skip, limit=limit)
    return additives

@router.get("/additives/{additive_id}", response_model=inventory_schema.Additive)
def read_additive(additive_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific additive by its ID.
    """
    db_additive = inventory_crud.get_additive(db, additive_id=additive_id)
    if db_additive is None:
        raise HTTPException(status_code=404, detail=f"Additive with ID {additive_id} not found")
    return db_additive

@router.put("/additives/{additive_id}", response_model=inventory_schema.Additive)
def update_existing_additive(
    additive_id: int, 
    additive_update: inventory_schema.AdditiveUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update an existing additive by its ID.
    If `name` is provided, it checks for uniqueness against other additives.
    """
    # Optional: If name is being updated, check for uniqueness of the new name
    if additive_update.name is not None:
        existing_additive_with_new_name = inventory_crud.get_additive_by_name(db, name=additive_update.name)
        if existing_additive_with_new_name and existing_additive_with_new_name.id != additive_id:
             raise HTTPException(status_code=400, detail=f"Another additive with name '{additive_update.name}' already exists.")
            
    updated_additive = inventory_crud.update_additive(db, additive_id=additive_id, additive_update=additive_update)
    if updated_additive is None:
        raise HTTPException(status_code=404, detail=f"Additive with ID {additive_id} not found for update")
    return updated_additive

@router.delete("/additives/{additive_id}", response_model=inventory_schema.Additive)
def delete_existing_additive(additive_id: int, db: Session = Depends(get_db)):
    """
    Delete an additive by its ID.
    """
    deleted_additive = inventory_crud.delete_additive(db, additive_id=additive_id)
    if deleted_additive is None:
        raise HTTPException(status_code=404, detail=f"Additive with ID {additive_id} not found for deletion")
    return deleted_additive

# --- Humidifier Endpoints ---

@router.post("/humidifiers/", response_model=inventory_schema.Humidifier, status_code=201)
def create_new_humidifier(humidifier: inventory_schema.HumidifierCreate, db: Session = Depends(get_db)):
    """
    Create a new humidifier.
    - **name**: Name of the humidifier (required, unique).
    - **cost_per_unit**: Cost of the humidifier (required).
    """
    existing_humidifier = inventory_crud.get_humidifier_by_name(db, name=humidifier.name)
    if existing_humidifier:
        raise HTTPException(status_code=400, detail=f"Humidifier with name '{humidifier.name}' already exists.")
    return inventory_crud.create_humidifier(db=db, humidifier=humidifier)

@router.get("/humidifiers/", response_model=List[inventory_schema.Humidifier])
def read_humidifiers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve a list of humidifiers.
    """
    humidifiers = inventory_crud.get_humidifiers(db, skip=skip, limit=limit)
    return humidifiers

@router.get("/humidifiers/{humidifier_id}", response_model=inventory_schema.Humidifier)
def read_humidifier(humidifier_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific humidifier by its ID.
    """
    db_humidifier = inventory_crud.get_humidifier(db, humidifier_id=humidifier_id)
    if db_humidifier is None:
        raise HTTPException(status_code=404, detail=f"Humidifier with ID {humidifier_id} not found")
    return db_humidifier

@router.put("/humidifiers/{humidifier_id}", response_model=inventory_schema.Humidifier)
def update_existing_humidifier(
    humidifier_id: int, 
    humidifier_update: inventory_schema.HumidifierUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update an existing humidifier by its ID.
    If `name` is provided, it checks for uniqueness against other humidifiers.
    """
    if humidifier_update.name is not None:
        existing_humidifier_with_new_name = inventory_crud.get_humidifier_by_name(db, name=humidifier_update.name)
        if existing_humidifier_with_new_name and existing_humidifier_with_new_name.id != humidifier_id:
             raise HTTPException(status_code=400, detail=f"Another humidifier with name '{humidifier_update.name}' already exists.")
            
    updated_humidifier = inventory_crud.update_humidifier(db, humidifier_id=humidifier_id, humidifier_update=humidifier_update)
    if updated_humidifier is None:
        raise HTTPException(status_code=404, detail=f"Humidifier with ID {humidifier_id} not found for update")
    return updated_humidifier

@router.delete("/humidifiers/{humidifier_id}", response_model=inventory_schema.Humidifier)
def delete_existing_humidifier(humidifier_id: int, db: Session = Depends(get_db)):
    """
    Delete a humidifier by its ID.
    """
    deleted_humidifier = inventory_crud.delete_humidifier(db, humidifier_id=humidifier_id)
    if deleted_humidifier is None:
        raise HTTPException(status_code=404, detail=f"Humidifier with ID {humidifier_id} not found for deletion")
    return deleted_humidifier

# We will add more endpoints here for HumidifierEssence, etc.