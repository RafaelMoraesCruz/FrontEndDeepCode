const table = document.getElementById("course")
const resultContainer =  document.getElementById('coursesList')

const inputName = document.getElementById("input-name")
const btnSalvar = document.getElementById("btn-create-course")

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

async function remover(id,name,row){
    const result = confirm("Do you want to remove" +name + "?")
    if (result){
        const response = await fetch("http://localhost:8080/courses"+"/"+id, {method:"DELETE"})
        if (response.ok){
            resultContainer.removeChild(row)
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

function createRow({id,name}){
    const row = document.createElement("tr")
    const idColumn = document.createElement("td")
    const courseColumn = document.createElement("td")
    const acoesColumn = document.createElement("td")

    const btnDelete = document.createElement("button")
    btnDelete.classList.add("btn-info")
    btnDelete.innerHTML = '<img src="../IMAGES/trash.svg"></img>';
    btnDelete.addEventListener("click", () => remover(id,name,row))
    
    row.setAttribute("class","course-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    courseColumn.textContent = name
   
    acoesColumn.appendChild(btnDelete)

    row.appendChild(idColumn)
    row.appendChild(courseColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}

showAllcourses()