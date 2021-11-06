<style lang="scss" scoped>
.main-app {
    background-image: url('@/assets/test.svg') !important;
    background-size: cover !important;
    background-position: center center !important;
}
</style>

<template>
    <v-app class="main-app">
        <nuxt />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Default extends Vue {}
</script>
