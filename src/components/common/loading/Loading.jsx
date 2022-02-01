import React from 'react';
import './Loading.css';
import loadingGif from '../../assets/loading.gif';

function Loading() {
    return (
        <div className="loading">
        <img src={loadingGif} alt="loading-indicator"/>
        </div>
    )
}

export default Loading