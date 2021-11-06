<template>
    <v-container>
        <v-row>
            <v-spacer />
            <v-col cols="auto">
                <v-card>
                    <v-card-subtitle class="text--disabled text-center">
                        — 5/24/19 5:35PM —
                    </v-card-subtitle>
                    <v-card-title class="justify-center text-uppercase">
                        First American Financial Corporation
                    </v-card-title>
                    <v-cart-text class="d-sm-flex justify-center">
                        <v-form>
                            <v-text-field label="login" solo flat outlined />
                            <v-text-field
                                label="password"
                                type="password"
                                solo
                                flat
                                outlined
                            />
                            <v-card-actions>
                                <v-spacer />
                                <a
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
                    </v-cart-text>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="5">
                                <a
                                    class="
                                        blue--text
                                        text--darken-4 text-decoration-underline
                                    "
                                >
                                    Нажимая продолжить, я принимаю условия
                                    пользовательского соглашения
                                </a>
                            </v-col>
                            <v-spacer />
                            <v-col cols="5" class="text-right">
                                <a
                                    class="
                                        blue--text
                                        text--darken-4 text-decoration-underline
                                    "
                                >
                                    Нажимая продолжить, я принимаю условия
                                    пользовательского соглашения
                                </a>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
            <v-spacer />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Index extends Vue {}
</script>
