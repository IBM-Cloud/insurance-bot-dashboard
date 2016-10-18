export const callApi = (endpoint, {
  baseUrl = '',
  headers = { 'Content-Type': 'application/json' },
  method = 'GET',
  body,
} = {}) =>
  fetch(`${baseUrl}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) throw json;

    return json;
  });


export const getLogs = () => callApi('chatlogs');
export const getTone = (conversationID) => callApi(`tone/${conversationID}`);

export const api = {
  getLogs,
  getTone,
};

export default api;
