import { useState, useEffect } from 'react';

import { getMyTopTracks } from './apiOptions';

const useSpotifyTracks = (token) => {
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const getTracks = async () => {
			// only fetch top tracks if token exists
			if (token) {
				try {
					const tracksObj = await getMyTopTracks(token);

					setTracks(tracksObj);
				} catch (err) {
					console.error(err);
				}
			}
		};

		getTracks();
	}, [token]);

	// if token is null then return null
	if (!token) {
		return null;
	}

	return tracks;
};

export default useSpotifyTracks;
