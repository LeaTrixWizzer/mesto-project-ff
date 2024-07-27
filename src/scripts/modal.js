// Функция открытия модального окна

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  attachModalEvents();
};

// Функция закрытия модального окна

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  removeModalListeners();
};

//Функция обработки нажатия клавиши Esc

const handleEscapes = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
};

// Функция обработки клика вне модального окна

const handleOutside = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
};

// Функция обработки клика на крестик

const handleCross = (evt) => {
  if (evt.target.closest(".popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
};

// Обработчик событии к элементам модального окна при открытии

const attachModalEvents = () => {
  document.addEventListener("click", handleCross);
  document.addEventListener("keydown", handleEscapes);
  document.addEventListener("click", handleOutside);
};

// Обработчик событии к элементам модального окна при закрытии

const removeModalListeners = () => {
  document.removeEventListener("click", handleCross);
  document.removeEventListener("keydown", handleEscapes);
  document.removeEventListener("click", handleOutside);
};

// Экспорт данных

export { openModal, closeModal };
