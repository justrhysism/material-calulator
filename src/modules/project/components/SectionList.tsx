/**
 * Section List
 */

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List, { ListProps } from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import type { Section } from '../interfaces';
import { calculateSectionsMass } from '../calculators';
import { formatValue } from '../formatters';
import type { ZoneParametersProps } from './interfaces';
import SectionListItem from './SectionListItem';
import { Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import { appSettingTruckCapacity } from '@app/modules/application/store/settings';

// const useStyles = makeStyles((theme) =>
// 	createStyles({
// 		totalItem: {
// 			paddingTop: theme.spacing(2),
// 			paddingBottom: theme.spacing(2),
// 			justifyContent: 'flex-end',
// 		},
// 		totalItemLabel: {
// 			flexGrow: 1,
// 			textAlign: 'right',
// 		},
// 		totalItemValue: {
// 			flex: '0 1 auto',
// 			paddingLeft: theme.spacing(2),
// 		},
// 	}),
// );

export interface SectionListProps extends ListProps, ZoneParametersProps {
	items?: Section[];
	onItemClick?: (section: Section) => void;
}

const SectionList: React.FC<SectionListProps> = (props) => {
	const { items = [], onItemClick, zoneParameters, ...listProps } = props;
	// const classes = useStyles();

	const handleItemClick = (section: Section) => () =>
		onItemClick?.({ ...section });

	return (
		<List {...listProps}>
			{items.map((item, index) => (
				<SectionListItem
					section={item}
					onClick={handleItemClick(item)}
					zoneParameters={zoneParameters}
					key={index}
				/>
			))}
			{props.children && (
				<>
					<Divider />
					{props.children}
				</>
			)}
		</List>
	);
};

export default SectionList;
