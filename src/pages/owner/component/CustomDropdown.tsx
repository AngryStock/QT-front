import { useState } from 'react';
import styles from './CustomDropdown.module.css';

interface CustomDropdownProps {
  options: string[];
}

function CustomDropdown({ options }: CustomDropdownProps) {
  let [selectedOption, setSelectedOption] = useState(options[0]);
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full relative">
      <div
        className={`w-full flex items-center cursor-pointer pl-2 h-12 rounded-lg border border-gray-400 hover:border-2 ${
          isOpen === false ? styles.arrowDown : styles.arrowUp
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <ul className="absolute border border-gray-400  w-full rounded-lg bg-white z-10">
          {options.map((option, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className={`${options.length !== index + 1 ? 'border-b border-gray-400' : 'rounded-b-lg'} ${
                  index === 0 && 'rounded-t-lg'
                } h-12 cursor-pointer w-full hover:bg-rose-200 hover:font-bold flex items-center pl-2`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomDropdown;
