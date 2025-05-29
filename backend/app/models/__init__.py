# This file makes the 'models' directory a Python package.
# It can be empty.

# Import all models from inventory_model.py to make them available
# when the 'models' package is imported, and for SQLAlchemy's Base to discover them.
from .inventory_model import Base, Fragrance, Bottle, Alcohol, Additive, Humidifier, HumidifierEssence, FinishedProduct

# Import sales models from sales_model.py (step by step implementation)
from .sales_model import Customer, Recipe, Sale, SaleItem

# If you have other model files in the future, import them here as well.
# For example:
# from .user_model import User

# You can optionally import models here to make them available 
# directly from the package, e.g.:
# from .inventory_model import Fragrance, Bottle
# but for Base.metadata.create_all() to work by just importing the module,
# simply ensuring the module (inventory_model.py) is executed is enough. 