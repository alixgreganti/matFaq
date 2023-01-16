//datalynk.service.ts
//Alix Greganti 2023

var raw = JSON.stringify({
  '$/slice/report': {
    slice: 52053,
  },
});

// A simple service for communicating with public records from a datalynk spoke.
const url = 'https://api.datalynk.ca';

const reqHeader = new Headers();
reqHeader.append('Realm', 'sandbox'); // Replace sandbox with your spoke
reqHeader.append('Content-Type', 'application/json'); // Mandatory

function getGuestToken() {
  const guestUrl = url + '/guest';
  var req = {
    method: 'POST',
    headers: reqHeader,
  };

  return fetch(guestUrl, req) // Fetch token
    .then((response) => response.json()) // Reformat the response
    .then((data) => {
      // Extract the token from the response data and return it
      return data.token;
    });
}

export async function getData() {
  var ask;
  var answer;
  await getGuestToken().then((token) => {
    reqHeader.append('Authorization', 'Bearer ' + token);
    ask = {
      method: 'POST',
      body: raw,
      headers: reqHeader,
    };
  });

  /* Displays contents of header
  reqHeader.forEach((value, key) => {
    console.log(key + ': ' + value);
  });
  */

  return fetch(url, ask)
    .then((response) => answer = response)
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));

}
