import React, { useState, useEffect } from 'react';
import { MdRestaurant, MdLocalCafe } from 'react-icons/md';
import cn from 'classnames';

const CatBtn = ({ selectedStadium, onSetViewEtc }) => {
  const [isRestBtnClick, setIsRestBtnClick] = useState(false);
  const [isCoffeeBtnClick, setIsCoffeeBtnClick] = useState(false);

  const onClick = e => {
    if (e.target.value === 'restaurant') {
      setIsRestBtnClick(!isRestBtnClick);
      isCoffeeBtnClick && setIsCoffeeBtnClick(false);
    }
    if (e.target.value === 'coffeeshop') {
      setIsCoffeeBtnClick(!isCoffeeBtnClick);
      isRestBtnClick && setIsRestBtnClick(false);
    }
  };

  useEffect(() => {
    isRestBtnClick && onSetViewEtc('restaurant');
    isCoffeeBtnClick && onSetViewEtc('coffeeshop');
    !isRestBtnClick && !isCoffeeBtnClick && onSetViewEtc('none');
  }, [isRestBtnClick, isCoffeeBtnClick, onSetViewEtc]);

  useEffect(() => {
    isCoffeeBtnClick && setIsCoffeeBtnClick(false);
    isRestBtnClick && setIsRestBtnClick(false);
  }, [selectedStadium, isCoffeeBtnClick, isRestBtnClick]);

  return (
    <div className="catBtn_wrapper">
      <button
        className={cn('catBtn', isRestBtnClick && 'catBtn_active')}
        onClick={onClick}
        value="restaurant"
      >
        <MdRestaurant />
        {` 음식점`}
      </button>
      <button
        className={cn('catBtn', isCoffeeBtnClick && 'catBtn_active')}
        onClick={onClick}
        value="coffeeshop"
      >
        <MdLocalCafe />
        {` 커피숍`}
      </button>
    </div>
  );
};

export default CatBtn;
