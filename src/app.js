const express = require('express');
const session = require('express-session')
const {engine} = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql =  require('mysql');
const tasksRoutes = require('./routes/tasks')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs');
const csv = require('csv-parser');

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
    host: '127.0.0.1',
    user: 'vps3_root',
    password: 'root',
    port: 3306,
    database: 'vps3_stockapp'
}, 'single'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/static/csv');
    },
    filename: (req, file, cb) => {
        const customFileName = 'updateDB.csv'
        cb(null, customFileName);
    },
})

const upload = multer({ storage });

app.post('/subir-csv', upload.single('csvFile'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo CSV');
    }
    const lines = []

    fs.createReadStream('src/static/csv/updateDB.csv')
        .pipe(csv())
        .on('data', (linea) => {
            lines.push(linea);
        })
        .on('end', () => {
            console.log(lines)
            res.status(200).send(lines);
        })
});


app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res) =>{
    res.render('home');
})

