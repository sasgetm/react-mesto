import {useContext} from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div onClick={props.onEditAvatar} className="profile__avatar js-profile-avatar">
            <img src={currentUser.avatar} className="profile__avatar-image" alt="" />
          </div>
          <div className="profile__info">
            <div className="profile__info-top">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={props.onEditProfile} aria-label="Edit profile" type="button" className="profile__edit"></button>
            </div>
            <p className="profile__role">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={props.onAddPlace} aria-label="Add place" type="button" className="profile__add-button"></button>
      </section>
      <section className="elements">
        { props.cards.map((card, i) => (
          <Card
            key={card._id}
            card={card}
            handleCardClick={props.handleCardClick}
            onCardLike={props.handleCardLike}
            handleCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;