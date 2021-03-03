/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import propTypes from 'proptypes';
import StarRating from '../../StarRating/StarRating.jsx';
import './CarouselCard.css';

const CarouselCard = ({
  id,
  productImage,
  category,
  name,
  originalPrice,
  salePrice,
  stars,
  buttonFunc,
  handleRedirect,
}) => {
  const [onSale] = useState(Boolean(salePrice));
  let displayPrice;
  if (onSale) {
    displayPrice = (
      <>
        <span className="descriptive" id="old-price">{`$${originalPrice}`}</span>
        <span className="descriptive" id="display-price">{`$${salePrice}`}</span>
      </>
    );
  } else {
    displayPrice = <span className="descriptive" id="display-price">{`$${originalPrice}`}</span>;
  }
  return (
    <div id="card" onClick={() => { handleRedirect(id) }} >
      <button id="action" type="button" onClick={() => { buttonFunc(); }}><i className="far fa-star" /></button>
      <div id="card-image-container">
        <img id="card-image" src={productImage} alt="" />
      </div>
      <div id="descriptive-container">
        <span className="descriptive" id="category">{category}</span>
        <h3 className="descriptive" id="product-name">{name}</h3>
        {displayPrice}
        <StarRating reviewScore={stars} setMargin="10px 0 0 10px" />
      </div>
    </div>
  );
};

CarouselCard.propTypes = {
  id: propTypes.number.isRequired,
  productImage: propTypes.string,
  category: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  originalPrice: propTypes.string.isRequired,
  salePrice: propTypes.string,
  stars: propTypes.number,
  buttonFunc: propTypes.func.isRequired,
  handleRedirect: propTypes.func.isRequired,
};

export default CarouselCard;
