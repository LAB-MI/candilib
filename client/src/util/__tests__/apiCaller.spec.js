import test from 'ava';
import nock from 'nock';

import callApi, { API_URL } from '../apiCaller';

test('method defaults to GET', async (t) => {
  const reply = { foo: 'bar' };
  nock(API_URL)
    .get('/foo')
    .reply(200, reply);
  const response = await callApi('foo');
  t.deepEqual(response, reply);
});

test('sends the body', async (t) => {
  const body = { id: 5 };
  const reply = { foo: 'bar' };
  nock(API_URL)
    .post('/foo', body)
    .reply(200, reply);
  const response = await callApi('foo', 'post', body);
  t.deepEqual(response, reply);
});

test('returns the error', async (t) => {
  const reply = { message: 'Errrrrrrrrr' };
  nock(API_URL)
    .get('/send_error')
    .reply(500, reply);
  const error = await callApi('send_error');
  t.deepEqual(error, reply);
});
