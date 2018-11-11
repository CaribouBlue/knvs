import utils from './';

export const logError = (error) => {
  console.error(`\n\n--- ERROR ---\n${error}\n--- END ---\n\n`);
}

export const handleErr = (error, data, msg, location) => {
  const errorRespObj = utils.resp.createRespObj(error, data, msg, location);
  logError(errorRespObj);
  return errorRespObj;
}
