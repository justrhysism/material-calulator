/**
 * App Bar
 */

import React, { useState } from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import CloseIcon from '@material-ui/icons/Close';
import { useUuid } from '@app/lib/uuid';
import { titleCase } from 'title-case';
import useToggle from 'react-use/esm/useToggle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { hasAmbientLightSensor } from '../../../lib/detects';
import AppSettingsList from './AppSettingsList';

export interface AppBarProps {
	version?: string;
}

const AppBar: React.FC<AppBarProps> = (props) => {
	const [isDrawerOpen, toggleDrawer] = useToggle(false);

	return (
		<MuiAppBar position="static">
			<Toolbar style={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" noWrap>
					Material Calculator
				</Typography>
				<IconButton edge="end" onClick={() => toggleDrawer()}>
					<SettingsIcon />
				</IconButton>
				<Drawer
					open={isDrawerOpen}
					anchor="right"
					onClose={() => toggleDrawer(false)}
				>
					<Box width={250} role="presentation">
						<Box display="flex" alignItems="center">
							<IconButton onClick={() => toggleDrawer()}>
								<CloseIcon />
							</IconButton>
							<Typography variant="h6">Settings</Typography>
						</Box>

						<AppSettingsList />

						<Box p={2} textAlign="right">
							<Typography variant="overline" color="textSecondary">
								Version 0.1.0
							</Typography>
						</Box>
					</Box>
				</Drawer>
			</Toolbar>
		</MuiAppBar>
	);
};

export default AppBar;
