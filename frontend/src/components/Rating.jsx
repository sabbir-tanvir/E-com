import React, { useState } from 'react';
import '../componentStyles/Rating.css'


function Rating({ value, onRatingChnage, disabled }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(value || 0);

    // handle star hover
    const handleMouseHover = (rating) => {
        if (!disabled) {
            setHoveredRating(rating)
        }
    }

    // mouse leave
    const handleMouseLeave = () => {
        if (!disabled) {
            setHoveredRating(0)
        }
    }

    // Handle click

    const handleClick = (rating) => {
        if (!disabled) {
            setSelectedRating(rating)
            if (onRatingChnage) {
                onRatingChnage(rating)
            }
        }
    }

    // Generate start 

const generateStar = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        const isFilled = i <= (hoveredRating || selectedRating);
        stars.push(
            <span
                key={i}
                className={`star ${isFilled ? 'filled' : 'empty'}`}
                onMouseEnter={() => handleMouseHover(i)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => handleClick(i)}
                style={{ pointerEvents: disabled ? 'none' : 'auto' }}
            >
                ★
            </span>
        )
    }
    return stars;
}

    return (
        <div>
            <div className="rating">{generateStar()}</div>
        </div>
    );
};

export default Rating;


// 10: 39 