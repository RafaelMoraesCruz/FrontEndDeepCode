const department = document.getElementById("department")
const resultContainer =  document.getElementById('departmentsList')

document.addEventListener("load", search)

function search() {
    if(department){
        fetch("http://localhost:8080/departments")
        .then(response => response.json())
        .then(quotes => {
            const table = renderTable(quotes)
            resultContainer.innerHTML = table;
    
    })
    } else {
        showAll
    }}

function showAllDepartments(){
    fetch("http://localhost:8080/departments")
    .then(response => response.json())
    .then(quotes => {
        const table = renderTable(quotes)
        resultContainer.innerHTML = table;
    })
}



function renderTable( quotes ){
    let rows = quotes.map((quote) => {
        return `<tr class="department-row"><td>${quote.id}</td><td>${quote.name}</td></tr>`;
    });
    return `<div class="row">${rows.join("")}</div>`;
}