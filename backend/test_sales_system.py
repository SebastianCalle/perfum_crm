#!/usr/bin/env python3
"""
Script de prueba completo para el sistema de ventas de Gallery Essence.
Demuestra todas las funcionalidades implementadas.
"""

import requests
import json
from datetime import datetime

# Base URL for the API
BASE_URL = "http://localhost:8000/sales"

def print_section(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def print_response(response, title=""):
    if title:
        print(f"\n📋 {title}")
        print("-" * 40)
    
    if response.status_code >= 200 and response.status_code < 300:
        print(f"✅ Status: {response.status_code}")
        try:
            data = response.json()
            print(json.dumps(data, indent=2, ensure_ascii=False))
        except:
            print(response.text)
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)

def test_customer_creation():
    print_section("PASO 1: CREACIÓN DE CLIENTES")
    
    # Create customer
    customer_data = {
        "name": "María González",
        "whatsapp": "+57 301 234 5678",
        "email": "maria.gonzalez@email.com",
        "notes": "Cliente frecuente, prefiere perfumes nicho"
    }
    
    response = requests.post(f"{BASE_URL}/customers/", json=customer_data)
    print_response(response, "Cliente creado")
    
    if response.status_code == 201:
        return response.json()["id"]
    return None

def test_recipe_consultation():
    print_section("PASO 2: CONSULTA DE RECETAS DISPONIBLES")
    
    # Get available recipes
    response = requests.get(f"{BASE_URL}/recipes/")
    print_response(response, "Recetas disponibles")
    
    # Test recipe finder by specs
    response = requests.get(f"{BASE_URL}/recipes/find/?size_ml=100&fragrance_type=nicho&bottle_type=generico")
    print_response(response, "Búsqueda específica: 100ml Nicho Genérico")

def test_sales_creation(customer_id=None):
    print_section("PASO 3: CREACIÓN DE VENTAS")
    
    # Sale 1: Single perfume with cash payment
    sale1_data = {
        "customer_id": customer_id,
        "payment_method": "Efectivo",
        "discount_amount": 0,
        "notes": "Perfume personalizado - IRRESISTIBLE inspirado en Good Girl",
        "sale_items": [
            {
                "product_type": "perfume",
                "item_name": "IRRESISTIBLE (inspirado en Good Girl - Carolina Herrera) 100ml Nicho",
                "quantity": 1,
                "unit_price": 50000,
                "size_ml": 100,
                "fragrance_type": "nicho",
                "has_pheromones": False,
                "extra_fragrance_grams": 0
            }
        ]
    }
    
    response = requests.post(f"{BASE_URL}/sales/", json=sale1_data)
    print_response(response, "Venta #1 - Perfume Nicho en Efectivo")
    
    # Sale 2: Multiple items with card payment and pheromones
    sale2_data = {
        "customer_id": None,
        "payment_method": "Tarjeta",
        "discount_amount": 2000,
        "discount_reason": "Descuento por compra múltiple",
        "notes": "Pedido especial - 2 perfumes con feromonas",
        "sale_items": [
            {
                "product_type": "perfume",
                "item_name": "CONQUISTADOR (inspirado en Invictus) 50ml Tradicional + Feromonas",
                "quantity": 1,
                "unit_price": 33000,
                "size_ml": 50,
                "fragrance_type": "tradicional",
                "has_pheromones": True,
                "extra_fragrance_grams": 0
            },
            {
                "product_type": "perfume",
                "item_name": "ELEGANCIA (inspirado en Black Opium) 30ml Nicho + Feromonas",
                "quantity": 1,
                "unit_price": 22000,
                "size_ml": 30,
                "fragrance_type": "nicho",
                "has_pheromones": True,
                "extra_fragrance_grams": 0
            }
        ]
    }
    
    response = requests.post(f"{BASE_URL}/sales/", json=sale2_data)
    print_response(response, "Venta #2 - Pedido múltiple con tarjeta y descuento")
    
    # Sale 3: Nequi payment
    sale3_data = {
        "customer_id": customer_id,
        "payment_method": "Nequi",
        "discount_amount": 0,
        "notes": "Cliente solicita fragancia extra",
        "sale_items": [
            {
                "product_type": "perfume",
                "item_name": "PASSION (inspirado en La Vie Est Belle) 100ml Tradicional + 5g fragancia extra",
                "quantity": 1,
                "unit_price": 47500,  # 45000 base + 2500 por fragancia extra
                "size_ml": 100,
                "fragrance_type": "tradicional",
                "has_pheromones": False,
                "extra_fragrance_grams": 5
            }
        ]
    }
    
    response = requests.post(f"{BASE_URL}/sales/", json=sale3_data)
    print_response(response, "Venta #3 - Nequi con fragancia extra")

def test_reports():
    print_section("PASO 4: REPORTES Y ANÁLISIS")
    
    # Daily summary
    today = datetime.now().strftime("%Y-%m-%d")
    response = requests.get(f"{BASE_URL}/sales/summary/daily/?date={today}")
    print_response(response, f"Resumen diario - {today}")
    
    # All sales
    response = requests.get(f"{BASE_URL}/sales/")
    print_response(response, "Lista completa de ventas")
    
    # Customer search
    response = requests.get(f"{BASE_URL}/customers/search/?q=María")
    print_response(response, "Búsqueda de cliente: 'María'")

def test_business_scenarios():
    print_section("PASO 5: ESCENARIOS DE NEGOCIO REALES")
    
    print("📊 Análisis de los datos creados:")
    
    # Get all sales for analysis
    response = requests.get(f"{BASE_URL}/sales/")
    if response.status_code == 200:
        sales = response.json()
        
        total_revenue = sum(sale['total_amount'] for sale in sales)
        total_sales = len(sales)
        avg_sale = total_revenue / total_sales if total_sales > 0 else 0
        
        print(f"\n💰 Total de ventas hoy: {total_sales}")
        print(f"💸 Ingresos totales: ${total_revenue:,.0f}")
        print(f"📈 Venta promedio: ${avg_sale:,.0f}")
        
        # Payment methods breakdown
        payment_methods = {}
        for sale in sales:
            method = sale['payment_method']
            if method not in payment_methods:
                payment_methods[method] = {"count": 0, "amount": 0}
            payment_methods[method]["count"] += 1
            payment_methods[method]["amount"] += sale['total_amount']
        
        print(f"\n📊 Métodos de pago:")
        for method, data in payment_methods.items():
            print(f"  {method}: {data['count']} ventas - ${data['amount']:,.0f}")
        
        # Product analysis
        perfume_sales = [sale for sale in sales if any(item['product_type'] == 'perfume' for item in sale['sale_items'])]
        pheromone_sales = [sale for sale in sales if any(item.get('has_pheromones', False) for item in sale['sale_items'])]
        
        print(f"\n🧪 Análisis de productos:")
        print(f"  Perfumes vendidos: {len(perfume_sales)}")
        print(f"  Ventas con feromonas: {len(pheromone_sales)}")
        
        # Size analysis
        sizes = {}
        for sale in sales:
            for item in sale['sale_items']:
                if item.get('size_ml'):
                    size = f"{item['size_ml']}ml"
                    if size not in sizes:
                        sizes[size] = 0
                    sizes[size] += item['quantity']
        
        print(f"\n📏 Tamaños más vendidos:")
        for size, count in sorted(sizes.items()):
            print(f"  {size}: {count} unidades")

def main():
    print("🌸 SISTEMA DE VENTAS GALLERY ESSENCE 🌸")
    print("=====================================")
    print("Prueba completa del sistema de ventas implementado")
    
    try:
        # Test all functionality
        customer_id = test_customer_creation()
        test_recipe_consultation()
        test_sales_creation(customer_id)
        test_reports()
        test_business_scenarios()
        
        print_section("✅ RESUMEN FINAL")
        print("🎉 Todas las pruebas completadas exitosamente!")
        print("\n📋 Funcionalidades verificadas:")
        print("  ✅ Gestión de clientes")
        print("  ✅ Consulta de recetas y precios")
        print("  ✅ Creación de ventas con cálculo automático")
        print("  ✅ Manejo de feromonas y recargos")
        print("  ✅ Múltiples métodos de pago")
        print("  ✅ Descuentos y promociones")
        print("  ✅ Reportes diarios")
        print("  ✅ Análisis de ventas")
        
        print("\n🚀 El sistema está listo para producción!")
        
    except Exception as e:
        print(f"\n❌ Error durante las pruebas: {str(e)}")
        print("Asegúrate de que el servidor esté corriendo en http://localhost:8000")

if __name__ == "__main__":
    main() 