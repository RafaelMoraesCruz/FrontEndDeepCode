const table = document.getElementById("department")
const resultContainer =  document.getElementById('departmentsList')

const inputName = document.getElementById("input-name")
const btnSalvar = document.getElementById("btn-create-department")
const inputNameUpdate = document.getElementById('input-name-update')

let actualId = 0

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

document.addEventListener("keypress", function (tecla){
    if(tecla.which == 13){
        findByNameContainning()
    }
})

async function findByNameContainning(){
    resultContainer.innerHTML = ''
    const departmentNameForSearch = document.getElementById('departmentNameForSearch').value
    const response = await fetch('http://localhost:8080/departments?name='+departmentNameForSearch)
    if(response.ok){
        const departments = await response.json();
        departments.forEach((department) => {
            createRow(department);
        });
    }
}

async function addDepartment(){
    var name = inputName.value.trim();
    name = verifyName(name)
    if (name){
        const response = await fetch("http://localhost:8080/departments", 
        {method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })})
        verifyResponseDepartment(response)
    }
    window.location.reload();
}

async function updateDepartment(){
    var name = inputNameUpdate.value.trim();
    name = verifyName(name)
    if (name){
        const response = await fetch("http://localhost:8080/departments/"+actualId,
        {method:"PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })},)
        verifyResponseDepartment(response)
    }
    window.location.reload()
}

function openUpdateModal(id,name){
    actualId = id
    inputNameUpdate.value = name
}

async function remover(id,name, row){
    const result = confirm("Você deseja remover o curso de" +name + "?")
    if (result){
        const response = await fetch("http://localhost:8080/departments"+"/"+id, {method:"DELETE"})
        if (response.status == 204){
            resultContainer.removeChild(row)
            alert("Department" + name + " sucessfuly removed!")
            window.location.reload();
        } else if (response.status == 400){
            alert("Professor in department, please delete the professor first!!")
        }
    }
}

async function removeAllDepartments(){
    const result = confirm("Are you sure, you want to REMOVE ALL departments?")
    if (result){
        const response = await fetch("http://localhost:8080/departments"+actualId, {method:"DELETE"})
        if (response.ok){
            resultContainer.innerHTML = ""
            window.location.reload();
        }
    }
}

function createRow({id,name} ){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const nameColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = createBtnDelete(id,name,row)
    const btnEdit = createBtnEdit(id,name)

    row.setAttribute("class","department-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    nameColumn.textContent = name

    acoesColumn.setAttribute("class", "acoes-column")
    acoesColumn.appendChild(btnDelete)
    acoesColumn.appendChild(btnEdit)

    row.appendChild(idColumn)
    row.appendChild(nameColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}



function createBtnDelete(id,name,row){
    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,name,row))
    return btnDelete
}

function createBtnEdit(id,name){
    const btnEdit = document.createElement("button")
    btnEdit.setAttribute('data-bs-toggle',"modal")
    btnEdit.setAttribute('data-bs-target',"#form-modal-update")
    btnEdit.classList.add("btn-info")
    btnEdit.innerHTML = '<img src="../IMAGES/edit.svg"></img>';
    btnEdit.addEventListener("click", () => openUpdateModal(id,name))
    return btnEdit
}

function verifyName(name){
    name = name.trim()
    if(name == '' | name.length <= 2){
        alert('Name is too short')
    } else{
        return name
    }
}

function verifyResponseDepartment(response){
    if (response.status == 201){
    alert("Success")
} else if (response.status == 400){
    alert("Name is invalid")
}
}

showAllDepartments()