document.querySelectorAll('.piece-card__copy').forEach(button => {
  button.addEventListener('click', function() {
      // Получаем id родительского блока
      const pieceCard = this.closest('.piece-card');
      const pieceId = pieceCard.id;
      // Создаем якорную ссылку
      const anchorLink = `${window.location.origin}${window.location.pathname}#${pieceId}`;

      // Копируем якорную ссылку в буфер обмена
      navigator.clipboard.writeText(anchorLink).then(() => {
          // Меняем текст кнопки
          button.textContent = 'Скопировано';

          // Возвращаем исходный текст через 3 секунды
          setTimeout(() => {
              button.textContent = 'Копировать ссылку';
          }, 5000);
      }).catch(err => {
          console.error('Failed to copy: ', err);
      });
  });
});