import {useEffect, useState} from 'react';
import {HashRouter, Route, Routes, Navigate} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Footer from './Footer.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});

  const [cards, setCards] = useState([]);

  // const handleLogin = () => {
    // setLoggedIn(true);
  // }

  useEffect(() => {
    api.getProfile ()
    .then((result) => {
      setCurrentUser(result);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])
  
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen])

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function closeAllPopups () {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  
  function handleUpdateUser(user) {
    api.editProfile (user.name, user.about)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups ()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatarRequest (avatar)
    .then((result) => {
      setCurrentUser(result);
      closeAllPopups ()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace({place, link}) {
    api.sendNewCard (place, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups ()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    api.getCards()
    .then((result) => {
      setCards(result);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {

    api.deleteCardRequest(card._id)
    .then((result) => {
      const updatedCards = cards.filter(cardItem => cardItem._id !== card._id);
    
      setCards(updatedCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleSignIn () {
    
  }

  function handleSignUp () {
    
  }

  return (
  <div className="page">
    <Routes>
      <Route path="/" element={ loggedIn ? (
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name='delete'
            title='Вы уверены?'
            button='Да'
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <Footer />
        </CurrentUserContext.Provider>
      ) : (
        <Navigate to="/sign-in" replace />
      )
      }/>
      <Route path="/sign-in" element={<SignIn handleSignIn={handleSignIn} />} />
      <Route path="/sign-up" element={<SignUp handleSignUp={handleSignUp} />} />
    </Routes>

  </div>
  );
}

export default App;
