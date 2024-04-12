import {useRef} from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
  const placeRef = useRef();
  const linkRef = useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      place: placeRef.current.value,
      link: linkRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__input-container">
        <input type="text" ref={placeRef} className="popup__input popup__input_place_name" placeholder="Название" required minLength="2" id="place-name-input" name="place" maxLength="30" />
        <span className="popup__input-error place-name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input type="url" ref={linkRef} className="popup__input popup__input_place_link" id="picture-url-input" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error picture-url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;