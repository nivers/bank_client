//node modules
import React from 'react';

export default function({ disabled, onClick, text = 'Submit' }) {
  let button;

  if(disabled) {
    button = (
      <button className="ui disabled button">
        {text}
      </button>
    );
  }
  else {
    button = (
      <button className="ui primary button" onClick={onClick}>
        {text}
      </button>
    );
  }

  return (
    <div className="submit-button">
      {button}
    </div>
  );
}
