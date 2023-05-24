// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase'
  ],
  extends: [
    '@shuriken-ui/nuxt'
  ],
  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV
    }
  }
})
