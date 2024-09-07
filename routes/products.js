// routes/products.js
const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

// Generate fake product data
function generateProducts(num) {
  return Array.from({ length: num }, (_, id) => ({
    id: id + 1,
    name: faker.commerce.productName(),
    image: "",
    price: faker.commerce.price(),
    oldPrice: faker.commerce.price(),
    discount: '20% OFF',
    description: faker.lorem.sentence()
  }));
}

// Route to get all products
router.get('/', (req, res) => {
  res.json(generateProducts(6)); // Generate 5 products
});

module.exports = router;
