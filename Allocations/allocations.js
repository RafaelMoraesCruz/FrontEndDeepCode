const table = document.getElementById("allocation")
const resultContainer =  document.getElementById('allocationsList')
const inputCourseId =  document.getElementById('input-courseId')
const inputDay =  document.getElementById('input-day')
const inputProfessorId =  document.getElementById('input-professorId')
const inputStart =  document.getElementById('input-start')
const inputEnd =  document.getElementById('input-end')
const inputCourseIdUpdate =  document.getElementById('input-courseId-update')
const inputDayUpdate =  document.getElementById('input-day-update')
const inputProfessorIdUpdate =  document.getElementById('input-professorId-update')
const inputStartUpdate =  document.getElementById('input-start-update')
const inputEndUpdate =  document.getElementById('input-end-update')
const createAllocationButton = document.getElementById('createAllocationButton')

createAllocationButton.addEventListener('click', showAllProfessors)
createAllocationButton.addEventListener('click', showAllCourses)

let actualId = 0

async function showAllAllocations(){
    const response = await fetch("http://localhost:8080/allocations")
    if(response.ok){
        const allocations = await response.json();
        if(allocations.length > 0){
            table.removeAttribute("hidden")
        }
        allocations.forEach((allocation) => {
            createRow(allocation);
        });
    }
}

function createRow({id,professor,course,day,start,end}){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const professorColumn = document.createElement("td")
    const courseColumn = document.createElement("td")
    const dayColumn = document.createElement("td")
    const startColumn = document.createElement("td")
    const endColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = createBtnDelete()
    btnDelete.addEventListener("click", () => remover(id,row))

    const btnEdit = createBtnEdit()
    btnEdit.addEventListener("click", ()=> openUpdateModal(id, professor,course,day,start,end))

    row.setAttribute("class","allocation-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    professorColumn.textContent = professor.name
    courseColumn.textContent = course.name
    dayColumn.textContent = day
    startColumn.textContent = start.substring(0,5)
    endColumn.textContent = end.substring(0,5)
    acoesColumn.setAttribute("class", "acoes-column")
    acoesColumn.appendChild(btnDelete)
    acoesColumn.appendChild(btnEdit)

    row.appendChild(idColumn)
    row.appendChild(professorColumn)
    row.appendChild(courseColumn)
    row.appendChild(dayColumn)
    row.appendChild(startColumn)
    row.appendChild(endColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}

async function addAllocation(){
    const courseId = inputCourseId.value.trim();
    const day = inputDay.value.trim();
    const professorId = inputProfessorId.value.trim();
    const start = inputStart.value.trim();
    const end = inputEnd.value.trim();
    const response = await fetch("http://localhost:8080/allocations", 
    {method:"POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        courseId: courseId,
        day: day,
        end: end,
        professorId: professorId,
        start: start,
    })},)
    if(response.status == 400){
        alert('error, allocation format is not valid')
    }
    window.location.reload();
}

async function updateAllocation(){
    var course = inputCourseIdUpdate.value.trim();
    var day = inputDayUpdate.value.trim();
    var professor = inputProfessorIdUpdate.value.trim();
    var start =  inputStartUpdate.value.trim();
    var end = inputEndUpdate.value.trim();

    const response = await fetch("http://localhost:8080/allocations/"+actualId,
    {method:"PUT",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify({
        courseId: course,
        day: day,
        end: end,
        professorId: professor,
        start: start,
    })},)
    if(response.status == 400){
        alert('error, allocation format is not valid')
    }
    window.location.reload();
}

async function remover(id,row){
    const result = confirm("Would you like to remove allocation: id=" + id+"?")
    if (result){
        const response = await fetch("http://localhost:8080/allocations"+"/"+id, {method:"DELETE"})
        if (response.ok){
            resultContainer.removeChild(row)
            window.location.reload();
        }
    }
}

async function deleteAllAllocations(){
    const result = confirm("Are you sure, you want to REMOVE ALL allocations?")
    if (result){
        const response = await fetch("http://localhost:8080/allocations", {method:"DELETE"})
        if (response.ok){
            resultContainer.innerHTML = ""
            window.location.reload();
        }
    }
}

async function showAllProfessors(selectedProfessor){
    inputProfessorId.innerHTML = ''
    inputProfessorIdUpdate.innerHTML= ''
    const response = await fetch("http://localhost:8080/professors")
    if(response.ok){
        const professors = await response.json();
        professors.forEach((professor) => {
            createProfessorsSelectionUpdateModal(professor,selectedProfessor);
        })
        professors.forEach((professor) => {
            createProfessorSelection(professor);
        })
    }
}

async function showAllCourses(selectedCourse){
    inputCourseId.innerHTML = ''
    inputCourseIdUpdate.innerHTML= ''
    const response = await fetch("http://localhost:8080/courses")
    if(response.ok){
        const courses = await response.json();
        courses.forEach((course) => {
            createCoursesSelectionUpdateModal(course,selectedCourse);
        })
        courses.forEach((course) => {
            createCourseSelection(course);
        })
    }
}



function openUpdateModal(id,professor,course,day,start,end){
    actualId = id
    showAllProfessors(professor)
    showAllCourses(course)
    inputDayUpdate.value = day
    inputStartUpdate.value = start
    inputEndUpdate.value = end
}



function createProfessorsSelectionUpdateModal({id, name},selectedProfessor){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.textContent = name
    if(id == selectedProfessor.id){
        selection.setAttribute("selected", true)
    }
    inputProfessorIdUpdate.appendChild(selection)
}

function createProfessorSelection({id,name}){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.innerText = name
    
    inputProfessorId.appendChild(selection)
}

function createCoursesSelectionUpdateModal({id, name},selectedCourse){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.textContent = name
    if(id == selectedCourse.id){
        selection.setAttribute("selected", true)
    }
    inputCourseIdUpdate.appendChild(selection)
}

function createCourseSelection({id,name}){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.innerText = name

    inputCourseId.appendChild(selection)
}



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


showAllAllocations()