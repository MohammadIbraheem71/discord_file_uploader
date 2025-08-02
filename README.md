bot link: https://discord.com/oauth2/authorize?client_id=1398236644405936259&permissions=43008&integration_type=0&scope=bot

This project uses the Discord js api to store and delete files in a channel in a personal server.
there is no password protection of encryption of any form as this was meant to be a small passion project.

express is used on the backend to manage routes. multer is used as a middleware to process files before sending them over to the discord bot to be saved.
react has been used to create the frontend.

to use this, create an env file in the backend with your bot token (labelled BOT_TOKEN) and your channel id (labelled CHANNEL_ID)
