<template>
    <v-app>
        <v-container fluid>
            <v-row>
                <v-col>
                    <nuxt />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Default extends Vue {}
</script>
