const table = document.getElementById("course")
const resultContainer =  document.getElementById('coursesList')

const inputName = document.getElementById("input-name")
const btnSalvar = document.getElementById("btn-create-course")
inputNameUpdate = document.getElementById('input-name-update')

let actualId = 0



async function showAllcourses(){
    const response = await fetch("http://localhost:8080/courses")
    if(response.ok){
        const courses = await response.json();
        if(courses.length > 0){
            table.removeAttribute("hidden")
        }
        courses.forEach((course) => {
            createRow(course);
        });
    }
}


async function findByName(){
    resultContainer.innerHTML = ''
    const inputNameValue = document.getElementById('courseSearch').value
    const response = await fetch("http://localhost:8080/courses?name="+inputNameValue)
    if(response.ok){
        const courses = await response.json();
        courses.forEach((course) => {
            createRow(course);
        });
    }
}

document.addEventListener("keypress", function (tecla){
    if(tecla.which == 13){
        findByName()
    }
})


async function addCourse(){
    const name = inputName.value.trim();
    if (name){
        const response = await fetch("http://localhost:8080/courses", 
        {method:"POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })},)
        if (response.ok){
            const course = await response.json();
            createRow(course)
            window.location.reload();
        }
    }
    window.location.reload();
}

function createRow({id,name}){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const courseColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")
    
    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,name,row))
    
    const btnEdit = document.createElement("button")
    btnEdit.setAttribute('data-bs-toggle',"modal")
    btnEdit.setAttribute('data-bs-target',"#form-modal-update")
    btnEdit.classList.add("btn-info")
    btnEdit.innerHTML = '<img src="../IMAGES/edit.svg"></img>';
    btnEdit.addEventListener("click", () => openUpdateModal(id,name))
    
    row.setAttribute("class","course-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    courseColumn.textContent = name
    
    acoesColumn.setAttribute("class", "acoes-column")
    acoesColumn.appendChild(btnDelete)
    acoesColumn.appendChild(btnEdit)
    
    row.appendChild(idColumn)
    row.appendChild(courseColumn)
    row.appendChild(acoesColumn)
    
    resultContainer.appendChild(row)
}


async function updateCourse(){
    const name = inputNameUpdate.value.trim();
    if (name){
        console.log(actualId)
        const response = await fetch("http://localhost:8080/courses/"+actualId,
        {method:"PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })},)
    }
    window.location.reload()
    // window.location.reload();
}

function openUpdateModal(id,name){
    actualId = id
    inputNameUpdate.value = name
}


async function remover(id,name,row){
    const result = confirm("Do you want to remove " +name + "?")
    if (result){
        const response = await fetch("http://localhost:8080/courses/"+id, {method:"DELETE"})
        if (response.ok){
            window.location.reload();
        }
    }
}

async function removeAllCourses(){
    const result = confirm("Are you sure, you want to REMOVE ALL courses?")
    if (result){
        const response = await fetch("http://localhost:8080/courses", {method:"DELETE"})
        if (response.ok){
            resultContainer.innerHTML = ""
            window.location.reload();
        }
    }
}

showAllcourses()