import { Mutation } from 'vuex';

interface State {
    tickId: number;
    chatMessages: ChatMessage[];
}

export const state: () => State = () => ({
    tickId: 0,
    chatMessages: [],
});

export const mutations: { [key: string]: Mutation<State> } = {
    setTickId(state, id) {
        state.tickId = id;
    },

    setChatMessages(state, messages: ChatMessage[]) {
        state.chatMessages = messages;
    },
};
