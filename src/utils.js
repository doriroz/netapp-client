const APP_URL = "https://netapp-server-doriroz.herokuapp.com/api/";
// const APP_URL = "http://localhost:8080/api/";

//get route
export function get(route) {
  return fetch(APP_URL + route).then((response) => response.json());
}

// let get = (route) =>
//   fetch("http://localhost:8080/api/" + route).then((response) =>
//     response.json()
//   );

//post route
export function post(route, newObj) {
  return fetch(APP_URL + route, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj),
  });
}

// let post = (route, body) =>
//   fetch(`http://localhost:8080/api/${route}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });

export function remove(route) {
  return fetch("http://localhost:8080/api/" + route, {
    method: "DELETE",
  }).then((response) => response.json());
}
