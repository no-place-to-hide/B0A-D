<template>
    <div class="d-flex flex-column pa-5">
        <div :style="{ color: msg.color }">{{ msg.message }}</div>
        <div class="text--disabled">-{{ date }}-</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChatMessage from '@/types/chat-message';
import moment from 'moment';

@Component
export default class Message extends Vue {
    @Prop({ type: Object as () => ChatMessage })
    msg!: ChatMessage;

    get date() {
        return moment(this.msg.date).format('D/MM/YY h:mm A');
    }
}
</script>
