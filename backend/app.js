const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs')

const {upload_buffer_to_discord} = require('./discord_api/discord_file_uploader.js');
const {get_files_from_discord} = require('./discord_api/discord_file_getter.js');
const { delete_file_from_discord } = require('./discord_api/discord_file_deleter.js');
//require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

const storage = multer.memoryStorage();
const upload = multer ({storage: storage});

app.use(express.static('public'));

console.log("bot token:", process.env.BOT_TOKEN)
console.log('Token loaded:', typeof process.env.BOT_TOKEN, process.env.BOT_TOKEN?.length);


app.post('/upload', upload.single('file'), async (req, res) => {
    try{
        const file_buffer = req.file.buffer;
        const original_name = req.file.originalname;

        result = await upload_buffer_to_discord(file_buffer, original_name);

        console.log("file uploaded to discord sucessfully");
        res.status(200).json({
            message: 'file uploaded sucessfully'
        });
    } 
    catch(err){
        console.log("upload failed: ", err);

        res.status(500).json({
            message: 'error',
            error: 'upload failed'
        });
    }
});

app.post('/get_files', async (req, res) =>{
    try{

        const files = await get_files_from_discord();

        console.log("files gotten from discord sucessfully");

        res.status(200).json({
            message: 'sucess',
            file_list: files
        })

    }
    catch(err){
        console.log("get_files failed: ", err);
        
        res.status(500).json({
            message: 'error',
            error: 'get files failed'
        })
    }
})

app.post('/delete', async (req, res) => {
    try{

        console.log("req.body: ", req.body);


        const { message_id } = req.body;

        if (!message_id){
            throw new Error("message id is required");
        }

        const file_url = await delete_file_from_discord(message_id);

        res.status(200).json({
            message: 'sucess'
        })

    }
    catch(err){
        console.log("delete file failed: ", err);

        res.status(500).json({
            message: 'error',
            error: 'delete failed'
        })
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});