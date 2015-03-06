# 4-Ball

An excessively low barrier for a same day 4-ball

## Team

  - __Product Owner__: Wayne Müler [@wainage](https://github.com/wainage)
  - __Scrum Master__: Nick Sippl-Swezey [@nsipplswezey](https://github.com/nsipplswezey)
  - __Development Superhero__: Philip Rosen [@philipjrosen](https://github.com/philipjrosen)
  - __Development Superhero__: Daniel Tsui [@sdtsui](https://github.com/sdtsui)

## Table of Contents

1. [Roadmap](#tasks)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

### Roadmap

View the project roadmap [here](https://github.com/pwned-tapestry/fourball/issues).

## Usage

1. Clone repo
1. [Install dependencies](#installing-dependencies)
1. Launch mobile app
1. Launch database

## Dev Requirements

1. Ionic/Cordova. Make sure you can get the [demo ionic apps](http://ionicframework.com/getting-started/) up and running with

```sh
ionic server
```

1. Google maps set up for ionic apps. See [this blog](https://blog.nraboy.com/2014/10/implement-google-maps-using-ionicframework/) for how to set it up.
1. Your own config.js file with your Twilio and Mongolabs API keys. See [server/SAMPLEconfig.js](https://github.com/pwned-tapestry/fourball/blob/development/server/SAMPLEconig.js)
1. MongoDB.

### Installing Dependencies and Getting Up and Running

From within the root directory:

```sh
cd server
npm install
node server.js

cd ./mobile
npm install
ionic serve
```

## The Stack



## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

See [STYLEGUIDE.md](STYLEGUIDE.md) for the project's style manual.
