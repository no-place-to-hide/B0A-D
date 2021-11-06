import express from 'express';
import { newUser } from './user-pool';

const app = express();

app.use(express.json());
app.all('/new_user', (req, res) => {
    const user = newUser();
    res.json({ username: user.username, password: user.password });
});

export default app;
