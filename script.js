var breweryList = document.getElementById('breweries');
var searchInput = document.getElementById('search');

async function getBreweries() {
  try {
    let res = await fetch('https://api.openbrewerydb.org/breweries');
    let res1 = await res.json();
    return res1;
  } catch (error) {
    console.error(error);
  }
}

function displayBreweries(breweries) {
  breweryList.innerHTML = '';

  if (breweries.length > 0) {
    for (let i = 0; i < breweries.length; i++) {
      let brewery = breweries[i];

      let breweryElem = document.createElement('id');
      breweryElem.innerHTML = `
        <h2>${brewery.name}</h2>
        <p>Type: ${brewery.brewery_type}</p>
        <p>Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}, ${brewery.country}</p>
        <p>Website: <a href="${brewery.website_url}">${brewery.website_url}</a></p>
        <p>Phone: ${brewery.phone}</p>      `;

      breweryList.appendChild(breweryElem);
    }
  } else {
    
    breweryList.innerHTML = '<id>No breweries found.</id>';
  }
}

async function searchBreweries(searchText) {
  const breweries = await getBreweries();

  let filteredBreweries = breweries.filter(brewery =>
    brewery.name.toLowerCase().includes(searchText.toLowerCase())
  );

  displayBreweries(filteredBreweries);
}

searchInput.addEventListener('input', event => {
  searchBreweries(event.target.value);
});
getBreweries()
  .then(breweries => displayBreweries(breweries))
  .catch(error => console.error(error));
