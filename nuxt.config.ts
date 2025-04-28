// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxtjs/mdc"],
  runtimeConfig: {
    openaiApiKey: "Hello",
    public: {
      someValue: "on the frontend!",
    },
  },
  mdc: {
    highlight: {
      theme: {
        default: "solarized-light",
        dark: "solarized-dark",
      },
      langs: ["html", "javascript", "typescript", "vue", "markdown"],
    },
  },
});
