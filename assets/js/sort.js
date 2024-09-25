document.addEventListener('DOMContentLoaded', function () {
  // Получаем кнопки сортировки, контейнер с пьесами и карточки пьес
  var sortButtonGroup = document.querySelector('#sort .controls__list');
  var cardsContainer = document.querySelector('.piece-cards');
  var cards = cardsContainer.querySelectorAll('.piece-card');
  
  // Обрабатываем клик на кнопку сортировки
  sortButtonGroup.addEventListener('change', sortChangeHandler);
  function sortChangeHandler(event) {
  
    // fadeOut
    cardsContainer.style.opacity = 0;
  
    const sortType = event.target.value;
  
    setTimeout(function () {
      // Вызываем функцию сортировки и передаем выбранный id
      sortCards(sortType);
  
      // fadeIn
      cardsContainer.style.opacity = 1;
    }, 300);
  }
    
  // Функция сортировки карточек пьес
  function sortCards(sortType) {
    // Преобразуем NodeList в массив
    var cardsArray = Array.from(cards);

    // Сортируем массив карточек в соответствии с выбором пользователя
    cardsArray.sort(function (a, b) {
      var orderA = getOrderValue(a, sortType);
      var orderB = getOrderValue(b, sortType);

      // Сравниваем значения для сортировки
      return orderA - orderB;
    });

    // Очищаем контейнер с карточками
    cardsContainer.innerHTML = '';

    // Добавляем отсортированные карточки обратно в контейнер
    cardsArray.forEach(function (card) {
      cardsContainer.appendChild(card);
    });
  }

  // Функция получения значения для сортировки
  function getOrderValue(card, sortType) {
    switch (sortType) {
      case 'new':
        return parseInt(card.dataset.pieceOrder) * -1;
      case 'old':
        return parseInt(card.dataset.pieceOrder);
      case 'popular':
        return parseInt(card.dataset.piecePopularity) * -1;
    }
  }
});