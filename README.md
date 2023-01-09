# dHEDGE V2 Polygon

## Prerequisites

- [Node.js LTS](https://nodejs.org/en/download/)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/getting-started)

## Setup

### Install Dependencies

`yarn`

## Deployment Dev/Prod

1. Sign in to https://thegraph.com/hosted-service with your GitHub account
2. Go to My Dashboard, select _DHEDGE V2 Polygon Dev_ (**if dev**) or _dHEDGE V2 Polygon_ (**if prod**) subgraph
3. In the top right corner, copy your `ACCESS TOKEN`
4. Run `yarn graph auth --product hosted-service https://api.thegraph.com/deploy/ <your_access_token>`
5. After making necessary code changes, run `yarn codegen`
6. Run `yarn build-dev` or `yarn build-prod` to check there are no compilation errors
7. Finally, run `yarn deploy-dev` or `yarn deploy-prod` to start deploying latest changes
