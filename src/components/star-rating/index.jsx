import { useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
// import { useSearchParams } from 'react-router-dom';
import "./style.css";

const StarRating = ({ numberOfStars }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const ratingRef = useRef(null);
    // const [searchParams] = useSearchParams();

    // const numstars = searchParams.get('num-stars'); 

    const handleStarClick = (starIndex) => {
        setRating(starIndex);
        setRatingNumber(starIndex);
        // console.log("starIndex:", starIndex);
    };
    const handleStarEnter = (starIndex) => {
        // console.log("starIndex:", starIndex);
        setHover(starIndex);
        setRatingNumber(starIndex);
    };
    const handleStarLeave = (starIndex) => {
        // console.log("starIndex:", starIndex);
        setHover(rating);
        setRatingNumber(rating);
    };

    const setRatingNumber = (value) => {
        ratingRef.current.innerHTML = `<span style="font-size:1.5em;">${value}</span> <span>star${value !== 1 ? 's' : ''}</span>`;
    };

    return (
        <div className="container">
            <h1>Star Rating</h1>
            <div className="stars">
                {[...Array(numberOfStars)].map((star, index) => {
                    index++;
                    return (
                        <FaStar
                            key={index}
                            className={`star ${
                                index <= (hover || rating)
                                    ? "active"
                                    : "inactive"
                            }`}
                            onClick={() => {
                                handleStarClick(index);
                            }}
                            onPointerEnter={() => {
                                handleStarEnter(index);
                            }}
                            onPointerLeave={() => {
                                handleStarLeave(index);
                            }}
                            size={40}
                        />
                    );
                })}
            </div>
            <h2 className="rating-number" ref={ratingRef}>
            <span style={{fontSize:"1.5em"}}>0</span> <span>stars</span>
            </h2>
        </div>
    );
};

export default StarRating;
