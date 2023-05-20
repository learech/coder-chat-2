// crear servidor
const express = require ('express')
const app = express()
//Http import
const http = require('http')
const server = http.createServer(app)

//Views engine require
const handlebars = require('express-handlebars')
// Import Routes
const homeRouter = require('./router/home.router')
// Socket import
const {Server} = require('socket.io')
const io = new Server(server)

const PORT = 8080 || process.env.PORT

//Public
app.use(express.static(__dirname + '/public'))

//Views 
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


app.use('/home', homeRouter)

let messages = []

// Socket
io.on('connection', (socket)=>{
    console.log('New User connected')
    socket.emit('welcome', 'Hola cliente, bienvenido')

    socket.on('new-message', (data)=>{
        console.log(data);
        messages.push(data)
       io.sockets.emit('messages-all', messages)
    })
})
server.listen(PORT, ()=>{
    console.log('Server running on port 8080');
})