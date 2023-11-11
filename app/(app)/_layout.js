import { Stack } from 'expo-router';
import { Themes } from '../../assets/Themes';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
	initialRouteName: 'index',
};

const AppLayout = () => {
	return (
		<>
			<StatusBar style='light' />
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: Themes.colors.background,
					},
					headerTintColor: Themes.colors.white,
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='song/preview' options={{ title: 'Song Preview', headerBackTitleVisible: false }} />
				<Stack.Screen name='song/details' options={{ title: 'Song Details', headerBackTitleVisible: false }} />
			</Stack>
		</>
	);
};

export default AppLayout;
