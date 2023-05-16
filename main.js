(() => {
  document.addEventListener('DOMContentLoaded', () => {
    function createNumbersArray(count) {
      let pairsOfNumbers = [];
      for (let i = 0; i < count * 2; i += 2) {
        [pairsOfNumbers[i], pairsOfNumbers[i + 1]] = [i / 2 + 1, i / 2 + 1];
      }
      return pairsOfNumbers;
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        // поменять элементы местами
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function createCard(id) {
      let card = document.createElement('button');

      card.classList.add('card_' + String(id)); // создаём класс для карточки, чтобы потом понимать какую открыли
      card.classList.add('card');

      let innerCard = document.createElement('span'); // содержимое карточки, в которм будет храниться её номер
      innerCard.classList.add('inner-card');
      innerCard.classList.add('hide');
      innerCard.textContent = String(id);

      card.append(innerCard);

      return card;
    }

    // функция создания поля с карточками
    function createSpaceCards(amount) {
      let shuffledNumbersArray = shuffle(createNumbersArray(amount));

      let spaceCards = document.createElement('div');
      spaceCards.classList.add('space-cards');

      for (let i = 0; i < amount * 2; i++) {
        let newCard = createCard(shuffledNumbersArray[i]);
        spaceCards.append(newCard);
      }

      return spaceCards;
    }

    function startGame(amount) {
      let spaceCards = createSpaceCards(amount);
      const container = document.createElement('div');
      container.classList.add('container');
      container.append(spaceCards)
      document.body.append(container);

      let pickedCard = []; // список для выбранных карточек
      let done = 0; // переменная для подсчёта верных ответов

      // добавим обработчик событий на нажатие карточки
      for (let i = 0; i < spaceCards.children.length; i++) {
        let card = spaceCards.children[i];

        card.addEventListener('click', () => {
          console.log(card.children[0].textContent);
          pickedCard.push(card);
          card.children[0].classList.toggle('hide');
          if (pickedCard.length == 2) {
            console.log(pickedCard);
            // проверяем, не кликнули ли на одну и ту же карточку дважды
            if (pickedCard[0] == pickedCard[1]) {
              // если это так, то просто скрывае её и очищаем список выбранных
              pickedCard[0].children[0].classList.add('hide');
              pickedCard = [];
            }
            else {
              if (pickedCard[0].children[0].textContent == pickedCard[1].children[0].textContent) {
                // Выделяем эти карточки цветом
                pickedCard[0].classList.add('success');
                pickedCard[1].classList.add('success');
                // и больше не даём кликать на них
                pickedCard[0].setAttribute('disabled', 'true');
                pickedCard[1].setAttribute('disabled', 'true');
                // после чего стираем содержимое из списка с выбранными карточками
                pickedCard = [];
                done++;
              }
              else {
                let currentInterval = setInterval(() => {
                  // скрываем
                  pickedCard[0].children[0].classList.add('hide');
                  pickedCard[1].children[0].classList.add('hide');
                  // стираем содержимое из списка с выбранными карточками
                  pickedCard = [];
                  // удаляем интервал
                  clearInterval(currentInterval);
                }, 300);
              }
            }
          }
          // Проверка окончания игры
          if (done == amount) {
            console.log('Победа');
            document.body.style.background = '#faedcf';
            let win = document.createElement('div');
            win.textContent = 'Обнови и играйся дальше))'
            win.classList.add('win');

            document.body.append(win);
          }
        })
      }
    }

    // создание игры по нажатию кнопки
    document.querySelector('.game-form').addEventListener('submit', (e) => {
      e.preventDefault();
      let amount = parseInt(document.querySelector('.game-form__input').value);
      startGame(amount);
      document.querySelector('.game-form__input').value = '';
      document.querySelector('.game-form').style.display = 'none';
    })
  })
})();