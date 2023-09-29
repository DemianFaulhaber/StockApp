const data_vp = []
const data_v = []
const articles_ul = document.getElementById("articles_ul")

function printSells(){
    data_v.forEach(e=>{
        e.forEach(e=>{
            let cash = ''
            const articles = document.createElement("ul")
            articles.className= "articles"
            if(e.cash == 0){
                cash = '<i class="bi bi-credit-card-2-front"></i>'
            }
            else{
                cash = '<i class="bi bi-cash" id="cashButton"></i>'
            }
            const li = document.createElement("li");
            li.className = "article";
            desc = `<li style="font-size:1.5rem;">Total: $${e.amount}</li><li style="font-size:1.5rem;">${cash}</li>`;

            li.innerHTML = desc;
            articles.appendChild(li)
            articles_ul.appendChild(articles)
        })
        })
}
fetch('/searchVentas/venta_producto').then(r => r.json()).then(r => data_vp.push(r))
fetch('/searchVentas/venta').then(r => r.json()).then(r => data_v.push(r)).then(R=>printSells())
// fetch('/nuevaventa').then(r => r.json()).then(r => data_p.push(r))
