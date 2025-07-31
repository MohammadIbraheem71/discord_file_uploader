const { client, readyPromise } = require('./client.js');
const { AttachmentBuilder } = require('discord.js');

async function upload_buffer_to_discord(fileBuffer, fileName) {
  try{
    await readyPromise;

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);
    const attachment = new AttachmentBuilder(fileBuffer, { name: fileName });

    const message = await channel.send({
      files: [attachment]
    });

    return {
      url: message.attachments.first().url,
      message_id: message.id
    };
  }
  catch(err){

    console.log("something went wrong in upload_buffer_to_discord")
    throw err;
  }
}

module.exports = { upload_buffer_to_discord };
