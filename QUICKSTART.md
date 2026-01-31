# Quick Start Guide

Get your healthcare appointment system running in 3 minutes!

## Step 1: Install Backend Dependencies

```bash
cd healthcare-app/backend
npm install
```

## Step 2: Start the Backend Server

```bash
npm start
```

You should see:
```
🚀 Healthcare API server running on http://localhost:3000
```

## Step 3: Open the Frontend

**Option A: Direct File Open**
- Simply double-click `index.html` in the `healthcare-app` folder
- Or open it in your browser: `file:///path/to/healthcare-app/index.html`

**Option B: Local Server (Recommended)**
```bash
# From the healthcare-app directory
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Then open: `http://localhost:8000`

## Step 4: Test the System

1. Click "Start Symptom Check"
2. Select symptoms (e.g., Fever, Cough)
3. Click "Next" and set severity levels
4. Click "Analyze Symptoms"
5. View condition matches
6. Click "Find Doctors" on a condition
7. Select a doctor and book an appointment

## Troubleshooting

### Backend won't start
- Make sure Node.js is installed: `node --version`
- Check if port 3000 is available
- Try: `npm install` again

### Frontend can't connect to API
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

### No symptoms/doctors showing
- The system uses in-memory data
- Check browser console for API errors
- Verify backend is running and accessible

## Next Steps

- Read the full README.md for detailed documentation
- Check the architecture docs for system design
- Customize symptoms, conditions, and doctors in `backend/data/database.js`

Enjoy your healthcare appointment system! 🏥
