/**
 * Zone Totals Component
 */

import React from 'react';
import { useRecoilValue } from 'recoil';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { appSettingTruckCapacity } from '@app/modules/application/store/settings';
import { formatInvalid, formatValue } from '@app/modules/project/formatters';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			margin: theme.spacing(0.75, 0),
			textAlign: 'right',

			'& th': {
				...theme.typography.body2,
			},

			'& tbody th:first-child': {
				paddingRight: theme.spacing(1),
			},

			'& td': {
				...theme.typography.h6,
			},

			'& th, & td': {
				verticalAlign: 'baseline',
			},
		},
	}),
);

export interface ZoneTotalsProps {
	total?: number;
}

const ZoneTotals: React.FC<ZoneTotalsProps> = ({ total }) => {
	const classes = useStyles();
	const truckCapacity = useRecoilValue(appSettingTruckCapacity);
	const truckLoads = total
		? Math.round((total / truckCapacity) * 10) / 10
		: undefined;

	return (
		<table className={classes.root}>
			<tbody>
				<tr>
					<th>Total:</th>
					<td>{formatValue(total, 't')}</td>
				</tr>
				<tr>
					<th>Loads:</th>
					<td>{formatInvalid(truckLoads)}&nbsp;&nbsp;</td>
				</tr>
			</tbody>
		</table>
	);
};

export default ZoneTotals;
