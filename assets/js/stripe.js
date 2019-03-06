var stripe = Stripe(document.getElementById("publishable_key").value)
var elements = stripe.elements()
var card = elements.create('card', {
    hidePostalCode: true
});
var complete = false;
var style = {
    base: {
        iconColor: '#F99A52',
        color: 'white',
        lineHeight: '48px',
        fontWeight: 400,
        fontFamily: '"Open Sans", "Helvetica Neue", "Helvetica", sans-serif',
        fontSize: '15px',
        '::placeholder': {
          color: '#CFD7DF',
        },
        invalid: {
            iconColor: "#FFC7EE",
            color: "#FFC7EE"
          }
    }       
};
card.mount('#card-element', {
    style: style
})
card.addEventListener('change', function (event) {
    complete = event.complete;
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});
/* Handle form submission */
var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-button');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (complete) {
        submitButton.disabled = true
        let tokenData = {
            name: $('input[name="name"]').val(),
            address_line1: $('input[name="address_line1"]').val(),
            address_city: $('input[name="address_city"]').val(),
            address_state: $('select[name="address_state"]').val(),
            address_zip: $('input[name="address_zip"]').val(),
            address_country: 'United States'
        }
        stripe.createToken(card, tokenData).then(function (result) {
            if (result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
                submitButton.disabled = false
            } else {
                stripeTokenHandler(result.token);
            }
        });
    } else {
        form.submit();
    }
});

function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    form.submit();
}