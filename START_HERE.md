# 🚀 How to Run the Healthcare Appointment System

## Quick Start (3 Steps)

### Step 1: Install Backend Dependencies

Open Terminal/Command Prompt and run:

```bash
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app/backend"
npm install
```

**What this does:** Installs Express.js and CORS packages needed for the API server.

**Expected output:** You should see packages being installed. Wait for it to finish.

---

### Step 2: Start the Backend Server

While still in the `backend` folder, run:

```bash
npm start
```

**What this does:** Starts the API server on port 3000.

**Expected output:**
```
🚀 Healthcare API server running on http://localhost:3000
📋 API Documentation available at http://localhost:3000/health
```

**Keep this terminal window open!** The server needs to keep running.

---

### Step 3: Open the Frontend

**Option A: Simple Method (Recommended)**
1. Open Finder (Mac) or File Explorer (Windows)
2. Navigate to: `healthcare-app` folder
3. Double-click `index.html`
4. It will open in your default browser

**Option B: Using a Local Server (Better for Development)**

Open a **NEW** terminal window (keep the backend server running) and run:

```bash
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app"
python3 -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

---

## ✅ Verify It's Working

1. **Check Backend:** Open `http://localhost:3000/health` in your browser
   - Should show: `{"status":"ok","message":"Healthcare API is running"}`

2. **Check Frontend:** 
   - You should see the "Smart Healthcare" homepage
   - Click "Start Symptom Check"
   - Select some symptoms and test the flow

---

## 🐛 Troubleshooting

### Problem: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Port 3000 already in use"
**Solution:** 
- Find what's using port 3000: `lsof -i :3000` (Mac) or `netstat -ano | findstr :3000` (Windows)
- Kill that process or change the port in `backend/server.js`

### Problem: Frontend shows "Failed to fetch" errors
**Solution:**
- Make sure backend is running (Step 2)
- Check browser console (F12) for CORS errors
- Try opening frontend via local server (Option B above)

### Problem: No symptoms/doctors showing
**Solution:**
- Check backend terminal for errors
- Open browser console (F12) and check for API errors
- Verify backend is accessible at `http://localhost:3000/health`

---

## 📁 Project Structure

```
healthcare-app/
├── index.html          ← Frontend (open this in browser)
├── styles.css          ← Styling
├── app.js              ← Frontend JavaScript
├── backend/
│   ├── server.js       ← API server (run with npm start)
│   ├── controllers/    ← API endpoints
│   ├── services/        ← Rule engine
│   └── data/           ← Database (in-memory)
└── START_HERE.md       ← This file
```

---

## 🎯 Testing the Full Flow

1. **Home Page** → Click "Start Symptom Check"
2. **Symptom Checker** → Select symptoms (e.g., Fever, Cough)
3. **Symptom Details** → Set severity levels, click "Analyze Symptoms"
4. **Results** → View condition matches, click "Find Doctors"
5. **Doctor Selection** → Browse doctors, click "Book Appointment"
6. **Booking** → Select date/time, enter info, confirm
7. **Confirmation** → See booking confirmation
8. **Dashboard** → View your appointments

---

## 💡 Development Tips

- **Backend changes:** Restart the server (Ctrl+C, then `npm start` again)
- **Frontend changes:** Just refresh the browser
- **View API responses:** Open browser DevTools (F12) → Network tab
- **Check logs:** Look at the terminal where backend is running

---

## 🎉 You're All Set!

The system is now running. The backend API handles:
- Symptom analysis
- Condition matching (rule-based AI)
- Doctor recommendations
- Appointment booking

The frontend provides a beautiful, interactive interface for patients.

Need help? Check the README.md or QUICKSTART.md files!
