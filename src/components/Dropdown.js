import React, { useState, useCallback, useRef, useEffect } from "react";

// options should be an array of strings, with default being the first element
const Dropdown = ({ options, selected, setSelected, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  return (
    <div
      className={`dropdown ${isOpen ? "is-open" : ""}`}
      ref={dropdownRef}
      style={style}
    >
      <div className="dropdown-header pill" onClick={() => setIsOpen(!isOpen)}>
        <span>{selected}</span> <span>&#9662;</span>
      </div>

      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
