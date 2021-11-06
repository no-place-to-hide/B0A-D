import { ServerMiddleware } from '@nuxt/types';
import { Server } from 'socket.io';
import seedrandom from 'seedrandom';

const io = new Server(3001, {
    cors: {
        origin: '*',
    },
});

const chatMessages: { [id: string]: ChatMessage[] } = {};
const newMessage = (id: string) => {
    if (!(id in chatMessages)) {
        chatMessages[id] = [];
    }

    if (chatMessages[id].length != 0) {
        chatMessages[id] = chatMessages[id].map((msg) => ({
            message: msg.message,
            date: msg.date,
            color: msg.color,
            isEditing: false,
        }));
    }

    const msg: ChatMessage = {
        message: '',
        date: new Date(),
        isEditing: true,
        color: bg_color(id),
    };

    chatMessages[id] = [...chatMessages[id], msg];

    return msg;
};

const getLast = (id: string) => {
    if (id in chatMessages) {
        const messages = chatMessages[id].filter((msg) => msg.isEditing);
        if (messages.length == 0) {
            return newMessage(id);
        }

        return messages[messages.length - 1];
    }

    return newMessage(id);
};

const messageList = () => {
    const messages = Object.values(chatMessages)
        .flat()
        .sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime())
        .filter((msg) => msg.message);

    return [
        ...messages.filter((msg) => !msg.isEditing),
        ...messages.filter((msg) => msg.isEditing),
    ];
};

const bg_color = (id: string) => {
    const seed = seedrandom(id);

    const treshHold = (256 * 3) / 2;

    const x = Math.floor(seed.quick() * 256);
    const y = Math.floor(seed.quick() * Math.min(treshHold - x, 256));
    const z = Math.floor(seed.quick() * Math.min(treshHold - x - y, 256));

    const [r, g, b] = [x, y, z]
        .map((val) => ({ val, seed: seed.quick() }))
        .sort((a, b) => a.seed - b.seed)
        .map(({ val }) => val);

    const bgColor = `rgb(${256 - r}, ${256 - g}, ${256 - b})`;

    return bgColor;
};

io.on('connection', (socket) => {
    const id = socket.id;

    socket.on('get-messages', () => {
        io.emit('update-message-list', messageList());
    });

    socket.on('edit-message', (message) => {
        const msg = getLast(id);
        msg.message = message;

        io.emit('update-message-list', messageList());
    });

    socket.on('save', (message) => {
        const msg = getLast(id);
        msg.message = message ?? '';
        msg.isEditing = false;
        msg.date = new Date();

        io.emit('update-message-list', messageList());
    });

    socket.on('disconnect', () => {
        const msg = getLast(id);
        msg.message = msg.message ?? '';
        msg.isEditing = false;
        msg.date = new Date();

        io.emit('update-message-list', messageList());
    });
});

const middleware: ServerMiddleware = (req, res, next) => {
    next();
};

export default middleware;
export { io };
