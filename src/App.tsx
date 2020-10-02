import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { RecoilRoot } from 'recoil';
import SectionRectangleDimensionsForm from './modules/project/components/forms/SectionRectangleDimensionsForm';
import {
	Section,
	SectionRectangleDimensions,
	SectionDrillDimensions,
	Zone,
} from './modules/project/interfaces';
import SectionDrillDimensionsForm from './modules/project/components/forms/SectionDrillDimensionsForm';
import SectionForm from './modules/project/components/forms/SectionForm';
import SectionList from 'modules/project/components/SectionList';
import ZoneDetail from './modules/project/components/ZoneDetail';
import uuid from 'lib/uuid';

function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
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
		[prefersDarkMode]
	);

	const [zone, setZone] = useState<Zone>({
		name: 'Front Yard',
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
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="App">
					<AppBar position="static">
						<Toolbar style={{ justifyContent: 'space-between' }}>
							<Typography variant="h6" noWrap>
								Material Calculator
							</Typography>
							<Typography>v0.1.0</Typography>
						</Toolbar>
					</AppBar>

					{/*<SectionForm value={section} onChange={setSection} />*/}
					<ZoneDetail value={zone} onChange={setZone} defaultExpanded />
				</div>
			</ThemeProvider>
		</RecoilRoot>
	);
}

export default App;
