export const createRespObj = (error=null, data=null, msg=null, location=null) => {
  return { error, data, msg, location };
}
