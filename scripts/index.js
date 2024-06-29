// Объявление констант
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Функция создание карточек

const cardCreate = (cardName, cardLink, cardDelete) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = cardName;
    cardImage.alt = cardName;
    cardImage.src = cardLink;

    const cardButtonDelete = cardElement.querySelector('.card__delete-button');
        cardButtonDelete.addEventListener('click', function(evt) {
            cardDelete(evt);
        });

    return cardElement;
};

// Функция удаления карточки

const cardDelete = (evt) => {
    const element = evt.target.closest('.card');
    element.remove();
};

// Вывод карточек на страничку

initialCards.forEach(({name, link}) => {
    const cardData = cardCreate(name, link, cardDelete);
    cardList.append(cardData);
});