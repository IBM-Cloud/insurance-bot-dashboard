export const callApi = (endpoint, {
  apiUrl = '/chatlogs',
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) =>
  fetch(`${apiUrl}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) throw json;

    return json;
  });


export const getLogs = () => callApi('');


export const api = {
  getLogs,
};

export default api;
