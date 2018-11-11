import * as envDev from './env.dev';

let env;

if (envDev) {
  console.log('--- DEV ENV ---');
  env = envDev;
} else {
    console.log('--- PROD ENV ---');
}

export default env;
