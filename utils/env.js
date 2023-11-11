import { Platform } from 'react-native';

// ***** TODO: Fill in your constants here ***** //
const CLIENT_ID = '1d29d5cdb9b54a5db2e77fd41714ca24';
const REDIRECT_URI = 'exp://10.29.70.34:19000'; // TODO: Replace this with your own redirect URI
const ALBUM_ID = '2nLOHgzXzwFEpl62zAgCEC?si=Vy8vkAwuT-GJ_nEKsoo2DA'; // By default, this is the Weeknd's album "DAWN FM"
// ********************************************* //

const redirectUri = (uri) => {
	if (!uri) {
		const err = new Error('No redirect URI provided.\nPlease provide a redirect URI in env.js.\n You can find the file in utils/env.js.');
		console.error(err);
		alert(err);
	}
	return Platform.OS === 'web' ? 'http://localhost:19006/' : uri;
};

const ENV = {
	CLIENT_ID: CLIENT_ID,
	SCOPES: [
		'user-read-currently-playing',
		'user-read-recently-played',
		'user-read-playback-state',
		'user-top-read',
		'user-modify-playback-state',
		'streaming',
		'user-read-email',
		'user-read-private',
	],
	REDIRECT_URI: redirectUri(REDIRECT_URI),
	ALBUM_ID: ALBUM_ID,
	NUM_TRACKS: 20,
	SPOTIFY_API: {
		// Endpoints for auth & token flow
		DISCOVERY: {
			authorizationEndpoint: 'https://accounts.spotify.com/authorize',
			tokenEndpoint: 'https://accounts.spotify.com/api/token',
		},
		TOP_TRACKS_API: 'https://api.spotify.com/v1/me/top/tracks',
		SEARCH_TRACKS_API: 'https://api.spotify.com/v1/search',
		ALBUM_TRACK_API_GETTER: (albumId) => `https://api.spotify.com/v1/albums/${albumId}/tracks`,
	},
};

const getEnv = () => ENV;
export default getEnv;
