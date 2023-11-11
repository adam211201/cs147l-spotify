import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
import { Themes, Images } from '../assets/Themes';

const LoginButton = ({ getSpotifyAuth }) => {
	return (
		<View style={styles.container}>
			<Pressable style={styles.login} onPress={() => getSpotifyAuth()}>
				<Image source={Images.spotify} style={styles.loginIcon} />
				<Text style={styles.loginText}>CONNECT WITH SPOTIFY</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	login: {
		backgroundColor: Themes.colors.spotify,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 44,
		paddingHorizontal: 16,
		borderRadius: 22,
	},
	loginText: {
		color: Themes.colors.white,
		fontSize: 13,
		fontWeight: 'bold',
	},
	loginIcon: {
		width: 24,
		height: 24,
		marginRight: 8,
	},
});

export default LoginButton;
