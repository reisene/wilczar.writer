document.addEventListener('DOMContentLoaded', () => {
  const newsWrapper = document.getElementById('news-wrapper');
  const newsCache = {};

  // Główne wejście
  loadNewsList();

  // Funkcja: Pobierz listę plików z JSON
  function fetchNewsList() {
    return fetch('/news/list.json')
      .then(res => {
        if (!res.ok) throw new Error('Błąd ładowania listy newsów!');
        return res.json();
      });
  }

  // Funkcja: Pobierz i wyświetl listę newsów
  function loadNewsList() {
    newsWrapper.innerHTML = '<p>Wczytywanie...</p>';
    fetchNewsList()
      .then(newsFiles => {
        const files = newsFiles.slice(-5).reverse(); // 5 najnowszych
        return Promise.all(files.map(filename => fetchSinglePost(filename)));
      })
      .then(postsHTML => {
        renderNewsList(postsHTML);
      })
      .catch(err => {
        newsWrapper.innerHTML = "<p>Błąd ładowania newsów.</p>";
        console.error(err);
      });
  }

  // Funkcja: Pobierz pojedynczy post
  function fetchSinglePost(filename) {
    return fetch('/news/' + filename)
      .then(res => {
        if (!res.ok) throw new Error('Błąd ładowania posta: ' + filename);
        return res.text();
      });
  }

  // Funkcja: Renderuj listę newsów
  function renderNewsList(posts) {
    newsWrapper.innerHTML = '';
    posts.forEach((html, i) => {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const article = temp.querySelector('article.news-post');
      if (!article) return;
      const title = article.getAttribute('data-title') || article.querySelector('h3')?.innerText || 'Brak tytułu';
      const date = article.getAttribute('data-date') || article.querySelector('time')?.getAttribute('datetime') || '';
      const preview = Array.from(article.querySelectorAll('.post-content > p')).slice(0, 2).map(p => p.innerText).join(' ');
      newsCache[i] = html;
      newsWrapper.innerHTML += `
        <div class="news-item" data-index="${i}">
          <h3>${title}</h3>
          <time>${date}</time>
          <p>${preview}...</p>
          <button class="news-more-btn" data-index="${i}">Więcej</button>
        </div>
      `;
    });

    // Obsługa "Więcej"
    newsWrapper.querySelectorAll('.news-more-btn').forEach(btn => {
      btn.addEventListener('click', e => showFullPost(e.target.dataset.index));
    });
  }

  // Funkcja: Pokaż pełnego newsa
  function showFullPost(index) {
    const html = newsCache[index];
    newsWrapper.innerHTML = html + `<button class="news-back-btn">Wróć</button>`;
    document.querySelector('.news-back-btn').addEventListener('click', loadNewsList);
  }
});
