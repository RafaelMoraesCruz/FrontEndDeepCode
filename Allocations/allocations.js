const table = document.getElementById("allocation")
const resultContainer =  document.getElementById('allocationsList')

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
    

    row.setAttribute("class","allocation-row")
    idColumn.setAttribute("scope","row")
    idColumn.textContent = id
    professorColumn.textContent = professor.name
    courseColumn.textContent = course.name
    dayColumn.textContent = day
    startColumn.textContent = start.substring(0,5)
    endColumn.textContent = end.substring(0,5)
    acoesColumn.appendChild(btnDelete)

    row.appendChild(idColumn)
    row.appendChild(professorColumn)
    row.appendChild(courseColumn)
    row.appendChild(dayColumn)
    row.appendChild(startColumn)
    row.appendChild(endColumn)
    row.appendChild(acoesColumn)

    resultContainer.appendChild(row)
}

showAllAllocations()