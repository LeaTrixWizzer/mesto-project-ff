const renderSavingLoading = (isLoading, modalElement) => {
  const activeButton = modalElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
};

const renderDeleteLoading = (isLoading, modalElement) => {
  const activeButton = modalElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Удаление...";
  } else {
    activeButton.textContent = "Да";
  }
};

export { renderSavingLoading, renderDeleteLoading };