"use client";
import "./style.css";
import { useCallback, useRef, useState } from "react";

const VerifyCode = () => {
  const PIN_LENGTH = 6;

  const [value, setValue] = useState(Array(PIN_LENGTH).fill(""));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [invalidIndex, setInvalidIndex] = useState(null);
  const inputsRef = useRef([]);

  const validInput = useCallback((value) => {
    return /^\d*$/.test(value);
  }, []);

  const focusInput = useCallback((i) => {
    const inputs = inputsRef.current;
    if (i > inputs.length) return;
    if (inputs[i]) {
      inputs[i].focus();
    }
    setCurrentIndex(i);
  }, []);

  const focusNextInput = useCallback(() => {
    const nextIndex =
      currentIndex + 1 >= PIN_LENGTH - 1 ? PIN_LENGTH - 1 : currentIndex + 1;
    focusInput(nextIndex);
  }, [focusInput, currentIndex]);

  const focusPrevInput = useCallback(() => {
    let prevIndex = currentIndex - 1 <= 0 ? 0 : currentIndex - 1;
    focusInput(prevIndex);
  }, [focusInput, currentIndex]);

  const handleInputClick = useCallback(
    (e) => {
      const index = inputsRef.current.indexOf(e.target);
      setCurrentIndex(index);
      e.target.select();
      focusInput(index);
    },
    [focusInput]
  );

  const handleInputChange = useCallback(
    (e) => {
      const newVal = e.target.value || "";
      const newValue = [...value];
      const index = inputsRef.current.indexOf(e.target);

      if (!validInput(newVal)) {
        setInvalidIndex(index);
      } else {
        setInvalidIndex(null);
      }

      if (newVal.length <= 1 && validInput(newVal)) {
        newValue[index] = newVal;
        setValue(newValue);

        if (newVal === "") {
          focusPrevInput();
        } else {
          focusNextInput();
        }
      }
    },
    [focusNextInput, focusPrevInput, validInput, value]
  );

  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const clipboardData = e.clipboardData || window.clipboardData;
      const val = clipboardData.getData("text/plain").slice(0, PIN_LENGTH);
      if (!validInput(val)) return;

      const len = val.length;
      const index = len === PIN_LENGTH ? PIN_LENGTH - 1 : len;
      setValue(val);
      focusInput(index);
    },
    [validInput, focusInput]
  );

  return (
    <div className={"container"}>
      {Array.from({ length: PIN_LENGTH }).map((_, index) => {
        const focus = index === currentIndex;
        const invalid = index === invalidIndex;
        return (
          <input
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            className={`pinInput ${focus ? "focus" : ""} ${
              invalid ? "invalid" : ""
            }`}
            maxLength={1}
            autoComplete="false"
            value={value[index] || ""}
            onClick={handleInputClick}
            onChange={handleInputChange}
            onPaste={handlePaste}
            placeholder="-"
          />
        );
      })}
    </div>
  );
};

export default VerifyCode;
