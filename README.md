# React Verification Code Input

## English

### Description

This is a React component for entering verification codes. It's designed for ease of use and flexibility, allowing users to input a fixed-length code, typically used for verification purposes like OTPs (One Time Passwords).

### Features

- Supports customizable length for verification codes.
- Automatically focuses the next input after a digit is entered.
- Deletes the previous digit on backspace.
- Easy to style and integrate into your React application.

### Installation

Simply clone this repository into your project directory.

### Usage

Import the `VerifyCode` component into your React application and use it like any standard component. The default length for the verification code is 6 digits, but you can customize it as needed.

```javascript
import VerifyCode from "./path-to-component/VerifyCode";

function App() {
  return (
    <div className="App">
      <VerifyCode />
    </div>
  );
}

export default App;
```

## Demo

![Component Demo](public/example.gif)
