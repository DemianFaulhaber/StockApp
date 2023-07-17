function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, productos) => {
            if(err){
                res.json(err);
            }
            console.log(productos);
            res.render('tasks/index', { productos });
        });
    });
}

function search(req, res){
    const nombre = req.query.nombre;
    console.log(req.query)
    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM productos WHERE nombre = ?", [nombre], (err, productos) => {
            if(err){
                res.json(err);
            }
            console.log(productos)
            res.render('tasks/search',{productos});
        });
    });
}

// function nueva_venta(req, res){
//     const codigo = req.query.codigo;
//     const venta = [];
//     console.log(codigo)
//     req.getConnection((err,conn) => {
//         conn.query("SELECT * FROM productos WHERE codigo = ?", [codigo], (err, productos) => {
//             if(err){
//                 res.json(err);
//             }
//             res.render('tasks/nueva_venta', {productos});
//             console.log(venta)
//         });
//     });
// }

function agregar(req, res){
    res.render('tasks/agregar');
}
function guardarProductoEnSesion(req, producto) {
    if (!req.session.productos) {
        req.session.productos = [producto];
        // console.log(req.session.productos)
        console.log("se creo un nuevo array")
    } else {
        req.session.productos.push(producto);
        // console.log(req.session.productos)
    }
}

function venta(req, res){
    const codigo = req.query.codigo;
    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM productos WHERE codigo = ?", [codigo], (err, productos) => {
            if(err){
                res.json(err);
            }
            if(productos.length > 0){
                console.log(productos)
                const producto = productos[0];
                guardarProductoEnSesion(req, producto);
                const data = (req.session.productos)
                // console.log(data[0])
                res.render('tasks/venta', {data})
            }
            else{
                res.render('tasks/venta')
                console.log("the array it's empty")
            }
            productos.splice(0, productos.length)
        });
    });
}


function store(req, res){
    const data = req.body;
    req.getConnection((err,conn) => {
        const codigo = req.body.codigo;
        conn.query("SELECT codigo FROM productos WHERE codigo = ?", [codigo], (err, productos) => {
            if(productos.length != 0){
                res.render('tasks/agregar', {productos})
            }
            else{
                const messages = {
                    message:'Completar campos faltantes'
                }
                req.getConnection((err, conn) => {
                    conn.query('INSERT INTO productos SET ?', [data], (err, rows) =>{
                        if(rows == undefined){
                            console.log(messages.message)
                            res.render('tasks/agregar', {messages})
                        }
                    })
                })
            }
        }); 
    })
}

module.exports = {
    index: index,
    search: search,
    venta: venta,
    store: store,
    agregar: agregar,
    // nueva_venta: nueva_venta,
}

