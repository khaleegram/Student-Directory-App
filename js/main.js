window.onload = function () {
  loadComponent('components/navbar.html', 'navbar');
  loadComponent('components/footer.html', 'footer');
  loadStudents();
};
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

