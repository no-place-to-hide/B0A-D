import ChatMessage from '~/types/chat-message';
import User from '~/types/user';

const messages: ChatMessage[] = [];

export const getNewMessage = (user: User) => {
    const message: ChatMessage = {
        date: new Date(),
        message: '',
        isEditing: true,
        color: user.color,
    };

    messages.push(message);

    return message;
};

export const getAllMessages = () => {
    const filterMessages = messages
        .sort((lhs, rhs) =>
            lhs.isEditing || rhs.isEditing
                ? 0
                : lhs.date.getTime() - rhs.date.getTime()
        )
        .filter((msg) => msg.message?.trim().length ?? 0);

    return [
        ...filterMessages.filter((msg) => !msg.isEditing),
        ...filterMessages.filter((msg) => msg.isEditing),
    ];
};
