import { configure } from '@storybook/react';

function loadStories() {
  if (process.env.NODE_ENV !== 'test') {
    // Load through webpack
    const req = require.context('../src', true, /stories\.js$/);
    req.keys().forEach(filename => req(filename));
  } else {
    // Load for unit tests
    const fs = require('fs');
    const path = require('path');
    const getAllStories = dir =>
      fs.readdirSync(dir).reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory
          ? [...files, ...getAllStories(name)]
          : [...files, name.includes('stories') ? name : null];
      }, []);

    const stories = getAllStories(__dirname + '/../src');
    stories.map(filename => require(filename));
  }
}

configure(loadStories, module);
