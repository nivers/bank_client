//node modules
import React from 'react';

const numberInEnglish = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five'
};

function menuItem(optionName, className, onSelect) {
  return (
    <a key={optionName} className={className} onClick={() => onSelect(optionName)}>
      {optionName}
    </a>
  );
}

export default function(props) {
  const numOptions = numberInEnglish[props.options.length];
  if(!numOptions) {
    throw new Error(`Manage account menu expecting option in range ${Object.keys(numberInEnglish)}`);
  }

  return (
    <div className={`ui ${numOptions} item menu`}>
      {props.options.map(option => {
        const selected = (option === props.currentSelection);
        const className = selected ? 'active item' : 'item';
        return menuItem(option, className, props.onSelect);
      })}
    </div>
  );
}
