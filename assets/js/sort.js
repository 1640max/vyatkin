  // Сгенерировано чатгэпэтэшэчкой. Оно так себе, но мне лень делать хорошо.
  
  document.addEventListener('DOMContentLoaded', function () {
    // Получаем кнопки сортировки, контейнер с пьесами и карточки пьес
    var sortList = document.querySelector('.sort-ui__list');
    var cardsContainer = document.querySelector('.piece-cards');
    var cards = cardsContainer.querySelectorAll('.piece-card');

    // Добавляем обработчик события клика на элемент списка сортировки
    sortList.addEventListener('click', function (event) {
      if (event.target.classList.contains('sort-ui__item')) {
        if (event.target.classList.contains('sort-ui__item_selected')) {
          return;
        }

        // fadeOut
        cardsContainer.style.opacity = 0;

        // Убираем модификатор sort-ui__item_selected у всех элементов списка
        var allSortItems = sortList.querySelectorAll('.sort-ui__item');
        allSortItems.forEach(function (item) {
          item.classList.remove('sort-ui__item_selected');
        });

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
    });

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