// Функция для подсветки блока по якорной ссылке
function highlightPiece() {
  // Получаем хэш из текущего URL
  var hash = window.location.hash;

  // Проверяем, что хэш не пустой и начинается с "#"
  if (hash.startsWith("#piece-")) {
    // Убираем символ "#" из хэша
    var targetId = hash.slice(1);

    // Находим целевой блок по id
    var targetBlock = document.getElementById(targetId);

    // Проверяем, что блок существует
    if (targetBlock) {
      // Добавляем класс для подсветки
      targetBlock.classList.add('piece-card_highlighted');

      // Через секунду убираем подсветку
      setTimeout(function() {
        targetBlock.classList.remove('piece-card_highlighted');
      }, 1000);
    }
  }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', highlightPiece);
window.addEventListener('hashchange', highlightPiece);