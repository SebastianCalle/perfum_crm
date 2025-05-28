# This file makes the 'schemas' directory a Python package.

# Import all schemas from inventory_schema.py
from .inventory_schema import (
    FragranceBase, FragranceCreate, FragranceUpdate, Fragrance,
    BottleBase, BottleCreate, BottleUpdate, Bottle,
    AlcoholBase, AlcoholCreate, AlcoholUpdate, Alcohol,
    AdditiveBase, AdditiveCreate, AdditiveUpdate, Additive,
    HumidifierBase, HumidifierCreate, HumidifierUpdate, Humidifier,
    HumidifierEssenceBase, HumidifierEssenceCreate, HumidifierEssenceUpdate, HumidifierEssence,
    FinishedProductBase, FinishedProductCreate, FinishedProductUpdate, FinishedProduct
)

# If you have other schema files in the future (e.g., user_schema.py),
# you would import them similarly:
# from .user_schema import User, UserCreate 