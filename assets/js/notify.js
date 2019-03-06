Noty.overrideDefaults({    
    layout: 'topLeft',
    theme: 'nest',
    timeout: '4000',
    progressBar: true,
    closeWith: ['click'],
    killer: true
});
new Noty({
    type: 'success', // alert, success, error, warning, info
    text: 'Welcome! 🤖'
}).show();