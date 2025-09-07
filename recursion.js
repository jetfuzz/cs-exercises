//fibonacci function
function fibs(n) {
    let arr = [];

    let firstNum = 0;
    let secondNum = 1;
    arr.push(firstNum);
    arr.push(secondNum);

    let nextNum;

    while (arr.length < n) {
        arr.push(firstNum + secondNum);
        nextNum = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = nextNum;
    }

    return arr;
}

//recursive fibonacci
function fibsRecursive(n, arr = []) {

    if (arr.length > n) return arr;

    if (arr.length === 0) arr.push(0);
    else if (arr.length === 1) arr.push(1);
    else {
        arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    }
    return fibsRecursive(n, arr);
}






//merge sort 
function mergeSort(arr) {
    let sortedArr = []
    if (arr.length <= 1) {
        return arr
    } else {
        let halfLength = Math.ceil(arr.length / 2);  
        let leftHalf = arr.slice(0, halfLength);
        let rightHalf = arr.slice(halfLength, arr.length);
        let left = mergeSort(leftHalf);
        let right = mergeSort(rightHalf);

        sortedArr = merge(left, right);
    }

    return sortedArr;
}

function merge(x, y) {
    let xIndex = 0;
    let yIndex = 0;
    let arr = [];

    while (xIndex < x.length && yIndex < y.length) {
        if (x[xIndex] < y[yIndex]) {
            arr.push(x[xIndex]);
            xIndex++
        } else {
            arr.push(y[yIndex]);
            yIndex++
        }
    }

    //handle remainders
    if (xIndex < x.length) {
        arr.push(x[xIndex]);
        xIndex++
    }
    if (yIndex < y.length) {
        arr.push(y[yIndex]);
        yIndex++;
    }
    
    return arr;
}