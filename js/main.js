import { validateForm } from './utils.js';

window.onload = function () {
  loadComponent('components/navbar.html', 'navbar');
  loadComponent('components/footer.html', 'footer');
  loadStudents();
};
// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Collect data from form fields
    const student = {
  regNo: document.getElementById("regNo").value,
  fullName: document.getElementById("fullName").value,
  department: document.getElementById("department").value,
  gpa: parseFloat(document.getElementById("gpa").value),
  photo: document.getElementById("photo").value,
};

const errors = validateForm(student);

if (errors.length > 0) {
  alert("Form Errors:\n" + errors.join("\n"));
  return;
}

      // Save to localStorage (simulate storing in students.json)
      let students = JSON.parse(localStorage.getItem("students")) || [];
      students.push(student);
      localStorage.setItem("students", JSON.stringify(students));

      // Optionally clear form or show message
      form.reset();
      alert("Student data saved successfully!");
    });
  }
});
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');
let uploadedPhotoBase64 = "";

photoInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedPhotoBase64 = e.target.result;
      photoPreview.src = uploadedPhotoBase64;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});


function searchStudents() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const tableBody = document.getElementById("student-table-body");
  const students = JSON.parse(localStorage.getItem("students")) || [];

  tableBody.innerHTML = "";

  const filtered = students.filter(student =>
    student.fullName.toLowerCase().includes(query)
  );

  filtered.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.regNo}</td>
      <td>${student.fullName}</td>
      <td>${student.department}</td>
      <td>${student.gpa.toFixed(2)}</td>
      <td><img src="${student.photo}" alt="Photo" width="50" /></td>
    `;
    tableBody.appendChild(row);
  });
}

function filterByDepartment() {
  const selectedDept = document.getElementById("department-filter").value;
  const query = document.getElementById("search-bar").value.toLowerCase();
  const tableBody = document.getElementById("student-table-body");
  const students = JSON.parse(localStorage.getItem("students")) || [];

  tableBody.innerHTML = "";

  const filtered = students.filter(student => {
    const matchesDept = selectedDept === "" || student.department === selectedDept;
    const matchesSearch = student.fullName.toLowerCase().includes(query);
    return matchesDept && matchesSearch;
  });

  filtered.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.regNo}</td>
      <td>${student.fullName}</td>
      <td>${student.department}</td>
      <td>${student.gpa.toFixed(2)}</td>
      <td><img src="${student.photo}" alt="Photo" width="50" /></td>
    `;
    tableBody.appendChild(row);
  });
}
const gpaHeader = document.getElementById('gpaHeader');
let isAscending = true; // Track the sort order

gpaHeader.addEventListener('click', function () {
  sortTableByGPA(isAscending);
  isAscending = !isAscending; // Toggle sorting order after each click
});

function sortTableByGPA(ascending) {
  const rows = Array.from(document.querySelectorAll('table tbody tr'));
  
  // Sort rows by GPA
  rows.sort((rowA, rowB) => {
    const gpaA = parseFloat(rowA.querySelector('.gpa').textContent);
    const gpaB = parseFloat(rowB.querySelector('.gpa').textContent);
    
    return ascending ? gpaA - gpaB : gpaB - gpaA;
  });

  // Append rows in sorted order
  const tbody = document.querySelector('table tbody');
  rows.forEach(row => tbody.appendChild(row));
}
