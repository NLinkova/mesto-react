import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard("");
  }

  return (
    <div className="page__content">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* <!-- попап редактирования имени профиля --> */}
      <PopupWithForm
        isOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="edit-profile"
        title="Редактировать профиль"
      >
        <div>
          <input
            type="text"
            name="name"
            id="user-name"
            className="popup__field popup__field_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="user-name-error" className="error"></span>
          <input
            type="text"
            name="about"
            id="about"
            className="popup__field popup__field_type_desc"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            required
          />
          <span id="about-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </div>
      </PopupWithForm>

      {/* <!-- попап для добавления новой карточки --> */}
      <PopupWithForm
        isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="add-card"
        title="Новое место"
      >
        <div>
          <input
            type="text"
            name="name"
            id="place"
            className="popup__field popup__field_type_place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span id="place-error" className="error"></span>
          <input
            type="url"
            name="link"
            id="link"
            className="popup__field popup__field_type_url"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="link-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Создать
          </button>
        </div>
      </PopupWithForm>
      {/* <!-- попап для обновления аватара --> */}
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        name="edit-avatar"
        title="Обновить аватар"
      >
        <div>
          <input
            type="url"
            name="avatar"
            id="avatar"
            className="popup__field popup__field_type_url"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="avatar-error" className="error"></span>
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </div>
      </PopupWithForm>
      <ImagePopup
        name="image"
        isOpen={selectedCard ? "popup_opened" : ""}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
