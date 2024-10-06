const app = require('./app');

// const port = 8081;
const port = process.env.PORT || 8081;

app.get('/',(req,res)=>{
    res.send("Hello World!!!!!")
});

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`)
});

// จัดการกับ unhandled errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
  });

// =
// const http = require('http');
// const app = require('./app');
// const socketIo = require('socket.io');

// const port = process.env.PORT || 8081;

// const server = http.createServer(app);

// const io = socketIo(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//     }
// });
// app.get('/',(req,res)=>{
//     res.send("Hello World!!!!!")
// });
// const { setupRealTime } = require('./model/orders.model');
// setupRealTime(io);

// server.listen(port, () => {
//     console.log(`Server listening on port http://localhost:${port}`);
// });
