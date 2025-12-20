import app from "./app";
import connectToDatabase from "./config/db.config";

const PORT=3000;

async function startServer(){
    try {
        await connectToDatabase();

        app.listen(PORT,()=>{
            console.log(`Server is running in the http://localhost:${PORT}`)
        })
    } catch (error) {
        
    }
}