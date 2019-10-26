import React, { useState, useRef, useEffect } from 'react';
import './FloatLabel.css';

const FloatLabel = props => {
  const { name, text, left, top } = props;
  const [label, setLabel] = useState({
    x: left,
    y: top,
    name: name,
    value: text
  });

  useEffect(() => {
    setLabel({
      x: left,
      y: top,
      name: name,
      value: text
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const floatLabel = useRef(null);

  return (
    <div
      className="floatLabel"
      ref={floatLabel}
      style={{
        position: 'absolute',
        background: 'white',
        left: label.x + 20,
        top: label.y
      }}
    >
      {label.name && `${label.name} : ${label.value}`}
    </div>
  );
};

export default FloatLabel;
