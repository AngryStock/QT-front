import { useState } from 'react';

interface CustomDropdownProps {
  list: string[];
  options: string[];
  height: number;
  selectTextColor: string;
  hoverSelctTextColor: string;
}

function CustomDropdown({ list, options, height, selectTextColor, hoverSelctTextColor }: CustomDropdownProps) {
  let [selectList, setSelectList] = useState(list[0]);
  let [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full relative">
      <div
        className={`${options.includes('between') && 'justify-between'}
          ${
            options.includes('center') && 'justify-center'
          } w-full flex items-center cursor-pointer pl-2 h-${height} text-${selectTextColor} hover:text-${hoverSelctTextColor}-300`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectList}
        {isOpen ? (
          <span className="material-symbols-outlined pr-2">expand_less</span>
        ) : (
          <span className="material-symbols-outlined pr-2">expand_more</span>
        )}
      </div>
      {isOpen && (
        <ul className="absolute border border-gray-400  w-full rounded-lg bg-white z-10">
          {list.map((option, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setSelectList(option);
                  setIsOpen(false);
                }}
                className={`${list.length !== index + 1 ? 'border-b border-gray-400' : 'rounded-b-lg'} ${
                  index === 0 && 'rounded-t-lg'
                } ${
                  options.includes('center') ? 'justify-center' : 'pl-2'
                } h-${height}  cursor-pointer w-full hover:bg-rose-300 hover:font-bold flex items-center`}
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
