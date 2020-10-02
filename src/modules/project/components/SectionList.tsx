/**
 * Section List
 */

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List, { ListProps } from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { Section } from '../interfaces';
import SectionListItem from './SectionListItem';
import { calculateSectionsMass } from '../calculators';
import { formatValue } from '../formatters';

const useStyles = makeStyles((theme) =>
	createStyles({
		totalItem: {
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			justifyContent: 'flex-end',
		},
		totalItemLabel: {
			flexGrow: 1,
			textAlign: 'right',
		},
		totalItemValue: {
			flex: '0 1 auto',
			paddingLeft: theme.spacing(2),
		},
	})
);

export interface SectionListProps extends ListProps {
	items?: Section[];
	onItemClick?: (section: Section) => void;
	withTotal?: boolean;
}

const SectionList: React.FC<SectionListProps> = (props) => {
	const { items = [], onItemClick, withTotal = false, ...listProps } = props;
	const classes = useStyles();

	const handleItemClick = (section: Section) => () =>
		onItemClick?.({ ...section });

	return (
		<List {...listProps}>
			{items.map((item, index) => (
				<SectionListItem
					section={item}
					onClick={handleItemClick(item)}
					key={index}
				/>
			))}
			{withTotal && (
				<>
					<Divider />
					<ListItem className={classes.totalItem}>
						<ListItemText
							className={classes.totalItemLabel}
							secondary="Total:"
						/>
						<ListItemText
							className={classes.totalItemValue}
							primary={formatValue(calculateSectionsMass(items), 't')}
						/>
					</ListItem>
				</>
			)}
		</List>
	);
};

export default SectionList;
