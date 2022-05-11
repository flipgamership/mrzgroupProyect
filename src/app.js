const express = require('express')
const path = require('path')
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const morgan = require('morgan')
const session = require('express-session')

// se inportaron la dependencias bases que se usaran para construir la aplicaccion

const app = express()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// se declara la configuracion de app y el motor de plantilla que se utilizara 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "/public")))

app.listen(3000, ()=>{
    console.log('Buenos Dias Dev ☻, El esta servidor a la espera de conexiones ❤')
    console.log('server on port', 3000)
})
app.use(morgan('dev'));
// base de datos 
app.use(myconnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mrzgroup'
}, console.log('conexion exitosa')))


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// declaracion de rutas
const routesExpressApp = require('./customer/router/router')
app.use('/', routesExpressApp)
// declaracion de ruta de error 404
app.get('*', function(req, res){
    
        res.render('404')
    
    });