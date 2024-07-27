// Импорт данных

import '../index.css';
import { initialCards } from './cards';
import { openModal, closeModal } from './modal';
import { createCard, deleteCard, likeCard, clickHandleImage } from './card';

// Объявление констант

const cardList = document.querySelector('.places__list');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const buttonAddCard = document.querySelector('.profile__add-button');

const modalEditProfile = document.querySelector('.popup_type_edit');
const editProfileForm = modalEditProfile.querySelector('.popup__form');
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');

const modalAddCard = document.querySelector('.popup_type_new-card');
const addForm = modalAddCard.querySelector('.popup__form');
const cardNameInput = addForm.querySelector('input[name="place-name"]');
const cardLinkInput = addForm.querySelector('input[name="link"]');

// Вывод карточек на страничку

initialCards.forEach(({name, link}) => {
    const cardData = createCard(name, link, likeCard, deleteCard, clickHandleImage);
    cardList.append(cardData);
});

// Функция открытия модального окна при нажатии

const openModalEditProfile = () => {
    openModal(modalEditProfile);

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const openModalAddCard = () => {
    addForm.reset();
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

    const addCard = createCard(cardNameInput.value, cardLinkInput.value, likeCard, deleteCard)
    cardList.prepend(addCard);

    addForm.reset();
    closeModal(modalAddCard);
}

// Обработчики событий

buttonEditProfile.addEventListener('click', openModalEditProfile);
editProfileForm.addEventListener('submit', submitEditProfileForm);

buttonAddCard.addEventListener('click', openModalAddCard);
addForm.addEventListener('submit', submitAddForm);