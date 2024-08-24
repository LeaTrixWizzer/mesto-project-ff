const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  attachModalEvents();
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  removeModalListeners();
};

const handleEscapes = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
};

const handleOutside = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
};

const handleCross = (evt) => {
  if (evt.target.closest(".popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
};

const attachModalEvents = () => {
  document.addEventListener("click", handleCross);
  document.addEventListener("keydown", handleEscapes);
  document.addEventListener("click", handleOutside);
};

const removeModalListeners = () => {
  document.removeEventListener("click", handleCross);
  document.removeEventListener("keydown", handleEscapes);
  document.removeEventListener("click", handleOutside);
};

export { openModal, closeModal, attachModalEvents };