<template>
    <v-container fill-height>
        <v-row align="center">
            <v-spacer />
            <v-col cols="auto">
                <v-card elevation="24" class="pl-md-10 pr-md-10">
                    <v-card-subtitle class="text--disabled text-center">
                        — {{ $store.state.time }} —
                    </v-card-subtitle>
                    <v-card-title class="justify-center text-uppercase">
                        111010.010101.111
                    </v-card-title>
                    <v-card-text class="d-sm-flex justify-center">
                        <v-form>
                            <v-text-field
                                label="login"
                                v-model="login"
                                solo
                                flat
                                outlined
                                dense
                            />
                            <v-text-field
                                label="password"
                                type="password"
                                v-model="password"
                                solo
                                flat
                                outlined
                                dense
                            />
                            <v-card-actions>
                                <v-spacer />
                                <a
                                    @click.prevent="letMeIn"
                                    class="
                                        blue--text
                                        text--darken-4 text-decoration-underline
                                    "
                                >
                                    Let Me In
                                </a>
                                <v-spacer />
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Socket } from 'socket.io-client';

@Component
export default class Index extends Vue {
    mounted() {
        this.socket = this.$nuxtSocket({}) as Socket;
        this.socket.on('auth-accept', (token: string) => {
            this.$store.commit('setToken', token);
            this.$router.push('chat');
        });

        this.socket.on('update-time', (time: string) => {
            this.$store.commit('setTime', time);
        });
    }

    socket!: Socket;

    login = '';
    password = '';

    letMeIn() {
        console.log('click');
        this.socket.emit('auth-request', {
            login: this.login,
            password: this.password,
        });
    }
}
</script>
