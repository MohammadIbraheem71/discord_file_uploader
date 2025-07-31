const { client, readyPromise } = require('./client.js');

//assumes that each message_id has only one attachment
async function delete_file_from_discord (message_id){
    try{
        await readyPromise;


        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        if (!channel || channel.isTextBased() == false){
            throw new Error('channel is not a text based channel.')
        }

        const message = await channel.messages.fetch(message_id);

        if (!message || (await message).attachments.size === 0){
            console.log("message not found");
            throw new Error("message not found");
        }

        await message.delete();

        console.log("message deleted sucessfully");
    }
    catch(err){
        console.log("error in delete_file_from_discord");
        throw err;
    }
}

module.exports = { delete_file_from_discord};