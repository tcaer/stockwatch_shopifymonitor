# Stock Watch

[![Build Status](https://travis-ci.org/tcaer/stockwatch_shopifymonitor.svg?branch=master)](https://travis-ci.org/tcaer/stockwatch_shopifymonitor)

Stock Watch is a cloud-enabled shopify monitor.
  - Easily add and manage tasks
  - Pick and choose the sites and products you monitor
  - Manage anywhere

### Installation
Stock Watch requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies...
```sh
$ cd packages/server
$ npm i
$ cd packages/web
$ npm i
```

To compile assets...
```sh
$ cd packages/web
$ npm run build
```

To run the program in development mode...
```sh
$ cd packages/server
$ npm run dev
$ cd packages/web
$ npm run dev
```

### Development
Want to contribute? Great! Please be aware, this repository is primarily read-only. You may not use the code in the repository in any personal commercial product. I put the code here so people can learn from this project.


### Updates
---
##### 19/07/2019
Haven't updated this in a while but that is because I have been seriously revamping the code (I was also on vacation). Originally, this website was designed to be static, and have a little bit of JS sprinkled on the frontend to make things like dropdowns and buttons work. I quickly realized, however, that this is not the smartest way to build this application as there is a lot more reactivity than I first realized. Having to update the DOM with vanilla Javascript is painful and introduces a lot of extrenous code and discourages code-reusability. So, to make things easier on me I moved the entire frontend to a React setup. It uses Redux for state management, and uses JWTs for authentication with the server. The server remains mostly the same, but now acts more as an API than anything else. I am basically at the point I was before migrating to React, and will begin implementing the actual task management features, along side account management features. 