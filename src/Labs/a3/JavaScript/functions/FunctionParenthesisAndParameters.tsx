import React from 'react';

const FunctionParenthesisAndParameters = () => {
    
    const square = (a: number) => a * a;
    const plusOne = (a: number) => a + 1;
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);


    return (
        <div>
            <h3>Function Parenthesis and Parameters</h3>
            twoSquared = {twoSquared}<br />
            threePlusOne = {threePlusOne}<br />
        </div>
    );
};

export default FunctionParenthesisAndParameters;