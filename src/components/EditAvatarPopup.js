import { useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input type="url" ref={avatarRef} className="popup__input popup__input_avatar_link" id="avatar-url-input" name="avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error avatar-url-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;