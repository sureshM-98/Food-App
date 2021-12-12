const stripe = require('stripe')('sk_test_51IkNMcSErzomcT7yggrURWVWiPshOBDY7sP7XeeSJwwNKjXz8OoNgCLm34oN1zOoak1wKaZthviazWwlkQLC10Q300A7tXDmxo');
const { v4: uuidv4 } = require('uuid');

exports.makePayment = (req, res) => {
  const { products, token } = req.body;
  console.log('PRODUCTS', products);

  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          {
            idempotencyKey,
          },
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    });
};
