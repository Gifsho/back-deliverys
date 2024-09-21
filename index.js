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