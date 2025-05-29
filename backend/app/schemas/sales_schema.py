from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

# Pydantic Schemas for Customer Model

class CustomerBase(BaseModel):
    name: str
    whatsapp: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    whatsapp: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[str] = None

class Customer(CustomerBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Recipe Model

class RecipeBase(BaseModel):
    name: str
    size_ml: int  # 30, 50, 100
    fragrance_type: str  # "tradicional", "nicho"
    bottle_type: str  # "generico", "lujo", "replica"
    fragrance_grams: float
    fijador_drops: int
    potencializador_drops: int
    concentrado_drops: int
    base_price: float
    pheromone_addition_price: float = 0.0
    estimated_cost: Optional[float] = None
    is_active: str = "true"

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(BaseModel):
    name: Optional[str] = None
    size_ml: Optional[int] = None
    fragrance_type: Optional[str] = None
    bottle_type: Optional[str] = None
    fragrance_grams: Optional[float] = None
    fijador_drops: Optional[int] = None
    potencializador_drops: Optional[int] = None
    concentrado_drops: Optional[int] = None
    base_price: Optional[float] = None
    pheromone_addition_price: Optional[float] = None
    estimated_cost: Optional[float] = None
    is_active: Optional[str] = None

class Recipe(RecipeBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True) 