const scanform = document.getElementById("scanform")
const codinp = document.getElementById("codinp")
const content = document.getElementById("content")
const generarventa = document.getElementById("generarventa")
const productos = []
const selected_products = []
const cashbox = document.getElementById("cash")
let amount = 0
let cash = 0
const tiempo = Date.now()
const hoy = new Date(tiempo)
const ISO = hoy.toISOString()
const slice = ISO.slice(0, 10)
const formateado = slice.replaceAll('-', '')

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
    const price = document.getElementById("price")
    amount = 0
    arr.forEach(e => {
        precioreal = e.precio * 1
        if(e.multiplier != null){
            precioreal = (e.precio*e.multiplier/100) + e.precio * 1
        }
        const nombre = document.createElement('li')
        const precio = document.createElement('li')
        const list = document.createElement ('ul')
        nombre.textContent = e.nombre
        precio.textContent = "$" + precioreal
        list.classList = 'articles'
        nombre.classList = "article"
        precio.classList = "article"
        list.appendChild(nombre)
        list.appendChild(precio)
        content.appendChild(list)
        amount += precioreal
    })
    price.textContent = "TOTAL $" + amount.toFixed(2)
}

scanform.addEventListener('submit', function(){
    const cod = codinp.value
    selectproduct(cod)
    printproducts(selected_products)
})

generarventa.addEventListener('click', function(){
    fetch('/almacenarventa/'+cash+'/'+amount+'/'+formateado)
    .then
        (fetch('/getidventa')
        .then(r=>r.json())
        .then(r => JSON.stringify(r))
        .then(r=>r.match(/(\d+)/g))
        .then(r=>r[0])
        .then(r=> {
            selected_products.forEach(e => {
                if(e.id != undefined){
                    console.log(e.id)
                    fetch('/almacenarventa_producto/'+e.id+'/'+r)
                }
            })
        }))
    selected_products.forEach(e => {
        newstock = e.stock - 1
        if(e.id != undefined){
            fetch('/edit/'+e.id+'/stock/'+newstock).then(r=>r.json()).then(r=>console.log(r))
        }
    })
    const resumen_compra = []
    selected_products.forEach(e=> {
        if(!resumen_compra.find(r => r.id == e.id)){
            resumen_compra.push({
                ...e,
                cantidad:selected_products.filter(sp=>sp.id == e.id).length
            })
        }
    })
    alerta = ""
    resumen_compra.forEach(e => {
        precioreal = e.precio * 1
        if(e.multiplier != null){
            precioreal = (e.precio*e.multiplier/100) + e.precio * 1
        }
        alerta += `x ${e.cantidad} ${e.nombre} $${precioreal} \n`
    })
    alert("Venta realizada!\n" + alerta + "Total: $" +amount)
    console.log(resumen_compra)
})

const newproductform = document.getElementById("newproduct")
const nameinp = document.getElementById("nameinp")
const priceinp = document.getElementById("priceinp")
newproductform.addEventListener('submit', function(){
    const producto = {
        nombre: nameinp.value,
        precio: priceinp.value,
    }
    console.log(producto)
    selected_products.push(producto);
    printproducts(selected_products)
})

const cashButton = document.getElementById("cashButton")
const othersButton = document.getElementById("othersButton")
const cashRadio = document.getElementById("cashRadio")
const othersRadio = document.getElementById("othersRadio")
cashButton.addEventListener("click", function(){
    if(cashRadio.checked == false){
        cashRadio.checked = true
        cashButton.style.color = 'green'
        othersButton.style.color = ""
        generarventa.disabled = false
        cash = 1
    }
})

othersButton.addEventListener("click", function(){
    if(othersRadio.checked == false){
        othersRadio.checked = true
        othersButton.style.color = 'blue'
        cashButton.style.color = ""
        generarventa.disabled = false
        cash = 0
    }
})