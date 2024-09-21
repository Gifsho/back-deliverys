const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://yossy:UCm53aKnr9kzdtUj@cluster0.rj3m9.mongodb.net/DeriverysDB?retryWrites=true&w=majority', {
});



connection
  .on('open', () => {
    console.log("MongoDB Connected");
  })
  .on('error', (error) => {
    console.error("MongoDB Connection error:", error);
  });

module.exports = connection; // ส่งออกการเชื่อมต่อ
