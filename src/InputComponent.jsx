// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";

function InputComponent({ onInputChange }) {
    const [input, setInput] = useState("");

    const handleInputChangeInternal = (e) => {
        const value = e.target.value.replace(/[^-0-9/]/g, "");
        setInput(value);
        onInputChange(value);
    };

    return (
        <div className="input-form">
            <input
                type="text"
                value={input}
                onChange={handleInputChangeInternal}
                className="square-input"
            />
        </div>
    );
}

InputComponent.propTypes = {
    onInputChange: PropTypes.func.isRequired,
};

export default InputComponent;
