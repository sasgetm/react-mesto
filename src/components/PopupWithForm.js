function PopupWithForm(props) {
  return (
    <>
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button aria-label="Close popup" type="button" className="popup__close" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={`${props.name}-form`} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          
          <button type="submit" className="popup__button">{props.button || 'Сохранить'}</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default PopupWithForm;