// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Global State
let selectedSymptoms = [];
let currentCondition = null;
let currentDoctor = null;
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadSymptoms();
    setupNavigation();
    setMinDate();
    loadDashboard();
});

// Navigation
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        const navLink = document.querySelector(`[href="#${sectionId}"]`);
        if (navLink) navLink.classList.add('active');
    }
}

// Load Symptoms
async function loadSymptoms() {
    try {
        const response = await fetch(`${API_BASE_URL}/symptoms`);
        const data = await response.json();
        
        if (data.success) {
            window.allSymptoms = data.data;
            renderSymptoms(data.data);
        }
    } catch (error) {
        console.error('Error loading symptoms:', error);
        // Fallback to default symptoms if API fails
        window.allSymptoms = getDefaultSymptoms();
        renderSymptoms(window.allSymptoms);
    }
}

function getDefaultSymptoms() {
    return [
        { id: 1, name: 'Fever', category: 'general' },
        { id: 2, name: 'Cough', category: 'respiratory' },
        { id: 3, name: 'Headache', category: 'neurological' },
        { id: 4, name: 'Sore Throat', category: 'respiratory' },
        { id: 5, name: 'Runny Nose', category: 'respiratory' },
        { id: 6, name: 'Fatigue', category: 'general' },
        { id: 7, name: 'Chest Pain', category: 'cardiovascular' },
        { id: 8, name: 'Shortness of Breath', category: 'respiratory' },
        { id: 9, name: 'Nausea', category: 'general' },
        { id: 10, name: 'Dizziness', category: 'neurological' }
    ];
}

function renderSymptoms(symptoms, category = 'all') {
    const symptomList = document.getElementById('symptom-list');
    symptomList.innerHTML = '';
    
    const filteredSymptoms = category === 'all' 
        ? symptoms 
        : symptoms.filter(s => s.category === category);
    
    filteredSymptoms.forEach(symptom => {
        const symptomItem = document.createElement('div');
        symptomItem.className = 'symptom-item';
        const isChecked = selectedSymptoms.some(s => s.symptomId === symptom.id);
        symptomItem.innerHTML = `
            <input type="checkbox" id="symptom-${symptom.id}" 
                   ${isChecked ? 'checked' : ''}
                   onchange="toggleSymptom(${symptom.id}, '${symptom.name}')">
            <label for="symptom-${symptom.id}">${symptom.name}</label>
        `;
        symptomList.appendChild(symptomItem);
    });
    
    // Update Next button after rendering
    updateNextButton();
}

// Category Filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        renderSymptoms(window.allSymptoms || getDefaultSymptoms(), category);
    });
});

// Toggle Symptom
function toggleSymptom(id, name) {
    const checkbox = document.getElementById(`symptom-${id}`);
    const index = selectedSymptoms.findIndex(s => s.symptomId === id);
    
    if (checkbox.checked) {
        if (index === -1) {
            selectedSymptoms.push({
                symptomId: id,
                name: name,
                severity: 'moderate',
                duration: ''
            });
        }
    } else {
        if (index !== -1) {
            selectedSymptoms.splice(index, 1);
        }
    }
    
    // Show/hide Next button based on selection
    updateNextButton();
}

// Update Next button visibility
function updateNextButton() {
    const nextBtn = document.getElementById('next-btn');
    const hint = document.getElementById('select-symptom-hint');
    
    if (nextBtn && hint) {
        if (selectedSymptoms.length > 0) {
            nextBtn.style.display = 'inline-block';
            hint.style.display = 'none';
        } else {
            nextBtn.style.display = 'none';
            hint.style.display = 'block';
        }
    }
}

function updateSelectedSymptomsDisplay() {
    const container = document.getElementById('selected-symptoms');
    container.innerHTML = '';
    
    if (selectedSymptoms.length === 0) {
        container.innerHTML = '<p>No symptoms selected. Please go back and select symptoms.</p>';
        return;
    }
    
    selectedSymptoms.forEach((symptom, index) => {
        const card = document.createElement('div');
        card.className = 'selected-symptom-card';
        card.innerHTML = `
            <h4>${symptom.name}</h4>
            <div class="form-row">
                <div class="form-group">
                    <label>Severity</label>
                    <select onchange="updateSymptomDetail(${index}, 'severity', this.value)">
                        <option value="mild" ${symptom.severity === 'mild' ? 'selected' : ''}>Mild</option>
                        <option value="moderate" ${symptom.severity === 'moderate' ? 'selected' : ''}>Moderate</option>
                        <option value="severe" ${symptom.severity === 'severe' ? 'selected' : ''}>Severe</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" placeholder="e.g., 3 days" 
                           value="${symptom.duration}"
                           onchange="updateSymptomDetail(${index}, 'duration', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateSymptomDetail(index, field, value) {
    if (selectedSymptoms[index]) {
        selectedSymptoms[index][field] = value;
    }
}

// Steps Navigation
function goToStep(stepNumber) {
    document.getElementById('step1').classList.toggle('hidden', stepNumber !== 1);
    document.getElementById('step2').classList.toggle('hidden', stepNumber !== 2);
    
    if (stepNumber === 2) {
        if (selectedSymptoms.length === 0) {
            alert('Please select at least one symptom first');
            document.getElementById('step1').classList.remove('hidden');
            document.getElementById('step2').classList.add('hidden');
            return;
        }
        updateSelectedSymptomsDisplay();
    }
    
    // Update Next button when on step 1
    if (stepNumber === 1) {
        updateNextButton();
    }
}

// Analyze Symptoms
async function analyzeSymptoms() {
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom');
        return;
    }
    
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('results').classList.add('hidden');
    
    try {
        const response = await fetch(`${API_BASE_URL}/symptoms/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: selectedSymptoms })
        });
        
        const data = await response.json();
        
        document.getElementById('loading').classList.add('hidden');
        
        if (data.success && data.data.matches.length > 0) {
            displayResults(data.data.matches);
        } else {
            alert('No conditions found. Please consult a general practitioner.');
            resetChecker();
        }
    } catch (error) {
        console.error('Error analyzing symptoms:', error);
        // Fallback to mock results
        const mockResults = getMockResults();
        document.getElementById('loading').classList.add('hidden');
        displayResults(mockResults);
    }
}

function getMockResults() {
    // Mock results for demonstration
    return [
        {
            conditionId: 1,
            conditionName: 'Common Cold',
            confidence: 0.85,
            specialistType: 'General Practitioner',
            urgencyLevel: 'low'
        },
        {
            conditionId: 2,
            conditionName: 'Influenza',
            confidence: 0.72,
            specialistType: 'General Practitioner',
            urgencyLevel: 'medium'
        }
    ];
}

function displayResults(matches) {
    const resultsDiv = document.getElementById('results');
    const conditionsList = document.getElementById('conditions-list');
    conditionsList.innerHTML = '';
    
    matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'condition-card';
        card.onclick = () => selectCondition(match);
        card.innerHTML = `
            <h4>${match.conditionName}</h4>
            <p>Recommended: ${match.specialistType}</p>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${match.confidence * 100}%"></div>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Confidence: ${(match.confidence * 100).toFixed(1)}%
            </p>
            <button class="btn-primary" style="margin-top: 1rem;" 
                    onclick="event.stopPropagation(); selectCondition(${JSON.stringify(match).replace(/"/g, '&quot;')})">
                Find Doctors
            </button>
        `;
        conditionsList.appendChild(card);
    });
    
    resultsDiv.classList.remove('hidden');
}

function selectCondition(condition) {
    currentCondition = condition;
    document.getElementById('selected-condition-name').textContent = condition.conditionName;
    loadDoctors(condition.conditionId);
    showSection('doctor-selection');
}

// Load Doctors
async function loadDoctors(conditionId, city = '') {
    try {
        let url = `${API_BASE_URL}/doctors/suggest?condition_id=${conditionId}`;
        if (city) url += `&city=${city}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayDoctors(data.data.doctors);
        }
    } catch (error) {
        console.error('Error loading doctors:', error);
        // Fallback to mock doctors
        displayDoctors(getMockDoctors());
    }
}

function getMockDoctors() {
    return [
        {
            id: 1,
            name: 'Dr. John Smith',
            specialization: 'General Practitioner',
            rating: 4.8,
            totalReviews: 150,
            clinicName: 'City Health Clinic',
            clinicAddress: '123 Main St',
            city: 'New York',
            consultationFee: 150.00,
            availableDates: [
                { date: getTomorrow(), timeSlots: [{ start: '09:00', end: '10:00' }, { start: '14:00', end: '15:00' }] },
                { date: getDayAfterTomorrow(), timeSlots: [{ start: '10:00', end: '11:00' }, { start: '15:00', end: '16:00' }] }
            ]
        },
        {
            id: 2,
            name: 'Dr. Sarah Johnson',
            specialization: 'General Practitioner',
            rating: 4.9,
            totalReviews: 200,
            clinicName: 'Downtown Medical Center',
            clinicAddress: '456 Oak Ave',
            city: 'New York',
            consultationFee: 175.00,
            availableDates: [
                { date: getTomorrow(), timeSlots: [{ start: '11:00', end: '12:00' }, { start: '16:00', end: '17:00' }] }
            ]
        }
    ];
}

function displayDoctors(doctors) {
    const doctorsList = document.getElementById('doctors-list');
    doctorsList.innerHTML = '';
    
    if (doctors.length === 0) {
        doctorsList.innerHTML = '<p class="empty-state">No doctors available for this condition.</p>';
        return;
    }
    
    doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <div class="doctor-info">
                <h3>${doctor.name}</h3>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                <p><strong>Location:</strong> ${doctor.clinicName}, ${doctor.city}</p>
                <p><strong>Rating:</strong> <span class="rating">⭐ ${doctor.rating}</span> (${doctor.totalReviews} reviews)</p>
                <p><strong>Fee:</strong> $${doctor.consultationFee}</p>
            </div>
            <div class="doctor-actions">
                <button class="btn-primary" onclick="selectDoctor(${JSON.stringify(doctor).replace(/"/g, '&quot;')})">
                    Book Appointment
                </button>
            </div>
        `;
        doctorsList.appendChild(card);
    });
}

function filterDoctors() {
    const city = document.getElementById('city-filter').value;
    if (currentCondition) {
        loadDoctors(currentCondition.conditionId, city);
    }
}

function selectDoctor(doctor) {
    currentDoctor = doctor;
    document.getElementById('booking-doctor-name').textContent = doctor.name;
    document.getElementById('booking-doctor-specialization').textContent = doctor.specialization;
    document.getElementById('booking-doctor-location').textContent = `${doctor.clinicName}, ${doctor.city}`;
    
    loadTimeSlots(doctor);
    showSection('booking');
}

function loadTimeSlots(doctor) {
    const timeSlotsDiv = document.getElementById('time-slots');
    timeSlotsDiv.innerHTML = '';
    
    if (doctor.availableDates && doctor.availableDates.length > 0) {
        const selectedDate = document.getElementById('appointment-date').value || doctor.availableDates[0].date;
        const dateObj = doctor.availableDates.find(d => d.date === selectedDate);
        
        if (dateObj && dateObj.timeSlots) {
            dateObj.timeSlots.forEach(slot => {
                const slotBtn = document.createElement('button');
                slotBtn.className = 'time-slot';
                slotBtn.textContent = slot.start;
                slotBtn.onclick = () => {
                    document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                    slotBtn.classList.add('selected');
                };
                timeSlotsDiv.appendChild(slotBtn);
            });
        }
    }
}

document.getElementById('appointment-date').addEventListener('change', function() {
    if (currentDoctor) {
        loadTimeSlots(currentDoctor);
    }
});

function setMinDate() {
    const dateInput = document.getElementById('appointment-date');
    const tomorrow = getTomorrow();
    dateInput.setAttribute('min', tomorrow);
    dateInput.value = tomorrow;
}

function getTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

function getDayAfterTomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0];
}

// Book Appointment
async function bookAppointment() {
    const date = document.getElementById('appointment-date').value;
    const selectedSlot = document.querySelector('.time-slot.selected');
    const name = document.getElementById('patient-name').value;
    const email = document.getElementById('patient-email').value;
    const phone = document.getElementById('patient-phone').value;
    
    if (!date || !selectedSlot || !name || !email || !phone) {
        alert('Please fill in all fields and select a time slot');
        return;
    }
    
    const time = selectedSlot.textContent;
    
    try {
        const response = await fetch(`${API_BASE_URL}/appointments/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctor_id: currentDoctor.id,
                date: date,
                time: time,
                patient_name: name,
                patient_email: email,
                patient_phone: phone,
                condition_id: currentCondition.conditionId,
                symptoms: selectedSymptoms
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const appointment = {
                id: data.data.appointment_id || Date.now(),
                doctor: currentDoctor.name,
                specialization: currentDoctor.specialization,
                date: date,
                time: time,
                condition: currentCondition.conditionName,
                patient_name: name,
                patient_email: email,
                patient_phone: phone,
                status: 'scheduled',
                confirmation_code: data.data.confirmation_code || `APT-${Date.now()}`
            };
            
            appointments.push(appointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            showConfirmation(appointment);
        } else {
            alert('Failed to book appointment. Please try again.');
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        // Fallback: create local appointment
        const appointment = {
            id: Date.now(),
            doctor: currentDoctor.name,
            specialization: currentDoctor.specialization,
            date: date,
            time: time,
            condition: currentCondition.conditionName,
            patient_name: name,
            patient_email: email,
            patient_phone: phone,
            status: 'scheduled',
            confirmation_code: `APT-${Date.now()}`
        };
        
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        showConfirmation(appointment);
    }
}

function showConfirmation(appointment) {
    const detailsDiv = document.getElementById('confirmation-details');
    detailsDiv.innerHTML = `
        <p><strong>Confirmation Code:</strong> ${appointment.confirmation_code}</p>
        <p><strong>Doctor:</strong> ${appointment.doctor}</p>
        <p><strong>Specialization:</strong> ${appointment.specialization}</p>
        <p><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.time}</p>
        <p><strong>Condition:</strong> ${appointment.condition}</p>
    `;
    
    showSection('confirmation');
}

// Dashboard
function loadDashboard() {
    const upcoming = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate >= new Date() && apt.status === 'scheduled';
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const history = appointments.filter(apt => {
        const aptDate = new Date(apt.date);
        return aptDate < new Date() || apt.status !== 'scheduled';
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    displayUpcomingAppointments(upcoming);
    displayAppointmentHistory(history);
}

function displayUpcomingAppointments(appointments) {
    const container = document.getElementById('upcoming-appointments');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p class="empty-state">No upcoming appointments</p>';
        return;
    }
    
    container.innerHTML = '';
    appointments.forEach(apt => {
        const item = document.createElement('div');
        item.className = 'appointment-item';
        item.innerHTML = `
            <h4>${apt.doctor}</h4>
            <p><strong>Date:</strong> ${new Date(apt.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${apt.time}</p>
            <p><strong>Condition:</strong> ${apt.condition}</p>
            <p><strong>Confirmation:</strong> ${apt.confirmation_code}</p>
        `;
        container.appendChild(item);
    });
}

function displayAppointmentHistory(appointments) {
    const container = document.getElementById('appointment-history');
    
    if (appointments.length === 0) {
        container.innerHTML = '<p class="empty-state">No appointment history</p>';
        return;
    }
    
    container.innerHTML = '';
    appointments.forEach(apt => {
        const item = document.createElement('div');
        item.className = 'appointment-item';
        item.innerHTML = `
            <h4>${apt.doctor}</h4>
            <p><strong>Date:</strong> ${new Date(apt.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${apt.time}</p>
            <p><strong>Condition:</strong> ${apt.condition}</p>
            <p><strong>Status:</strong> ${apt.status}</p>
        `;
        container.appendChild(item);
    });
}

// Reset Functions
function resetChecker() {
    selectedSymptoms = [];
    currentCondition = null;
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
    document.getElementById('loading').classList.add('hidden');
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateNextButton();
    showSection('check-symptoms');
}

function resetApp() {
    resetChecker();
    currentDoctor = null;
    document.getElementById('patient-name').value = '';
    document.getElementById('patient-email').value = '';
    document.getElementById('patient-phone').value = '';
    showSection('home');
}
