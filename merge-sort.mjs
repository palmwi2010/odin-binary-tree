function mergeSort(arr) {

    // Base case when only one element remains
    if (arr.length === 1) return arr;

    // Split and sort
    const midpoint = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, midpoint));
    let right = mergeSort(arr.slice(midpoint));

    // Merge
    for (let i = 0; i < arr.length; i++) {
        if (left.length === 0 || left[0] > right[0]) {
            arr[i] = right.shift()
        } else {
            arr[i] = left.shift()
        }
    }
    return arr;
}

export default mergeSort;