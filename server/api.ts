import express from 'express';

const app = express();

app.use(express.json());
app.all('/get.json', (req, res) => {
    res.json({ data: 'data' });
});

export default app;
