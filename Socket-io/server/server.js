import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './config/mongoose.config.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';


const PORT = process.env.PORT | 8000
const app = express();

app.use(cookieParser(process.env.SECRET_KEY))
app.use(express.json(), cors(), cors({origin: 'http://localhost:5173', credntials: true}));
app.use('/api', userRoutes)

dotenv.config()

dbConnect();

const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});


const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credntials: true
    }
})

let users = [];
let messages = []
io.on('connection', (socket) => {
    console.log('Connected ID:', socket.id);
    

    socket.on('new_user', (data) => {
        users.push(data)
        io.emit('users_in_chat', users)
    })

    socket.on('new_message', (data) => {
        messages.push(data);
        io.emit('messages', messages)
    })
})