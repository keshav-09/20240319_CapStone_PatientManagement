require("dotenv").config();
const cors = require("cors")
const express =require("express")
const bodyParser = require("body-parser");
const patientRouter= require("../05_backend/Routes/patientRoutes") 
const doctorRouter=require("../05_backend/Routes/doctorRouter")
const authRouter=require("../05_backend/Routes/authRouter")

// Database connection
const { connectToDatabase } = require("./Database/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth",authRouter)
app.use("/hospital", patientRouter);
app.use("/doctor", doctorRouter)

async function startServerAndDatabase() {
    await connectToDatabase();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server live at ${process.env.PORT || 3000}`)
    );
  }


  startServerAndDatabase();