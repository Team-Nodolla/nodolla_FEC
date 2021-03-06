/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quotes */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './ModalWindow.css';
import config from '../../../../../../../config.js';
import ReviewModalStarRating from './ReviewModalStarRating/ReviewModalStarRating.jsx';
import ReviewCharacteristics from '../AddReviewButton/ReviewCharacteristics/ReviewCharacteristics.jsx';

const ModalWindow = ({ handleClose, modalView, setModalView, productName, productID, metaData }) => {
  const [reviewRating, setReviewRating] = useState(0);
  const [selectedRecommend, setSelectedRecommend] = useState();
  const [reviewCharsObj, setReviewCharsObj] = useState({});
  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewUsername, setReviewUsername] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewFile, setReviewFile] = useState([]);
  const [reviewFileThumbnail, setReviewFileThumnail] = useState([]);
  const [numberOfImagesUploaded, setNumberOfImagesUploaded] = useState(0);

  const { register, handleSubmit } = useForm();

  const reviewFileArray = [];

  const onSubmit = (data) => {
    const gatheredInfo = {
      ...data,
      productID,
      reviewCharsObj,
      reviewRating,
      recommendRadio: 'true' ? true : false,
    };
    const formData = new FormData();
    for (let i = 0; i < reviewFile.length; i += 1) {
      formData.append('image', reviewFile[i]);
    }

    // make axios post to some image upload API
    if (reviewFile[0].arrayBuffer) {
      axios({
        url: `https://api.imgbb.com/1/upload?key=${config.imgbb}`,
        method: 'POST',
        data: formData,
      })
        .then((response) => {
          console.log('response from server: ', response);
          reviewFileArray.push(response.data.data.display_url);
          axios.post('/reviews', {
            productID: gatheredInfo.productID,
            userRating: gatheredInfo.reviewRating,
            userSummary: gatheredInfo.reviewSummary,
            userBody: gatheredInfo.reviewBody,
            userRec: gatheredInfo.recommendRadio,
            userNickname: gatheredInfo.reviewUsername,
            userEmail: gatheredInfo.reviewEmail,
            photos: reviewFileArray,
            userChars: gatheredInfo.reviewCharsObj,
          })
            .then((serverResponse) => {
              console.log(serverResponse);
            })
            .catch((err) => {
              console.log(err);
            });
          setModalView(!modalView);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post('/reviews', {
        productID: gatheredInfo.productID,
        userRating: gatheredInfo.reviewRating,
        userSummary: gatheredInfo.reviewSummary,
        userBody: gatheredInfo.reviewBody,
        userRec: gatheredInfo.recommendRadio,
        userNickname: gatheredInfo.reviewUsername,
        userEmail: gatheredInfo.reviewEmail,
        photos: [],
        userChars: gatheredInfo.reviewCharsObj,
      })
        .then((serverResponse) => {
          console.log(serverResponse);
        })
        .catch((err) => {
          console.log(err);
        });
      setModalView(!modalView);
    }
  };

  const handleFileChange = (e) => {
    setReviewFile([...reviewFile, e.target.files[0]]);
    setReviewFileThumnail([...reviewFileThumbnail, URL.createObjectURL(e.target.files[0])]);
  };

  useEffect(() => {
    setNumberOfImagesUploaded(numberOfImagesUploaded + 1);
  }, [reviewFile]);

  const imageTwoClassName = numberOfImagesUploaded >= 2 ? "review-image-upload review-image-upload-display" : "review-image-upload review-image-upload-hide";
  const imageThreeClassName = numberOfImagesUploaded >= 3 ? "review-image-upload review-image-upload-display" : "review-image-upload review-image-upload-hide";
  const imageFourClassName = numberOfImagesUploaded >= 4 ? "review-image-upload review-image-upload-display" : "review-image-upload review-image-upload-hide";
  const imageFiveClassName = numberOfImagesUploaded >= 5 ? "review-image-upload review-image-upload-display" : "review-image-upload review-image-upload-hide";

  const modalClassName = modalView ? "review-modal review-modal-display" : "review-modal review-modal-hide";

  const ratingExplanationArray = [
    '1 star - “Poor”',
    '2 stars - “Fair”',
    '3 stars - “Average”',
    '4 stars - “Good”',
    '5 stars - “Great”',
  ];

  const MinimumRequiredBodyCharacters = () => {
    if (reviewBody.length >= 50) {
      return (
        <div>
          Minimum Reached
        </div>
      );
    }
    return (
      <div>
        Minimum required characters left: {50 - reviewBody.length}
      </div>
    );
  };

  const handleRecommendChange = (e) => {
    if (e.target.value === "true") {
      setSelectedRecommend(true);
    }
    if (e.target.value === "false") {
      setSelectedRecommend(false);
    }
  };

  const handleSummaryChange = (e) => {
    setReviewSummary(e.target.value);
  };

  const handleBodyChange = (e) => {
    setReviewBody(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setReviewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setReviewEmail(e.target.value);
  };

  const handleStarRatingClick = (e) => {
    setReviewRating(Number(e.target.id));
  };

  const handleModalStopClick = (e) => {
    e.stopPropagation();
  };

  const OverallRatingStarRating = () => {
    if (reviewRating > 0) {
      return (
        <div className="review-modal-star-wrapper">
          <ReviewModalStarRating reviewScore={reviewRating} setMargin="0 0 0 0" handleStarRatingClick={handleStarRatingClick} />
          <div className="review-rating-explanation">
            {' '}
            {ratingExplanationArray[reviewRating - 1]}
          </div>
        </div>
      );
    }
    return (
      <div className="review-modal-star-wrapper">
        <ReviewModalStarRating reviewScore={reviewRating} setMargin="0 0 0 0" handleStarRatingClick={handleStarRatingClick} />
      </div>
    );
  };

  if (modalView) {
    return (
      <div className={modalClassName} onClick={() => { setModalView(false) }}>
        <div className="review-modal-main" onClick={handleModalStopClick}>
          <div className="review-modal-title">
            <h2>Write your review</h2>
            <h3>About the {productName}</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              Overall Rating*:{' '}
              <OverallRatingStarRating />
            </div><br></br><br></br>
            <div className="radio">
              <label>
                Do you recommend this product?*:{' '}
                <label>
                  Yes
                  <input ref={register} type="radio" name="recommendRadio" value={true} checked={selectedRecommend === true} onChange={handleRecommendChange} required />
                </label>
                <label>
                  No
                  <input ref={register} type="radio" name="recommendRadio" value={false} checked={selectedRecommend === false} onChange={handleRecommendChange} />
                </label>
              </label>
            </div><br></br>
            <div className="review-characteristics">
              <ReviewCharacteristics
                metaData={metaData}
                setReviewCharsObj={setReviewCharsObj}
                reviewCharsObj={reviewCharsObj}
                register={register}
              />
            </div>
            <div>
              <label>
                Review Summary:{' '}<br></br>
                <textarea ref={register} name="reviewSummary" maxLength="60" rows="3" cols="20" placeholder="Example: Best purchase ever" value={reviewSummary} onChange={handleSummaryChange} />
              </label>
            </div><br></br>
            <div>
              <label>
                Review Body*:{' '}<br></br>
                <textarea ref={register} name="reviewBody" maxLength="1000" minLength="50" rows="4" cols="40" placeholder="Why did you like the product or not?" value={reviewBody} onChange={handleBodyChange} required />
              </label><br></br>
              <MinimumRequiredBodyCharacters />
            </div><br></br>
            <div className="review-modal-username">
              <label>
                Username*:{' '}<br></br>
                <input ref={register} type="text" name="reviewUsername" maxLength="60" rows="2" cols="20" placeholder="Example: jackson11!" value={reviewUsername} onChange={handleUsernameChange} required /><br></br>
                <div className="review-username-warning">
                  For privacy reasons, please do not use your full name or email address
                </div>
              </label>
            </div><br></br>
            <div className="review-modal-email">
              <label>
                Email*:{' '}<br></br>
                <input ref={register} type="email" name="reviewEmail" maxLength="60" rows="2" cols="20" placeholder="Example: jackson11@email.com" value={reviewEmail} onChange={handleEmailChange} required /><br></br>
                <div className="review-email-warning">
                  For authentication reasons, you will not be emailed
                </div>
              </label>
            </div><br></br>
            <div className="image-upload-container">
              <input ref={register} type="file" name="images" onChange={handleFileChange} className="review-image-upload-display" />
              <img src={reviewFileThumbnail[0]} height="21px" alt="" className="review-image-upload-display" />
              {' '}
            </div><br></br>
            <div className="image-upload-container">
              <input ref={register} type="file" name="images" onChange={handleFileChange} className={imageTwoClassName} />
              <img src={reviewFileThumbnail[1]} alt="" height="21px" className={imageTwoClassName} />
              {' '}
            </div><br></br>
            <div className="image-upload-container">
              <input ref={register} type="file" name="images" onChange={handleFileChange} className={imageThreeClassName} />
              <img src={reviewFileThumbnail[2]} alt="" height="21px" className={imageThreeClassName} />
              {' '}
            </div><br></br>
            <div className="image-upload-container">
              <input ref={register} type="file" name="images" onChange={handleFileChange} className={imageFourClassName} />
              <img src={reviewFileThumbnail[3]} alt="" height="21px" className={imageFourClassName} />
              {' '}
            </div><br></br>
            <div className="image-upload-container">
              <input ref={register} type="file" name="images" onChange={handleFileChange} className={imageFiveClassName} />
              <img src={reviewFileThumbnail[4]} alt="" height="21px" className={imageFiveClassName} />
              {' '}
            </div><br></br>

            <input type="submit" value="Submit Review" className="submit-review-button" />
          </form><br></br>

          <div className="reviewModalButtonContainer">
            <button type="button" className="close-modal-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
    </>
  );
};

export default ModalWindow;
