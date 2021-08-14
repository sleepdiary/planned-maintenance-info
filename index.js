/*
 * Change the values below to whatever you want
 */
const outputs = {
    /* will set this key...     ... to this value */
    "branch-regexp"           : "^maint-",
    "maintenance-window-start": "2021-08-15T09:00:00Z",
    "maintenance-window-end"  : "2021-08-15T11:00:00Z",
    "maintenance-url"         : "https://github.com/sleepdiary/internal-tools/issues/25",
};

// set the outputs - do not edit below this line
Object.keys(outputs).forEach( key => console.log( `::set-output name=${key}::${outputs[key]}` ) );
Object.keys(outputs).forEach( key => console.log( `${key}: ${outputs[key]}` ) );
