document.addEventListener('DOMContentLoaded', function () {
  // Получаем кнопки тегов, контейнер с пьесами и карточки пьес
  var filterButtonGroup = document.querySelector('#filter .controls__list');
  var cardsContainer = document.querySelector('.piece-cards');
  var cards = cardsContainer.querySelectorAll('.piece-card');

  filterButtonGroup.addEventListener('change', applyFilter);
  function applyFilter() {
    // fadeOut
    cardsContainer.style.opacity = 0;

    const selectedCheckboxes = document.querySelectorAll('[name="filter"]:checked');
    const selectedValues = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

    const queryString = selectedValues.length > 0 ? `?filter=${selectedValues.join(',')}` : '?filter=';
    window.history.replaceState(null, '', queryString);

    setTimeout(function () {
      cards.forEach(card => {
        const cardTags = card.dataset.pieceTags.split(', ');

        // Check if any of the selected values (checkbox tags) are present in the card's tags
        const hasMatchingTag = selectedValues.every(value => cardTags.includes(value));

        if (hasMatchingTag || selectedValues.length === 0) {
          // If at least one tag matches or no checkboxes are selected, show the card
          card.classList.remove('piece-card__hidden');
        } else {
          // Otherwise, hide the card
          card.classList.add('piece-card__hidden');
        }

        // fadeIn
        cardsContainer.style.opacity = 1;
      })
    }, 300);
  }

  
  // Применяем фильтры, указанные в get-параметре
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');

  if (filterParam) {
    const filterValues = filterParam.split(',');
    filterValues.forEach(value => {
      const checkbox = document.querySelector(`[name="filter"][value="${value}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    })
    applyFilter();
  }

});