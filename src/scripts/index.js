// Импорт данных

import "../index.css";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import { createCard, deleteCard, likeCard } from "./card";

// Объявление констант

const cardList = document.querySelector(".places__list");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const buttonAddCard = document.querySelector(".profile__add-button");

const modalEditProfile = document.querySelector(".popup_type_edit");
const editProfileForm = modalEditProfile.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');

const modalAddCard = document.querySelector(".popup_type_new-card");
const addForm = modalAddCard.querySelector(".popup__form");
const cardNameInput = addForm.querySelector('input[name="place-name"]');
const cardLinkInput = addForm.querySelector('input[name="link"]');

// Функция обработки клика на изображение карточки

export const clickHandleImage = (evt) => {
  const element = evt.target.closest(".card");
  const cardImage = element.querySelector(".card__image");
  const cardTitle = element.querySelector(".card__title");

  const previewImage = document.querySelector(".popup__image");
  const captionModal = document.querySelector(".popup__caption");
  const previewImageModal = document.querySelector(".popup_type_image");

  openModal(previewImageModal);

  previewImage.src = cardImage.src;
  previewImage.alt = cardTitle.name;

  captionModal.textContent = cardTitle.textContent;
};

// Вывод карточек на страничку

initialCards.forEach(({ name, link }) => {
  const cardData = createCard(
    name,
    link,
    likeCard,
    deleteCard,
    clickHandleImage
  );
  cardList.append(cardData);
});

// Функция открытия модального окна при нажатии

const openModalEditProfile = () => {
  openModal(modalEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openModalAddCard = () => {
  openModal(modalAddCard);
};

// Функция при нажатии на клавишу "Сохранить"

const submitEditProfileForm = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editProfileForm.reset();

  closeModal(modalEditProfile);
};

const submitAddForm = (evt) => {
  evt.preventDefault();

  const addCard = createCard(
    cardNameInput.value,
    cardLinkInput.value,
    likeCard,
    deleteCard
  );
  cardList.prepend(addCard);

  addForm.reset();
  closeModal(modalAddCard);
};

// Обработчики событий

buttonEditProfile.addEventListener("click", openModalEditProfile);
editProfileForm.addEventListener("submit", submitEditProfileForm);

buttonAddCard.addEventListener("click", openModalAddCard);
addForm.addEventListener("submit", submitAddForm);