(function() {

/*
 * Most planned maintenances should only need to edit these variables
 */
const enabled = false;
const build_system_pull_request = 53; // PR that will merge recent changes in the build system
const pull_requests = { // pull requests we need to accept during the maintenance window
    core: 21,
    dashboard: 31,
    info: 15,
    report: 13,
};
const delete_branches = Object.fromEntries( Object.keys(pull_requests).map( key => [key,'upgrade-dependencies'] ) );
if ( build_system_pull_request ) delete_branches['internal-tools'] = 'upgrade-dependencies';

const start_at = `2021-09-05T09:00:00Z`; // time that the window will open
const issue_id = 50; // tracking issue for this maintenance

/*
 * These might change over time, but are usually the same between runs
 */
const owner = `sleepdiary`; // change to your personal repo during debugging

const test_actions = JSON.stringify([ // pages that will need to be checked by hand
    {
        action: `check_site`,
        title: `Front page`,
        url: `https://sleepdiary.github.io`,
        comment: `Check links work`,
    },
    {
        action: `check_site`,
        title: `Dashboard`,
        url: `https://sleepdiary.github.io/dashboard`,
        comment: `Check you can load a diary`,
    },
    {
        action: `check_site`,
        title: `Notifications`,
        url: `https://github.com/notifications`,
        comment: `Shouldn't have any news`
    },
    {
        action: `check_site`,
        title: `Forum`,
        url: `https://github.com/sleepdiary/sleepdiary.github.io/discussions`,
        comment: `Shouldn't be any problems`,
    },
    {
        action: `check_site`,
        title: `GitHub Status`,
        url: `https://www.githubstatus.com/`,
        comment: `Should be 'All Systems Operational'`,
    },
]);

// every repo in the organisation:
const all_repos = [
    `core`,
    `dashboard`,
    `docs`,
    `info`,
    `internal-tools`,
    `report`,
    `sleepdiary.github.io`
];

// repos with workflows that are liable to break when we update the build system:
const workflows_that_use_the_build_system = [
    `core`,
    `dashboard`,
    `info`,
    `report`,
];

const data = {
    "maintenance-window-start"   : start_at,
    "maintenance-window-duration": 1 * 60*60*1000, // one hour
    "maintenance-url"            : `https://github.com/sleepdiary/internal-tools/issues/${issue_id}`,
    "maintenance-window-enabled" : enabled,
    "maintenance-steps"          : [
        {
            title: `Open the maintenance window`,
            actions: [
                {
                    action: `add_comment`,
                    id: issue_id,
                    owner,
                    repo: `internal-tools`,
                    body: `# Maintenance procedure starting

The maintenance window is [now open](https://andrew-sayers.github.io/planned-maintenance/#https://sleepdiary.github.io/planned-maintenance-info/index.js).  Only maintenance-related pull requests are allowed.`,
                    fields: [],
                },
                {
                    action: `enable_workflow`,
                    owner,
                    repo: `internal-tools`,
                    id: `maintenance-timer.yml`,
                },
            ].concat(all_repos.map( repo => ({
                action: `create_branch`,
                source: `main`,
                destination: `last-known-good`,
                owner,
                repo
            }))),
        },
        {
            title: `Pre-flight checks`,
            actions: JSON.parse(test_actions),
        },
        {
            title: `Publish the new build system`,
            actions: build_system_pull_request ? [
                { action: `accept_pr`, owner, repo: `internal-tools`, id: build_system_pull_request, },
                { action: `wait_for_workflow`, owner, repo: `internal-tools`, id: `autobuild.yml`, },
            ] : [],
        },
        {
            title: `Update repo's`,
            actions: (
                Object.keys(pull_requests)
                    .map( repo => ({ action: `accept_pr`, owner, repo, id: pull_requests[repo] }) )
                    .concat(
                        Object.keys(pull_requests)
                            .map( repo => ({ action: `wait_for_workflow`, owner, repo, id: "main.yml" }) )
                    )
            ),
        },
        {
            title: `Test-run workflows`,
            actions: (build_system_pull_request?workflows_that_use_the_build_system:[])
                .filter( repo => !pull_requests[repo] )
                .map( repo => ({ action: `run_workflow`, owner, repo, id: `main.yml` }) ),
        },
        {
            title: `Check for breakage`,
            actions: JSON.parse(test_actions),
        },
        {
            title: `Close the maintenance window`,
            actions: all_repos.map( repo => ({
                action: `delete_branch`,
                name: `last-known-good`,
                owner,
                repo
            })).concat(

                Object.entries(delete_branches).map( ([repo,name]) => ({
                    action: `delete_branch`,
                    name,
                    owner,
                    repo
                })),
                
                [
                    {
                        action: `disable_workflow`,
                        owner,
                        repo: `internal-tools`,
                        id: `maintenance-timer.yml`,
                    },
                    {
                        action: `add_comment`,
                        id: issue_id,
                        owner,
                        repo: `internal-tools`,
                        body: `# Maintenance finished: {{conclusion}}\n\n{{comments}}`,
                        fields: [
                            {
                                label: `Conclusion`,
                                id: `conclusion`,
                                type: `switch`,
                                on: `success`,
                                off: `reverted`,
                                value: false,
                            },
                            {
                                label: `Comments`,
                                id: `comments`,
                                type: `textarea`,
                                value: ``,
                            },
                        ],
                    },
                ],

            ),
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
