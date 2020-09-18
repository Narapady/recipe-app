const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

const appID = 'fff1588a';
const appKey = 'da13a58bf65ccd4f18f656756117a4c4';


searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  container.classList.remove('initial');
  searchQuery = e.target.querySelector('input').value;
  fetchData(searchQuery)
    .then(data => generateHTML(data.hits))
    .catch(err => console.log(err));

  searchForm.reset();

});


async function fetchData(item) {
  const baseURL = `https://api.edamam.com/search?q=${item}&app_id=${appID}&app_key=${appKey}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  return data;
}

function generateHTML(results) {
  let html = '';
  results.forEach(result => {
    html += `
    <div class="item">
      <img src=${result.recipe.image} alt="">
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a href=${result.recipe.url} target="_blank">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${Math.floor(result.recipe.calories)}</p>
      <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0? result.recipe.dietLabels : 'No Data Found'}</p>
      <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
    </div>
    `;
  });
  searchResultDiv.innerHTML = html;
}