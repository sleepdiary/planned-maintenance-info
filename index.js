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
    "maintenance-actions"     : [
        /*
        {
            "title": "Update build",
            "type": "accept_prs",
            "prs": [
                { "owner": "sleepdiary", "repo": "internal-tools", "id": 33, },
            ],
        },
        */
        {
            "title": "Publish images",
            "type": "run_workflows",
            "workflows": [
                { "owner": "sleepdiary", "repo": "internal-tools", "id": "autobuild.yml" },
            ],
        },
        {
            "title": "Check workflows",
            "type": "run_workflows",
            "workflows": [
                { "owner": "sleepdiary", "repo": "core", "id": "main.yml" },
                { "owner": "sleepdiary", "repo": "dashboard", "id": "main.yml" },
                { "owner": "sleepdiary", "repo": "info", "id": "main.yml" },
                { "owner": "sleepdiary", "repo": "report", "id": "main.yml" },
            ],
        },
    ],
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
