const department = document.getElementById("department")
const resultContainer =  document.getElementById('departamentsList')

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

function showAll(){
    fetch("http://localhost:8080/departments")
    .then(response => response.json())
    .then(quotes => {
        const table = renderTable(quotes)
        resultContainer.innerHTML = table;
    })
}



function renderTable( quotes ){
    let rows = quotes.map((quote) => {
        return `<div class="col-lg-3 departments-cards">id: ${quote.id}<br>department: ${quote.name}</div>`;
    });
    return `<div class="row">${rows.join("")}</div>`;
}