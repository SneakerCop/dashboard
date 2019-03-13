# Dashboard

User dashboard for Kleidi group users (Stripe)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Setting up Enviromental Variables for Production
Setting up the dashboard is a fairly easy process and will require you to collect very specific values to make everything work together.

| Name                  |  Value / Description                                                                                                                  |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| MONGODB_URI           | The existing MongoDB URI that you're currently using for your keybot server.                                                          |
| SESSION_SECRET        | Random String Value (Can generate one here: https://www.guidgenerator.com)                                                            |
| DISCORD_CLIENT_ID     | Existing Discord Developers Client ID that is being used for your keybot server.                                                      |
| DISCORD_CLIENT_SECRET | Existing Discord Developers Client Secret that is being used for your keybot server.                                                  |
| DISCORD_BOT_TOKEN     | Existing Discord Developers Bot Token that is being used for your keybot server.                                                      |
| DISCORD_CALLBACK      | Callback URL that must be set as an OAuth Redirect on the Discord Developers Site. Example: http://mydomain.com/auth/discord/callback |
| STRIPE_PUBLIC_KEY     | Existing Stripe Public Key being used on your keybot server.                                                                          |
| STRIPE_PRIVATE_KEY    | Existing Stripe Private Key being used on your keybot server.                                                                         |
| GUILD_ID              | ID pertaining to your Discord Group. Can be found here, if your Discord is in Developers Mode: https://i.imgur.com/AqATMum.png        |

## Discord OAuth Redirect
Log into the [Discord Developers Website](https://discordapp.com/developers/applications/) and click on your desired application. To the left, you'll see a section called "OAuth2". Add and save a redirect URL named `https://<YOUR DOMAIN HERE>/auth/discord/callback` and be sure to click Save Changes

## Stripe Webhooks

When logged into your Stripe account, going under `Developers > Webhooks` click the `Add Endpoint` button and set the value as `https://yourdomain.com/webhooks/stripe` and then click `Add Endpoint` when you're done.
