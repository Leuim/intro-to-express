const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000
app.use(morgan('dev'))

app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}!`)
})

app.get('/roll/:dice', (req, res) => {
    const randomnumb = Math.floor(Math.random() * Number(req.params.dice))
    if (isNaN(req.params.dice)) {
        res.send('Please enter a number!')
    } else {
        res.send(`You rolled a ${randomnumb}`)
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})