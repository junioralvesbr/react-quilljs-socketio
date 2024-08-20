
const io = require('socket.io')(3000, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

io.on("connection", (socket) => {
    socket.on('get-document', async (documentId) => {
        const data = ""
        socket.join(documentId)
        socket.emit("load-document", data)

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })
    })
})
