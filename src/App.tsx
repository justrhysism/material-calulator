import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RecoilRoot, useRecoilValue } from 'recoil';
import uuid from '@app/lib/uuid';
import type { Zone } from '@app/modules/project/interfaces';
import ZoneDetail from '@app/modules/project/components/ZoneDetail';
import AppBar from '@app/modules/application/components/AppBar';
import {
	appSettingDarkMode,
	appSettingDensity,
} from './modules/application/store/settings';
import { DarkModeSetting } from '@app/modules/application/enums';
import { hasAmbientLightSensor } from './lib/detects';
import useAmbientLightSensor from './lib/hooks/useAmbientLightSensor';

function AppContent() {
	const defaultDensity = useRecoilValue(appSettingDensity);
	// TODO: Flow app settings into parameters

	const [zone, setZone] = useState<Zone>({
		name: 'Front Yard',
		parameters: {
			density: defaultDensity,
		},
		sections: [
			{
				id: uuid(),
				name: 'Driveway 1',
				type: 'rectangle',
				dimensions: {
					length: 50,
					width: 10,
					depth: 100,
					density: 2.3,
				},
			},
			{
				id: uuid(),
				name: 'Driveway 2',
				type: 'triangle',
				dimensions: {
					a: 5,
					b: 7,
					c: 3,
					depth: 100,
					density: 2.3,
				},
			},
			{
				id: uuid(),
				name: 'Post Holes',
				type: 'drill',
				dimensions: {
					count: 10,
					diameter: 100,
					depth: 600,
					density: 2.3,
				},
			},
		],
	});

	return (
		<>
			<AppBar />
			<ZoneDetail value={zone} onChange={setZone} defaultExpanded />
		</>
	);
}

function Providers({ children }: React.PropsWithChildren<{}>) {
	// TODO: Shift light setting to hook
	const darkModeSetting = useRecoilValue(appSettingDarkMode);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const lux = useAmbientLightSensor(darkModeSetting === DarkModeSetting.SENSOR);
	let paletteMode: 'light' | 'dark';

	switch (darkModeSetting) {
		case DarkModeSetting.LIGHT:
			paletteMode = 'light';
			break;
		case DarkModeSetting.DARK:
			paletteMode = 'dark';
			break;
		case DarkModeSetting.SENSOR:
			console.log('hasDeviceLightEvent', hasAmbientLightSensor(), 'lux', lux);
			if (hasAmbientLightSensor() && lux !== undefined) {
				paletteMode = lux < 50 ? 'dark' : 'light';
				break;
			}

		// AUTO - We want SENSOR to fall through if it's not available.
		// eslint-disable-next-line no-fallthrough
		default:
			paletteMode = prefersDarkMode ? 'dark' : 'light';
	}
	console.log('paletteMode', paletteMode);

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: paletteMode,
				},
				typography: {
					fontFamily: [
						'-apple-system',
						'BlinkMacSystemFont',
						'Roboto',
						'"Segoe UI"',
						'"Helvetica Neue"',
						'Arial',
						'sans-serif',
						'"Apple Color Emoji"',
						'"Segoe UI Emoji"',
						'"Segoe UI Symbol"',
					].join(','),
				},
			}),
		[paletteMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

function App() {
	return (
		<RecoilRoot>
			<Providers>
				<AppContent />
			</Providers>
		</RecoilRoot>
	);
}

export default App;
