import { StyleSheet, SafeAreaView } from 'react-native';
import { useSpotifyAuth, useSpotifyTracks } from '../../utils';
import { Themes } from '../../assets/Themes';
import LoginButton from '../../components/LoginButton';
import SongList from '../../components/SongList';
import { useEffect, useState } from 'react';

const App = () => {
	const { token, getSpotifyAuth } = useSpotifyAuth();
	const initialTracks = useSpotifyTracks(token);
	const [tracks, setTracks] = useState([]);

	// update the tracks state to be equal to initialTracks once that variable has been filled with tracks
	useEffect(() => {
		setTracks(initialTracks);
	}, [initialTracks]);

	return (
		<SafeAreaView style={styles.container}>
			{token ? <SongList tracks={tracks} token={token} setTracks={setTracks} /> : <LoginButton getSpotifyAuth={getSpotifyAuth} />}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Themes.colors.background,
		flex: 1,
	},
});

export default App;
