<template>
    <v-container fill-height>
        <v-row align="center">
            <v-spacer />
            <v-col class="col-12 col-sm-7">
                <v-card
                    elevation="24"
                    height="90vh"
                    class="d-flex flex-column pa-1 pa-md-7"
                >
                    <div
                        class="flex-grow-1 d-flex flex-column"
                        style="overflow: auto !important"
                        ref="messages"
                    >
                        <message
                            v-for="msg in messageList"
                            :key="msg.date"
                            :msg="msg"
                        />
                    </div>
                    <div
                        class="
                            d-flex
                            flex-row flex-shrink-1
                            align-content-center
                        "
                    >
                        <v-textarea
                            v-model="text"
                            height="15vh"
                            label="Your Message..."
                            no-resize
                            solo
                            flat
                            outlined
                            dense
                        />
                        <a
                            @click.prevent="save"
                            class="
                                ml-5
                                blue--text
                                text--darken-4 text-decoration-underline
                                align-content-center
                            "
                        >
                            Enter
                        </a>
                    </div>
                </v-card>
            </v-col>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Socket } from 'socket.io-client';
import { Component, Vue, Ref } from 'vue-property-decorator';
import Message from '@/components/message.vue';
import ChatMessage from '~/types/chat-message';

@Component({
    components: {
        Message,
    },
})
export default class Chat extends Vue {
    @Ref('messages')
    messagesDiv!: HTMLDivElement;

    mounted() {
        this.socket = this.$nuxtSocket({}) as Socket;
        this.socket.emit('auth-request', {
            token: this.$store.state.token,
        });
        this.socket.emit('get-messages');
        this.socket.on('update-message-list', (messages: unknown[]) => {
            this.$store.commit('setChatMessages', messages);
            this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
            //this.messagesDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

    socket!: Socket;
    ptext = '';

    get text() {
        return this.ptext;
    }

    set text(val: string) {
        this.ptext = val;
        this.socket.emit('edit-message', val);
    }

    save() {
        this.socket.emit('save', this.ptext);
        this.text = '';
    }

    get messageList() {
        return this.$store.state.chatMessages.filter(
            (msg: ChatMessage) => msg.message?.trim().length
        );
    }
}
</script>
