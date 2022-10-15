// https://dracoblue.net/dev/linear-least-squares-in-javascript/
function findLineByLeastSquares(values_x, values_y) {
    let count = values_x.length;
    if(values_y.length !== count) throw new Error("unreachable: mismatched count x/y");
    if(count < 2) throw new Error("unreachable: line too short");

    /*
     * Calculate the sum for each of the parts necessary.
     */
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;
    for (let v = 0; v < count; v++) {
        const x = values_x[v];
        const y = values_y[v];
        sum_x += x;
        sum_y += y;
        sum_xx += x*x;
        sum_xy += x*y;
    }

    /*
     * Calculate m and b for the formular:
     * y = x * m + b
     */
    let m = (count*sum_xy - sum_x*sum_y) / (count*sum_xx - sum_x*sum_x);
    let b = (sum_y/count) - (m*sum_x)/count;

    return {m, b};
}