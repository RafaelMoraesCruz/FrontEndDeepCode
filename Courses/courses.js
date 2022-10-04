const course = document.getElementById("course")
const resultContainer =  document.getElementById('coursesList')

document.addEventListener("load", search)

function search() {
    if(course){
        fetch("http://localhost:8080/Courses")
        .then(response => response.json())
        .then(quotes => {
            const table = renderTable(quotes)
            resultContainer.innerHTML = table;
    
    })
    } else {
        showAll
    }}

function showAllCourses(){
    fetch("http://localhost:8080/Courses")
    .then(response => response.json())
    .then(quotes => {
        const table = renderTable(quotes)
        resultContainer.innerHTML = table;
    })
}



function renderTable( quotes ){
    let rows = quotes.map((quote) => {
        return `<tr class="course-row"><td>${quote.id}</td><td>${quote.name}</td></tr>`;
    });
    return `<div class="row">${rows.join("")}</div>`;
}