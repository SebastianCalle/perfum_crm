#!/usr/bin/env python3
"""
Script to populate the database with all the perfume recipes according to Gallery Essence price list.
"""

import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000/sales/recipes/"

# Recipe data according to your specifications
recipes = [
    # 30ml recipes
    {
        "name": "Perfume 30ml Tradicional Genérico",
        "size_ml": 30,
        "fragrance_type": "tradicional",
        "bottle_type": "generico",
        "fragrance_grams": 13,
        "fijador_drops": 15,
        "potencializador_drops": 1,
        "concentrado_drops": 3,
        "base_price": 18000,
        "pheromone_addition_price": 2000
    },
    {
        "name": "Perfume 30ml Nicho Genérico",
        "size_ml": 30,
        "fragrance_type": "nicho",
        "bottle_type": "generico",
        "fragrance_grams": 13,
        "fijador_drops": 15,
        "potencializador_drops": 1,
        "concentrado_drops": 3,
        "base_price": 20000,
        "pheromone_addition_price": 2000
    },
    
    # 50ml recipes
    {
        "name": "Perfume 50ml Tradicional Genérico",
        "size_ml": 50,
        "fragrance_type": "tradicional",
        "bottle_type": "generico",
        "fragrance_grams": 25,
        "fijador_drops": 20,
        "potencializador_drops": 1,
        "concentrado_drops": 5,
        "base_price": 30000,
        "pheromone_addition_price": 3000
    },
    {
        "name": "Perfume 50ml Nicho Genérico",
        "size_ml": 50,
        "fragrance_type": "nicho",
        "bottle_type": "generico",
        "fragrance_grams": 25,
        "fijador_drops": 20,
        "potencializador_drops": 1,
        "concentrado_drops": 5,
        "base_price": 35000,
        "pheromone_addition_price": 3000
    },
    
    # 100ml recipes
    {
        "name": "Perfume 100ml Tradicional Genérico",
        "size_ml": 100,
        "fragrance_type": "tradicional",
        "bottle_type": "generico",
        "fragrance_grams": 50,
        "fijador_drops": 30,
        "potencializador_drops": 2,
        "concentrado_drops": 8,
        "base_price": 45000,
        "pheromone_addition_price": 3000
    },
    {
        "name": "Perfume 100ml Nicho Genérico",
        "size_ml": 100,
        "fragrance_type": "nicho",
        "bottle_type": "generico",
        "fragrance_grams": 50,
        "fijador_drops": 30,
        "potencializador_drops": 2,
        "concentrado_drops": 8,
        "base_price": 50000,
        "pheromone_addition_price": 5000
    },
    
    # Luxury bottle recipes (100ml only)
    {
        "name": "Perfume 100ml Tradicional Lujo",
        "size_ml": 100,
        "fragrance_type": "tradicional",
        "bottle_type": "lujo",
        "fragrance_grams": 50,
        "fijador_drops": 30,
        "potencializador_drops": 2,
        "concentrado_drops": 8,
        "base_price": 50000,
        "pheromone_addition_price": 3000
    },
    {
        "name": "Perfume 100ml Nicho Lujo",
        "size_ml": 100,
        "fragrance_type": "nicho",
        "bottle_type": "lujo",
        "fragrance_grams": 50,
        "fijador_drops": 30,
        "potencializador_drops": 2,
        "concentrado_drops": 8,
        "base_price": 55000,
        "pheromone_addition_price": 3000
    }
]

def create_recipe(recipe_data):
    """Create a single recipe via API"""
    try:
        response = requests.post(BASE_URL, json=recipe_data)
        if response.status_code == 201:
            print(f"✅ Created: {recipe_data['name']}")
            return True
        else:
            print(f"❌ Failed to create {recipe_data['name']}: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error creating {recipe_data['name']}: {str(e)}")
        return False

def main():
    """Main function to populate all recipes"""
    print("🚀 Starting to populate Gallery Essence recipes...")
    print(f"📋 Total recipes to create: {len(recipes)}")
    print("-" * 50)
    
    success_count = 0
    for recipe in recipes:
        if create_recipe(recipe):
            success_count += 1
    
    print("-" * 50)
    print(f"✅ Successfully created: {success_count}/{len(recipes)} recipes")
    
    if success_count == len(recipes):
        print("🎉 All recipes created successfully!")
    else:
        print("⚠️  Some recipes failed to create. Check the errors above.")

if __name__ == "__main__":
    main() 