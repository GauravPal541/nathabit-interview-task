function allInterleavings(res, P, Q, out) {
    if (P.length === 0 && Q.length === 0) {
        out.add(res);
        return;
    }
    if (P.length > 0) {
        allInterleavings(res + P.charAt(0), P.substring(1), Q, out);
    }

    if (Q.length > 0) {
        allInterleavings(res + Q.charAt(0), P, Q.substring(1), out);
    }
}

function main() {
    let P = "ABC";
    let Q = "ACB";

    console.log("The given strings are: " + P + "  " + Q);
    console.log("The interleavings strings are: ");

    let out = new Set();

    allInterleavings("", P, Q, out);

    out.forEach((item) => console.log(item));
}

// Call the main function to start the execution.
main();
