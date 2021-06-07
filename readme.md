# herbs CLI

A CLI for herbs.

## Getting started

`git clone https://github.com/italojs/herbs-cli-alpha`
`cd herbs-cli-alpha`
`npm link`

### Generating default project

it will generate an simple user CRUD into currently directory
`mkdir my-project && cd !$`
`herbs new --graphql --mongo`
or
`herbs new --graphql --mongo --yarn`
### Generating CRUD to my own entities

`herbs new --graphql --mongo --yarn --entities <path-where-is-your-entities>`
`herbs new --graphql --mongo --yarn --entities ../herbs-cli-alpha/example/my-custom-entities`

### Custom project name and licence

`herbs new --name my-project --description "bla bla bla" --author italojs --licence BSD --graphql --postgres --yarn --entities ../herbs-cli-alpha/example/my-custom-entities`
