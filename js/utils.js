function loadComponent(file, elementId) {
  fetch(file)
    .then(res => res.text())
    .then(html => document.getElementById(elementId).innerHTML = html);
}

function loadStudents() {
  fetch('data/students.json')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('student-list');
      data.forEach(student => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${student.name}</h3><p>Reg No: ${student.reg}</p>`;
        list.appendChild(div);
      });
    });
}
export function validateForm(student) {
  const errors = [];

  if (!student.regNo.trim()) errors.push("Registration number is required.");
  if (!student.fullName.trim()) errors.push("Full name is required.");
  if (!student.department.trim()) errors.push("Department is required.");
  if (!student.gpa || isNaN(student.gpa) || student.gpa < 0 || student.gpa > 5) errors.push("GPA must be a number between 0 and 5.");
  if (!student.photo.trim()) errors.push("Photo URL is required.");

  return errors;
}
