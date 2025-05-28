from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORSMiddleware

# Database imports
from .database import engine, Base # Import Base and engine

# Import all models to register them with Base metadata
# This ensures that when inventory_model is imported, all model classes defined within it
# (which inherit from Base) are registered with Base.metadata.
from .models import inventory_model 

# Create database tables if they don't exist
# This is suitable for development. For production, consider using Alembic migrations.
Base.metadata.create_all(bind=engine)

# Import Routers
from .routers import inventory_router # Import the inventory router

app = FastAPI(
    title="Perfum CRM API",
    description="API for managing perfume customer relationships and sales.",
    version="0.1.0",
    # You can add more OpenAPI metadata here
    # openapi_tags=[ # Example of adding tags metadata for documentation
    #     {
    #         "name": "Inventory",
    #         "description": "Operations with inventory items like fragrances, bottles, etc.",
    #     },
    #     {
    #         "name": "Users",
    #         "description": "Operations with users.",
    #     }
    # ]
)

# Include routers from other modules
app.include_router(inventory_router.router) # Register inventory routes

# Define allowed origins for CORS
origins = [
    "http://localhost:5173",  # Default Vite port
    "http://localhost:3000",  # Common React dev port
    # Add other origins if needed, e.g., your deployed frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Allows specific origins
    allow_credentials=True, # Allows cookies to be included in requests
    allow_methods=["*"],    # Allows all methods (GET, POST, PUT, etc.)
    allow_headers=["*"],    # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Welcome to Perfum CRM API"}

# Placeholder for future routers and application logic
# from .routers import users, products, sales
# app.include_router(users.router)
# app.include_router(products.router)
# app.include_router(sales.router)

# Placeholder for creating database tables (if using SQLAlchemy ORM)
# from .database import engine, Base # This line is now redundant
# Base.metadata.create_all(bind=engine) # This line is now redundant 