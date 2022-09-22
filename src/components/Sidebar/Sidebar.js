/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './Sidebar.css';
import close from '../assests/close-sharp.svg';

const Sidebar = (props) => {
  const [initalVal, setInitialVal] = useState('');
  const [comment, setComment] = useState([]);
  const onChangeComment = (e) => {
    e.preventDefault();
    setInitialVal(e.target.value);
  };
  const commentHandler = (e) => {
    e.preventDefault();
    setComment((prevValue) => [...prevValue, initalVal]);
    setInitialVal('');
  };

  return (
    <form className="sidebar-container" onSubmit={commentHandler}>
      <img src={close} alt="close" className="close-svg" onClick={props.click} />
      <h2>Comment Section</h2>
      <label>Type your comment below</label>
      <textarea
        value={initalVal}
        placeholder="Enter your comment here"
        className="sidebar-textarea"
        onChange={onChangeComment}
      />
      <button type="submit" className="submit">
        Submit
      </button>
      <h3>Your comments:</h3>
      {comment.map((text) => (
        <p className="comment" key={text}>
          {text}
        </p>
      ))}
    </form>
  );
};

export default Sidebar;
