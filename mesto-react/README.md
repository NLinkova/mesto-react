          />
          <span id="about-error" className="error"></span>

          <button type="submit" className="popup__submit-button">
            Сохранить
          </button> */}
          для ошибок валидации нужно поменять id span

{/_ <!-- попап для удаления карточки --> _/}

      <div className="popup popup_type_delete-card">
        <div className="popup__delete-container">
          <button type="button" className="popup__close-button">
            <img
              className="popup__cross"
              src={closeButton}
              alt="иконка крестика"
            />
          </button>
          <form className="popup__form" name="confirm-form" noValidate>
            <h3 className="popup__title popup__title_small">Вы уверены?</h3>
            <button
              type="button"
              className="popup__submit-button popup__submit-button_small"
            >
              Да
            </button>
          </form>
        </div>
      </div>
