const table = document.getElementById("professor")
const resultContainer =  document.getElementById('professorsList')
const inputName = document.getElementById("input-name")
const inputCPF = document.getElementById("input-cpf")
const inputDepartmentId = document.getElementById("input-department")

const btnSalvar = document.getElementById("btn-create-department")

async function showAllProfessors(){
    const response = await fetch("http://localhost:8080/professors")
    if(response.ok){
        const professors = await response.json();
        if(professors.length > 0){
            table.removeAttribute("hidden")
        }
        professors.forEach((professor) => {
            createRow(professor);
        });
    }
}

async function addProfessor(){
    const name = inputName.value.trim();
    const cpf = inputCPF.value.trim();
    const departmentId = inputDepartmentId.value.trim();
    if (name){
        const response = await fetch("http://localhost:8080/professors", 
        {method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            cpf: cpf,
            departmentId: departmentId,
            name: name
        })},)
        if (response.ok){
            const department = await response.json();
            createRow(department)
            window.location.reload();
        }
    }
    window.location.reload();
}

async function remover(id,name, row){
    const result = confirm("Você deseja remover o professor: " +name)
    if (result){
        const response = await fetch("http://localhost:8080/professors"+"/"+id, {method:"DELETE"})
        if (response.ok){
            resultContainer.removeChild(row)
            window.location.reload();
        }
    }
}

async function removeAllProfessors(){
    const result = confirm("Are you sure, you want to REMOVE ALL professors?")
    if (result){
        const response = await fetch("http://localhost:8080/professors", {method:"DELETE"})
        if (response.ok){
            resultContainer.innerHTML = ""
            window.location.reload();
        }
    }
}

function createRow({id,name,cpf,department}){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const nameColumn = document.createElement("td")
    const cpfColumn = document.createElement("td")
    const departmentColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,name,row))
    acoesColumn.appendChild(btnDelete)

    row.setAttribute("class","professor-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    nameColumn.textContent = name
    cpfColumn.textContent = cpf
    departmentColumn.textContent = department.name

    row.appendChild(idColumn)
    row.appendChild(nameColumn)
    row.appendChild(cpfColumn)
    row.appendChild(departmentColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}

showAllProfessors()