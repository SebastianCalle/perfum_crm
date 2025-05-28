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

# We will add more endpoints here for Fragrance (GET, PUT, DELETE) 
# and then for other inventory items (Bottle, Alcohol, etc.). 