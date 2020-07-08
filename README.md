# Group Chat

## Installation

In order to use this project, first clone the repository. Make sure you have [Node.js](https://nodejs.org/en/) installed.

This project uses [CometChat Pro](https://www.cometchat.com/) API. Before using the application make sure that you have a [CometChat Pro account](https://app.cometchat.io/login). Create your app in the dashboard, create and extract the API key, APP ID and also create a group and extract the GUID. Take note of these three keys/IDs, you will need to enter them in `src/utils/config.js`.

Once done, enter the project directory and run:
```shell script
$ npm install
$ npm start
```

Enjoy the chat!

## ReactJS app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It focuses on React Hooks rather than class components.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### References
* https://github.com/cometchat-pro-tutorials/react-comet-chat-app
* https://github.com/Detaysoft/react-chat-elements