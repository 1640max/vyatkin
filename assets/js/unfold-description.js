document.addEventListener("DOMContentLoaded", function() {
  const descriptionElements = document.querySelectorAll('.piece-card__description');

  // Функция для обработки клика на описание пьесы
  function toggleDescriptionClass() {
      this.classList.toggle('piece-card__description_fold');
  }

  // Перебираем все элементы с описанием пьесы и назначаем на них обработчик
  descriptionElements.forEach(function(descriptionElement) {
      descriptionElement.addEventListener('click', toggleDescriptionClass);
  });
});
