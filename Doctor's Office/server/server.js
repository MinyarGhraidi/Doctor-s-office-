const express = require("express")
const cors = require("cors")
const cookies = require('cookie-parser')
const app = express()

const PORT = process.env.PORT;



// --- MIDDLEWARE --
app.use(cors({credentials:true,origin:'http://localhost:3000'}), express.json(), express.urlencoded({ extended: true }),cookies())



require("dotenv").config()
require("./config/mongoose.config")
require("./routes/Patient.routes")(app)
require("./routes/user.routes")(app)



const port = process.env.PORT

app.listen(port, () => {
    console.log(`>>>>> Server is running on Port 🎈🎈🎈 ${port} 🎈🎈🎈  `)
})



