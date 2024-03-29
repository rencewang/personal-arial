import React, { useState, useRef, useEffect } from 'react';

// options should be an array of strings, with default being the first element
const Dropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    setSelected(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${isOpen ? 'is-open' : ''}`} ref={dropdownRef}>
      <div className="dropdown-header pill" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected}</span> <span>&#9662;</span>
      </div>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
