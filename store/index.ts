import { Mutation } from 'vuex';

interface State {
    chatMessages: ChatMessage[];
}

export const state: () => State = () => ({
    chatMessages: [],
});

export const mutations: { [key: string]: Mutation<State> } = {
    setChatMessages(state, messages: ChatMessage[]) {
        state.chatMessages = messages;
    },
};
