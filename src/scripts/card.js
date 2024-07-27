// Импорт данных

import { openModal } from "./modal";

// Объявление констант

const cardTemplate = document.querySelector('#card-template').content;

// Функция создание карточек

const createCard = (cardName, cardLink, likeCard, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
        cardImage.addEventListener('click', clickHandleImage);
    
    cardElement.querySelector('.card__title').textContent = cardName;
    cardImage.alt = cardName;
    cardImage.src = cardLink;

    const cardButtonDelete = cardElement.querySelector('.card__delete-button');
        cardButtonDelete.addEventListener('click', deleteCard);

    const cardButtonLiked = cardElement.querySelector('.card__like-button');
        cardButtonLiked.addEventListener('click', likeCard);

    return cardElement;
};

// Функция удаления карточки

const deleteCard = (evt) => {
    const element = evt.target.closest('.card');
    element.remove();
};

// Функция лайка карточки

const likeCard = (evt) => {
    const element = evt.target.closest('.card');
    const cardLikeButton = element.querySelector('.card__like-button');

    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
        cardLikeButton.classList.remove('card__like-button_is-active');
    } else {
        cardLikeButton.classList.add('card__like-button_is-active');
    }
};

// Функция обработки клика на изображение карточки

const clickHandleImage = (evt) => {
    const element = evt.target.closest('.card');
    const cardImage = element.querySelector(".card__image");
    const cardTitle = element.querySelector('.card__title');

    const previewImage = document.querySelector('.popup__image');
    const captionModal = document.querySelector('.popup__caption');
    const previewImageModal = document.querySelector('.popup_type_image');

    openModal(previewImageModal);
    

    previewImage.src = cardImage.src;
    previewImage.alt = cardTitle.name;

    captionModal.textContent = cardTitle.textContent;
};

// Экспорт данных

export { createCard, deleteCard, likeCard, clickHandleImage };