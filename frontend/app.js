// Point directly to the port exposed by our backend Docker container
const API_URL = 'http://localhost:5000/api/students';

// --- ELEMENT SELECTORS ---
const studentForm = document.getElementById('student-form');
const mongoIdInput = document.getElementById('mongo-id');
const studentIdInput = document.getElementById('studentId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const departmentInput = document.getElementById('department');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const searchInput = document.getElementById('search-input');
const studentsList = document.getElementById('students-list');
const studentCount = document.getElementById('student-count');

// --- READ OPERATIONS (FETCH ALL / SEARCH) ---
async function loadStudents(searchTerm = '') {
    try {
        // Fetch matching results from Docker backend container
        const response = await fetch(`${API_URL}?search=${encodeURIComponent(searchTerm)}`);
        const students = await response.json();
        
        studentCount.innerText = `${students.length} Registered`;
        studentsList.innerHTML = ''; // Wipe out existing list cards

        if(students.length === 0) {
            studentsList.innerHTML = `
                <div class="p-8 text-center text-slate-400 text-sm">
                    No active student profiles match the current registry query.
                </div>`;
            return;
        }

        // Build and append individual design cards for every student record
        students.forEach(student => {
            const row = document.createElement('div');
            row.className = "p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-slate-50 transition gap-4";
            row.innerHTML = `
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200">
                        ${student.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-base">${student.name}</h4>
                        <p class="text-xs font-semibold text-amber-600 tracking-wider mb-0.5">${student.studentId}</p>
                        <p class="text-xs text-slate-500">${student.email} • <span class="italic text-slate-400">${student.department}</span></p>
                    </div>
                </div>
                <div class="flex gap-2 w-full sm:w-auto justify-end border-t sm:border-none pt-3 sm:pt-0">
                    <button onclick="editSetup('${student._id}', '${student.studentId}', '${student.name}', '${student.email}', '${student.department}')" class="text-xs font-medium border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg transition">Edit</button>
                    <button onclick="deleteStudent('${student._id}')" class="text-xs font-medium border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition">Remove</button>
                </div>
            `;
            studentsList.appendChild(row);
        });
    } catch (error) {
        console.error('Error contacting application server:', error);
    }
}

// --- CREATE & UPDATE OPERATIONS ---
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop standard browser page refresh

    const studentData = {
        studentId: studentIdInput.value,
        name: nameInput.value,
        email: emailInput.value,
        department: departmentInput.value
    };

    const id = mongoIdInput.value;
    let url = API_URL;
    let method = 'POST'; // Default behavior: Create Student

    if (id) {
        // If an ID exists, dynamically shift the request to an Update configuration
        url = `${API_URL}/${id}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            resetForm();
            loadStudents();
        } else {
            const err = await response.json();
            alert(`Operation Failed: ${err.message}`);
        }
    } catch (error) {
        console.error('Operation error:', error);
    }
});

// --- SET UP EDIT MODE IN UI ---
window.editSetup = function(id, studentId, name, email, department) {
    mongoIdInput.value = id;
    studentIdInput.value = studentId;
    nameInput.value = name;
    emailInput.value = email;
    departmentInput.value = department;

    formTitle.innerHTML = `<span class="w-2 h-5 bg-blue-500 rounded-full"></span> Modify Student File`;
    submitBtn.innerText = 'Update Profile';
    submitBtn.className = "flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-sm";
    cancelBtn.classList.remove('hidden');
};

// --- DELETE OPERATIONS ---
window.deleteStudent = async function(id) {
    if (confirm('Are you certain you wish to completely remove this student file from institutional logs?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            loadStudents();
        } catch (error) {
            console.error('Deletion error:', error);
        }
    }
};

// --- EVENTS & COMPONENT STATE RESETS ---
cancelBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', (e) => loadStudents(e.target.value));

function resetForm() {
    mongoIdInput.value = '';
    studentForm.reset();
    formTitle.innerHTML = `<span class="w-2 h-5 bg-amber-500 rounded-full"></span> Register New Student`;
    submitBtn.innerText = 'Save Student Profile';
    submitBtn.className = "flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl transition shadow-sm";
    cancelBtn.classList.add('hidden');
}

// Pull initial system database load upon boot
loadStudents();