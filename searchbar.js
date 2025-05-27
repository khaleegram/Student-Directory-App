// Sample student data
const students = [
    { name: "John Doe", age: 20 },
    { name: "Jane Doe", age: 22 },
    { name: "Bob Smith", age: 21 },
    { name: "Alice Johnson", age: 20 },
];

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");
const studentList = document.getElementById("student-list");

// Function to render student list
function renderStudentList(students) {
    studentList.innerHTML = "";
    students.forEach((student) => {
        const li = document.createElement("li");
        li.textContent = student.name;
        studentList.appendChild(li);
    });
}

// Render initial student list
renderStudentList(students);

// Search function
function searchStudents(query) {
    const filteredStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(query.toLowerCase());
    });
    renderStudentList(filteredStudents);
}

// Search button click event
searchBtn.addEventListener("click", () => {
    const query = searchBar.value.trim();
    if (query) {
        searchStudents(query);
    } else {
        renderStudentList(students);
    }
});

// Search bar input event (optional)
searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim();
    searchStudents(query);
});
