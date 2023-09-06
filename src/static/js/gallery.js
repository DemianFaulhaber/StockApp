const trashcans = document.getElementsByClassName("trashcan")
for(let trashcan of trashcans){
    const cod = trashcan.dataset.codigo
    trashcan.addEventListener("click", function(){
        if(confirm("queres borrar " + trashcan.dataset.codigo + "?")){
            fetch("/erase/"+cod).then(response => response.json()).then(window.location.reload())
            .catch(e => console.log(e))
        }
    })
}
const codePencils = document.getElementsByClassName("edit-code")
for(let codePencil of codePencils){
    const id = codePencil.dataset.id
    const cod = codePencil.dataset.modifier
    codePencil.addEventListener('click', function(){
        let info = prompt("Inserte el nuevo código:")
        if(info.length > 0){
            fetch("/edit/"+id+"/"+cod+"/"+info).then(response => response.json()).then(window.location.reload())
            .catch(e => console.log(e))
        }
    })
}
const namePencils = document.getElementsByClassName("edit-name")
for(let namePencil of namePencils){
    const id = namePencil.dataset.id
    const cod = namePencil.dataset.modifier
    namePencil.addEventListener('click', function(){
        let info = prompt("Inserte el nuevo nombre:")
        if(info.length > 0){
            fetch("/edit/"+id+"/"+cod+"/"+info).then(response => response.json()).then(window.location.reload())
            .catch(e => console.log(e))
        }
    })
}
const pricePencils = document.getElementsByClassName("edit-price")
for(let pricePencil of pricePencils){
    const id = pricePencil.dataset.id
    const cod = pricePencil.dataset.modifier
    pricePencil.addEventListener('click', function(){
        let info = prompt("Inserte el nuevo precio:")
        if(info.length > 0){
            fetch("/edit/"+id+"/"+cod+"/"+info).then(response => response.json()).then(window.location.reload())
            .catch(e => console.log(e))
        }
    })
}
const stockPencils = document.getElementsByClassName("edit-stock")
for(let stockPencil of stockPencils){
    const id = stockPencil.dataset.id
    const cod = stockPencil.dataset.modifier
    stockPencil.addEventListener('click', function(){
        let info = prompt("Inserte el nuevo stock:")
        if(info.length > 0){
            fetch("/edit/"+id+"/"+cod+"/"+info).then(response => response.json()).then(window.location.reload())
            .catch(e => console.log(e))
        }
    })
}
const selectall = document.getElementById("selectall")
const selects = document.getElementsByClassName("select")
selectall.addEventListener('click', function(){
    if(selectall.checked === true){
        for(let select of selects){
            select.checked = true
    }
        }
    if(selectall.checked === false){
        for(let select of selects){
            select.checked = false
        }
    }
})
const editall = document.getElementById("edit-selected")
editall.addEventListener('click', function(){
    let percent = prompt("inserte el porcentaje a aumentar")
    for(let selected of selects){
        if(selected.checked === true){
            id = selected.dataset.id
                if(percent.length > 0){
                    fetch("/aumentar/"+id+"/"+percent).then(window.location.reload()).then(r => console.log(r.json()))
                    .catch(e => console.log(e))
                }
            }
    }
})