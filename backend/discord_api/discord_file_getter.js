

const { client, readyPromise } = require('./client.js');

async function get_files_from_discord(){
    try{

        await readyPromise
        
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);
        if (!channel || channel.isTextBased() == false){
            throw new Error('channel is not a text based channel.')
        }

        let messages = [];
        var last_id = null;

        while(true){
            const options = {
                limit : 100
            };

            if (last_id){
                options.before = last_id;
            }

            const batch = await channel.messages.fetch(options);

            if (batch.size === 0){
                break;
            }

            messages.push(...batch.values());
            last_id = batch.last().id;

        }

        //collecting file information
        const files = [];
        for (const msg of messages){
            for (const attachment of msg.attachments.values()){
                files.push(
                    {
                        file_name: attachment.name,
                        file_size: attachment.size,
                        file_message_id: msg.id,
                        file_url: attachment.url
                    }
                );

                //console.log("message_id = ", attachment.id);
            }
        }

        return files;
    }
    catch(err){
        console.log('there was an error in get_files_from_discord: ', err)
        
        throw err;
    }
}

module.exports = { get_files_from_discord}