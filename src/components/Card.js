import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const user = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === user._id;
  const isLiked = props.card.likes.some(i => i._id === user._id);
  const cardLikeButtonClassName = ( 
    `elements__element-like ${isLiked && 'elements__element-like_active'}` 
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.handleCardDelete(props.card);
  }

  return (
    <>
    <div className="elements__element">
      <div className="elements__element-image-container">
        <img src={props.card.link} className="elements__element-image" alt={props.card.name} onClick={() => props.handleCardClick(props.card)}/>
      </div>
      {isOwn && <button className='elements__element-basket' onClick={handleDeleteClick}></button>} 
      <div className="elements__element-bottom">
        <h2 className="elements__element-title">{props.card.name}</h2>
        <div className="elements__element-like-container">
          <button aria-label="Like place" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="elements__element-like-value">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
    </>
  );
}

export default Card;