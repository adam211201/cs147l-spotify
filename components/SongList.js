import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import Song from './Song';
import { Images, Themes } from '../assets/Themes';
import SearchBar from './SearchBar';
import { useState } from 'react';
import axios from 'axios';
import getEnv from '../utils/env';
import { formatter } from '../utils/apiOptions';

const {
	NUM_TRACKS,
	SPOTIFY_API: { TOP_TRACKS_API },
} = getEnv();

const SongList = ({ tracks, token, setTracks }) => {
	const [loading, setLoading] = useState(false);
	const [noMoreSongs, setNoMoreSongs] = useState(false);
	const [offsetValue, setOffsetValue] = useState(NUM_TRACKS);

	// this function handles the fetching of top tracks when we infinitely scroll
	const fetchMoreSongs = async () => {
		setLoading(true);

		if (token) {
			try {
				const res = await axios.get(TOP_TRACKS_API, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token,
					},
					params: {
						limit: NUM_TRACKS,
						offset: offsetValue,
					},
				});

				const tracks = res.data?.items;

				// if there are no tracks left then set no more songs to true
				if (tracks.length === 0) {
					setNoMoreSongs(true);
				} else {
					setTracks(formatter(tracks));
					setOffsetValue((prevState) => prevState + NUM_TRACKS);
				}

				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		}
	};

	let body;

	// if there are no more songs left, change the content to be a warning message
	if (noMoreSongs) {
		body = <Text style={styles.noMoreSongsText}>There are no more songs!</Text>;
	} else {
		// if we are loading show the activity indicator
		if (loading) {
			body = <ActivityIndicator size='small' color={Themes.colors.white} />;

			// otherwise, show the songs
		} else {
			body = (
				<FlatList
					data={tracks}
					renderItem={({ item }) => <Song {...item} />}
					keyExtractor={(item) => item.externalUrl}
					ItemSeparatorComponent={() => <View style={styles.songSeparator} />}
					onEndReached={fetchMoreSongs}
				/>
			);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Image source={Images.spotify} style={styles.titleIcon} />
				<Text style={styles.title}>My Top Tracks</Text>
			</View>
			<View style={styles.searchBarContainer}>
				<SearchBar token={token} setTracks={setTracks} setNoMoreSongs={setNoMoreSongs} setOffsetValue={setOffsetValue} />
			</View>
			<View style={styles.songContainer}>{body}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16,
	},
	titleIcon: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
	title: {
		color: Themes.colors.white,
		fontSize: 22,
		fontWeight: 'bold',
	},
	searchBarContainer: {
		marginHorizontal: 16,
	},
	songContainer: {
		flex: 1,
		marginVertical: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	songSeparator: {
		height: 16,
	},
	noMoreSongsText: {
		color: Themes.colors.white,
		fontSize: 17,
		fontWeight: 'bold',
	},
});

export default SongList;
