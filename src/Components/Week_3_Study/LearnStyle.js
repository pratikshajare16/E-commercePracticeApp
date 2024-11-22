//  1. Css module
//   CSS Modules allow you to write CSS that is scoped locally to the component by default.
//   This helps avoid conflicts between styles, especially in large applications.

// 2. Styled Components
// Styled Components is a library for React and React Native that allows you to use component - level styles in your application.
// You write the actual CSS within your JavaScript.


//3. Inline Styles
//Hover effects cannot be applied using inline styles.

import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const LearnStyle = () => {
  return (
    <div>
      {/* Styled Components */}
      <StyledButton>
        Click Me
      </StyledButton>

      {/* Inline styling */}
      <button style={{ color: 'white', backgroundColor: 'blue' }}>
        Click Me
      </button>


    </div>
  );
};

export default LearnStyle;



