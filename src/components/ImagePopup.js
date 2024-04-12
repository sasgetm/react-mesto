function ImagePopup(props) {
  return (
    <div className={`popup popup_dark image-popup js-image-popup ${props.card._id ? 'popup_opened' : ''}`}>
      <div className="image-popup__container">
        <button aria-label="Close popup" type="button" className="popup__close" onClick={props.onClose}></button>
        <img src={props.card.link} className="image-popup__image" alt={props.card.name} />
        <p className="image-popup__title">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;