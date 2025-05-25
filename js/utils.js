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
