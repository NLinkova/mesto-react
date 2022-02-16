import React from "react";

function Card(props) {
  const card = props.card;

  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="element">
      <button type="button" className="element__delete-button"></button>
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button type="button" className="element__like"></button>
          <p className="element__number">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
