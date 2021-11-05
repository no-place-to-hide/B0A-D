import createPersistedState from 'vuex-persistedstate';
import { Store } from 'vuex';

export default ({ store }: { store: Store<unknown> }) => {
    createPersistedState()(store);
};
