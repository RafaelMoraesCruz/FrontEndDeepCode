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

async function remover(id,name, row){
    const result = confirm("Você deseja remover o curso de" +name)
    if (result){
        const response = await fetch("http://localhost:8080/departments"+"/"+id, {method:"DELETE"})
        if (response.ok){
            resultContainer.removeChild(row)
            window.location.reload();
        }
    }
}



function createRow({id,name} ){
    const row = document.createElement("tr")
    const idColumn = document.createElement("th")
    const nameColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,name,row))

    row.setAttribute("class","department-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    nameColumn.textContent = name

    acoesColumn.appendChild(btnDelete)

    row.appendChild(idColumn)
    row.appendChild(nameColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}

showAllDepartments()