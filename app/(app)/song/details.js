import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PreviewSong = () => {
	const { externalUrl } = useLocalSearchParams();

	return <WebView style={styles.container} source={{ uri: externalUrl }} />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PreviewSong;
