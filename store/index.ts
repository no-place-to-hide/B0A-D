import { Mutation } from 'vuex';

interface State {
    chatMessages: ChatMessage[];
    time: string;
}

export const state: () => State = () => ({
    chatMessages: [],
    time: 'when i am',
});

export const mutations: { [key: string]: Mutation<State> } = {
    setChatMessages(state, messages: ChatMessage[]) {
        state.chatMessages = messages;
    },

    setTime(state, time: string) {
        state.time = time;
    },
};
