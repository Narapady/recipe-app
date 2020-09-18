// Get api info
const appID = 'fff1588a';
const appKey = 'da13a58bf65ccd4f18f656756117a4c4';

// Selectors
const searchForm = document.querySelector('form');
const container = document.querySelector('.container');
const resultDiv = document.querySelector('.search-result');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  container.classList.remove('initial');

  // Get the input
  const input = document.querySelector('form input').value;

  // Fetch data from the api
  fetchData(input)
    .then(data => showItemsUI(data.hits))
    .catch(err => console.log(err));

  searchForm.reset();
});

// Async function fetching data from the api
async function fetchData(item) {
  const url = `https://api.edamam.com/search?q=${item}&app_id=${appID}&app_key=${appKey}&to=20`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

// Function to show in the UI
function showItemsUI(results) {
  let html = '';
  results.forEach(result => {
    html += `
    <div class="item">
      <img src=${result.recipe.image} alt="">
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a href=${result.recipe.url}>View Recipe</a>
      </div>
      <p class="item-data">Calories: ${Math.floor(result.recipe.calories)}</p>
      <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'Data Not Found' }</p>
      <p class="item-data">heal Labels: ${result.recipe.healthLabels}</p>
    </div>
    `;
  });

  resultDiv.innerHTML = html;
}