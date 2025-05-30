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

app.get('/collectibles/:collectIndex', (req, res) => {
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const index = Number(req.params.collectIndex)
  if (index >= 0 && index < collectibles.length) {
    res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`)
  } else {
    res.send('This item is not yet in stock. Check back soon!')
  }
})

app.get('/shoes', (req, res) => {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

  const minPrice = Number(req.query.minprice);
  const maxPrice = Number(req.query.maxprice);
  const type = req.query.type;

  let filteredShoes = [];

  if (!isNaN(minPrice)) {
    filteredShoes = shoes.filter((shoe) => {
      return shoe.price >= minPrice
    });
  } else if (!isNaN(maxPrice)) {
    filteredShoes = shoes.filter((shoe) => {
      return shoe.price <= maxPrice
    });
  } else if (type) {
    filteredShoes = shoes.filter((shoe) => {
      return shoe.type === type
    });
  } else {
    filteredShoes = shoes;
  }

  let response = "Filtered list:";
  filteredShoes.forEach(shoe => {
    response += ` ${shoe.name}-${shoe.price}-${shoe.type} `;
  });

  res.send(response);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})