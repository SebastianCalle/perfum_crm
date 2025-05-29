from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.sql import func
from ..database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    whatsapp = Column(String, nullable=True, index=True)
    email = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Customer(name='{self.name}', whatsapp='{self.whatsapp}')>"

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)  # e.g., "Perfume 30ml Tradicional Genérico"
    size_ml = Column(Integer, nullable=False)  # 30, 50, 100
    fragrance_type = Column(String, nullable=False)  # "tradicional", "nicho"
    bottle_type = Column(String, nullable=False)  # "generico", "lujo", "replica"
    
    # Recipe ingredients (according to your specifications)
    fragrance_grams = Column(Float, nullable=False)
    fijador_drops = Column(Integer, nullable=False)
    potencializador_drops = Column(Integer, nullable=False)
    concentrado_drops = Column(Integer, nullable=False)
    
    # Base pricing (according to your price list)
    base_price = Column(Float, nullable=False)
    pheromone_addition_price = Column(Float, nullable=False, default=0.0)
    
    # Cost calculation helper (will be calculated based on current ingredient costs)
    estimated_cost = Column(Float, nullable=True)
    
    # Active status
    is_active = Column(String, nullable=False, default="true")  # "true", "false"
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Recipe(name='{self.name}', size={self.size_ml}ml, price=${self.base_price})>" 