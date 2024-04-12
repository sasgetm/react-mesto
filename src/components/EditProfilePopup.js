import {useEffect, useContext, useState} from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(user.name);
    setDescription(user.about);
  }, [user, props.isOpen]); 

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
  <PopupWithForm
    name='profile'
    title='Редактировать профиль'
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <div className="popup__input-container">
      <input type="text" className="popup__input popup__input_type_name" name="name" placeholder="Имя" id="name-input" required minLength="2" maxLength="40" value={name || ''}  onChange={handleName} />
      <span className="popup__input-error name-input-error"></span>
    </div>
    <div className="popup__input-container">
      <input type="text" className="popup__input popup__input_type_role" name="role" placeholder="Описание" id="role-input" required minLength="2" maxLength="200" value={description || ''} onChange={handleDescription} />
      <span className="popup__input-error role-input-error"></span>
    </div>
  </PopupWithForm>
  );
}

export default EditProfilePopup;