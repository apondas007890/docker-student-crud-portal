const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// Pull the port and Database URL directly from the Docker environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- MIDDLEWARE ---
app.use(cors()); // Allows your frontend container (port 8080) to talk securely with this backend (port 5000)
app.use(express.json()); // Tells Express to parse incoming JSON payloads automatically

// --- MONGOOSE DATABASE CONNECTION ---
// We use a recursive function to retry connections just in case the database container takes a moment longer to boot up
const connectWithRetry = () => {
    console.log('Attempting MongoDB connection...');
    mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB inside Docker!'))
    .catch(err => {
        console.error('MongoDB connection failed, retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

// --- DATABASE SCHEMA & MODEL ---
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true }
});
const Student = mongoose.model('Student', studentSchema);

// --- REST API ENDPOINTS (CRUD) ---

// 1. CREATE: Add a new student
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. READ: Get all students OR search by ID/Name via query parameters
app.get('/api/students', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        
        // If a search query is present, check if it matches either the Student ID or Name (case-insensitive)
        if (search) {
            query = {
                $or: [
                    { studentId: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. UPDATE: Edit a student's profile via their internal database ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. DELETE: Remove a student from the system
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Backend Server running smoothly on port ${PORT}`);
});