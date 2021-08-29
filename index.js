(function() {

/*
 * Change the values below to whatever you want
 */
const data = {
    /* will set this key...     ... to this value */
    "branch-regexp"           : "^maint-",
    "maintenance-window-start": "2021-08-30T09:00:00Z",
    "maintenance-window-end"  : "2021-08-30T09:15:00Z",
    "maintenance-url"         : "https://github.com/sleepdiary/internal-tools/issues/48",
    "maintenance-actions"     : [
        {
            "title": "Enable the announcer workflow",
            "type": "enable_workflows",
            "workflows": [
                { "owner": "sleepdiary", "repo": "internal-tools", "id": "maintenance-timer.yml" },
            ],
        },
        {
            "title": "Open the maintenance window",
            "type": "create_comments",
            "comments": [
                {
                    "title": "Announce the start",
                    "owner": "andrew-sayers",
                    "repo": "internal-tools",
                    "body": `# Maintenance procedure starting

The maintenance window is [now open](https://sleepdiary.github.io/internal-tools/maintenance-actions.html).  Only maintenance-related pull requests are allowed.`,
                    fields: [],
                },
            ],
        },
        {
            "title": "Create 'last-known-good' branches",
            "type": "create_branches",
            "branches": [
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "core" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "dashboard" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "docs" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "info" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "internal-tools" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "report" },
                { "owner": "sleepdiary", "source": "main", "destination": "last-known-good", "repo": "sleepdiary.github.io" },
            ],
        },
        {
            "title": "Pre-flight checks",
            type: "check_sites",
            "sites": [
                {
                    title: "Front page",
                    url: "https://sleepdiary.github.io",
                    comment: "Check links work",
                },
                {
                    title: "Dashboard",
                    url: "https://sleepdiary.github.io/dashboard",
                    comment: "Check you can load a diary",
                },
                {
                    title: "Notifications",
                    url: "https://github.com/notifications",
                    comment: "Shouldn't have any news"
                },
                {
                    title: "Forum",
                    url: "https://github.com/sleepdiary/sleepdiary.github.io/discussions",
                    comment: "Shouldn't be any problems",
                },
                {
                    title: "GitHub Status",
                    url: "https://www.githubstatus.com/",
                    comment: "Should be 'All Systems Operational'",
                },
            ],
        },
        {
            "title": "Build and publish the new build system",
            "type": "accept_prs",
            "prs": [
                { "owner": "sleepdiary", "repo": "internal-tools", "id": 39, },
            ],
        },
        {
            "title": "Update repo's",
            "type": "accept_prs",
            "prs": [
                { "owner": "sleepdiary", "repo": "core", "id": 19, },
                { "owner": "sleepdiary", "repo": "dashboard", "id": 28, },
                { "owner": "sleepdiary", "repo": "info", "id": 13, },
                { "owner": "sleepdiary", "repo": "report", "id": 11, },
            ],
        },
        /* Done implicitly by the PRs in the previous step
        {
            "title": "Check workflows",
            "type": "run_workflows",
            "workflows": [
                { "owner": "sleepdiary", "repo": "core", "id": "main.yml" },
                { "owner": "sleepdiary", "repo": "info", "id": "main.yml" },
                { "owner": "sleepdiary", "repo": "report", "id": "main.yml" },
            ],
        },
        */
        {
            "title": "Check for problems",
            type: "check_sites",
            "sites": [
                {
                    title: "Front page",
                    url: "https://sleepdiary.github.io",
                    comment: "Check links work",
                },
                {
                    title: "Dashboard",
                    url: "https://sleepdiary.github.io/dashboard",
                    comment: "Check you can load a diary",
                },
                {
                    title: "Notifications",
                    url: "https://github.com/notifications",
                    comment: "Shouldn't have any news"
                },
                {
                    title: "Forum",
                    url: "https://github.com/sleepdiary/sleepdiary.github.io/discussions",
                    comment: "Shouldn't be any problems",
                },
            ],
        },
        {
            "title": "Close the maintenance window",
            "type": "create_comments",
            "comments": [
                {
                    "title": "Announce the end",
                    "owner": "andrew-sayers",
                    "repo": "internal-tools",
                    "body": "# Maintenance finished: {{conclusion}}\n\n{{comments}}",
                    "fields": [
                        {
                            "label": "Conclusion",
                            "id": "conclusion",
                            "type": "switch",
                            "on": "success",
                            "off": "reverted",
                            "value": false,
                        },
                        {
                            "label": "Comments",
                            "id": "comments",
                            "type": "textarea",
                            "value": "",
                        },
                    ],
                },
            ],
        },
        {
            "title": "Delete 'last-known-good' branches",
            "type": "delete_branches",
            "branches": [
                { "owner": "andrew-sayers", "name": "last-known-good", "repo": "internal-tools" },
                { "owner": "andrew-sayers", "name": "last-known-good", "repo": "info" },
            ],
        },
        {
            "title": "Disable the announcer workflow",
            "type": "disable_workflows",
            "workflows": [
                { "owner": "sleepdiary", "repo": "internal-tools", "id": "maintenance-timer.yml" },
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

