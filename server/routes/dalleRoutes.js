import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E! ya5tttti' });
});
router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Missing prompt in the request body' });
        }

        const result = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        //console.log('OpenAI API Response:', result.data[0].b64_json);

        // Check if result.data and result.data.data are defined before accessing their properties
        const image = result.data[0]?.b64_json;

        if (!image) {
            return res.status(500).json({ error: 'Image not found in the OpenAI response' });
        }

        res.status(200).json({ photo: image });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error?.response?.data?.error?.message || 'Something went wrong' });
    }
});

export default router;
