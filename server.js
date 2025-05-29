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

app.get('/collectibles/:collectIndex',(req,res)=>{
      const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const index = Number(req.params.collectIndex)
  if(index >= 0 && index < collectibles.length){
    res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`)
  } else {
    res.send('This item is not yet in stock. Check back soon!')
  }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})