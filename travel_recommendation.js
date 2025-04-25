const searchBtn = document.getElementById("searchBtn");

const fetchAllData = async (searchedKeyword) => {
    let response = await fetch('./travel_recommendation_api.json');
    let data = await response.json();

    console.log(data[searchedKeyword]);
}  

searchBtn.addEventListener('click', () => {
    let searchedKeyword = document.getElementById('searchKeyword').value
    fetchAllData(searchedKeyword)
});