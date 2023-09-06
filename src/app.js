const express = require('express');
const session = require('express-session')
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql =  require('mysql');
const tasksRoutes = require('./routes/tasks')
const cors = require('cors')


const app = express();

const router = express.Router();

app.use(cors())

app.use(session({
    secret: 'contraseña',
    resave: false,
    saveUninitialized: true
}));

app.set('port', 4000);

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.urlencoded(
    {extended: true}
));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'stockapp'
}, 'single'))


app.post('/venta', function(req,res){
    const data = req.body

    // console.log(data)

    function guardarCodigoEnSesion(req, codigo) {
        if (!req.session.codigos) {
            req.session.codigos = [codigo];
        } else {
            req.session.codigos.push(codigo);
        }
    }

    guardarCodigoEnSesion(req, data)

    // console.log(req.session.codigos)
    res.render('tasks/venta')
});


app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res) =>{
    res.render('home');
})

