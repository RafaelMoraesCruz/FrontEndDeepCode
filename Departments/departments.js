const table = document.getElementById("department")
const resultContainer =  document.getElementById('departmentsList')

async function showAllDepartments(){
    const response = await fetch("http://localhost:8080/departments")
    if(response.ok){
        const departments = await response.json();
        if(departments.length > 0){
            table.removeAttribute("hidden")
        }
        departments.forEach((department) => {
            createRow(department);
        });
    }
}



function createRow({id,name} ){
    const row = document.createElement("tr")
    const idColumn = document.createElement("th")
    const nameColumn = document.createElement("td")

    row.setAttribute("class","department-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    nameColumn.textContent = name

    row.appendChild(idColumn)
    row.appendChild(nameColumn)

    resultContainer.appendChild(row)
}

showAllDepartments()