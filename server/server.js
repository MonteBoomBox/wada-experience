const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")
const app = express()

app.use(express.json())
app.use(cors({ origin: "*" }))

app.get("/destinations", (req, res) => {
    try {
        var data = {}
        axios.get("http://localhost:8888/heritage/jsonapi/node/destination").then((response) => {
            data = response.data
            res.send(data)
        })
    } catch (err) {
        console.error(err)
    }
})

app.get("/destination/:id", (req, res) => {
    try {
        var data = {}
        axios.get(`http://localhost:8888/heritage/jsonapi/node/destination/${req.params.id}`).then((response) => {
            data = response.data
            res.send(data)
        })
    } catch (err) {
        console.error(err)
    }
})

app.listen(8000, () => console.log("Server started"))