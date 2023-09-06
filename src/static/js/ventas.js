const codinp = document.getElementById("codinp")
const searchb = document.getElementById("search")
const content = document.getElementById("content")
const generarventa = document.getElementById("generarventa")
searchb.addEventListener('click', function(){
    const cod = codinp.value
    content.innerHTML = ""
    fetch('nuevaventa/'+cod).then(response => response.json()).then(response => response.productos.forEach((e) => {
        const nombre = document.createElement('li')
        const precio = document.createElement('li')
        const list = document.createElement ('ul')
        nombre.textContent = e.name
        precio.textContent = "$" + e.price
        list.classList = 'articles'
        nombre.classList = "article"
        precio.classList = "article"
        list.appendChild(nombre)
        list.appendChild(precio)
        content.appendChild(list)
    }))
    .catch(e => console.log(e))
})
generarventa.addEventListener('click', function(){
    fetch('almacenarventa').then(response => response.json()).then(r => console.log(r))
})