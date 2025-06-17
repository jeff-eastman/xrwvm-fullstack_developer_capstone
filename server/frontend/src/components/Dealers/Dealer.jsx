import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import positive_icon from "../assets/positive.png";
import neutral_icon from "../assets/neutral.png";
import negative_icon from "../assets/negative.png";
import review_icon from "../assets/reviewbutton.png";
import Header from '../Header/Header';

const Dealer = () => {
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(null);
  const [loadingDealer, setLoadingDealer] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const { id } = useParams();

  const curr_url = window.location.href;
  const root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  const dealer_url = `${root_url}djangoapp/dealer/${id}`;
  const reviews_url = `${root_url}djangoapp/reviews/dealer/${id}`;
  const post_review_url = `${root_url}postreview/${id}`;
  

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200 && Array.isArray(retobj.dealer) && retobj.dealer.length > 0) {
        setDealer(retobj.dealer[0]);
      } else {
        console.error("Unexpected dealer response:", retobj);
      }
    } catch (err) {
      console.error("Failed to fetch dealer:", err);
    } finally {
      setLoadingDealer(false);
    }
  };

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url, { method: "GET" });
      const retobj = await res.json();
      if (retobj.status === 200 && Array.isArray(retobj.reviews)) {
        if (retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      } else {
        console.error("Unexpected reviews response:", retobj);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const senti_icon = (sentiment) => {
    return sentiment === "positive"
      ? positive_icon
      : sentiment === "negative"
      ? negative_icon
      : neutral_icon;
  };

  useEffect(() => {
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review_url}>
          <img
            src={review_icon}
            style={{ width: '10%', marginLeft: '10px', marginTop: '10px' }}
            alt='Post Review'
          />
        </a>
      );
    }
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>
          {loadingDealer
            ? "Loading dealer..."
            : dealer && dealer.full_name
            ? dealer.full_name
            : "Dealer not found"}
          {postReview}
        </h1>
        <h4 style={{ color: "grey" }}>
          {loadingDealer || !dealer
            ? "Loading location..."
            : `${dealer.city}, ${dealer.address}, Zip - ${dealer.zip}, ${dealer.state}`}
        </h4>
      </div>

      <div className="reviews_panel">
        {loadingReviews ? (
          <div>Loading Reviews...</div>
        ) : unreviewed ? (
          <div>No reviews yet!</div>
        ) : (
          Array.isArray(reviews) &&
          reviews.map((review, index) => (
            <div className="review_panel" key={index}>
              <img
                src={senti_icon(review.sentiment)}
                className="emotion_icon"
                alt="Sentiment"
              />
              <div className="review">{review.review}</div>
              <div className="reviewer">
                {review.name} {review.car_make} {review.car_model} {review.car_year}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
