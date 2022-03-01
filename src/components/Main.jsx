import React from "react";
import api from "../utils/api.js";
import Card from "./Card.jsx";
import pencilAvatar from "../images/pencil_avatar.svg";
import pencilButton from "../images/pencil.svg";
import plusButton from "../images/plus.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getCards()])
      .then(([cards]) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-group">
          <img
            className="profile__avatar"
            alt="аватар пользователя страницы"
            src={currentUser.avatar}
          />{" "}
          <button
            type="button"
            className="profile__avatar-button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar-pencil"
              src={pencilAvatar}
              alt="иконка карандаша"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>{" "}
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          >
            <img
              className="profile__pencil"
              src={pencilButton}
              alt="иконка карандаша"
            />
          </button>
          <p className="profile__description">{currentUser.about}</p>{" "}
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        >
          <img className="profile__plus" src={plusButton} alt="иконка плюса" />
        </button>
      </section>
      <section className="elements">
        {/*контейнер для карточек */}
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
