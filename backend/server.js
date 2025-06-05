import app from "./app.js";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";

dotenv.config({path: 'backend/config/config.env'});
connectDB();


// handel uncought exception error 
process.on('uncaughtException',(err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is sutting down`);

  process.exit(1);
})


const port = process.env.PORT || 3000;


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


process.on('unhandledRejection',(err)=> {
  console.log(`Unhandled Rejection: ${err.message}`);
  console.log(`Server is shutting dowm, due to unhandel promise`);
  
  server.close(()=> {
    process.exit(1)
  })
})

