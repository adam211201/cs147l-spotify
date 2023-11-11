import getEnv from './env';
import { useState, useEffect } from 'react';
import { ResponseType, useAuthRequest } from 'expo-auth-session';

import * as WebBrowser from 'expo-web-browser';

const {
	REDIRECT_URI,
	SCOPES,
	CLIENT_ID,
	SPOTIFY_API: { DISCOVERY },
} = getEnv();

// needed so that the browser closes the modal after auth token
WebBrowser.maybeCompleteAuthSession();

const useSpotifyAuth = () => {
	const [token, setToken] = useState(null);
	const [request, response, promptAsync] = useAuthRequest(
		{
			responseType: ResponseType.Token,
			clientId: CLIENT_ID,
			scopes: SCOPES,
			usePKCE: false,
			redirectUri: REDIRECT_URI,
		},
		DISCOVERY
	);

	useEffect(() => {
		if (response?.type === 'success') {
			const { access_token } = response.params;

			setToken(access_token);
		}
	}, [response]);

	return { token, getSpotifyAuth: promptAsync };
};

export default useSpotifyAuth;
