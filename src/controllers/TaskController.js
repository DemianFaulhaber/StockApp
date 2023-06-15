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

function agregar(req, res){
    res.render('tasks/agregar');
}

function venta(req, res){
    res.render('tasks/venta');
}

function store(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO productos SET ?', [data], (err, rows) =>{
            console.log(rows);
        })
    })
}


module.exports = {
    index: index,
    search: search,
    venta: venta,
    store: store,
    agregar: agregar,
}

