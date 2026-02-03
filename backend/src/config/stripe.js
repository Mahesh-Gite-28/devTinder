const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);//instance of stripe

module.exports = stripe;