const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapes);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapes);
};

const handleEscapes = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
};

const closePopupHandler = (modal) => {
  return (evt) => {
    if (
      evt.target.classList.contains("popup__close") ||
      evt.target === modal
    ) {
      closeModal(modal);
    }
  };
};

const attachModalEvents = () => {
  const modal = document.querySelectorAll(".popup");
  modal.forEach((modal) => {
    modal.addEventListener("click", closePopupHandler(modal));
  });
};

export { openModal, closeModal, attachModalEvents };