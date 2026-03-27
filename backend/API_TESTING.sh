#!/bin/bash

# India Health Aid Backend - API Testing Guide
# This script contains example curl commands to test the backend API

BASE_URL="http://localhost:5000/api"
TOKEN=""

echo "🚀 India Health Aid Backend - API Testing Guide"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Health Check
echo -e "${BLUE}1. Health Check${NC}"
echo "GET $BASE_URL/health"
curl -X GET "$BASE_URL/health" | jq '.'
echo ""

# 2. Register User
echo -e "${BLUE}2. Register New User${NC}"
echo "POST $BASE_URL/auth/register"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "healthuser123",
    "email": "health@example.com",
    "password": "SecurePass123"
  }')
echo "$REGISTER_RESPONSE" | jq '.'
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.token')
echo -e "${GREEN}✅ Token saved: $TOKEN${NC}"
echo ""

# 3. Login User
echo -e "${BLUE}3. Login User${NC}"
echo "POST $BASE_URL/auth/login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "health@example.com",
    "password": "SecurePass123"
  }')
echo "$LOGIN_RESPONSE" | jq '.'
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token')
echo ""

# 4. Get Current User
echo -e "${BLUE}4. Get Current User Profile${NC}"
echo "GET $BASE_URL/auth/me"
curl -s -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# 5. Get All Diseases
echo -e "${BLUE}5. Get All Diseases${NC}"
echo "GET $BASE_URL/diseases"
curl -s -X GET "$BASE_URL/diseases" | jq '.'
echo ""

# 6. Search Diseases
echo -e "${BLUE}6. Search Diseases${NC}"
echo "GET $BASE_URL/diseases?search=fever"
curl -s -X GET "$BASE_URL/diseases?search=fever" | jq '.'
echo ""

# 7. Filter by Category
echo -e "${BLUE}7. Filter Diseases by Category${NC}"
echo "GET $BASE_URL/diseases?category=infectious"
curl -s -X GET "$BASE_URL/diseases?category=infectious" | jq '.'
echo ""

# 8. Seed Sample Data (if available)
echo -e "${BLUE}8. Seed Sample Data${NC}"
echo -e "${YELLOW}Run from backend directory:${NC}"
echo "npm run seed"
echo ""

# 9. Create Disease (requires Admin)
echo -e "${BLUE}9. Create Disease (Admin Only)${NC}"
echo "POST $BASE_URL/diseases"
echo "Headers: Authorization: Bearer <ADMIN_TOKEN>"
echo ""
echo "Example:"
echo 'curl -X POST "$BASE_URL/diseases" \'
echo '  -H "Authorization: Bearer <ADMIN_TOKEN>" \'
echo '  -H "Content-Type: application/json" \'
echo "  -d '{"
echo '    "name": "Tuberculosis",'
echo '    "description": "Infectious disease caused by Mycobacterium tuberculosis",'
echo '    "symptoms": ["persistent cough", "chest pain", "hemoptysis"],'
echo '    "prevention": ["vaccination", "hygiene", "isolation"],'
echo '    "treatment": ["antibiotics", "rest", "nutrition"],'
echo '    "category": "infectious",'
echo '    "severity": "high"'
echo "  }'"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Testing Guide Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "📝 Notes:"
echo "  - Replace <ADMIN_TOKEN> with your admin JWT token"
echo "  - Make sure backend is running: npm run dev"
echo "  - MongoDB must be running"
echo "  - Install jq for better JSON formatting: apt-get install jq"
echo ""
