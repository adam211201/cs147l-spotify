import { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Themes } from '../assets/Themes';
import axios from 'axios';
import { formatter } from '../utils/apiOptions';
import getEnv from '../utils/env';

const {
	NUM_TRACKS,
	SPOTIFY_API: { SEARCH_TRACKS_API },
} = getEnv();

const SearchBar = ({ token, setTracks, setNoMoreSongs, setOffsetValue }) => {
	const [search, setSearch] = useState('');
	const [timeoutToClear, setTimeoutToClear] = useState();

	useEffect(() => {
		return () => {
			clearTimeout(timeoutToClear);
		};
	}, []);

	// debounce function that limits calls to Spotify API
	const debounce = (callback, alwaysCall, ms) => {
		return (...args) => {
			alwaysCall(...args);
			clearTimeout(timeoutToClear);
			setTimeoutToClear(
				setTimeout(() => {
					callback(...args);
				}, ms)
			);
		};
	};

	// always update the search input fields text
	const setSearchTextAlways = (text) => {
		setSearch(text);
	};

	// query Spotify api for songs that match our text params
	const searchTracks = async (text) => {
		// only search if we have the token and the search field is populated
		if (token && search) {
			try {
				const res = await axios.get(SEARCH_TRACKS_API, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token,
					},
					params: {
						q: search,
						type: 'album,track,artist',
						limit: NUM_TRACKS,
					},
				});

				setOffsetValue(NUM_TRACKS);
				setTracks(formatter(res.data?.tracks.items));
				setNoMoreSongs(false);
			} catch (err) {
				console.error(err);
			}
		}
	};

	const debouncedSearchTracks = debounce(searchTracks, setSearchTextAlways, 100);

	return <TextInput style={styles.input} placeholder='Search' placeholderTextColor='#C7C7CD' onChangeText={debouncedSearchTracks} />;
};

const styles = StyleSheet.create({
	input: {
		color: Themes.colors.background,
		backgroundColor: Themes.colors.white,
		height: 44,
		paddingHorizontal: 16,
		borderRadius: 11,
	},
});

export default SearchBar;
