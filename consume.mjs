import fetch from 'node-fetch';
import readline from 'readline-sync';
import bcrypt from 'bcrypt';

// Function to authenticate user and obtain bearer token
async function login() {
    const username = readline.question('Enter your username: ');
    const password = readline.question('Enter your password: ', { hideEchoBack: true });

    try {
        // Send POST request to login route to obtain bearer token
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data.token;
    } catch (error) {
        console.error('Login failed:', error.message);
        process.exit(1);
    }
}

// Function to fetch all students
async function getAllStudents(token) {
    try {
        // Send GET request to get all students
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log('All students:', data);
    } catch (error) {
        console.error('Failed to fetch students:', error.message);
    }
}

// Function to create a new student
async function createStudent(token) {
    const inst_id = readline.question('Enter institute ID: ');
    const i_name = readline.question('Enter institute name: ');
    const name = readline.question('Enter student name: ');
    const reg_no = readline.question('Enter registration number: ');

    try {
        // Send POST request to create a new student
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ inst_id, i_name, name, reg_no })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log('Student created:', data);
    } catch (error) {
        console.error('Failed to create student:', error.message);
    }
}

// Function to update a student
async function updateStudent(token) {
    const id = readline.question('Enter student ID to update: ');
    const name = readline.question('Enter updated student name: ');

    try {
        // Send PUT request to update student
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log('Student updated:', data);
    } catch (error) {
        console.error('Failed to update student:', error.message);
    }
}

// Function to delete a student
async function deleteStudent(token) {
    const id = readline.question('Enter student ID to delete: ');

    try {
        // Send DELETE request to delete student
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log('Student deleted:', data);
    } catch (error) {
        console.error('Failed to delete student:', error.message);
    }
}

// Main function to execute the code
async function main() {
    const token = await login(); // Authenticate user and obtain bearer token
    console.log('Bearer token:', token);

    // Prompt user to select from available methods
    const methods = ['Get all students', 'Create a student', 'Update a student', 'Delete a student'];
    const index = readline.keyInSelect(methods, 'Select a method to perform: ');

    switch (index) {
        case 0:
            await getAllStudents(token);
            break;
        case 1:
            await createStudent(token);
            break;
        case 2:
            await updateStudent(token);
            break;
        case 3:
            await deleteStudent(token);
            break;
        default:
            console.log('No method selected');
    }
}

main();
