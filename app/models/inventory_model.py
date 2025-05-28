from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func # For server-side default timestamps
from ..database import Base # Assuming database.py is one level up in an 'app' directory

class Fragrance(Base):
    __tablename__ = "fragrances"

    id = Column(Integer, primary_key=True, index=True)
    internal_name = Column(String, unique=True, index=True, nullable=False) # Name used internally by the business
    inspiration_name = Column(String, index=True, nullable=True) # e.g., "Good Girl"
    house = Column(String, index=True, nullable=True) # e.g., "Carolina Herrera"
    description = Column(Text, nullable=True)
    supplier_name = Column(String, nullable=True) # Can be linked to a Supplier table later
    cost_per_g = Column(Float, nullable=False) # Cost per gram. Consider Numeric for precision.
    stock_g = Column(Float, nullable=False, default=0.0) # Stock in grams
    min_stock_g = Column(Float, nullable=True, default=0.0) # Minimum stock in grams

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Fragrance(internal_name='{self.internal_name}', inspiration='{self.inspiration_name}')>"

class Bottle(Base):
    __tablename__ = "bottles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False) # e.g., "Spray Glass Amber 50ml"
    capacity_ml = Column(Float, nullable=False) # Capacity in milliliters
    bottle_type = Column(String, nullable=True) # e.g., "Generic", "Replica", "Original"
    color = Column(String, nullable=True) # e.g., "Transparent", "Amber"
    supplier_name = Column(String, nullable=True)
    cost_per_unit = Column(Float, nullable=False)
    stock_units = Column(Integer, nullable=False, default=0)
    min_stock_units = Column(Integer, nullable=True, default=0)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Bottle(name='{self.name}', capacity_ml={self.capacity_ml}, stock_units={self.stock_units})>"

class Alcohol(Base):
    __tablename__ = "alcohols"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    supplier_name = Column(String, nullable=True)
    
    purchase_unit_cost = Column(Float, nullable=False) # Cost for the entire purchase unit (e.g., a 5-gallon drum)
    purchase_unit_volume_ml = Column(Float, nullable=False) # Volume of that purchase unit in milliliters
    
    # cost_per_ml can be derived (purchase_unit_cost / purchase_unit_volume_ml)
    # Storing it can be for convenience or if pre-calculation is preferred.
    cost_per_ml = Column(Float, nullable=False) 
    
    stock_notes = Column(Text, nullable=True) # e.g., "2 x 5-gallon drums in stock"

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Alcohol(name='{self.name}', cost_per_ml={self.cost_per_ml})>"

class Additive(Base):
    __tablename__ = "additives"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    type = Column(String, nullable=True) # e.g., "Enhancer", "Fixative", "Pheromone", "Other"
    description = Column(Text, nullable=True)
    supplier_name = Column(String, nullable=True)
    
    purchase_unit_cost = Column(Float, nullable=True) # Cost of the purchase unit (e.g., a bottle)
    purchase_unit_volume_ml = Column(Float, nullable=True) # Volume of the purchase unit in ml, if applicable
    
    # Estimated cost per typical application in a perfume.
    # This helps account for variable usage (e.g., by drops) without tracking tiny inventory changes.
    # This value would be used when defining perfume formulas.
    cost_per_application_estimate = Column(Float, nullable=True) 
    
    stock_notes = Column(Text, nullable=True) # e.g., "1 bottle in use, 2 in reserve"

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Additive(name='{self.name}', type='{self.type}')>"

class Humidifier(Base):
    __tablename__ = "humidifiers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    supplier_name = Column(String, nullable=True)
    cost_per_unit = Column(Float, nullable=False)
    stock_units = Column(Integer, nullable=False, default=0)
    min_stock_units = Column(Integer, nullable=True, default=0)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Humidifier(name='{self.name}', stock_units={self.stock_units})>"

class HumidifierEssence(Base):
    __tablename__ = "humidifier_essences"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    supplier_name = Column(String, nullable=True)
    cost_per_bottle = Column(Float, nullable=False)
    bottle_volume_ml = Column(Float, nullable=True) # Volume of the essence bottle, e.g., 10ml, 30ml
    stock_units = Column(Integer, nullable=False, default=0) # Number of bottles in stock
    min_stock_units = Column(Integer, nullable=True, default=0)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<HumidifierEssence(name='{self.name}', stock_units={self.stock_units})>"

class FinishedProduct(Base):
    __tablename__ = "finished_products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    product_type = Column(String, index=True, nullable=False) # e.g., "Body Splash", "Scented Cream", "Soap"
    description = Column(Text, nullable=True)
    size_ml_g = Column(String, nullable=True) # e.g., "250ml", "100g", "500ml"
    
    supplier_name = Column(String, nullable=True) # Can be "In-house" if self-made
    cost_price = Column(Float, nullable=False) # Cost to acquire or produce
    sale_price = Column(Float, nullable=False) # Price to sell to customer
    
    stock_units = Column(Integer, nullable=False, default=0)
    min_stock_units = Column(Integer, nullable=True, default=0)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<FinishedProduct(name='{self.name}', type='{self.product_type}', stock_units={self.stock_units})>"

# End of inventory models for now 