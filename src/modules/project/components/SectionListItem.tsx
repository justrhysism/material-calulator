/**
 * Section List Item
 */

import React from 'react';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { formatSectionDimensions, formatValue } from '../formatters';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';
import clsx from 'clsx';
import { calculateSectionMass } from '../calculators';
import { Section } from '../interfaces';
import { getSectionTypeIcon } from '../icons';

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
	extends Omit<ListItemProps<'div', { button: true }>, 'button'> {
	section: Section;
}

const SectionListItem: React.FC<SectionListItemProps> = (props) => {
	const { section, ...listItemProps } = props;
	const classes = useStyles();

	return (
		<ListItem className={classes.root} button {...listItemProps}>
			<ListItemIcon className={classes.icon}>
				{getSectionTypeIcon(section.type)}
			</ListItemIcon>
			<ListItemText
				className={clsx(classes.text, classes.primaryText)}
				primary={section.name}
				secondary={formatSectionDimensions(section, true)}
			/>
			<ListItemText
				className={classes.text}
				primary={formatValue(calculateSectionMass(section), 't')}
			/>
			<ListItemSecondaryAction />
		</ListItem>
	);
};

export default SectionListItem;
