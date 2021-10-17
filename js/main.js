const elSearchInput = document.querySelector('.film__search-input');
const elTypesSelect = document.querySelector('.film__types-select');
const elFilmsList = document.querySelector('.films__list');
const elPrevBtn = document.querySelector('.film__prev-btn');
const elNextBtn = document.querySelector('.film__next-btn');
const elFilmItemTemplate = document.querySelector('.film__template').content;
const elBtnGroup = document.querySelector('.btn__group');

const API_KEY = '7e789dc5';
let search = 'panda';
let type = 'movie';
let page = 1;

function renderFilms(arr, node) {
    node.innerHTML = null;

    const filmsFragment = document.createDocumentFragment();

    arr.forEach(film => {
        elFilmItemTemplateClone = elFilmItemTemplate.cloneNode(true);
        elFilmItemTemplateClone.querySelector('.film__heading').textContent = film.Title.split(' ').slice(0, 4).join(' ');
        elFilmItemTemplateClone.querySelector('.film__img').src = film.Poster;
        elFilmItemTemplateClone.querySelector('.film__img').alt = film.Title;

        filmsFragment.appendChild(elFilmItemTemplateClone);
    })

    node.appendChild(filmsFragment);
}
 

async function renderMovies() {
    const response = await fetch('https://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + search + '&type=' + type + '&page=' + page);
    const data = await response.json();
    
    let pageCount = Math.ceil(data.totalResults / 10);
    
    elBtnGroup.innerHTML = null;
    for (let i = 1; i <= pageCount; i++) {
        const elPageBtn = document.createElement('button');

        elPageBtn.textContent = i;
        elPageBtn.dataset.btnId = i;
        elPageBtn.classList.add('page__btn');

        elBtnGroup.appendChild(elPageBtn);
    }

    renderFilms(data.Search, elFilmsList);
}
renderMovies();

// Listener Input change event 
elSearchInput.addEventListener('change', (evt) => {
    search = evt.target.value.trim(); 
    type = 'movie';
    page = 1;

    renderMovies();
    evt.target.value = null;
})

// Listener Select change event 
elTypesSelect.addEventListener('change', (evt) => {
    type = evt.target.value;
    
    renderMovies();
})

// Listener Pagination Buttons click event 
elBtnGroup.addEventListener('click', (evt) => {
    if (evt.target.matches('.page__btn')) {
        page = evt.target.dataset.btnId;

        renderMovies();
    }
})
