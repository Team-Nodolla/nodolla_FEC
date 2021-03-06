import React, { useEffect, useState } from 'react';
import propTypes from 'proptypes';
import './ReviewList.css';
import ReviewListItem from './ReviewListItem/ReviewListItem.jsx';
import AddReviewButton from './ReviewButtonsContainer/AddReviewButton/AddReviewButton.jsx';

const ReviewList = ({ reviewList, visibleReviews, MoreReviewsButtonRender, productName, productID, metaData }) => {
  // const [reviewElements, setReviewElements] = useState([]);
  let reviewsArray = [];

  reviewList.map((review) => {
    reviewsArray.push(<ReviewListItem review={review} key={review.review_id} />);
  });

  // review list conditional rendering check
  const ReviewsToRender = () => {
    if (reviewsArray.length <= visibleReviews && reviewList.length > 0) {
      return (
        <div className="reviewList">
          <div className="review-list-item-container">
            {reviewsArray}
          </div>
        </div>
      );
    }
    if (reviewsArray.length > visibleReviews) {
      let reviewsArraySubset = [];
      for (let i = 0; i < visibleReviews; i += 1) {
        reviewsArraySubset.push(reviewsArray[i]);
      }
      return (
        <div id="review-list" className="reviewList">
          <div className="review-list-item-container">
            {reviewsArraySubset}
          </div>
        </div>
      );
    }
    return (
      <>
      </>
    );
  };

  return (
    <ReviewsToRender />
  );
};

ReviewList.propTypes = {
  reviewList: propTypes.array,
  visibleReviews: propTypes.number,
};

export default ReviewList;
