import "dotenv/config"
import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("HOLA MUNDO")
})
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log("App escuchando en puerto:", PORT)
})
