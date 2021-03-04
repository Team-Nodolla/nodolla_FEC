import React, { useEffect, useState } from 'react';
import propTypes from 'proptypes';
import './ReviewList.css';
import ReviewListItem from './ReviewListItem/ReviewListItem.jsx';
import MoreReviewsButton from './ButtonsContainer/MoreReviewsButton.jsx';

const ReviewList = ({ reviewList, visibleReviews }) => {
  // const [reviewElements, setReviewElements] = useState([]);
  let reviewsArray = [];

  reviewList.map((review) => {
    reviewsArray.push(<ReviewListItem review={review} key={review.review_id} />);
  });

  // review list conditional rendering check
  const ReviewsToRender = () => {
    if (reviewsArray.length <= visibleReviews) {
      return (
        <div className="reviewListItemContainer">
          {reviewsArray}
        </div>
      );
    }
    if (reviewsArray.length > visibleReviews) {
      let reviewsArraySubset = [];
      for (let i = 0; i < visibleReviews; i += 1) {
        reviewsArraySubset.push(reviewsArray[i]);
      }
      return (
        <>
          <div className="reviewListItemContainer">
            {reviewsArraySubset}
          </div>
        </>
      );
    }
  };

  return (
    <ReviewsToRender />
  );
};

ReviewList.propTypes = {
  reviewList: propTypes.array,
  visibleReviews: propTypes.number.isRequired,
};

export default ReviewList;
