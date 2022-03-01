import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState("");

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromServer()])
      .then(([user]) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

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
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          isOpen={isEditProfilePopupOpen}
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
          isOpen={isAddPlacePopupOpen}
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
          isOpen={isEditAvatarPopupOpen}
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
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
