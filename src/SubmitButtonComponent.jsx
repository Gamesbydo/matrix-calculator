// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const SubmitButtonComponent = ({ onSubmitClick }) => {
    return (
        <div className="submit-button-container">
            <button className="submit-button" onClick={onSubmitClick}>
                Submit
            </button>
        </div>
    );
};
export default SubmitButtonComponent;
