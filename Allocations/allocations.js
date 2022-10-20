const table = document.getElementById("allocation")
const resultContainer =  document.getElementById('allocationsList')
const inputCourseId =  document.getElementById('input-courseId')
const inputDay =  document.getElementById('input-day')
const inputProfessorId =  document.getElementById('input-professorId')
const inputStart =  document.getElementById('input-start')
const inputEnd =  document.getElementById('input-end')


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

async function showAllcourses(){
    inputCourseId.innerHTML = ''
    const response = await fetch("http://localhost:8080/courses")
    if(response.ok){
        const courses = await response.json();
        courses.forEach((course) => {
            createCourseSelection(course);
        });
    }
}

function createCourseSelection({id,name}){
    const option = document.createElement("OPTION")
    option.setAttribute("value",id)
    option.innerText = name

    inputCourseId.appendChild(option)
    
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
    if (response.ok){
        const allocation = await response.json();
        createRow(allocation)
        window.location.reload();
    }
    window.location.reload();
}

async function remover(id,row){
    const result = confirm("Você deseja remover a allocação? id=" +id)
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

function createRow({id,professor,course,day,start,end}){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const professorColumn = document.createElement("td")
    const courseColumn = document.createElement("td")
    const dayColumn = document.createElement("td")
    const startColumn = document.createElement("td")
    const endColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,row))

    const btnEdit = document.createElement("button")
    btnEdit.classList.add("btn-info")
    btnEdit.innerHTML = '<img src="../IMAGES/edit.svg"></img>';
    

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

async function showAllProfessors(){
    const response = await fetch("http://localhost:8080/professors")
    if(response.ok){
        const professors = await response.json();
        professors.forEach((professor) => {
            createSelection(professor);
        });
    }
}

function createSelection({id,name}){
    const selection = document.createElement("OPTION")
    selection.setAttribute("value", id)
    selection.innerText = name

    inputProfessorId.appendChild(selection)
}

showAllAllocations()