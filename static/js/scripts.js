function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    
    if (searchTerm.trim() === '') {
        resultsContainer.innerHTML = '<div class="no-results">Введите запрос для поиска</div>';
        return;
    }
    $.ajax({
        'method': 'GET',
        'url': `/search?q=${searchTerm}`,
        'success': function(response) {
            if (response ['count'] === 0) {
                resultsContainer.innerHTML = '<div class="no-results">Ничего не найдено</div>';
            } else {
                resultsContainer.innerHTML = null
                response['results'].forEach((product) => {
                   let card = document.createElement('div')
                   card.className = 'card'
                   card.innerHTML = `
                   <img src="/media/${product['photo']}" alt="${product['title']}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                   <div class="placeholder-image" style="display:none; width:100px; height:100px; background:#f0f0f0; border-radius:8px; align-items:center; justify-content:center; color:#999; font-size:12px; text-align:center; flex-shrink:0; border:1px solid #eee;">
                       <span>Нет фото</span>
                   </div>
                   <div class="card-content">
                       <h4>${product['title']}</h4>
                       <p>${product['price']} ₽</p>
                   </div>
                   `
                   resultsContainer.appendChild(card)
                })
            }
        },
        'error': function() {
            resultsContainer.innerHTML = '<div class="no-results">Ошибка при поиске</div>';
        }
    });
}

// Поиск при нажатии Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});