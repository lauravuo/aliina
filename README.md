# [Aliina](https://fi.wikipedia.org/wiki/Aliina_Laurila)

[![CircleCI](https://circleci.com/gh/lauravuo/aliina.svg?style=svg)](https://circleci.com/gh/lauravuo/aliina)

![Aliina logo](./docs/aliina.png)

[Spotify playlist creator app](https://lauravuo.github.io/aliina)

Aliina creates a new playlist of random songs based on some of your existing playlist. It fetches the album information of each track in the given playlist and selects a random song from the same album to the new list.

Current limitations:

- User can select from her 20 latest playlists
- Only 100 first songs in the list are processed
- If no other songs are found in the song album, the song is skipped
- Playlist cannot be renamed

## Development environment setup

1. [Register](https://developer.spotify.com/dashboard/login) your Spotify app and define `SPOTIFY_CLIENT_ID` environment variable.

1. Launch app locally:
   ```
   nvm use
   npm install
   npm start
   ```
   Open browser at http://localhost:8080
