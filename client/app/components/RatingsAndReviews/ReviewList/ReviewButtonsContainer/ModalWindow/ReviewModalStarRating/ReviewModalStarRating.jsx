/* eslint-disable react/prop-types */
import React from 'react';
import propTypes from 'proptypes';

const ReviewModalStarRating = ({ reviewScore, setMargin = '20px 0 0 0', handleStarRatingClick }) => {
  let display;
  if (reviewScore === null) {
    display = <div id="no-reviews">No Reviews For This Product</div>;
  } else {
    // Rounds the score to the nearest quarter
    const roundedScore = Math.round(reviewScore * 4) / 4;

    // Create a solely visual offset so a quarter/3-quarter
    // star *looks* more like a quarter than it actually does
    const testOffset = roundedScore - Math.round(roundedScore);
    let quarterOffset = testOffset === 0.25 || testOffset === -0.25 ? 2.5 : 0;
    // eslint-disable-next-line no-unused-expressions
    testOffset < 0 ? quarterOffset *= -1 : 0;

    // Turn it into a percantage of stars to show
    // This works in "reverse" since it's calculating the percentage
    // of *missing* stars rather than that of showing stars because
    // width extends/shrinks from the left
    const missingPercent = `${100 - roundedScore * 20 - quarterOffset}%`;

    display = (
      <div className="review-modal-stars star-rating-container" style={{ margin: setMargin }}>
        <EmptyStars handleStarRatingClick={handleStarRatingClick} />
        <div className="stars-cover" style={{ width: missingPercent }}> </div>
        <FilledStars handleStarRatingClick={handleStarRatingClick} />
      </div>
    );
  }

  return (
    <div>
      { display }
    </div>
  );
};

const EmptyStars = ({ handleStarRatingClick }) => (
  <div className="empty-stars stars review-modal-stars">
    <i onClick={handleStarRatingClick} id={1} className="far fa-star star" />
    <i onClick={handleStarRatingClick} id={2} className="far fa-star star" />
    <i onClick={handleStarRatingClick} id={3} className="far fa-star star" />
    <i onClick={handleStarRatingClick} id={4} className="far fa-star star" />
    <i onClick={handleStarRatingClick} id={5} className="far fa-star star" />
  </div>
);

const FilledStars = ({ handleStarRatingClick }) => (
  <div className="stars review-modal-stars">
    <i className="full-stars fas fa-star star" />
    <i className="full-stars fas fa-star star" />
    <i className="full-stars fas fa-star star" />
    <i className="full-stars fas fa-star star" />
    <i className="full-stars fas fa-star star" />
  </div>
);

ReviewModalStarRating.propTypes = {
  reviewScore: propTypes.number,
  setMargin: propTypes.string,
  handleStarRatingClick: propTypes.func,
};

export default ReviewModalStarRating;
