<!--- This file is automatically generated. Dont edit! -->

# @SAEON/ATLAS

This is a tool for exploring SAEON's metadata catalogues interactively, and with specific emphasis of searching for datasets that contain OGC-compliant resources. This tool is currently deployed at [atlas.saeon.ac.za](https://atlas.saeon.ac.za), but the intention is that bespoke deployments are supported that allow for configuring any number of catalogues to be searched.

The repository is organized as a 'monorepo', split according to the following packages:

- [@saeon/atlas-client](https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/atlas-client)
- [@saeon/atlas-api](https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/atlas-api)
- [@saeon/anyproxy](https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/anyproxy)
- [@saeon/catalogue-search](https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/catalogue-search)
- [@saeon/ol-react](https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/ol-react)
- [docs](https://github.com/SAEONData/saeon-atlas/tree/master/src/docs)
- [reporting](https://github.com/SAEONData/saeon-atlas/tree/master/src/reporting)

# Tech Stack

- API
  - Node.js server
  - Proxy server ([anyproxy](http://anyproxy.io/))
- Browser client
  - [React.js](https://reactjs.org/)
  - [OpenLayers 6](https://openlayers.org/)
  - [Material UI](https://material-ui.com/)

# Quick start

Packages are mostly self-contained, in that each package includes a `package.json` file, and tracks it's own dependencies. For development purposes it's useful that packages can reference source code in other packages (instead of build output), and for this reason Babel is configured globally.

### Setup the repository for developing

NOTE: This repository only support Linux/Mac development currently, since it's farily straightforward to configure a Linux development environment using WSL on Windows (or similar). If there is interest in further cross platform support please [request this](https://github.com/SAEONData/saeon-atlas/issues).

```sh
# Download the source code
git clone git@github.com:SAEONData/saeon-atlas.git saeon-atlas
cd saeon-atlas

# Install top level dependencies (Babel, tooling, etc)
npm install

# Install package dependencies (this might take several minutes on the first run)
npm run install-package-dependencies

# Update repository git configuration
npm run configure-git

# Sometimes the scripts in scripts/ don't get the correct permissions set on clone. Fix this
chmod +x scripts/*.sh
```

### Start the services

Running the atlas requires starting 3 services:

- src/@saeon/atlas-client
- src/@saeon/atlas-api
- src/@saeon/anyproxy

It's useful to start these services individually for helpful log output (a terminal that allows for split screen is great for this). To start all three services together, run `npm start` from the root of the repository.

# Deployment

#### Configuration

TODO

#### Docker Compose

```sh
docker-compose up -d --force-recreate --build
```

#### Automated deployment

Forking this repository should allow for using the GitHub deployment configuration specified in `.github/workflows/deploy-master.yml`. Using the existing deployment specification should be as simple as:

1. Configure a self hosted GitHub actions runner on your server
2. Adjust the `.github/workflows/deploy-master.yml` to include configuration variables sensible for your environment
3. The deployment should run on every push to the master branch

#### Publishing NPM packages

TODO

# Source code documentation

TODO

# Reporting

TODO

# @saeon/atlas-client

From the root of the repository (`/atlas`)

```
npm install
npm start
```

## Configuration

Add a `.env` file to `src/@saeon/atlas-client`. And configure as required. Default values are shown:

```
ATLAS_API_ADDRESS=http://localhost:4000
```

## Docker deployment

```
docker build -t atlas-client -f ./src/@saeon/atlas-client/Dockerfile .
```

# @saeon/ol-react

Install the package via the [NPM registry](https://npmjs.com/package/@saeon/atlas)

```sh
npm install @saeon/ol-react
```

## Modules

The basis of the Atlas is that it comprises of many `Modules`. Please see `./dev/index.jsx` (in this repository) for a working proof of concept that uses all the 'built-in' modules. This documentation describes how the example works, and is aimed at showing how to structure your own modules. These examples show two different mechanisms for 'composition' when authoring modules.

### Built in modules

#### SingleFeatureSelector

TODO

#### LayerManager

The OpenLayers library maintains it's own layer state. This is problematic when using React.js, since React will not update state automatically in response to changes to an OpenLayers `map` instance. This modules provides an array of 'proxy' layer objects, and helper functions to update these objects; these proxy layer objects are stored in React state. Essentially this module 'binds' react state to OpenLayers state, and makes working with layers easier.

TODO example

### Example 1

```jsx
class App extends PureComponent {
  constructor(props) { ... }

  render() {
    return (
      <Map>
        {({ map }) => (
          <div>
            {/* Add your modules here */}
            <Module1 map={map} />
            <Module2 map={map}/>
            <Module3 map={map}/>
          </div>
        )}
      </Map>
    )
  }
}
```

### Example 2

Since you can define your own modules, you can define composition. Nested module composition might be useful if, for example, Module1 contained filtering logic that you want to make available to other modules.

```jsx
class App extends PureComponent {
  constructor(props) { ... }

  render() {
    return (
      <Map>
        {({ map }) => (
          <Module1 map={map}>
          {({ someFn }) => (
            <Module2 map={map}>
            {({ ... }) => (
              <Module3 map={map}></Module3>
            )}</Module2>
          )}
          </Module1>
        )}
      </Map>
    )
  }
}
```

# Publish to NPM

There are 4 scripts included in this repository for publishing - when you clone this repository you need to check that they are executable:

```sh
chmod +x ./scripts/*
```

If you don't already have an NPM account, [create one](https://www.npmjs.com/login)! Then login from the root of the source code

```sh
npm login
# Enter your username
# Enter your password
# Enter your email address (probably best to use a work email address, since this is public)
```

This project uses [semantic versioning](https://docs.npmjs.com/about-semantic-versioning). This means that package versioning is controlled by 3 numbers: `major.minor.patch`, which in the case of this project means:

- **major** - Users should expect breaking changes
- **minor** - Users should not expect breaking changes
- **patch** - Minor changes, updates, improvements, etc.

With this in mind, 3 scripts are defined in the `package.json` file:

- `publish-patch` - Patch version is bumped, and code is pushed to NPM
- `publish-minor` - Minor version is bumped, and code is pushed to NPM
- `publish-major` - Major version is bumped, and code is pushed to NPM

Running these scripts will provide CLI prompts that you need to answer, and then a new package version will be pushed to NPM. In all cases existing changes are committed prior to version bump, and then the code on that branch is packaged. **Please don't push non-master branch changes to the NPM registry**!! Unless otherwise intended, please run the `publish-patch` script (`npm run publish-patch`).

# @saeon/snap-menus

TODO

# @saeon/atlas-api

TODO

## Docker deployment

```
docker build -t atlas-api -f ./src/@saeon/atlas-api/Dockerfile .
```

# @saeon/logger

TODO
