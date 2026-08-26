import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cors from 'cors'

const app = express();
const server = createServer(app);
const frontendOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const io = new Server(server, {
    cors: {
        origin: frontendOrigin,
        methods: ["GET", "POST"]
    }
});


const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(express.static(path.join(__dirname, "../frontend/src")));

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, "../frontend/index.html"))
// });


//we don't need whole app wide for just socketio to work
app.use(cors({
    origin: frontendOrigin,
    credentials: true
})
)

app.get("/", (req, res) => {
    res.send("Hi")
})

let i = 0
io.on('connection', (socket) => {
    console.log('a user connected', i++);
    //   console.log(frontendOrigin)
    socket.on("newMsg", (socket) => {
        console.log("new message recieved")
        console.log(socket)
    })
});




export {app, server}