import React from "react";
import api from "../utils/api.js";
import Card from "../components/Card.js";
import pencilAvatar from "../images/pencil_avatar.svg";
import pencilButton from "../images/pencil.svg";
import plusButton from "../images/plus.svg";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-group">
          <img
            className="profile__avatar"
            alt="аватар пользователя страницы"
            src={userAvatar}
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
          <h1 className="profile__name">{userName}</h1>{" "}
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
          <p className="profile__description">{userDescription}</p>{" "}
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
        {cards.map((item, index) => (
          <Card card={item} key={index} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
