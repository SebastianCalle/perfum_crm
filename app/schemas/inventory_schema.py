from pydantic import BaseModel, ConfigDict # For Pydantic V2
from typing import Optional, List
from datetime import datetime

# Pydantic Schemas for Fragrance Model

class FragranceBase(BaseModel):
    internal_name: str
    inspiration_name: Optional[str] = None
    house: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_g: float
    stock_g: float = 0.0
    min_stock_g: Optional[float] = 0.0

class FragranceCreate(FragranceBase):
    pass # All fields from FragranceBase are usually required for creation

class FragranceUpdate(BaseModel):
    # All fields are optional for updates
    internal_name: Optional[str] = None
    inspiration_name: Optional[str] = None
    house: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_g: Optional[float] = None
    stock_g: Optional[float] = None
    min_stock_g: Optional[float] = None

class Fragrance(FragranceBase): # Schema for reading/returning fragrance data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    # For Pydantic V2, model_config is used instead of class Config
    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Bottle Model

class BottleBase(BaseModel):
    name: str
    capacity_ml: float
    bottle_type: Optional[str] = None
    color: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_unit: float
    stock_units: int = 0
    min_stock_units: Optional[int] = 0

class BottleCreate(BottleBase):
    pass

class BottleUpdate(BaseModel):
    name: Optional[str] = None
    capacity_ml: Optional[float] = None
    bottle_type: Optional[str] = None
    color: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_unit: Optional[float] = None
    stock_units: Optional[int] = None
    min_stock_units: Optional[int] = None

class Bottle(BottleBase): # Schema for reading/returning bottle data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Alcohol Model

class AlcoholBase(BaseModel):
    name: str
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    purchase_unit_cost: float
    purchase_unit_volume_ml: float
    cost_per_ml: float # This could also be calculated on the fly if preferred
    stock_notes: Optional[str] = None

class AlcoholCreate(AlcoholBase):
    pass

class AlcoholUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    purchase_unit_cost: Optional[float] = None
    purchase_unit_volume_ml: Optional[float] = None
    cost_per_ml: Optional[float] = None
    stock_notes: Optional[str] = None

class Alcohol(AlcoholBase): # Schema for reading/returning alcohol data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Additive Model

class AdditiveBase(BaseModel):
    name: str
    type: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    purchase_unit_cost: Optional[float] = None
    purchase_unit_volume_ml: Optional[float] = None
    cost_per_application_estimate: Optional[float] = None
    stock_notes: Optional[str] = None

class AdditiveCreate(AdditiveBase):
    pass

class AdditiveUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    purchase_unit_cost: Optional[float] = None
    purchase_unit_volume_ml: Optional[float] = None
    cost_per_application_estimate: Optional[float] = None
    stock_notes: Optional[str] = None

class Additive(AdditiveBase): # Schema for reading/returning additive data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for Humidifier Model

class HumidifierBase(BaseModel):
    name: str
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_unit: float
    stock_units: int = 0
    min_stock_units: Optional[int] = 0

class HumidifierCreate(HumidifierBase):
    pass

class HumidifierUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_unit: Optional[float] = None
    stock_units: Optional[int] = None
    min_stock_units: Optional[int] = None

class Humidifier(HumidifierBase): # Schema for reading/returning humidifier data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for HumidifierEssence Model

class HumidifierEssenceBase(BaseModel):
    name: str
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_bottle: float
    bottle_volume_ml: Optional[float] = None
    stock_units: int = 0
    min_stock_units: Optional[int] = 0

class HumidifierEssenceCreate(HumidifierEssenceBase):
    pass

class HumidifierEssenceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_per_bottle: Optional[float] = None
    bottle_volume_ml: Optional[float] = None
    stock_units: Optional[int] = None
    min_stock_units: Optional[int] = None

class HumidifierEssence(HumidifierEssenceBase): # Schema for reading/returning data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# Pydantic Schemas for FinishedProduct Model

class FinishedProductBase(BaseModel):
    name: str
    product_type: str
    description: Optional[str] = None
    size_ml_g: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_price: float
    sale_price: float
    stock_units: int = 0
    min_stock_units: Optional[int] = 0

class FinishedProductCreate(FinishedProductBase):
    pass

class FinishedProductUpdate(BaseModel):
    name: Optional[str] = None
    product_type: Optional[str] = None
    description: Optional[str] = None
    size_ml_g: Optional[str] = None
    supplier_name: Optional[str] = None
    cost_price: Optional[float] = None
    sale_price: Optional[float] = None
    stock_units: Optional[int] = None
    min_stock_units: Optional[int] = None

class FinishedProduct(FinishedProductBase): # Schema for reading/returning data
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# End of Pydantic schemas for inventory models 