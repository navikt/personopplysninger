// @ts-ignore
// En .env-fil med miljøvariabler må eksistere for lokal utvikling
test("Check environmental variables", () => {
  expect(process.env.REACT_APP_MILJO).not.toBeUndefined();
  expect(process.env.REACT_APP_PDL_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_SKJERMING_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_API_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_DSOP_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_TJENESTER_URL).not.toBeUndefined();
  expect(process.env.REACT_APP_LOGIN_URL).not.toBeUndefined();
});
