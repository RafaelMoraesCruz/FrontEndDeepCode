const table = document.getElementById("course")
const resultContainer =  document.getElementById('coursesList')

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

async function remover(id,name,row){
    const result = confirm("Você deseja remover o curso de" +name)
    if (result){
        const response = await fetch("http://localhost:8080/courses"+"/"+id, {method:"DELETE"})
        if (response.ok){
            resultContainer.removeChild(row)
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