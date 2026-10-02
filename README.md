# Smart Healthcare Appointment System

A complete web-based healthcare appointment system with symptom checker, rule-based AI condition matching, doctor suggestions, and appointment booking.

## Features

- 🔍 **Symptom Checker**: Interactive symptom selection with severity levels 
- 🤖 **Rule-Based AI**: Intelligent condition matching based on symptoms
- 👨‍⚕️ **Doctor Matching**: One can find the right specialist for your condition
- 📅 **Appointment Booking**: Real-time availability and booking system
- 📊 **Dashboard**: View your appointments and history

## Project Structure

```
healthcare-app/
├── index.html          # Frontend HTML
├── styles.css          # Frontend styling
├── app.js              # Frontend JavaScript
├── backend/
│   ├── server.js       # Express API server
│   ├── controllers/    # API controllers
│   ├── services/       # Business logic (rule engine)
│   └── data/           # Database layer
└── README.md           # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Backend Dependencies**

```bash
cd backend
npm install
```

2. **Start the Backend Server**

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The API server will run on `http://localhost:3000`

3. **Open the Frontend**

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## API Endpoints

### Symptoms
- `GET /api/symptoms` - Get all symptoms
- `POST /api/symptoms/analyze` - Analyze symptoms and get condition matches

### Conditions
- `GET /api/conditions` - Get all conditions
- `GET /api/conditions/by-symptoms` - Get conditions by symptoms

### Doctors
- `GET /api/doctors/suggest?condition_id=1&city=NewYork` - Get doctor suggestions
- `GET /api/doctors/:id/availability` - Get doctor availability

### Appointments
- `POST /api/appointments/book` - Book an appointment
- `GET /api/appointments?patient_email=user@example.com` - Get patient appointments
- `GET /api/appointments/availability?doctor_id=1&date=2026-01-27` - Check availability

## Usage

1. **Check Symptoms**
   - Navigate to "Check Symptoms"
   - Select your symptoms from the list
   - Click "Next" to add severity and duration
   - Click "Analyze Symptoms"

2. **View Results**
   - Review the suggested conditions with confidence scores
   - Click "Find Doctors" on a condition

3. **Select Doctor**
   - Browse recommended doctors
   - Filter by city if needed
   - Click "Book Appointment"

4. **Book Appointment**
   - Select a date and time slot
   - Enter your information
   - Confirm booking

5. **View Dashboard**
   - See upcoming appointments
   - View appointment history

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI Logic**: Custom rule-based engine
- **Storage**: LocalStorage (frontend), In-memory (backend)

## Data Model

### Symptoms
- Fever, Cough, Headache, Sore Throat, Runny Nose, Fatigue, Chest Pain, Shortness of Breath, Nausea, Dizziness

### Conditions
- Common Cold, Influenza, Migraine, Pneumonia, Bronchitis

### Doctors
- General Practitioners, Neurologists, Pulmonologists

## Rule Engine

The system uses a rule-based AI engine that:
- Maps symptoms to conditions using weighted scoring
- Considers symptom severity and combinations
- Returns top matches with confidence scores
- Handles required vs optional symptoms

## Development

### Adding New Symptoms

Edit `backend/data/database.js`:
```javascript
symptoms.push({
    id: 11,
    name: 'New Symptom',
    category: 'general',
    description: 'Description'
});
```

### Adding New Conditions

Edit `backend/data/database.js`:
```javascript
conditions.push({
    id: 6,
    name: 'New Condition',
    category: 'general',
    urgency_level: 'medium',
    specialist_type: 'General Practitioner'
});
```

### Adding Symptom-Condition Mappings

Edit `backend/data/database.js`:
```javascript
symptomConditionMappings.push({
    symptom_id: 1,
    condition_id: 6,
    weight: 0.5,
    required: false,
    severity_multiplier: { mild: 0.8, moderate: 1.0, severe: 1.2 }
});
```

## Production Deployment

For production, consider:
1. Replace in-memory database with PostgreSQL
2. Add authentication (JWT)
3. Implement proper error handling
4. Add input validation
5. Set up environment variables
6. Add logging
7. Implement rate limiting
8. Add HTTPS
9. Set up monitoring

## License

MIT

## Support

For issues or questions, please refer to the architecture documentation files in the parent directory.
