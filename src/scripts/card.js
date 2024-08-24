import { clickLike as likeAPI, clickDislike as dislikeAPI } from "./api";

const createCard = (
  name,
  link,
  likes,
  ownerId,
  cardId,
  userId,
  deleteCallback,
  openCallback
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const buttonCardDelete = cardElement.querySelector(".card__delete-button");
  const buttonCardLike = cardElement.querySelector(".card__like-button");
  const cardLikesCounter = cardElement.querySelector(".card__like-counter");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikesCounter.textContent = likes.length;

  if (ownerId !== userId) {
    buttonCardDelete.disabled = true;
    buttonCardDelete.style.display = "none";
  }

  if (likes.some((user) => user._id === userId)) {
    buttonCardLike.classList.add("card__like-button_is-active");
  }

  buttonCardDelete.addEventListener("click", function (evt) {
    deleteCallback(cardElement, cardId);
  });
  buttonCardLike.addEventListener("click", function (evt) {
    handleLikeButton(buttonCardLike, cardId, cardLikesCounter);
  });
  cardImage.addEventListener("click", function () {
    openCallback({ name, link });
  });
  return cardElement;
};

const handleLikeButton = (buttonCardLike, cardId, cardLikesCounter) => {
  const isLiked = buttonCardLike.classList.contains(
    "card__like-button_is-active"
  )
    ? dislikeAPI
    : likeAPI;
  isLiked(cardId)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
      buttonCardLike.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createCard };
