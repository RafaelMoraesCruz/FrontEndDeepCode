const table = document.getElementById("professor")
const resultContainer =  document.getElementById('professorsList')
const inputName = document.getElementById("input-name")
const inputCPF = document.getElementById("input-cpf")
const inputDepartmentId = document.getElementById("departmentIdC")
const btnSalvar = document.getElementById("btn-create-professor")
const inputNameUpdate = document.getElementById("input-name-update")
const inputCpfUpdate = document.getElementById("input-cpf-update")
const inputDepartmentUpdate = document.getElementById("departmentIdUpdate")

let actualId = 0

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

document.addEventListener("keypress", function (tecla){
    if(tecla.which == 13){
        searchProfessors()
    }
})

async function searchProfessors(){
    resultContainer.innerHTML = ''
    const professorNameForSearch = document.getElementById('professorNameForSearch')
    const response = await fetch("http://localhost:8080/professors?name="+professorNameForSearch.value)
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
    var name = inputName.value.trim();
    name = verifyNameSize(name);
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

async function updateProfessor(){
    var name = inputNameUpdate.value.trim();
    name = verifyNameSize(name);
    const cpf = inputCpfUpdate.value.trim();
    cpf
    const department = inputDepartmentUpdate.value
    if (name){
        const response = await fetch("http://localhost:8080/professors/"+actualId,
        {method:"PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            cpf: cpf,
            departmentId: department,
            name: name
        })},)
    }
    window.location.reload();
}

async function openUpdateModal(id,name,cpf,department){
    actualId = id
    inputNameUpdate.value = name
    inputCpfUpdate.value = cpf
    showAllDepartments(department)
    // inputDepartmentUpdate.value = department.id
    // inputDepartmentUpdate.textContent = department.name
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

    btnDelete = createBtnDelete()
    btnDelete.addEventListener("click", () => remover(id,name,row))

    btnEdit = createBtnEdit()
    btnEdit.addEventListener("click", () => openUpdateModal(id,name,cpf,department))

    acoesColumn.setAttribute("class", "acoes-column")
    acoesColumn.appendChild(btnDelete)
    acoesColumn.appendChild(btnEdit)

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

async function showAllDepartments(selectedDepartment){
    inputDepartmentId.innerHTML = ''
    inputDepartmentUpdate.innerHTML= ''
    const response = await fetch("http://localhost:8080/departments")
    if(response.ok){
        const departments = await response.json();
        departments.forEach((department) => {
            createDepartmentsSelectionCreateModal(department);
        })
        departments.forEach((department) => {
            createDepartmentsSelectionUpdateModal(department,selectedDepartment);
        })
    }
}

function createDepartmentsSelectionCreateModal({id, name}){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.textContent = name

    inputDepartmentId.appendChild(selection)
}

function createDepartmentsSelectionUpdateModal({id, name}, selectedDepartment){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.textContent = name
    if(id == selectedDepartment.id)
    {
        selection.setAttribute("selected", true)
    }
    

    inputDepartmentUpdate.appendChild(selection)
}

showAllProfessors()

function createBtnEdit(){
    const btnEdit = document.createElement("button")
    btnEdit.setAttribute('data-bs-toggle',"modal")
    btnEdit.setAttribute('data-bs-target',"#form-modal-update")
    btnEdit.classList.add("btn-info")
    btnEdit.innerHTML = '<img src="../IMAGES/edit.svg"></img>';
    return btnEdit
}

function createBtnDelete(){
    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    return btnDelete
}

function verifyNameSize(name){
    name = name.trim()
    if(name.length <= 2) {
        alert("name is too short, not saved")
    } else{
        return name
    }
}

function fMasc(objeto,mascara) {
obj=objeto
masc=mascara
setTimeout("fMascEx()",1)
}

function fMascEx() {
obj.value=masc(obj.value)
}

function mCPF(cpf){
cpf=cpf.replace(/\D/g,"")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
return cpf
}