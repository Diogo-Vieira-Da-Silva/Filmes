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

        return `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 bg-secondary text-light">
                    <img src="${poster}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${movie.title}${year}</h5>
                        <p class="mb-2 small text-warning">${rating}</p>
                        <p class="card-text small text-truncate">${overview}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    resultsEl.innerHTML = `<div class="row">${cards}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('name');
    const debounced = debounce(value => searchMovies(value), 500);
    input.addEventListener('input', (e) => {
        debounced(e.target.value.trim());
    });

    // Permitir pesquisar ao pressionar Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchMovies(e.target.value.trim());
        }
    });

    // Buscar e popular gêneros no carregamento
    fetchGenres().then(() => {
        // adicionar listener ao select de gêneros para disparar busca ao alterar
        const sel = document.getElementById('genres');
        if (sel) {
            sel.addEventListener('change', () => {
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
});
