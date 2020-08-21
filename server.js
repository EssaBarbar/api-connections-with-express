const express = require('express')

const app = express()
app.use(express.json())

let idIndex = 100
const favoriteFacts = []

app.use('/', express.static('./client'))

app.get('/api/facts', (req, res) => res.json(favoriteFacts))
app.get('/api/facts/:id', (req, res) => res.json('its get with id nr' + req.params.id))


app.post('/api/facts', (req, res) => {
    if (req.body.text.length) {
        const newFact = { id: idIndex++, ...req.body }
        favoriteFacts.push(newFact)
        res.json(req.body)
    } else {
        res.json("not saved")
    }
})
app.put('/api/facts/:id', (req, res) => res.json('Put request'))
app.delete('/api/facts/:id', (req, res) => res.json('delete request'))

app.use((req, res) => {
    res.status(404).json({ message: "could not find the request you are trying to do" })
})


app.listen(3000, () => { console.log("server up") })