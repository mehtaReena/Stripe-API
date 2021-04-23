

const Publishablekey = 'pk_test_51Iit5TSA1fSdY1w9QYkfNNHwDLAspR8Qxa3idjfH1UjESpNPKtEyCclwogBZeQW00dZuWRxJ5mebPLiXtDbJeY5w00JZguEpXu';
const Secretkey = 'sk_test_51Iit5TSA1fSdY1w9GQXOLNFUTS3gVqQWRaP3FZCezcFGWb73xXAOYoYBzg1tKT9E8A2qNV823AIbRvb48QzyFUx9004UKDRfLH';

const stripe = require('stripe')(Secretkey);
const readlineSync = require('readline-sync');

let tok_mastercard = "";

let cardNumber = readlineSync.question("Enter your card no :")  ; //4242424242424242
let exp_month = readlineSync.question("Enter card expiry month :") ;//4
let exp_year = readlineSync.question("Enter card expiry year :"); //2022
let cvc_Code = readlineSync.question("Enter card CVC Code:"); //314








async function gettoken() {
  const token = await stripe.tokens.create({
    card: {
      number: `${cardNumber}`,
      exp_month:`${exp_month}`,
      exp_year: `${exp_year}`,
      cvc: `${cvc_Code}`
    },
  });
  return token;

}

const tokenPromise = gettoken();
tokenPromise.then((token) => {

  tok_mastercard = token.id;
  console.log(tok_mastercard);
  getCharged(token.id);

}).catch((err)=>{
  console.log("Card Error :"+ err.message)
});

async function getCharged(tok_mastercard) {
  try {
 let  payment = await stripe.charges.create({
    description: 'Software development services',
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: 10,
    currency: 'usd',
    //payment_method_types: ['card'],
    source: tok_mastercard
  })
} catch(err){
  console.log(" Error From Fetach " + err.message)

}

}






/*     async function getCharged(tok_mastercard){
       const charge = await stripe.charges.create({
           amount: 999,
           currency: 'inr',

           description: 'Example charge',
           source: tok_mastercard
         });
         return charge;
        
   } */

