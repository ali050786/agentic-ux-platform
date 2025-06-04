#!/bin/bash

echo "🔧 Setting up Agentic UX Platform..."

# Step 1: Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Step 2: Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Optional: Add react-scripts if missing
if ! npm list react-scripts >/dev/null 2>&1; then
  echo "⚠️ react-scripts not found. Installing manually..."
  npm install react-scripts
fi
cd ..

# Step 3: Confirm Supabase .env exists
if [ ! -f ".env" ]; then
  echo "⚠️ No .env file found at root. Create one for Supabase config."
else
  echo "✅ .env found"
fi

echo "✅ Setup complete. Ready to start development or testing!"
