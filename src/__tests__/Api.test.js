import Api from 'js/Api';

it('it crashes', async () => {
  expect.assertions(1);
  await expect(Api.fetchPersonInfo()).rejects.toEqual(new SyntaxError('Unexpected end of JSON input'));
});

it('handling Unauthorized', async () => {
  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: 'original_url',
  });

  fetch.mockResponseOnce(JSON.stringify({}), { status: 401 });
  expect.assertions(2);
  await expect(Api.fetchPersonInfo()).rejects.toEqual(new Error('Unauthorized'));
  await expect(window.location.href).toEqual('/personopplysninger-api/local/cookie?redirect=original_url');
});
