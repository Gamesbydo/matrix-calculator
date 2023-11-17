/*Going to use a recursive method to calculate the determinant of a matrix */

// takes a 2D array as input and returns a number, returns undefined if the matrix is not a square matrix
function calculateDet(matrix){
    let matrixSize = matrix.length;
    for (let i =0 ; i < matrixSize; i++){
        if (matrixSize !== matrix[i].length) return undefined;
    }
    if (matrixSize === 1) return matrix[0][0];
    if (matrixSize === 2) {
        return matrix[0][0]*matrix[1][1] - matrix[0][1]*matrix[1][0];
    } else {
        let sum = 0;
        let newMatrix = [];
        for (let j = 0; j < matrixSize; j++){
            for (let m = 1; m < matrixSize; m++) {
                newMatrix.push(matrix[m].slice(0, j).concat(matrix[m].slice(j + 1)));
            }
            sum += matrix[0][j] * (-1)**(2+j) * calculateDet(newMatrix);
            newMatrix = [];
        }
        return sum;
    }
}

function onCalculate() {
    // Get the input value
    const inputValue = document.getElementById("matrixInput").value;

    // Parse the input value into a 2D array (assuming it's formatted correctly)
    const matrix = JSON.parse(inputValue);

    // Call the calculateDet function
    const result = calculateDet(matrix);

    // Display the result
    document.getElementById("result").innerText = `Result: ${result}`;
}