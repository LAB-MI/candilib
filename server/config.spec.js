import config from './config';
import test from 'ava';


test('config should have a mongoURL property', t => {
  t.true(config.mongoURL !== undefined)
});
