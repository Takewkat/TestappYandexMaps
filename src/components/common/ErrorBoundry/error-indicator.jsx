import React from 'react';

import './error-indicator.css';
import icon from '../../assets/error.png';

function ErrorIndicator() {
    return (
        <div className="error-indicator">
        <img src={icon} alt="error icon"/>
        <span className="oops">oops</span>
        <span>
            something has gone wrong
        </span>
        </div>
    );
};

export default ErrorIndicator;