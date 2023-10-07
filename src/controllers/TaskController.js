const { json } = require('body-parser');
const express = require('express')


const app = express()

function index(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos WHERE visible = 1', (err, productos) => {
            if(err){
                res.json(err);
            }
            res.render('tasks/index', { productos });
        });
    });
}

function search(req, res){
    const nombre = req.query.nombre;
    console.log(req.query)
    req.getConnection((err,conn) => {
        conn.query("SELECT * FROM productos WHERE visible = 1 AND codigo = ? OR nombre LIKE \"%"+nombre+"%\"", [nombre], (err, productos) => {
            if(err){
                res.json(err);
            }
            console.log(productos)
            res.render('tasks/search',{productos});
        });
    });
}

function erase(req, res){
    const codigo = req.params.codigo
        req.getConnection((err, conn) =>{
            conn.query("UPDATE productos SET visible = 0 WHERE codigo = ?", [codigo])
        })
        res.send({response:'OK'})
}


function edit(req,res){
    const article = req.params.id
    const editable = req.params.modifier
    const info = req.params.info
    req.getConnection((err,conn) =>{
        conn.query("UPDATE productos SET ?? = ? WHERE id = ?", [editable, info, article])
    })
    res.send({respones:'OK'})
}

function editpercode(req,res){
    const article = req.params.codigo
    const precio = req.params.precio
    req.getConnection((err,conn) =>{
        conn.query("UPDATE productos SET precio = ? WHERE codigo = ?", [precio, article])
    })
    res.send({respones:'OK'})
}
function aumentar(req,res){
    const article = req.params.id
    const info = req.params.info
    req.getConnection((err,conn) => {
        conn.query("SELECT precio FROM productos WHERE id = ?", [article], (err, precio) => {
            if(err){
                res.json(err)
            }
            stringed = JSON.stringify(precio)
            parsed = JSON.parse(stringed)
            price = parsed[0].precio
            percent = (price * parseInt(info)) / 100
            newprice = percent + price
            conn.query("UPDATE productos SET precio = ? WHERE id = ?", [newprice, article])
            
        })
    })
    res.send({responses:'OK'})
    // console.log(article) 
}

function agregar(req, res){
    res.render('tasks/agregar');
}

function venta(req,res){
    res.render('tasks/venta')
}

function nuevaventa(req, res){
    req.getConnection((err,conn) =>{
        conn.query("SELECT * FROM productos WHERE visible = 1",(err, productos) => {
            if(err){
                res.json(err)
            }
            res.send({productos})
        })
    })
}

function almacenarventa(req,res){
    const cash = req.params.cash
    const amount = req.params.amount    
    const date = req.params.date
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO venta SET cash = ?, amount = ?, date = ?', [cash, amount, date], (err,venta) => {
            if(err){
                res.json(err)
            }
            res.send({venta})
        })
    })
}

function getidventa(req,res){
    req.getConnection((err, conn) => {
        conn.query('SELECT MAX(idventa) FROM venta', (err, data) =>{
            res.send(data)
        })
    })
}

function almacenarventa_producto(req,res){
    const idproducto = req.params.idproducto
    const idventa = req.params.idventa
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO venta_producto SET producto_id = ?, venta_id = ?', [idproducto, idventa])
    })
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

function searchVentas(req, res){
    const table = req.params.table
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ??', [table], (err, data) =>{
            if(err){
                res.json(err)
            }
            res.send(data)
        })
    })
}

function verventas(req, res){
    res.render("tasks/verventas")
}


module.exports = {
    index: index,
    search: search,
    store: store,
    agregar: agregar,
    venta:venta,
    erase:erase,
    edit:edit,
    nuevaventa:nuevaventa,
    almacenarventa:almacenarventa,
    aumentar:aumentar,
    almacenarventa_producto:almacenarventa_producto,
    getidventa:getidventa,
    searchVentas:searchVentas,
    editpercode:editpercode,
    verventas:verventas,
}

