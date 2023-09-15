const scanform = document.getElementById("scanform")
const codinp = document.getElementById("codinp")
const content = document.getElementById("content")
const generarventa = document.getElementById("generarventa")
const productos = []
const selected_products = []
const cashbox = document.getElementById("cash")
let amount = 0

fetch('nuevaventa/')
    .then(r => (r.json()))
    .then(r => r.productos.forEach(e => productos.push(e)))

function selectproduct(codigo){

    const selproduct = productos.filter(e => e.codigo == codigo)
    if(selproduct[0] !== undefined){
        selected_products.push(selproduct[0])
    }
    else{
        alert("ese producto no está en la base de datos")
    }
}

function printproducts(arr){
    content.innerHTML = ''
    amount = 0
    arr.forEach(e => {
        const nombre = document.createElement('li')
        const precio = document.createElement('li')
        const list = document.createElement ('ul')
        nombre.textContent = e.nombre
        precio.textContent = "$" + e.precio
        list.classList = 'articles'
        nombre.classList = "article"
        precio.classList = "article"
        list.appendChild(nombre)
        list.appendChild(precio)
        content.appendChild(list)
        amount += e.precio
    })
    console.log(amount)
}

scanform.addEventListener('submit', function(){
    const cod = codinp.value
    selectproduct(cod)
    printproducts(selected_products)
})

generarventa.addEventListener('click', function(){
    let cash = 0
    if(cashbox.checked == true){
        cash = 1
    }
    fetch('/almacenarventa/'+cash+'/'+amount)
    .then
        (fetch('/getidventa')
        .then(r=>r.json())
        .then(r => JSON.stringify(r))
        .then(r=>r.match(/(\d+)/g))
        .then(r=>r[0])
        .then(r=> {
            selected_products.forEach(e => {
                console.log(e)
                fetch('/almacenarventa_producto/'+e.id+'/'+r)
            })
        }))

})