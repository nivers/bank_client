//node modules
import React from 'react';

export default function({ value, onChange, error }) {

  //if props.error is truthy, the error class is included at the end
  const inputClass = `ui right labeled input ${error ? 'error' : ''}`;

  return (
    <div className={inputClass}>
      <div className="ui label">
        $
      </div>
      <input type="text" value={value} onChange={onChange} />
      <div className="ui basic label">
        .00
      </div>
    </div>
  );
}
