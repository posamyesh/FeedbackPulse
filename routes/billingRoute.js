const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
module.exports = (app) =>{
    app.post('/api/stripe', requireLogin, async(req,res) =>{
        
        try {
            const source = await stripe.sources.create({
                type: "card",
                token: req.body.id
            });
            const charge = await stripe.paymentIntents.create({
                amount: 500,
                currency: 'inr',
                description: '$5 for 5 credits',
                source: source.id // Use the Source ID instead of the token
            });
            req.user.credits +=5;
            const user = await req.user.save(); 
            res.status(200).send(user);
        } catch (error) {
            console.error("Error creating payment intent:", error);
            res.status(500).send({ error: "Error creating payment intent" });
        }
    });
}
