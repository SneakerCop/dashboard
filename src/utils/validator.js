import validator from 'validator';

export function notificationsField (input) {
    let options = ['Enabled', 'Disabled', ''];
    for (let i = 0; i < options.length; i++) {
        if (options[i] === input) return input;
    }
    throw "Invalid Input for Notification Field";
};

export function twitterField (input) {
    console.log('input:', input)
    if (validator.isAlpha(input)) {
        return input;
    } else {
        throw "Invalid Input for Twitter Handle Field";
    }
};

export function emailField (input) {
    if (validator.isEmail(input)) {
        return input;
    } else {
        throw "Invalid Input for Email Field";
    }
};