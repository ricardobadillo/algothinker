import { useState, useEffect } from 'react';
import classes from './Select.module.scss';
import clx from 'classnames';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';

const Select = ({
  initialValue,
  options,
  setSelectedChallenge,
  challengesSolvedIds,
}) => {
  const [{ label, value, showOptions }, setSelectState] = useState({
    label: initialValue.label,
    value: initialValue.value,
    showOptions: false,
  });

  const optionsSelect = options.map((option, index) => {
    
    return (
      <div className={classes.option} key={index}>
        <div
          key={index}
          className={
            option.value === value
              ? classes.selectedOption
              : classes.hiddenOption
          }
        >
          {option.label}
          <div className={classes.dropdownIcon}>
            <RiArrowDropDownLine />
          </div>
        </div>
        {option.value === value && showOptions && (
          <div className={classes.dropdownContent}>
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={clx({
                    [classes.dropdownOption]: true,
                    [classes.selected]: option.value === value,
                  })}
                  onClick={() => {
                    setSelectState((prevState) => {
                      return {
                        ...prevState,
                        label: option.label,
                        value: option.value,
                      };
                    });
                    setSelectedChallenge(index);
                  }}
                >
                  <span>{option.label}</span>
                  {challengesSolvedIds[option.value] ? (
                    <span style={{ color: 'lime', fontSize: '1.2rem' }}>
                      <AiOutlineCheck />
                    </span>
                  ) : (
                    <div>{' '}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className={classes.customSelect}
      onClick={() => {
        setSelectState((prevState) => {
          return { ...prevState, showOptions: !showOptions };
        });
      }}
    >
      {optionsSelect}
    </div>
  );
};

export default Select;
