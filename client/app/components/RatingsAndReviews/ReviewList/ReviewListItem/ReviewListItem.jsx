/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import StarRating from '../../../StarRating/StarRating.jsx';
import ReviewListItemThumbnails from './ReviewListItemThumbnails/ReviewListItemThumbnails.jsx';
import ReviewBodyRender from './ReviewBodyRender/ReviewBodyRender.jsx';
import './ReviewListItem.css';

const ReviewListItem = ({ review }) => {
  const [reviewTileBody, setReviewTileBody] = useState(review.body.substring(0, 250));
  const [reviewBodyButtonClass, setReviewBodyButtonClass] = useState('review-show-more-button');

  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = review.date.slice(5, 7);
  const day = review.date.slice(8, 10);
  const year = review.date.slice(0, 4);
  const formattedString = `${monthArray[month - 1]} ${day}, ${year}`;

  const handleShowMoreBody = () => {
    setReviewTileBody(review.body);
    setReviewBodyButtonClass('review-show-more-button-hidden');
  };

  return (
    <div className="review-list-item">
      <div className="reviewListItemStarRating">
        <StarRating reviewScore={review.rating} setMargin="0 0 0 0" />
        <div className="review-username-date">
          {review.reviewer_name}
          {', '}
          {formattedString}
        </div>
      </div>
      <div className="reviewListItemSummary">
        {review.summary}
      </div>
      <ReviewBodyRender
        review={review}
        reviewTileBody={reviewTileBody}
        reviewBodyButtonClass={reviewBodyButtonClass}
        handleShowMoreBody={handleShowMoreBody}
      />
    </div>
  );
};


export default ReviewListItem;
