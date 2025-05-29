from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
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

    # Relationship
    sales = relationship("Sale", back_populates="customer")

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

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    
    # Customer (optional)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    
    # Sale details
    sale_date = Column(DateTime(timezone=True), server_default=func.now())
    payment_method = Column(String, nullable=False, default="Efectivo")  # Efectivo, Nequi, Daviplata, Transfiya, Tarjeta
    card_surcharge_applied = Column(Boolean, default=False)  # True if 5% surcharge was applied
    
    # Totals
    subtotal = Column(Float, nullable=False, default=0.0)
    surcharge_amount = Column(Float, nullable=False, default=0.0)  # 5% for cards
    total_amount = Column(Float, nullable=False, default=0.0)
    
    # Optional manual adjustments
    discount_amount = Column(Float, nullable=False, default=0.0)
    discount_reason = Column(String, nullable=True)
    
    notes = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    customer = relationship("Customer", back_populates="sales")
    sale_items = relationship("SaleItem", back_populates="sale", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Sale(id={self.id}, total=${self.total_amount}, date='{self.sale_date}')>"

class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"), nullable=False)
    
    # Product information
    product_type = Column(String, nullable=False)  # "perfume", "finished_product", "humidifier", "essence", "individual_item"
    
    # For perfumes (custom made)
    fragrance_id = Column(Integer, ForeignKey("fragrances.id"), nullable=True)
    bottle_id = Column(Integer, ForeignKey("bottles.id"), nullable=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"), nullable=True)
    size_ml = Column(Integer, nullable=True)  # 30, 50, 100
    fragrance_type = Column(String, nullable=True)  # "tradicional", "nicho"
    has_pheromones = Column(Boolean, default=False)
    extra_fragrance_grams = Column(Float, default=0.0)
    
    # For finished products (already made items)
    finished_product_id = Column(Integer, ForeignKey("finished_products.id"), nullable=True)
    humidifier_id = Column(Integer, ForeignKey("humidifiers.id"), nullable=True)
    humidifier_essence_id = Column(Integer, ForeignKey("humidifier_essences.id"), nullable=True)
    
    # General item info
    item_name = Column(String, nullable=False)  # Display name for this sale item
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Float, nullable=False)
    line_total = Column(Float, nullable=False)
    
    # Recipe used (stored as JSON for historical record)
    recipe_used = Column(JSON, nullable=True)  # {"fragrance_grams": 13, "fijador_drops": 15, etc.}
    
    # Cost tracking
    item_cost = Column(Float, nullable=True)  # Total cost of ingredients for this item
    profit_margin = Column(Float, nullable=True)  # Calculated profit
    
    notes = Column(Text, nullable=True)

    # Relationships
    sale = relationship("Sale", back_populates="sale_items")

    def __repr__(self):
        return f"<SaleItem(name='{self.item_name}', qty={self.quantity}, price=${self.unit_price})>" 