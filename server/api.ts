import express from 'express';
import { newUser } from './user-pool';

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.all('/new_user', (req, res) => {
    const user = newUser();
    res.json({ username: user.username, password: user.password });
});

export default app;
