import React from "react";
import './Loading.css';
import LoadingAnimation from './img/loading.gif';

const Loading = (props: {}) => {
  return <div className='loading'>
    <p>読み込み中……</p>
    <img src={LoadingAnimation} alt="" />
  </div>
}

export default Loading;
