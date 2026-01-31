# 📋 Step-by-Step: How to Run the Website

## ⚡ Quick Steps (Copy & Paste)

### Step 1: Open Terminal
Press `Cmd + Space`, type "Terminal", and press Enter

### Step 2: Start the Backend Server
Copy and paste these commands one by one:

```bash
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app/backend"
npm start
```

**Wait for this message:**
```
🚀 Healthcare API server running on http://localhost:3000
```

**⚠️ IMPORTANT:** Keep this terminal window open! Don't close it.

---

### Step 3: Open the Website
**Option A - Simple (Recommended):**
1. Open Finder
2. Go to: `Desktop` → `expense tracker` → `healthcare-app`
3. Double-click `index.html`
4. It opens in your browser automatically

**Option B - Using Local Server:**
1. Open a **NEW** Terminal window (keep the first one running)
2. Copy and paste:
```bash
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app"
python3 -m http.server 8000
```
3. Open browser and go to: `http://localhost:8000`

---

## ✅ Verify It's Working

1. **Check Backend:** Open `http://localhost:3000/health` in browser
   - Should see: `{"status":"ok","message":"Healthcare API is running"}`

2. **Check Website:** You should see "Smart Healthcare" homepage

---

## 🎯 Test the Website

1. Click **"Start Symptom Check"** button
2. Select symptoms (check boxes for Fever, Cough, etc.)
3. Click **"Next"** button
4. Set severity levels (Mild/Moderate/Severe)
5. Click **"Analyze Symptoms"** button
6. View condition results
7. Click **"Find Doctors"** on any condition
8. Browse doctors and click **"Book Appointment"**
9. Fill in your details and confirm booking

---

## 🛑 To Stop the Server

Go back to the Terminal where the server is running and press:
```
Ctrl + C
```

---

## ❌ Troubleshooting

### Problem: "npm: command not found"
**Fix:** Install Node.js from https://nodejs.org/ (download and install)

### Problem: "Port 3000 already in use"
**Fix:** 
1. Close other programs using port 3000
2. Or change port in `backend/server.js` (line 10) to `3001`

### Problem: Website shows "Failed to fetch" or errors
**Fix:**
1. Make sure backend is running (Step 2)
2. Check Terminal shows the server message
3. Try refreshing the browser page

### Problem: No symptoms/doctors showing
**Fix:**
1. Check backend Terminal for error messages
2. Press F12 in browser → Check "Console" tab for errors
3. Make sure backend is running at `http://localhost:3000`

---

## 📝 Summary

**Two Terminal Commands:**
```bash
# Terminal 1: Start backend
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app/backend"
npm start

# Terminal 2 (optional): Start local server
cd "/Users/edrikbeno/Desktop/expense tracker/healthcare-app"
python3 -m http.server 8000
```

**Then:** Open `index.html` in your browser!

---

That's it! 🎉 Your healthcare appointment system is now running!
