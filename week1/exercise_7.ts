import "isomorphic-fetch";

function fetchDataFromApi() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3333/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

fetchDataFromApi()
  .then((data) => {
    console.log("Data from API:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
