
#!/bin/bash

# Deployment Script for Latin Real Estate Platform

echo "🚀 Starting Deployment Process..."

# 1. Github Deployment
echo "\n📦 Pushing to GitHub..."
git add .
git commit -m "chore: deployment update and scripts"
git push origin main

if [ $? -eq 0 ]; then
  echo "✅ GitHub push successful!"
  echo "ℹ️  This should automatically trigger a Vercel deployment if connected."
else
  echo "❌ GitHub push failed."
  exit 1
fi

# 2. Vercel Deployment (CLI Fallback)
echo "\n☁️ Attempting 'web' app deployment via Vercel CLI..."
cd apps/web || exit

# Try to build and deploy preboot, falling back to standard deploy
if [ -d ".vercel" ]; then
    echo "ℹ️  Vercel project linked. Building locally..."
    npx -y vercel build --prod --yes
    npx -y vercel deploy --prebuilt --prod --yes
else
    echo "⚠️  Vercel project not linked locally. Attempting standard deploy..."
    npx -y vercel deploy --prod --yes
fi

if [ $? -eq 0 ]; then
  echo "✅ Vercel CLI deployment successful!"
else
  echo "⚠️  Vercel CLI deployment failed. Please check Vercel Dashboard for the GitHub-triggered deployment."
  echo "ℹ️  If you haven't linked the project, run: cd apps/web && npx vercel link"
fi

echo "\n✨ Deployment process finished!"
