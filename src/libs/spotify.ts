const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    // 'playlist-modify-private',
    // 'user-library-modify',
    // 'user-follow-modify'
].join(',')

const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params)

export const LOGIN_URL = 
    'https://accounts.spotify.com/authorize?' + queryParamString.toString()