from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..crud import sales_crud
from ..schemas import sales_schema

router = APIRouter()

# Customer routes

@router.post("/customers/", response_model=sales_schema.Customer, status_code=status.HTTP_201_CREATED)
def create_customer(customer: sales_schema.CustomerCreate, db: Session = Depends(get_db)):
    """
    Create a new customer.
    """
    try:
        return sales_crud.create_customer(db=db, customer=customer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating customer: {str(e)}")

@router.get("/customers/", response_model=List[sales_schema.Customer])
def get_customers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all customers with pagination.
    """
    customers = sales_crud.get_customers(db, skip=skip, limit=limit)
    return customers

@router.get("/customers/{customer_id}", response_model=sales_schema.Customer)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    """
    Get a single customer by ID.
    """
    customer = sales_crud.get_customer(db, customer_id=customer_id)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.put("/customers/{customer_id}", response_model=sales_schema.Customer)
def update_customer(customer_id: int, customer_update: sales_schema.CustomerUpdate, db: Session = Depends(get_db)):
    """
    Update an existing customer.
    """
    customer = sales_crud.update_customer(db, customer_id=customer_id, customer_update=customer_update)
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.delete("/customers/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    """
    Delete a customer.
    """
    success = sales_crud.delete_customer(db, customer_id=customer_id)
    if not success:
        raise HTTPException(status_code=404, detail="Customer not found")

@router.get("/customers/search/", response_model=List[sales_schema.Customer])
def search_customers(q: str = Query(..., description="Search term for customer name or WhatsApp"), db: Session = Depends(get_db)):
    """
    Search customers by name or WhatsApp.
    """
    return sales_crud.search_customers(db, search_term=q)

# Recipe routes

@router.post("/recipes/", response_model=sales_schema.Recipe, status_code=status.HTTP_201_CREATED)
def create_recipe(recipe: sales_schema.RecipeCreate, db: Session = Depends(get_db)):
    """
    Create a new recipe.
    """
    try:
        return sales_crud.create_recipe(db=db, recipe=recipe)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating recipe: {str(e)}")

@router.get("/recipes/", response_model=List[sales_schema.Recipe])
def get_recipes(skip: int = 0, limit: int = 100, active_only: bool = True, db: Session = Depends(get_db)):
    """
    Get all recipes with pagination. By default, only active recipes.
    """
    recipes = sales_crud.get_recipes(db, skip=skip, limit=limit, active_only=active_only)
    return recipes

@router.get("/recipes/{recipe_id}", response_model=sales_schema.Recipe)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    """
    Get a single recipe by ID.
    """
    recipe = sales_crud.get_recipe(db, recipe_id=recipe_id)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.get("/recipes/find/", response_model=sales_schema.Recipe)
def get_recipe_by_specs(
    size_ml: int = Query(..., description="Size in ml (30, 50, 100)"),
    fragrance_type: str = Query(..., description="Fragrance type (tradicional, nicho)"),
    bottle_type: str = Query(..., description="Bottle type (generico, lujo, replica)"),
    db: Session = Depends(get_db)
):
    """
    Get a recipe by its specifications.
    """
    recipe = sales_crud.get_recipe_by_specs(db, size_ml=size_ml, fragrance_type=fragrance_type, bottle_type=bottle_type)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found for the specified parameters")
    return recipe

@router.put("/recipes/{recipe_id}", response_model=sales_schema.Recipe)
def update_recipe(recipe_id: int, recipe_update: sales_schema.RecipeUpdate, db: Session = Depends(get_db)):
    """
    Update an existing recipe.
    """
    recipe = sales_crud.update_recipe(db, recipe_id=recipe_id, recipe_update=recipe_update)
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.delete("/recipes/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    """
    Deactivate a recipe.
    """
    success = sales_crud.delete_recipe(db, recipe_id=recipe_id)
    if not success:
        raise HTTPException(status_code=404, detail="Recipe not found") 