// in ".releaserc.js" or "release.config.js"

const { promisify } = require('util')
//const dateFormat = require('dateformat')
const readFileAsync = promisify(require('fs').readFile)

// Given a `const` variable `TEMPLATE_DIR` which points to "<semantic-release-gitmoji>/lib/assets/templates"

// the *.hbs template and partials should be passed as strings of contents
const template = readFileAsync('default-template.hbs')
const commitTemplate = readFileAsync('commit-template.hbs')

module.exports = {
  branches: [
    "main", "next"
  ],
  plugins: [
    [
      'semantic-release-gitmoji', {
        releaseRules: {
          major: [ ':boom:' ],
          minor: [ ':sparkles:' ],
          patch: [
            ':bug:',
            ':ambulance:',
            ':lock:'
          ]
        },
        releaseNotes: {
          template,
          partials: { commitTemplate },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com',
            removeFromCommit: false,
            regex: /#\d+/g
          }
        }
      }
    ],
    ['@semantic-release/github',
    {
      "successComment": false,
      "failTitle": false
    }
    ]
  ]
}
