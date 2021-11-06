import { ServerMiddleware } from '@nuxt/types';
import { Server } from 'socket.io';
import moment from 'moment';
import { getUser } from './user-pool';
import { generate as passwordGenerator } from 'generate-password';
import { getAllMessages, getNewMessage } from './message-pool';
import ChatMessage from '~/types/chat-message';
import User from '~/types/user';

const io = new Server(3001, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    const id = socket.id;
    let user: User | null = null;
    let msg: ChatMessage | null = null;

    socket.on(
        'auth-request',
        (data: { login?: string; password?: string; token?: string }) => {
            user = getUser({
                username: data.login,
                password: data.password,
                token: data.token,
            });

            if (user != null) {
                const token = passwordGenerator({
                    length: 32,
                    lowercase: true,
                    numbers: true,
                });
                user.tokens.push(token);
                socket.emit('auth-accept', token);
            }
        }
    );

    socket.on('get-messages', () => {
        io.emit('update-message-list', getAllMessages());
    });

    socket.on('edit-message', (message: string) => {
        if (!user) return;
        if (!msg) msg = getNewMessage(user);

        msg.message = message;
        msg.date = new Date();

        io.emit('update-message-list', getAllMessages());
    });

    socket.on('save', (message: string) => {
        if (!user) return;
        if (!msg) return;

        msg.message = message;
        msg.date = new Date();
        msg.isEditing = false;

        msg = null;

        io.emit('update-message-list', getAllMessages());
    });

    socket.on('disconnect', () => {
        if (!user) return;
        if (!msg) return;

        msg.isEditing = false;
        msg.date = new Date();

        io.emit('update-message-list', getAllMessages());
    });
});

const timeout = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

const updateTime = async () => {
    while (true) {
        const time = moment().format('D/MM/YY h:mm A');
        io.emit('update-time', time);
        await timeout(1000);
    }
};

updateTime();

const middleware: ServerMiddleware = (req, res, next) => {
    next();
};

export default middleware;
export { io };
