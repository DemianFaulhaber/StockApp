const data_vp = []
const data_v = []
const articles_ul = document.getElementById("articles_ul")
let cash = 0 

fetch('/searchVentas/venta_producto').then(r => r.json()).then(r => data_vp.push(r))
fetch('/searchVentas/venta').then(r=>r.json()).then(r =>data_v.push(r)).then(r=>printSells()).then(r=>trashcans())

function printSells(){
    // articles_ul.innerHTML = ''
    data_v.forEach(e=>{
        e.forEach(e=>{
            const año = e.date.slice(0,4)
            const mes = e.date.slice(5,7)
            const dia = e.date.slice(8,10)
            let cash = ''
            const articles = document.createElement("ul")
            articles.className= "articles"
            if(e.cash === 0){
                cash = '<i class="bi bi-credit-card-2-front"></i>'
            }
            else{
                cash = '<i class="bi bi-cash" id="cashButton"></i>'
            }
            const li = document.createElement("li");
            li.className = "article";
            desc = `<li style="font-size:1.5rem;">${dia+"-"+mes+"-"+año}</li><li style="font-size:1.5rem;">Total: $${e.amount}</li><li style="font-size:1.5rem;">${cash}</li>
            <li class="d-flex justify-content-center "><button class="trashcan" data-codigo="${e.idventa}"><i class="bi bi-trash"></i></button></li>
            `;
            
            li.innerHTML = desc;
            articles.appendChild(li)
            articles_ul.appendChild(articles)
        })
    })  
}


function newPrint(){
        articles_ul.innerHTML = ''
        data_v.forEach(e=>{
            e.ventas.forEach(e=>{
                const año = e.date.slice(0,4)
                const mes = e.date.slice(5,7)
                const dia = e.date.slice(8,10)
                let cash = ''
                const articles = document.createElement("ul")
                articles.className= "articles"
                if(e.cash === 0){
                        cash = '<i class="bi bi-credit-card-2-front"></i>'
                }
                else{
                        cash = '<i class="bi bi-cash" id="cashButton"></i>'
                }
                const li = document.createElement("li");
                li.className = "article";
                desc = `<li style="font-size:1.5rem;">${dia+"-"+mes+"-"+año}</li><li style="font-size:1.5rem;">Total: $${e.amount}</li><li style="font-size:1.5rem;">${cash}</li>
                <li class="d-flex justify-content-center "><button class="trashcan" data-codigo="${e.id}"><i class="bi bi-trash"></i></button></li>
                `;

                li.innerHTML = desc;
                articles.appendChild(li)
                articles_ul.appendChild(articles)
            })
    })
}

function printByMethod(){
    articles_ul.innerHTML = ""
    let money = 0
    switch(cash){
        case 0:
            data_v.forEach(e=>{
                e.ventas.forEach(e=>{
                    if(e.cash === 1){
                        const año = e.date.slice(0,4)
                        const mes = e.date.slice(5,7)
                        const dia = e.date.slice(8,10)
                        let cash = ''
                        const articles = document.createElement("ul")
                        articles.className= "articles"
                        if(e.cash === 0){
                                cash = '<i class="bi bi-credit-card-2-front"></i>'
                        }
                        else{
                                cash = '<i class="bi bi-cash" id="cashButton"></i>'
                        }
                        const li = document.createElement("li");
                        li.className = "article";
                        desc = `<li style="font-size:1.5rem;">${dia+"-"+mes+"-"+año}</li><li style="font-size:1.5rem;">Total: $${e.amount}</li><li style="font-size:1.5rem;">${cash}</li>
                        <li class="d-flex justify-content-center "><button class="trashcan" data-codigo="${e.id}"><i class="bi bi-trash"></i></button></li>
                        `;
        
                        li.innerHTML = desc;
                        articles.appendChild(li)
                        articles_ul.appendChild(articles)
                        money += e.amount
                    }
                })
            })
            totalEarns.textContent = `Total  $${money}`
            break;
        case 1:
            data_v.forEach(e=>{
                e.ventas.forEach(e=>{
                    if(e.cash === 0){
                        const año = e.date.slice(0,4)
                        const mes = e.date.slice(5,7)
                        const dia = e.date.slice(8,10)
                        let cash = ''
                        const articles = document.createElement("ul")
                        articles.className= "articles"
                        
                        if(e.cash === 0){
                                cash = '<i class="bi bi-credit-card-2-front"></i>'
                        }
                        else{
                                cash = '<i class="bi bi-cash" id="cashButton"></i>'
                        }
                        const li = document.createElement("li");
                        li.className = "article";
                            desc = `
                            <li style="font-size:1.5rem;">${dia+"-"+mes+"-"+año}</li>
                            <li style="font-size:1.5rem;">Total: $${e.amount}</li><li style="font-size:1.5rem;">${cash}</li>
                            <li class="d-flex justify-content-center "><button class="trashcan" data-codigo="${e.id}"><i class="bi bi-trash"></i></button></li>
                            `;
        
                        li.innerHTML = desc;
                        articles.appendChild(li)
                        articles_ul.appendChild(articles)
                        money += e.amount
                    }
                })
            })
            totalEarns.textContent = `Total  $${money}`
    }
}

const totalEarns = document.getElementById("total")
const paymenthMethod = document.getElementById("paymentMethod")
function total(){
    let money = 0
    data_v.forEach(e=>{
        e.ventas.forEach(e=>{
            money += e.amount
        })
    })
    totalEarns.textContent = `Total  $${money}`
    paymenthMethod.style.display = "block"
}

const date = document.getElementById("dateSearch")
const dateValueFrom = document.getElementById("valueDateFrom")
const dateValueTo = document.getElementById("valueDateTo")
date.addEventListener('submit', function(event) {
    event.preventDefault()
    let from = dateValueFrom.value
    let to = dateValueTo.value
    fetch('/filterbyday/'+from+'/'+to)
    .then(r=>r.json())
    .then(r => {
        data_v.splice(0, data_v.length);
        data_v.push(r)
    })
    .then(r=>newPrint())
    .then(r=>total())
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
        cash = 0
    }
    printByMethod()
})

othersButton.addEventListener("click", function(){
    if(othersRadio.checked == false){
        othersRadio.checked = true
        othersButton.style.color = 'blue'
        cashButton.style.color = ""
        cash = 1
    }
    printByMethod()
})

function trashcans(){
    const trashcans = document.getElementsByClassName("trashcan")
    for(let trashcan of trashcans){
        const idventa = trashcan.dataset.codigo
        trashcan.addEventListener("click", function(){
            if(confirm("queres anular esta venta?")){
                fetch("/eraseSell/"+idventa).then(response => response.json()).then(window.location.reload())
                .catch(e => console.log(e))
            }
        })
    }
}