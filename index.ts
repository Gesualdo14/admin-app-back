import "dotenv/config"
import express from "express"
import routes from "./routes"
import connectDB from "./db/connect"
import cors from "cors"

const app = express()
connectDB()
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }))
app.use("/api", routes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("App escuchando en puerto:", PORT)
})
