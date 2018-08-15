function createEnvSettingsFile() {
  return `window.personopplysningerSettings = {
            API_URL: '${process.env.API_URL}'
        };`;
}

module.exports = createEnvSettingsFile;
