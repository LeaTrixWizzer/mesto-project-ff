// Импорт данных

import { clickHandleImage } from "./index";

// Объявление констант

const cardTemplate = document.querySelector("#card-template").content;

// Функция создание карточек

const createCard = (cardName, cardLink, likeCard, deleteCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", clickHandleImage);

  cardElement.querySelector(".card__title").textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = cardLink;

  const cardButtonDelete = cardElement.querySelector(".card__delete-button");
  cardButtonDelete.addEventListener("click", deleteCard);

  const cardButtonLiked = cardElement.querySelector(".card__like-button");
  cardButtonLiked.addEventListener("click", likeCard);

  return cardElement;
};

// Функция удаления карточки

const deleteCard = (evt) => {
  const element = evt.target.closest(".card");
  element.remove();
};

// Функция лайка карточки

const likeCard = (evt) => {
  const cardLikeButton = evt.target;
  cardLikeButton.classList.toggle("card__like-button_is-active");
};

// Экспорт данных

export { createCard, deleteCard, likeCard };
