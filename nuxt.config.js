/** @type {import('nuxt-socket-io').NuxtSocketIoOptions} */
/** @type {import('vue-class-component/hooks')} */

const ioUrl = `http://${process.env.BASE_URL}:3001`;
console.log(ioUrl);

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'board',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['bootstrap/dist/css/bootstrap-grid.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['@/plugins/persistedstate.client.ts'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/dotenv',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'nuxt-socket-io',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    router: {
        mode: 'abstract',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    serverMiddleware: [
        { path: '/api', handler: '@/server/api.ts' },
        { handler: '@/server/socket.ts' },
    ],

    io: {
        sockets: [
            {
                default: true,
                name: 'main',
                url: ioUrl,
                vuex: {
                    mutations: [
                        {
                            'update-message-list': 'setChatMessages',
                        },
                    ],
                },
            },
        ],
    },
};
