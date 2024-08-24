import "../index.css";
import { createCard } from "./card";
import { openModal, closeModal, attachModalEvents } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getProfileInfo,
  getCardsInfo,
  deleteCard as deleteCardAPI,
  editProfileImage as profileImageAPI,
  postNewCard,
  editProfileInfo as profileInfoAPI,
} from "./api";
import { renderSavingLoading, renderDeleteLoading } from "./loading";
import { validationConfig } from "./configutation";

// Объявления констант

const cardList = document.querySelector(".places__list");

// Кнопки

const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-button");

// Модальные окна

const modalEditAvatar = document.querySelector(".popup_type_avatar_edit");
const modalImage = document.querySelector(".popup_type_image");
const modalEditProfile = document.querySelector(".popup_type_edit");
const modalAddNewCard = document.querySelector(".popup_type_new-card");
const modalConfirmDelete = document.querySelector(".popup_type_confirm_delete");

// Формы

const avatarForm = document.forms["edit-avatar"];
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const cardFormName = cardForm["place-name"];
const formDeleteCard = document.forms["delete-card"];

// Инпуты

const nameInput = profileForm.name;
const jobInput = profileForm.description;
const cardFormLink = cardForm.link;
const avatarInput = avatarForm.avatar;

// Изображение

const modalImg = document.querySelector(".popup__image");
const modalImgCaption = document.querySelector(".popup__caption");

// Данные профиля

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const userName = document.querySelector(".profile__title");
const userAvatar = document.querySelector(".profile__image");
const userAbout = document.querySelector(".profile__description");

let userId;
let cardToDelete;
let cardToDeleteId;

// Функции открытия модального окна при нажатии

buttonAddCard.addEventListener("click", () => {
  openModal(modalAddNewCard);
  clearValidation(cardForm, validationConfig);
});

buttonEditProfile.addEventListener("click", () => {
  openModal(modalEditProfile);
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

buttonEditAvatar.addEventListener("click", () => {
  openModal(modalEditAvatar);
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
});

export const openCard = (card) => {
  openModal(modalImage);
  modalImg.src = card.link;
  modalImg.alt = card.name;
  modalImgCaption.textContent = card.name;
};

// Функция при нажатии на клавишу "Сохранить"

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  const modalElement = document.querySelector(".popup_is-opened");
  renderSavingLoading(true, modalElement);

  profileInfoAPI({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(modalEditProfile);
    })
    .catch((err) => {
      console.error("Ошибка при редактировании профиля:", err);
    })
    .finally(() => {
      renderSavingLoading(false, modalElement);
    });
};

profileForm.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const modalElement = document.querySelector(".popup_is-opened");
  renderSavingLoading(true, modalElement);

  postNewCard({
    name: cardFormName.value,
    link: cardFormLink.value,
  })
    .then((newCard) => {
      cardList.prepend(
        createCard(
          newCard.name,
          newCard.link,
          newCard.likes,
          newCard.owner._id,
          newCard._id,
          userId,
          openDeleteForm,
          openCard
        )
      );
    })
    .then(() => {
      closeModal(modalAddNewCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении новой карточки:", err);
    })
    .finally(() => {
      renderSavingLoading(false, modalElement);
    });
  cardForm.reset();
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const modalElement = document.querySelector(".popup_is-opened");
  renderSavingLoading(true, modalElement);

  profileImageAPI(avatarInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(modalEditAvatar);
    })
    .catch((err) => {
      console.error("Ошибка при редактировании аватара:", err);
    })
    .finally(() => {
      renderSavingLoading(false, modalElement);
    });
});

formDeleteCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(cardToDelete, cardToDeleteId);
});

attachModalEvents();

window.addEventListener("load", () => {
  enableValidation(validationConfig);
});

const openDeleteForm = (card, cardId) => {
  openModal(modalConfirmDelete);
  cardToDelete = card;
  cardToDeleteId = cardId;
};

const deleteCard = (card, cardId) => {
  const modalElement = document.querySelector(".popup_is-opened");
  renderDeleteLoading(true, modalElement);

  deleteCardAPI(cardId)
    .then(() => {
      card.remove();
      closeModal(modalConfirmDelete);
    })
    .catch((err) => {
      console.error("Произошла ошибка:", err);
    })
    .finally(() => {
      renderDeleteLoading(false, modalElement);
    });
};

Promise.all([getProfileInfo(), getCardsInfo()])
  .then(([userData, cardData]) => {
    userAbout.textContent = userData.about;
    userName.textContent = userData.name;
    userAvatar.style = `background-image: url('${userData.avatar}')`;
    userId = userData._id;

    cardData.forEach((card) => {
      cardList.append(
        createCard(
          card.name,
          card.link,
          card.likes,
          card.owner._id,
          card._id,
          userId,
          openDeleteForm,
          openCard
        )
      );
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке профиля и карточек:", err);
  });
