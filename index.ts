import "dotenv/config"
import "express-async-errors"
import express from "express"
import routes from "./routes/index"
import connectDB from "./db/connect"
import cors from "cors"
import cookieParser from "cookie-parser"
import { handleErrors } from "./middlewares/errors"

const app = express()
connectDB()
app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Obligatorio que no sea "*" cuando usamos "credentials: true"
    methods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"],
    credentials: true,
  })
)
app.use("/api", routes)

app.use(handleErrors)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("App escuchando en puerto:", PORT)
})
