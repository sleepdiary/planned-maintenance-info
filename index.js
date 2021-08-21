(function() {

/*
 * Change the values below to whatever you want
 */
const data = {
    /* will set this key...     ... to this value */
    "branch-regexp"           : "^maint-",
    "maintenance-window-start": "2021-08-22T09:00:00Z",
    "maintenance-window-end"  : "2021-08-22T10:00:00Z",
    "maintenance-url"         : "https://github.com/sleepdiary/internal-tools/issues/32",
};

// Do not edit below this line

(
    globalThis.handle_data
    ? globalThis.handle_data
    : data => {
        Object.keys(data).forEach( key => console.log( `::set-output name=${key}::${data[key]}` ) );
        Object.keys(data).forEach( key => console.log( `${key}: ${data[key]}` ) );
    }
)(data);

})();
