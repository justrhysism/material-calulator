/**
 * Application Settings List
 */

import React, { useRef, useState } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Select from '@material-ui/core/Select';
import { hasAmbientLightSensor } from '../../../lib/detects';
import MenuItem from '@material-ui/core/MenuItem';
import { capitalCase } from 'change-case';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import createPersistedState from 'use-persisted-state';
import { DarkModeSetting } from '../enums';
import { useRecoilState } from 'recoil';
import {
	APP_SETTING_DARK_MODE,
	APP_SETTING_DENSITY,
	APP_SETTING_TRUCK_CAPACITY,
	appSettingDarkMode,
	appSettingDensity,
	appSettingTruckCapacity,
} from '../store/settings';
import { DialogActions, DialogProps } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DimensionField from '@app/common/components/DimensionField';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
	createStyles({
		listItemIcon: {
			minWidth: theme.spacing(3.5),
		},

		listItemText: {
			flex: '0 1 auto',
		},
		listItemPrimaryText: {
			flexGrow: 1,
		},
		select: {
			color: theme.palette.text.secondary,
			fontSize: theme.typography.body2.fontSize,

			'&::before': {
				border: 0,
			},
		},
	})
);

type EditSetting<T = unknown> = {
	name: string;
	label?: string;
	value?: T;
	// type?: 'text' | 'number' | 'date';
	unitText?: React.ReactNode;
};

export interface AppSettingsListProps {}

const AppSettingsList: React.FC<AppSettingsListProps> = (props) => {
	const classes = useStyles();

	const [truckCapacity, setTruckCapacity] = useRecoilState(
		appSettingTruckCapacity
	);
	const [density, setDensity] = useRecoilState(appSettingDensity);
	const [darkMode, setDarkMode] = useRecoilState(appSettingDarkMode);

	const [editSetting, setEditSetting] = useState<EditSetting | null>(null);

	const handleSettingChange = (name: string) => (value: any) => {
		// TODO: Make more generic
		switch (name) {
			case 'truckCapacity':
				window.localStorage.setItem(APP_SETTING_TRUCK_CAPACITY, value);
				setTruckCapacity(value);
				break;
			case 'density':
				window.localStorage.setItem(APP_SETTING_DENSITY, value);
				setDensity(value);
				break;
		}

		closeSettingChange();
	};

	const closeSettingChange = () => setEditSetting(null);

	const handleDarkModeSettingChange = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		const value = event.target.value as DarkModeSetting;
		window.localStorage.setItem(APP_SETTING_DARK_MODE, value);
		setDarkMode(value);
	};

	return (
		<>
			<List>
				<ListSubheader>Default Values</ListSubheader>
				<ListItem
					button
					onClick={() =>
						setEditSetting({
							name: 'truckCapacity',
							value: truckCapacity,
							// type: 'number',
							unitText: (
								<>
									t/m<sup>3</sup>
								</>
							),
						})
					}
				>
					<ListItemText
						className={clsx(classes.listItemText, classes.listItemPrimaryText)}
						primary="Truck Capacity"
					/>
					<ListItemText
						className={classes.listItemText}
						secondary={`${truckCapacity} t`}
					/>
				</ListItem>
				<ListItem
					button
					onClick={() =>
						setEditSetting({
							name: 'density',
							label: 'Material Density',
							value: density,
							// type: 'number',
							unitText: 't',
						})
					}
				>
					<ListItemText
						className={clsx(classes.listItemText, classes.listItemPrimaryText)}
						primary="Material Density"
					/>
					<ListItemText
						className={classes.listItemText}
						secondary={
							<>
								{density} t/m<sup>3</sup>
							</>
						}
					/>
				</ListItem>

				<ListSubheader>Preferences</ListSubheader>
				<ListItem>
					<ListItemIcon className={classes.listItemIcon}>
						<Brightness6Icon fontSize="small" />
					</ListItemIcon>
					<ListItemText
						className={clsx(classes.listItemText, classes.listItemPrimaryText)}
						id="settings-label-darkmode"
						primary="Dark Mode"
					/>
					<ListItemSecondaryAction>
						<Select
							value={darkMode}
							onChange={handleDarkModeSettingChange}
							className={classes.select}
						>
							{Object.values(DarkModeSetting).reduce((acc, value) => {
								if (
									value === DarkModeSetting.SENSOR &&
									!hasAmbientLightSensor()
								)
									return acc;
								acc.push(
									<MenuItem value={value}>{capitalCase(value)}</MenuItem>
								);
								return acc;
							}, [] as React.ReactNode[])}
						</Select>
					</ListItemSecondaryAction>
				</ListItem>
			</List>

			{editSetting && (
				<SettingDialog
					open={true}
					name={editSetting.name}
					label={editSetting.label}
					value={editSetting.value}
					unitText={editSetting.unitText}
					onSave={handleSettingChange(editSetting.name)}
					onClose={() => setEditSetting(null)}
				/>
			)}
		</>
	);
};

export default AppSettingsList;

interface SettingDialogProps<T = unknown> extends DialogProps, EditSetting<T> {
	onSave?: (value: T) => void;
}

function SettingDialog<T = unknown>(props: SettingDialogProps) {
	const {
		name,
		label: _label,
		value,
		onSave,
		// type = 'text',
		unitText,
		...dialogProps
	} = props;
	const label = _label ?? capitalCase(name);
	const inputRef = useRef<HTMLInputElement>();

	const handleClose = (event: React.MouseEvent<HTMLButtonElement>) =>
		dialogProps.onClose?.(event, 'backdropClick');

	const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
		const value = inputRef.current?.value;
		onSave?.(value);
		handleClose(event);
	};

	return (
		<Dialog {...dialogProps}>
			<DialogTitle>{label}</DialogTitle>
			<Box px={3}>
				<DimensionField
					inputRef={inputRef}
					defaultValue={value}
					unitText={unitText}
				/>
			</Box>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSave} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
