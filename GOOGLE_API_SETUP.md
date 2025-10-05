# Google API Configuration Summary

## Updated Files:

### 1. .env file
Contains all environment variables needed for React app:
- REACT_APP_GOOGLE_CLIENT_ID: OAuth2 client ID for web app
- REACT_APP_GOOGLE_CLIENT_SECRET: OAuth2 client secret 
- REACT_APP_GOOGLE_API_KEY: Google API key (STILL NEEDS TO BE SET)
- REACT_APP_GOOGLE_SHEET_ID: Your Google Sheet ID
- REACT_APP_GOOGLE_PROJECT_ID: Google Cloud project ID

### 2. googlekeys_updated.json (New OAuth2 Config)
Updated OAuth2 credentials with proper redirect URIs for local development

### 3. serviceKeys.json (Service Account)
Service account credentials for server-side authentication

## CRITICAL STEPS TO COMPLETE:

### Step 1: Get Google API Key
1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Select project: weddingguests-470016
3. Go to APIs & Services → Credentials
4. Click "+ CREATE CREDENTIALS" → API key
5. Copy the API key and replace "your_google_api_key_here" in .env file
6. Click "RESTRICT KEY" and under "API restrictions", select "Google Sheets API"

### Step 2: Update OAuth2 Settings in Google Cloud Console
1. Go to APIs & Services → Credentials
2. Find your OAuth 2.0 Client ID: 616131941726-vmors3fu5u17ouo9sn9stqjc8nj9hlje.apps.googleusercontent.com
3. Click Edit
4. Add these to "Authorized JavaScript origins":
   - http://localhost:3000
   - http://localhost:3004
   - http://127.0.0.1:3000
   - http://127.0.0.1:3004
5. Add these to "Authorized redirect URIs":
   - http://localhost:3000
   - http://localhost:3004
   - http://127.0.0.1:3000  
   - http://127.0.0.1:3004

### Step 3: Enable Google Sheets API
1. Go to APIs & Services → Library
2. Search for "Google Sheets API"
3. Click on it and click "ENABLE"

### Step 4: Make Your Google Sheet Public (for simple access)
1. Open your sheet: https://docs.google.com/spreadsheets/d/1yIJwEqmAn3msdTWLqPS_6fjXaKoH5o9_ub3EZzxwNnI/edit
2. Click Share → Change to "Anyone with the link" → Viewer
3. Click Done

## Current Configuration Status:
✅ OAuth2 Client ID configured
✅ Service Account configured  
✅ Environment variables set up
✅ Sheet ID configured
❌ Google API Key (NEEDS TO BE OBTAINED)
❌ OAuth2 authorized origins (NEEDS TO BE CONFIGURED)
❌ Google Sheets API enabled (NEEDS TO BE VERIFIED)
❌ Sheet public access (NEEDS TO BE CONFIGURED)

## Available Authentication Methods:
1. **Simple API Key** (recommended for read-only): Uses googleAPI key + public sheet
2. **OAuth2** (full access): Uses client ID/secret for user authentication  
3. **Service Account** (server-side): Uses service account for backend authentication

Your React app is currently set up to use methods 1 and 2.
