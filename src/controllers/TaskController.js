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
    const codigo = req.query.codigo;
    console.log(codigo)
    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM productos WHERE codigo = ?", [codigo], (err, productos) => {
            if(err){
                res.json(err);
            }
            console.log(productos)
            res.render('tasks/search', {productos});
        });
    });
}

function nueva_venta(req, res){
    const codigo = req.query.codigo;
    console.log(codigo)
    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM productos WHERE codigo = ?", [codigo], (err, productos) => {
            if(err){
                res.json(err);
            }
            res.render('tasks/nueva', {productos});
        });
    });
}

function agregar(req, res){
    res.render('tasks/agregar');
}

function venta(req, res){
    res.render('tasks/venta');
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
    nueva_venta: nueva_venta,
}

