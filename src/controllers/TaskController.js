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


// function searchall(req, res) {
    // const data = req.body;

    // req.getConnection((err, conn) => {
    //     conn.query('SELECT * FROM ?', [data], (err, rows) =>{
    //         console.log(rows);
//         })
//     })
// }


module.exports = {
    index: index,
    // search: search,
    venta: venta,
    store: store,
    agregar: agregar,
}

