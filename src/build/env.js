function createEnvSettingsFile() {
  return `window.personopplysningerSettings = {
            API_URL: '${process.env.API_URL}',
            LOGIN_URL: '/personopplysninger-api/local/cookie'
        };`;
}

module.exports = createEnvSettingsFile;
