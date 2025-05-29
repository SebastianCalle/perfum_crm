from pydantic import BaseModel, ConfigDict
from typing import Optional, List
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

# Pydantic Schemas for SaleItem Model

class SaleItemBase(BaseModel):
    product_type: str  # "perfume", "finished_product", "humidifier", "essence", "individual_item"
    
    # For perfumes (custom made)
    fragrance_id: Optional[int] = None
    bottle_id: Optional[int] = None
    recipe_id: Optional[int] = None
    size_ml: Optional[int] = None
    fragrance_type: Optional[str] = None
    has_pheromones: bool = False
    extra_fragrance_grams: float = 0.0
    
    # For finished products
    finished_product_id: Optional[int] = None
    humidifier_id: Optional[int] = None
    humidifier_essence_id: Optional[int] = None
    
    # General item info
    item_name: str
    quantity: int = 1
    unit_price: float
    line_total: float
    
    # Optional fields
    recipe_used: Optional[dict] = None
    item_cost: Optional[float] = None
    profit_margin: Optional[float] = None
    notes: Optional[str] = None

class SaleItemCreate(SaleItemBase):
    pass

class SaleItemUpdate(BaseModel):
    product_type: Optional[str] = None
    fragrance_id: Optional[int] = None
    bottle_id: Optional[int] = None
    recipe_id: Optional[int] = None
    size_ml: Optional[int] = None
    fragrance_type: Optional[str] = None
    has_pheromones: Optional[bool] = None
    extra_fragrance_grams: Optional[float] = None
    finished_product_id: Optional[int] = None
    humidifier_id: Optional[int] = None
    humidifier_essence_id: Optional[int] = None
    item_name: Optional[str] = None
    quantity: Optional[int] = None
    unit_price: Optional[float] = None
    line_total: Optional[float] = None
    recipe_used: Optional[dict] = None
    item_cost: Optional[float] = None
    profit_margin: Optional[float] = None
    notes: Optional[str] = None

class SaleItem(SaleItemBase):
    id: int
    sale_id: int

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Sale Model

class SaleBase(BaseModel):
    customer_id: Optional[int] = None
    payment_method: str = "Efectivo"
    card_surcharge_applied: bool = False
    subtotal: float = 0.0
    surcharge_amount: float = 0.0
    total_amount: float = 0.0
    discount_amount: float = 0.0
    discount_reason: Optional[str] = None
    notes: Optional[str] = None

class SaleCreate(SaleBase):
    sale_items: List[SaleItemCreate] = []

class SaleUpdate(BaseModel):
    customer_id: Optional[int] = None
    payment_method: Optional[str] = None
    card_surcharge_applied: Optional[bool] = None
    subtotal: Optional[float] = None
    surcharge_amount: Optional[float] = None
    total_amount: Optional[float] = None
    discount_amount: Optional[float] = None
    discount_reason: Optional[str] = None
    notes: Optional[str] = None

class Sale(SaleBase):
    id: int
    sale_date: datetime
    created_at: datetime
    updated_at: Optional[datetime] = None
    sale_items: List[SaleItem] = []
    customer: Optional[Customer] = None

    model_config = ConfigDict(from_attributes=True)

# Simple schemas for quick operations
class SaleItemSimple(BaseModel):
    """Simplified schema for creating sale items in a sale"""
    product_type: str
    item_name: str
    quantity: int = 1
    unit_price: float
    
    # Optional perfume-specific fields
    fragrance_id: Optional[int] = None
    bottle_id: Optional[int] = None
    size_ml: Optional[int] = None
    fragrance_type: Optional[str] = None
    has_pheromones: bool = False
    extra_fragrance_grams: float = 0.0
    
    # Optional finished product fields
    finished_product_id: Optional[int] = None
    humidifier_id: Optional[int] = None
    humidifier_essence_id: Optional[int] = None

class SaleCreateSimple(BaseModel):
    """Simplified schema for creating a sale with items"""
    customer_id: Optional[int] = None
    payment_method: str = "Efectivo"
    discount_amount: float = 0.0
    discount_reason: Optional[str] = None
    notes: Optional[str] = None
    sale_items: List[SaleItemSimple] = [] 