---
---

{% if jekyll.environment == "production" %}
  const apilink = "https://api.counterapi.dev/v1/vyatkin.su/piece-";
{% else %}
  const apilink = "https://api.counterapi.dev/v1/vyatkin-test/piece-";
{% endif %}

// Сгенерено нейросеткой, куча косячностей

// Функция для обновления значения счетчика
function updateCounter(linkNumber, responseData) {
  const count = responseData.count || 0; // Если параметр "count" отсутствует, установить значение по умолчанию 0
  // Найти блок счетчика по id и обновить его содержимое
  const counterElement = document.getElementById(`piece-${linkNumber}-counter`);
  if (counterElement) {
    counterElement.innerText = `${count}`;
  }
}

// Функция для обработки клика по ссылке
function handleLinkClick(linkNumber) {
    const url = apilink + linkNumber + '/up';
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        const count = data.count || 0; // Если параметр "count" отсутствует, установить значение по умолчанию 0
        // Обновить значение счетчика после успешного запроса
        updateCounter(linkNumber, { count });
      })
      .catch(error => console.error('Error updating counter:', error));
}


// Инициализация значений счетчиков после загрузки DOM дерева
document.addEventListener('DOMContentLoaded', function () {
  // Автоматическое определение номеров ссылок на основе имеющихся элементов на странице
  const linkButtons = document.querySelectorAll('.piece-card__button');
  const linkNumbers = [];

  linkButtons.forEach(button => {
    const linkNumberMatch = button.id.match(/piece-(\d+)-button/);
    if (linkNumberMatch) {
      const linkNumber = linkNumberMatch[1];
      linkNumbers.push(linkNumber);
    }
  });

  // Повешение обработчика событий клика на каждую ссылку
  linkButtons.forEach(button => {
    const linkNumberMatch = button.id.match(/piece-(\d+)-button/);
    if (linkNumberMatch) {
      const linkNumber = linkNumberMatch[1];
      button.addEventListener('click', () => handleLinkClick(linkNumber));
    }
    });

  // Загрузите начальные значения счетчиков с паузой в 150 мс между запросами
  linkNumbers.reduce((chain, linkNumber) => {
    return chain.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          const url = apilink + linkNumber + '/';
          fetch(url)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 400 || response.status === 404) {
                // В случае "400 Bad request", отправляем команду повышения значения на 1
                return fetch(apilink + linkNumber + '/up', { method: 'GET' })
                  .then(response => response.json());
              } else {
                throw new Error('Failed to fetch initial counter value');
              }
            })
            .then(data => {
              // Обновить значение счетчика после успешной загрузки
              updateCounter(linkNumber, data);
              resolve();
            })
            .catch(error => {
              console.error('Error fetching initial counter value:', error);
              resolve();
            });
        }, 50);
      });
    });
  }, Promise.resolve());
});
