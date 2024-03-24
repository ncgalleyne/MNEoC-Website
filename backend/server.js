const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors')
const AWS = require('aws-sdk')
const { config } = require('dotenv')
// package.json sets APP_ENV in its scripts
const isProduction = process.env.APP_ENV === 'prod';

// load configuration based on environment
const { error, parsed: ENV_VARS } = config({
  path: isProduction ? '.env.prod' : '../.env.dev',
});
if (error) {
    // likely file missing
    console.error(`Error loading configuration: ${error}`);
}

console.log('prod: ', isProduction)
console.log('environment set to: ', process.env.APP_ENV)

//start app
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;
const s3 = new AWS.S3({
    accessKeyId: ENV_VARS['BUCKETEER_AWS_ACCESS_KEY_ID'],
    secretAccessKey: ENV_VARS['BUCKETEER_AWS_SECRET_ACCESS_KEY'],
    region: ENV_VARS['BUCKETEER_AWS_REGION'],
})

app.use(express.json());
app.use(cors());

app.post('/api/events', async (req, res) => {
    const { title, description, date } = req.body;
    console.log(req.body)
    try {
        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date)
            }
        });
        res.status(201).json(event);
    } catch (error) {
        console.error('Failed to add event:', error);
        res.status(500).json({ error: 'Failed to add event' });
    }
});

app.get('/api/images', async (req, res) => {
    const params = {
        Bucket: ENV_VARS['BUCKETEER_BUCKET_NAME'],
        Prefix: 'public/slideshow',
    };
    
    try {
        const data = await s3.listObjects(params).promise()
        const imgList = data.Contents.map(file => {
            return `https://${params.Bucket}.s3.amazonaws.com/${file.Key}`;
        });
        res.json(imgList)
    } catch (err) {
        console.log("Error", err);
        res.status(500).send("An error occurred while fetching images.");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
