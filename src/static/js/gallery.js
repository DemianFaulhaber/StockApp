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

const precioradio = document.getElementById("precioradio")
const stockradio = document.getElementById("stockradio")
const subircsv = document.getElementById("subir_csv")
const inpcsv = document.getElementById("csvinp")
const formcsv = document.getElementById("formcsv")

precioradio.addEventListener("change", function() {
    subircsv.disabled = false
})
stockradio.addEventListener("change", function() {
    subircsv.disabled = false
})

formcsv.addEventListener('submit', function(e){
    e.preventDefault()
    let file = inpcsv.files[0]
    let formdata = new FormData()
    formdata.append("csvFile",file)
    if(precioradio.checked){
        fetch("/subir-csv", {
            method:"POST",
            body:formdata
        }).then(r=>r.json()).then(r=>r.forEach(e => {
            fetch('/editpreciopercode/'+e.codigo+'/'+e.precio)
        })).then((alert("se actualizaron los precios."))).then(window.location.reload())
    }
    else{
        fetch("/subir-csv", {
            method:"POST",
            body:formdata
        }).then(r=>r.json()).then(r=>r.forEach(e => {
            fetch('/editstockpercode/'+e.codigo+'/'+e.stock)
        })).then((alert("se actualizó el stock."))).then(window.location.reload())
    }
})
