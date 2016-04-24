//node modules
import React from 'react';

export default function({ disabled, onClick, text = 'Submit' }) {

  if(disabled) {
    return (
      <button className="ui disabled primary button">
        {text}
      </button>
    );
  }
  else {
    return (
      <button type="submit" className="ui primary button" onClick={onClick}>
        {text}
      </button>
    );
  }
}
