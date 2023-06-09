const clave = "pk_test_51NGoMYKHK5Lj2B4WPYtfPdUSEo9KfTbC2I8csrudR3a7evmHClOtfSGwGO8HGfVeIHshA1zfJHq5JS645SajXsZj002wp9a5kT"

const stripe = Stripe(clave);
const elements = stripe.elements();

const style = {
    base: {
      color: '#000000', // Modifica el color del texto del placeholder
      '::placeholder': {
        color: '#C4C4C4' // Modifica el color del placeholder
      }
    }
  };
  
  const cardNumberElement = elements.create('cardNumber', { style });
  cardNumberElement.mount('#card-number-element');
  
  const cardExpiryElement = elements.create('cardExpiry', { style });
  cardExpiryElement.mount('#card-expiry-element');
  
  const cardCvcElement = elements.create('cardCvc', { style });
  cardCvcElement.mount('#card-cvc-element');

const form = document.getElementById('payment-form');
const errorElement = document.getElementById('error-message');
console.log(cardNumberElement)

form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createPaymentMethod({
    type: 'card',
    card: cardNumberElement,
    billing_details: {
      name: document.getElementById('usernme').value
    }
  }).then(function(result) {
    if (result.error) {
      errorElement.textContent = result.error.message;
    } else {
      // Send the payment method ID to your server
      stripeTokenHandler(result.paymentMethod);
    }
  });
});

function stripeTokenHandler(paymentMethod) {
  // Insert the payment method ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'paymentMethod');
  hiddenInput.setAttribute('value', paymentMethod.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}