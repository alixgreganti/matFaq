//datalynk.service.ts
//Alix Greganti 2023

// A simple service for communicating with public records from a datalynk spoke.
const url = 'https://api.datalynk.ca';
const reqHeader = new Headers();
reqHeader.append('Realm', 'sandbox'); // Replace sandbox with your spoke
reqHeader.append('Content-Type', 'application/json'); // Mandatory
reqHeader.append('Authorization', 'not set')

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

export async function getData(slice: number = 52093) {
  var newHeader = reqHeader;
  
  var raw = JSON.stringify({
    '$/slice/report': {
      slice: slice,
    },
  });

  var ask;
    console.log(newHeader.has('Authorization'))
    await getGuestToken().then((token) => {
      newHeader.set('Authorization', 'Bearer ' + token);
      ask = {
        method: 'POST',
        body: raw,
        headers: newHeader,
      };
    });

  console.log(newHeader);

  return fetch(url, ask)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log('error', error));
}
