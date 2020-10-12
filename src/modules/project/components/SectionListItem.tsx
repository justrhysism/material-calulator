/**
 * Section List Item
 */

import React from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';
import clsx from 'clsx';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { calculateSectionMass } from '../calculators';
import { formatSectionDimensions, formatValue } from '../formatters';
import type { Section } from '../interfaces';
import { getSectionTypeIcon } from '../icons';
import type { ZoneParametersProps } from './interfaces';

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			paddingRight: theme.spacing(2),
			justifyContent: 'space-between',
		},
		text: {
			flex: '0 1 auto',
		},
		primaryText: {
			flexGrow: 1,
		},
		icon: {
			minWidth: theme.spacing(5),
		},
	})
);

export interface SectionListItemProps
	extends Omit<ListItemProps<'div', { button: true }>, 'button'>,
		ZoneParametersProps {
	section: Section;
}

const SectionListItem: React.FC<SectionListItemProps> = (props) => {
	const { section, zoneParameters, ...listItemProps } = props;
	const classes = useStyles();

	return (
		<ListItem className={classes.root} button {...listItemProps}>
			<ListItemIcon className={classes.icon}>
				{getSectionTypeIcon(section.type)}
			</ListItemIcon>
			<ListItemText
				className={clsx(classes.text, classes.primaryText)}
				primary={section.name}
				secondary={formatSectionDimensions(section, zoneParameters)}
			/>
			<ListItemText
				className={classes.text}
				primary={formatValue(
					calculateSectionMass(section, zoneParameters),
					't'
				)}
			/>
			<ListItemSecondaryAction />
		</ListItem>
	);
};

export default SectionListItem;
