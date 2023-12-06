// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import HeaderComponent from "./HeaderComponent";
import SubmitButtonComponent from "./SubmitButtonComponent";
import ResultComponent from "./ResultComponent";

function calculateDet(matrix) {
    let matrixSize = matrix.length;
    if (matrixSize === 1) return matrix[0];
    for (let i = 0; i < matrixSize; i++) {
        if (matrixSize !== matrix[i].length) return undefined;
    }
    if (matrixSize === 1) return matrix[0][0];
    if (matrixSize === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
        let sum = 0;
        let newMatrix = [];
        for (let j = 0; j < matrixSize; j++) {
            for (let m = 1; m < matrixSize; m++) {
                newMatrix.push(
                    matrix[m].slice(0, j).concat(matrix[m].slice(j + 1))
                );
            }
            sum += matrix[0][j] * (-1) ** (2 + j) * calculateDet(newMatrix);
            newMatrix = [];
        }
        return sum;
    }
}

function App() {
    const [matrixSize, setMatrixSize] = useState(2);
    const [matrixInputs, setMatrixInputs] = useState(
        Array.from({ length: 2 * 2 }, () => "")
    );
    const [result, setResult] = useState(0);
    const inputContainerStyle = {
        display: "grid",
        gridTemplateColumns: `repeat(${matrixSize}, 1fr)`,
        backgroundColor: "lightgray",
    };
    const handleInputChange = (index, value) => {
        const newMatrixInputs = [...matrixInputs];
        if (value === "" || !value.includes("/")) setResult("0");
        if (value.includes("/")) {
            let temp = value.split("/");
            if (+temp[1] === 0) setResult("Can't divide by zero.");
            else {
                value = +temp[0] / +temp[1];
                setResult("");
            }
        }
        newMatrixInputs[index] = value.toString();
        setMatrixInputs(newMatrixInputs);
    };

    const handleSizeChange = (size) => {
        setMatrixSize(size);
        setMatrixInputs(Array.from({ length: size * size }, () => ""));
    };

    const handleSubmitClick = () => {
        const matrix = [];
        for (let i = 0; i < matrixSize; i++) {
            matrix.push(
                matrixInputs
                    .slice(i * matrixSize, (i + 1) * matrixSize)
                    .map(Number)
            );
        }

        const det = calculateDet(matrix);
        setResult(det);
    };

    return (
        <>
            <HeaderComponent />
            <div className="input-container-container">
                <div style={inputContainerStyle}>
                    {matrixInputs.map((value, index) => (
                        <InputComponent
                            key={index}
                            value={value}
                            onInputChange={(value) =>
                                handleInputChange(index, value)
                            }
                        />
                    ))}
                </div>
            </div>
            <div>
                <label>Select Matrix Size:</label>
                <input
                    type="number"
                    min="2"
                    value={matrixSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                />
            </div>
            <SubmitButtonComponent onSubmitClick={handleSubmitClick} />
            <ResultComponent result={result} />
        </>
    );
}

export default App;
