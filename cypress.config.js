const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true,
    quiet: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1536,
    viewportHeight: 960,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // espaço reservado para plugins / eventos de node
      return config
    },
  },
})
