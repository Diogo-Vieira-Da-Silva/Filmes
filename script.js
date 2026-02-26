 // Busca de filmes usando The Movie Database (TMDB) API
// As chamadas da API e a chave estão anotadas no readme do projeto.

const API_KEY = '8e594be3048bf6c34bf75715defcb721';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

// Busca e popula a lista de gêneros do TMDB
async function fetchGenres() {
    const sel = document.getElementById('genres');
    if (!sel) return;
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Resposta da API (genres): ' + res.status);
        const data = await res.json();
        const genres = data.genres || [];

        // limpar opções atuais
        sel.innerHTML = '';
        genres.forEach(g => {
            const opt = document.createElement('option');
            opt.value = String(g.id);
            opt.textContent = g.name;
            sel.appendChild(opt);
        });
    } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
        const wrapper = document.createElement('option');
        wrapper.value = '';
        wrapper.textContent = 'Não foi possível carregar gêneros';
        sel.innerHTML = '';
        sel.appendChild(wrapper);
    }
}

// Debounce simples para evitar muitas chamadas durante digitação
const debounce = (fn, wait = 400) => {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
};

// Retorna array de ids selecionadas no select de gêneros
function getSelectedGenres() {
    const sel = document.getElementById('genres');
    if (!sel) return [];
    return Array.from(sel.selectedOptions).map(o => Number(o.value));
}

// -- favoritos em localStorage ------------------------------------------------
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('fav') || '[]');
    } catch { return []; }
}

// -- avaliações em localStorage ------------------------------------------------
function getRatings() {
    try {
        return JSON.parse(localStorage.getItem('ratings') || '[]');
    } catch { return []; }
}

function saveRatings(arr) {
    localStorage.setItem('ratings', JSON.stringify(arr));
}

function getMovieRating(id) {
    const r = getRatings().find(r => r.id === id);
    return r ? r.value : null;
}

function setMovieRating(movie, value) {
    const ratings = getRatings();
    const idx = ratings.findIndex(r => r.id === movie.id);
    if (idx === -1) {
        ratings.push({ id: movie.id, movie, value });
    } else {
        ratings[idx].value = value;
    }
    saveRatings(ratings);
}

function removeMovieRating(id) {
    const ratings = getRatings().filter(r => r.id !== id);
    saveRatings(ratings);
}

// gerenciamento de modal de avaliação e exibição de avaliações
let currentMovieForRating = null;
let currentStarValue = 0;

function openRatingModal(movie) {
    currentMovieForRating = movie;
    currentStarValue = getMovieRating(movie.id) || 0;
    const titleEl = document.getElementById('modalMovieTitle');
    if (titleEl) titleEl.textContent = movie.title;
    renderStars();
    const modal = new bootstrap.Modal(document.getElementById('ratingModal'));
    modal.show();
}

function renderStars() {
    const container = document.getElementById('star-container');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'star-rating fs-2 me-1';
        star.style.cursor = 'pointer';
        star.textContent = i <= currentStarValue ? '★' : '☆';
        star.dataset.value = i;
        star.addEventListener('click', () => {
            currentStarValue = i;
            renderStars();
        });
        container.appendChild(star);
    }
}

function saveCurrentRating() {
    if (!currentMovieForRating) return;
    if (currentStarValue > 0) {
        setMovieRating(currentMovieForRating, currentStarValue);
    } else {
        removeMovieRating(currentMovieForRating.id);
    }
    // update visible labels in cards if present
    document.querySelectorAll(`.card[data-movie]`).forEach(card => {
        try {
            const m = JSON.parse(decodeURIComponent(card.dataset.movie));
            if (m.id === currentMovieForRating.id) {
                const info = card.querySelector('.text-info');
                if (info) {
                    if (currentStarValue) {
                        info.textContent = `Avaliado: ${currentStarValue}/5`;
                    } else {
                        info.remove();
                    }
                } else if (currentStarValue) {
                    const p = document.createElement('p');
                    p.className = 'mb-1 small text-info';
                    p.textContent = `Avaliado: ${currentStarValue}/5`;
                    const titleEl = card.querySelector('.card-title');
                    if (titleEl) titleEl.insertAdjacentElement('afterend', p);
                }
            }
        } catch {}
    });
}

function showRatings() {
    currentMode = 'ratings';
    const btn = document.getElementById('btn-ratings');
    if (btn) btn.textContent = 'Ver todos';
    const ratings = getRatings();
    if (ratings.length === 0) {
        const resultsEl = document.getElementById('results');
        resultsEl.innerHTML = '<div class="text-center my-4 text-light">Nenhuma avaliação feita.</div>';
    } else {
        // map to movie objects with rating info
        const movies = ratings.map(r => ({ ...r.movie, _myRating: r.value }));
        renderResults(movies);
        // after render, display rating label based on _myRating
        document.querySelectorAll(`.card[data-movie]`).forEach(card => {
            try {
                const m = JSON.parse(decodeURIComponent(card.dataset.movie));
                if (m._myRating) {
                    const info = card.querySelector('.text-info');
                    if (info) info.textContent = `Avaliado: ${m._myRating}/5`;
                }
            } catch {}
        });
    }
}

function exitRatings() {
    currentMode = 'search';
    const btn = document.getElementById('btn-ratings');
    if (btn) btn.textContent = '📝 Avaliações';
    const input = document.getElementById('name');
    searchMovies(input.value.trim());
}

// -----------------------------------------------------------------------------

function saveFavorites(arr) {
    localStorage.setItem('fav', JSON.stringify(arr));
}

function isFavorite(id) {
    return getFavorites().some(m => m.id === id);
}

function toggleFavorite(movie) {
    const favs = getFavorites();
    const idx = favs.findIndex(m => m.id === movie.id);
    let added;
    if (idx === -1) {
        favs.push(movie);
        added = true;
    } else {
        favs.splice(idx, 1);
        added = false;
    }
    saveFavorites(favs);
    return added;
}

let currentMode = 'search'; // or 'favorites'

function showFavorites() {
    currentMode = 'favorites';
    const btn = document.getElementById('btn-favorites');
    if (btn) btn.textContent = 'Ver todos';
    const favs = getFavorites();
    if (favs.length === 0) {
        const resultsEl = document.getElementById('results');
        resultsEl.innerHTML = '<div class="text-center my-4 text-light">Nenhum favorito marcado.</div>';
    } else {
        renderResults(favs);
    }
}

function exitFavorites() {
    currentMode = 'search';
    const btn = document.getElementById('btn-favorites');
    if (btn) btn.textContent = '⭐ Favoritos';
    // optionally clear results or re-run search
    const input = document.getElementById('name');
    searchMovies(input.value.trim());
}

// -----------------------------------------------------------------------------

// Função que realiza a busca por filmes
async function searchMovies(query) {
    const resultsEl = document.getElementById('results');
    const selectedGenres = getSelectedGenres();

    // Se não há query e há gêneros selecionados, usar /discover com with_genres
    if (!query && selectedGenres.length > 0) {
        resultsEl.innerHTML = '<div class="text-center my-4 text-light">Carregando...</div>';
        try {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${selectedGenres.join(',')}&page=1&include_adult=false`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Resposta da API: ' + res.status);
            const data = await res.json();
            renderResults(data.results || []);
        } catch (err) {
            console.error(err);
            resultsEl.innerHTML = `<div class="text-danger">Erro ao buscar filmes: ${err.message}</div>`;
        }
        return;
    }

    // Se não há query e não há filtros, limpa
    if (!query) {
        resultsEl.innerHTML = '';
        return;
    }

    resultsEl.innerHTML = '<div class="text-center my-4 text-light">Carregando...</div>';

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Resposta da API: ' + res.status);
        const data = await res.json();

        let results = data.results || [];

        // Se o usuário selecionou gêneros, filtrar localmente pelos genre_ids retornados no search
        if (selectedGenres.length > 0) {
            results = results.filter(movie => Array.isArray(movie.genre_ids) && movie.genre_ids.some(g => selectedGenres.includes(g)));
        }

        renderResults(results);
    } catch (err) {
        console.error(err);
        resultsEl.innerHTML = `<div class="text-danger">Erro ao buscar filmes: ${err.message}</div>`;
    }
}

// Renderiza uma lista de filmes no elemento #results
function renderResults(results) {
    const resultsEl = document.getElementById('results');
    if (!results || results.length === 0) {
        resultsEl.innerHTML = '<div class="text-center my-4 text-light">Nenhum filme encontrado.</div>';
        return;
    }

    const cards = results.map(movie => {
        const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=Sem+imagem';
        const year = movie.release_date ? ` (${movie.release_date.slice(0,4)})` : '';
        const rating = movie.vote_average ? `⭐ ${movie.vote_average}` : '';
        const overview = movie.overview ? movie.overview : '';
        const isLong = overview.length > 100;
        const truncated = isLong ? overview.slice(0, 100) + '...' : overview;
        const fav = isFavorite(movie.id);
        const star = fav ? '★' : '☆';
        const favTitle = fav ? 'Remover dos favoritos' : 'Marcar como favorito';
        const myRating = getMovieRating(movie.id);
        const rateLabel = myRating ? `Avaliado: ${myRating}/5` : '';

        // encode movie JSON in data attribute so we can reconstruct later
        const movieData = encodeURIComponent(JSON.stringify(movie));
        return `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 bg-secondary text-light position-relative" data-movie="${movieData}">
                    <button class="fav-btn btn btn-sm btn-light position-absolute top-0 end-0 m-1" data-id="${movie.id}" title="${favTitle}">${star}</button>
                    <button class="rate-btn btn btn-sm btn-light position-absolute top-0 start-0 m-1" data-id="${movie.id}" title="Avaliar filme">📝</button>
                    <img src="${poster}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${movie.title}${year}</h5>
                        <p class="mb-2 small text-warning">${rating}</p>
                        ${rateLabel ? `<p class="mb-1 small text-info">${rateLabel}</p>` : ''}
                        <p class="card-text small overview-text" data-full="${overview}" data-truncated="${truncated}">${truncated}</p>
                        ${isLong ? '<button class="btn btn-sm btn-outline-light mt-auto show-more-btn" data-expanded="false">Exibir mais</button>' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    resultsEl.innerHTML = `<div class="row">${cards}</div>`;

    // after injecting cards, attach click handlers for 'Exibir mais' buttons
    resultsEl.querySelectorAll('.show-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const p = btn.closest('.card-body').querySelector('.overview-text');
            if (!p) return;
            const expanded = btn.dataset.expanded === 'true';
            if (expanded) {
                p.textContent = p.dataset.truncated;
                btn.textContent = 'Exibir mais';
                btn.dataset.expanded = 'false';
            } else {
                p.textContent = p.dataset.full;
                btn.textContent = 'Mostrar menos';
                btn.dataset.expanded = 'true';
            }
        });
    });

    // favorite toggles
    resultsEl.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const card = btn.closest('.card');
            if (!card) return;
            let movieObj;
            try {
                movieObj = JSON.parse(decodeURIComponent(card.dataset.movie));
            } catch {
                movieObj = { id };
            }
            const added = toggleFavorite(movieObj);
            btn.textContent = added ? '★' : '☆';
            btn.title = added ? 'Remover dos favoritos' : 'Marcar como favorito';
            // if currently showing favorites and remove occurred, refresh view
            if (currentMode === 'favorites' && !added) {
                showFavorites();
            }
        });
    });

    // rating buttons
    resultsEl.querySelectorAll('.rate-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            if (!card) return;
            let movieObj;
            try {
                movieObj = JSON.parse(decodeURIComponent(card.dataset.movie));
            } catch {
                return;
            }
            openRatingModal(movieObj);
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('name');
    const debounced = debounce(value => searchMovies(value), 500);
    input.addEventListener('input', (e) => {
        if (currentMode === 'favorites') exitFavorites();
        debounced(e.target.value.trim());
    });

    // Permitir pesquisar ao pressionar Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentMode === 'favorites') exitFavorites();
            searchMovies(e.target.value.trim());
        }
    });

    // Buscar e popular gêneros no carregamento
    fetchGenres().then(() => {
        // adicionar listener ao select de gêneros para disparar busca ao alterar
        const sel = document.getElementById('genres');
        if (sel) {
            sel.addEventListener('change', () => {
                if (currentMode === 'favorites') exitFavorites();
                // usar valor atual do input ao alterar gêneros
                const q = input.value.trim();
                // se houver debounce em andamento, cancelar e executar imediatamente
                searchMovies(q);
            });
        }

        // botão limpar filtros
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (currentMode === 'favorites') exitFavorites();
                const sel2 = document.getElementById('genres');
                if (sel2) {
                    Array.from(sel2.options).forEach(o => o.selected = false);
                }
                // reexecutar busca com o texto atual (ou limpar se vazio)
                const q2 = input.value.trim();
                searchMovies(q2);
            });
        }
    });

    // botão de favoritos principal
    const favBtnMain = document.getElementById('btn-favorites');
    if (favBtnMain) {
        favBtnMain.addEventListener('click', () => {
            if (currentMode === 'favorites') {
                exitFavorites();
            } else {
                showFavorites();
            }
        });
    }

    // botão de avaliações principal
    const rateBtnMain = document.getElementById('btn-ratings');
    if (rateBtnMain) {
        rateBtnMain.addEventListener('click', () => {
            if (currentMode === 'ratings') {
                exitRatings();
            } else {
                showRatings();
            }
        });
    }

    // modal save listener (bootstrap already handles close via data-bs-dismiss)
    const saveBtn = document.getElementById('saveRatingBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveCurrentRating();
            const modalEl = document.getElementById('ratingModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        });
    }
});