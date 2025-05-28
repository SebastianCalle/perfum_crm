import requests
import random
import datetime
import json

# --- Configuration ---
BASE_URL = "http://localhost:8000/inventory" # Adjust if your API runs elsewhere
HEADERS = {"Content-Type": "application/json"}
ITEM_COUNT = 50

# --- Helper Function ---
def post_data(endpoint, data, entity_name):
    """Helper function to POST data and print status."""
    url = f"{BASE_URL}{endpoint}"
    try:
        response = requests.post(url, data=json.dumps(data, default=str), headers=HEADERS)
        if response.status_code == 201:
            print(f"Successfully created {entity_name}: {data.get('name', data.get('internal_name', ''))}")
            return response.json() # Return the created object if needed
        elif response.status_code == 400 and "already exists" in response.text:
            print(f"Skipped {entity_name} (already exists): {data.get('name', data.get('internal_name', ''))}")
            return None
        else:
            print(f"Error creating {entity_name}: {data.get('name', data.get('internal_name', ''))} - Status: {response.status_code}, Response: {response.text}")
            return None
    except requests.exceptions.ConnectionError as e:
        print(f"Connection error while creating {entity_name}: {e}")
        print("Please ensure your FastAPI backend server is running.")
        return None
    except Exception as e:
        print(f"An unexpected error occurred while creating {entity_name}: {e}")
        return None

# --- Entity Creation Functions ---

def create_fake_fragrances(count):
    print(f"\n--- Creating {count} Fragrances ---")
    for i in range(count):
        data = {
            "internal_name": f"FragInt-{i+1:03}",
            "inspiration_name": f"Inspiration {random.choice(['A','B','C'])}-{random.randint(1,100)}",
            "house": f"House {random.choice(['X','Y','Z'])}",
            "description": f"Description for Fragrance {i+1}",
            "supplier_name": f"Supplier Frag {random.randint(1,5)}",
            "cost_per_g": round(random.uniform(0.5, 5.0), 2),
            "stock_g": round(random.uniform(0, 1000.0), 1),
            "min_stock_g": round(random.uniform(50, 200.0), 1)
        }
        post_data("/fragrances/", data, "Fragrance")

def create_fake_bottles(count):
    print(f"\n--- Creating {count} Bottles ---")
    for i in range(count):
        data = {
            "name": f"BottleType-{i+1:03}",
            "capacity_ml": random.choice([10, 30, 50, 100, 200]),
            "bottle_type": random.choice(["Spray", "Roll-on", "Dropper", "Generic Glass"]),
            "color": random.choice(["Transparent", "Amber", "Blue", "Matte Black"]),
            "supplier_name": f"Supplier Bottle {random.randint(1,3)}",
            "cost_per_unit": round(random.uniform(0.2, 3.0), 2),
            "stock_units": random.randint(0, 500),
            "min_stock_units": random.randint(20, 100)
        }
        post_data("/bottles/", data, "Bottle")

def create_fake_alcohols(count):
    print(f"\n--- Creating {count} Alcohols ---")
    for i in range(count):
        # Generate a random date within the last year
        start_date = datetime.datetime.now() - datetime.timedelta(days=365)
        random_days = random.randint(0, 365)
        purchase_dt = start_date + datetime.timedelta(days=random_days)
        
        purchase_unit_volume = random.choice([1000, 5000, 20000]) # ml
        purchase_unit_cost = round(random.uniform(10, 100) * (purchase_unit_volume / 1000), 2) # cost related to volume

        data = {
            "name": f"Alcohol Batch {random.choice(['Perfumist 96%', 'Cosmetic Grade 99%', 'Denatured Extra'])} - {i+1:03}",
            "description": f"Batch of alcohol for perfumery, purchased on {purchase_dt.strftime('%Y-%m-%d')}",
            "supplier_name": f"Chemical Supplier {random.randint(1,2)}",
            "purchase_date": purchase_dt.isoformat(), # Use ISO format
            "purchase_unit_cost": purchase_unit_cost,
            "purchase_unit_volume_ml": float(purchase_unit_volume),
            # cost_per_ml is calculated by the backend
            "stock_notes": f"Initial stock for batch {i+1}. Current volume: {purchase_unit_volume}ml"
        }
        post_data("/alcohols/", data, "Alcohol")

def create_fake_additives(count):
    print(f"\n--- Creating {count} Additives ---")
    for i in range(count):
        data = {
            "name": f"Additive {random.choice(['Fixative Alpha', 'UV Protector Beta', 'Colorant Gamma'])} - {i+1:03}",
            "description": f"Perfumery additive type {i+1}",
            "supplier_name": f"Specialty Chem {random.randint(1,2)}",
            "cost_per_ml_or_g": round(random.uniform(1, 10), 2),
            "unit_of_measure": random.choice(["ml", "g"]),
            "stock_ml_or_g": round(random.uniform(10, 500), 1),
            "min_stock_ml_or_g": round(random.uniform(5, 50), 1)
        }
        post_data("/additives/", data, "Additive")

def create_fake_humidifiers(count):
    print(f"\n--- Creating {count} Humidifiers ---")
    for i in range(count):
        data = {
            "name": f"Humidifier Model {random.choice(['MistKing', 'AquaPure', 'ZenScent'])} - {i+1:03}",
            "description": f"Electric humidifier unit, model {i+1}",
            "supplier_name": f"Appliance Store {random.randint(1,2)}",
            "cost_per_unit": round(random.uniform(15, 75), 2),
            "stock_units": random.randint(0, 50),
            "min_stock_units": random.randint(2, 10)
        }
        post_data("/humidifiers/", data, "Humidifier")

def create_fake_humidifier_essences(count):
    print(f"\n--- Creating {count} Humidifier Essences ---")
    for i in range(count):
        data = {
            "name": f"H-Essence {random.choice(['Lavender Bliss', 'Ocean Breeze', 'Citrus Burst'])} - {i+1:03}",
            "description": f"Scented essence for humidifiers, type {i+1}",
            "supplier_name": f"Aroma Supplier Inc.",
            "cost_per_bottle": round(random.uniform(2, 10), 2),
            "bottle_volume_ml": random.choice([10, 15, 30]),
            "stock_units": random.randint(0, 100),
            "min_stock_units": random.randint(10, 30)
        }
        post_data("/humidifier-essences/", data, "HumidifierEssence") # Corrected endpoint

def create_fake_finished_products(count):
    print(f"\n--- Creating {count} Finished Products ---")
    product_types = ["Perfum Extract", "Eau de Parfum", "Eau de Toilette", "Room Spray", "Car Diffuser"]
    for i in range(count):
        data = {
            "name": f"Final Product {random.choice(['Signature Scent', 'Limited Edition', 'Classic Blend'])} - {i+1:03}",
            "product_type": random.choice(product_types),
            "description": f"Finished perfumery product, item {i+1}",
            # The following IDs would ideally come from existing records.
            # For simplicity, we'll use placeholder values or omit if not strictly required by FinishedProductCreate.
            # "fragrance_id": random.randint(1, ITEM_COUNT), # Assuming fragrances up to ITEM_COUNT exist
            # "bottle_id": random.randint(1, ITEM_COUNT),    # Assuming bottles up to ITEM_COUNT exist
            # "alcohol_id": random.randint(1, ITEM_COUNT),  # Assuming alcohols up to ITEM_COUNT exist
            # For now, relying on FinishedProductBase fields only, as per previous discussions.
            "fragrance_percentage": round(random.uniform(5, 25), 1),
            "alcohol_percentage": round(random.uniform(60, 85), 1),
            "additive_percentage": round(random.uniform(0, 5), 1),
            "total_volume_ml": random.choice([30, 50, 100]),
            "cost_price": round(random.uniform(5, 50), 2), # Placeholder cost
            "selling_price": round(random.uniform(15, 150), 2), # Placeholder price
            "stock_units": random.randint(0, 200),
            "min_stock_units": random.randint(10, 50),
            "notes": f"Production batch {datetime.date.today().year}-{random.randint(1,100)}"
        }
        post_data("/finished-products/", data, "FinishedProduct") # Corrected endpoint

# --- Main Execution ---
if __name__ == "__main__":
    print("Starting database population script...")
    print(f"Targeting API at: {BASE_URL}")
    print(f"Attempting to create {ITEM_COUNT} records for each entity.\n")

    # Create entities in an order that might make sense for potential dependencies
    # (though this script currently doesn't link them actively)
    create_fake_fragrances(ITEM_COUNT)
    create_fake_bottles(ITEM_COUNT)
    create_fake_alcohols(ITEM_COUNT)
    create_fake_additives(ITEM_COUNT)
    create_fake_humidifiers(ITEM_COUNT)
    create_fake_humidifier_essences(ITEM_COUNT)
    create_fake_finished_products(ITEM_COUNT)

    print("\nDatabase population script finished.")
    print("Please check your database and the console output for any errors.")
    print("If you see 'Connection error', ensure your FastAPI backend is running and accessible at the BASE_URL.")
    print("If you see 'already exists', the script attempted to create an item with a unique key that was already present.") 