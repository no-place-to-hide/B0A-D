import { Mutation } from 'vuex';
import ChatMessage from '@/types/chat-message';

interface State {
    chatMessages: ChatMessage[];
    time: string;
    token: string;
}

export const state: () => State = () => ({
    chatMessages: [],
    time: 'when i am',
    token: '',
});

export const mutations: { [key: string]: Mutation<State> } = {
    setChatMessages(state, messages: ChatMessage[]) {
        state.chatMessages = messages;
    },

    setTime(state, time: string) {
        state.time = time;
    },

    setToken(state, token: string) {
        state.token = token;
    },
};
