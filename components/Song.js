import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Themes } from '../assets/Themes';
import millisToMinutesAndSeconds from '../utils/millisToMinutesAndSeconds';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Song = ({ songTitle, songArtists, albumName, imageUrl, duration, previewUrl, externalUrl }) => {
	let artists = '';

	// turn artists array into a string with no comma at the end
	songArtists.map((artist, i) => {
		artists += artist.name;

		if (i !== songArtists.length - 1) {
			artists += ', ';
		}
	});

	return (
		<Link
			href={{
				pathname: 'song/details',
				params: { externalUrl },
			}}
			asChild
		>
			<Pressable style={styles.container}>
				<View style={styles.indexContainer}>
					<Link
						href={{
							pathname: 'song/preview',
							params: { previewUrl },
						}}
						asChild
					>
						<Pressable>
							<Ionicons name='play-circle' size={24} color={Themes.colors.spotify} />
						</Pressable>
					</Link>
				</View>
				<View style={styles.songImageContainer}>
					<Image style={styles.songImage} source={{ uri: imageUrl }} />
				</View>
				<View style={styles.songTitleContainer}>
					<Text style={styles.songTitleText} numberOfLines={1}>
						{songTitle}
					</Text>
					<Text style={styles.songArtistsText} numberOfLines={1}>
						{artists}
					</Text>
				</View>
				<View style={styles.songAlbumContainer}>
					<Text style={styles.songAlbumText} numberOfLines={1}>
						{albumName}
					</Text>
				</View>
				<View style={styles.songDurationContainer}>
					<Text style={styles.songDurationText}>{millisToMinutesAndSeconds(duration)}</Text>
				</View>
			</Pressable>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Themes.colors.background,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
	},
	indexContainer: {
		width: '8%',
	},
	songImageContainer: {
		width: '18%',
	},
	songImage: {
		aspectRatio: 1 / 1,
	},
	songTitleContainer: {
		width: '40%',
		paddingLeft: 12,
	},
	songTitleText: {
		color: Themes.colors.white,
	},
	songArtistsText: {
		color: Themes.colors.gray,
	},
	songAlbumContainer: {
		width: '22%',
		paddingLeft: 12,
	},
	songAlbumText: {
		color: Themes.colors.white,
	},
	songDurationContainer: {
		width: '12%',
	},
	songDurationText: {
		color: Themes.colors.white,
	},
});

export default Song;
