const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors')

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
