import ChatMessage from "~/types/chat-message";
import User from "~/types/user";

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
    messages
        .sort((lhs, rhs) => lhs.date.getTime() - rhs.date.getTime())
        .filter((msg) => msg.message?.trim().length ?? 0);

    return [
        ...messages.filter((msg) => !msg.isEditing),
        ...messages.filter((msg) => msg.isEditing),
    ];
};
