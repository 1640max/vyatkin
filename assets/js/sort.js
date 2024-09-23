document.addEventListener('DOMContentLoaded', function () {
  // Получаем кнопки сортировки, контейнер с пьесами и карточки пьес
  var sortButtons = document.querySelectorAll('.sort-ui__item');
  var cardsContainer = document.querySelector('.piece-cards');
  var cards = cardsContainer.querySelectorAll('.piece-card');
  
  // Обрабатываем клик на кнопку сортировки
  sortButtons.forEach(item => item.addEventListener('click', sortClickHandler));

  function sortClickHandler(event) {
    // Если сортировка уже выбрана, то ничего не делаем
    if (event.target.classList.contains('sort-ui__item_selected')) {
      return;
    }
  
    // fadeOut
    cardsContainer.style.opacity = 0;
  
    // Убираем модификатор sort-ui__item_selected у всех элементов списка
    sortButtons.forEach(item => item.classList.remove('sort-ui__item_selected'));
  
    // Добавляем модификатор sort-ui__item_selected к выбранному элементу списка
    event.target.classList.add('sort-ui__item_selected');
  
    // Получаем id элемента, на котором был клик
    var selectedSortId = event.target.id;
  
    setTimeout(function () {
      // Вызываем функцию сортировки и передаем выбранный id
      sortCards(selectedSortId);
  
      // fadeIn
      cardsContainer.style.opacity = 1;
    }, 300);
  }
  

  // Функция сортировки карточек пьес
  function sortCards(sortId) {
    // Преобразуем NodeList в массив
    var cardsArray = Array.from(cards);

    // Сортируем массив карточек в соответствии с выбором пользователя
    cardsArray.sort(function (a, b) {
      var orderA = getOrderValue(a, sortId);
      var orderB = getOrderValue(b, sortId);

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
  function getOrderValue(card, sortId) {
    switch (sortId) {
      case 'sort-new':
        return parseInt(card.querySelector('.piece-card__order').textContent) * -1;
      case 'sort-old':
        return parseInt(card.querySelector('.piece-card__order').textContent);
      case 'sort-popular':
        return parseInt(card.querySelector('.piece-card__popularity').textContent) * -1;
    }
  }
});