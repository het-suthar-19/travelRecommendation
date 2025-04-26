const searchBtn = document.getElementById("searchBtn");

const fetchAllData = async (searchedKeyword) => {
    let response = await fetch('./travel_recommendation_api.json');
    let data = await response.json();

    let keyword = searchedKeyword.toLowerCase().trim();

    let resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'resultsContainer';
        document.querySelector('main').appendChild(resultsContainer);
    }

    resultsContainer.innerHTML = "";

    let found = false;

    if (keyword === "beach" || keyword === "beaches") {
        found = true;
        resultsContainer.innerHTML += `<h2>Beaches Recommendations:</h2>`;
        resultsContainer.innerHTML += `<div class="cardsContainer">`;
        data.beaches.forEach(beach => {
            resultsContainer.innerHTML += `
                <div class="card">
                    <img src="${beach.imageUrl}" alt="${beach.name}">
                    <h3>${beach.name}</h3>
                    <p>${beach.description}</p>
                </div>
            `;
        });
        resultsContainer.innerHTML += `</div>`;
    } else if (keyword === "temple" || keyword === "temples") {
        found = true;
        resultsContainer.innerHTML += `<h2>Temples Recommendations:</h2>`;
        resultsContainer.innerHTML += `<div class="cardsContainer">`;
        data.temples.forEach(temple => {
            resultsContainer.innerHTML += `
                <div class="card">
                    <img src="${temple.imageUrl}" alt="${temple.name}">
                    <h3>${temple.name}</h3>
                    <p>${temple.description}</p>
                </div>
            `;
        });
        resultsContainer.innerHTML += `</div>`;
    } else {

        data.countries.forEach(country => {
            if (country.name.toLowerCase().includes(keyword)) {
                found = true;
                resultsContainer.innerHTML += `<h2>City Recommendations in ${country.name}:</h2>`;
                resultsContainer.innerHTML += `<div class="cardsContainer">`;
                country.cities.forEach(city => {
                    resultsContainer.innerHTML += `
                        <div class="card">
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        </div>
                    `;
                });
                resultsContainer.innerHTML += `</div>`;
            }
        });
    }

    if (!found) {
        resultsContainer.innerHTML = `<h2>No recommendations found for "${searchedKeyword}".</h2>`;
    }
};

searchBtn.addEventListener('click', () => {
    let searchedKeyword = document.getElementById('searchKeyword').value;
    fetchAllData(searchedKeyword);
});

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    document.getElementById('searchKeyword').value = "";
    let resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = "";
    }
});