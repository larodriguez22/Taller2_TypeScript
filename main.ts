import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentsTbody: HTMLElement = document.getElementById('students')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentsInTable(students: Student[]): void {
  console.log('Desplegando estudiantes');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.direccion}</td>
                           <td>${student.telefono}</td>`;
    studentsTbody.appendChild(trElement);
  });
}

 

function applyFilterByName() { 
  let numero = inputSearchBox.value;
  numero = (numero == null) ? '' : numero;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(parseInt(numero), dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: number, courses: Course[]) {
  return nameKey === 0 ? dataCourses : courses.filter( c => 
    c.credits===nameKey);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}