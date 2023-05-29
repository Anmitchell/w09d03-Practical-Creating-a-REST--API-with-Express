const express = require('express')
const app = express()
const port = 3000

// Built in Express middleware for parsing JSON
app.use(express.json())

let items = [] // empty list of items

// Get all items
app.get('/items', (req, res) => {
    res.json(items)
})

// Add a new item
app.post('/items', (req, res) => {
    items.push(req.body)
    res.status(201).json(req.body)
})

// Get a specific item
app.get('items/:id', (req, res) => {
    const item = items.find(i => i.id === parse(req.params.id))
    if (!item) return res.status(404).json({message: "item not found"})
    res.json(item)
})

// Update an item
app.put('items/:id', (req, res) => {
    const item = items.find(i => i.id === parse(req.params.id))
    if (!item) return res.status(404).json({message: "item not found"})
    
    Object.assign(item, req.body)
    res.json(item)
})

// Delete an item
app.delete('/items/:id', (req, res) =>{
    const index = items.findIndex(i => i.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({message: "item not found"})

    items.splice(index, 1)
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Sever running on http://localhost:${port}`)
})