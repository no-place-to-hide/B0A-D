<template>
    <div class="container">
        <div class="row">
            <div class="col">TEST</div>
        </div>
        <div
            class="row"
            v-for="(msg, idx) in $store.state.chatMessages"
            :key="idx"
            :style="{ color: msg.color }"
        >
            <div class="col">
                {{ msg.message }}
            </div>
        </div>
        <div class="row">
            <div class="col">
                <textarea
                    :value="text"
                    @input="text = $event.target.value"
                    @submit.prevent="save"
                    style="width: 100%"
                />
                <button @click="save">Send</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Index extends Vue {
    mounted() {
        this.socket = this.$nuxtSocket({}) as Socket;
        this.socket.emit('get-messages');
    }

    socket!: Socket;
    text = '';

    save() {
        this.socket.emit('save', this.text);
        this.text = '';
    }

    @Watch('text')
    watchText() {
        this.socket.emit('edit-message', this.text);
    }
}
</script>
