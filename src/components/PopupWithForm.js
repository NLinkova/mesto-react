import React from "react";
import closeButton from "../images/close_icon.svg";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        >
          <img
            className="popup__cross"
            src={closeButton}
            alt="иконка крестика"
          />
        </button>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          noValidate
        >
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
