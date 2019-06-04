'use strict';

// Create Recursion function and export it.
const recursion = (arr, parent) => {
    let out = []
    for(let i in arr) {
        if(arr[i].parentid == parent) {
            let child_categories = recursion(arr, arr[i].id);
            if(child_categories.length) {
                arr[i].child_categories = child_categories;
            }
            out.push(arr[i]);
        }
    }
    return out;
};

module.exports = recursion;