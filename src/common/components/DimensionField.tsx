/**
 * Dimension Field
 */

import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';

export interface DimensionFieldProps
	extends Omit<StandardTextFieldProps, 'variant'> {
	icon?: React.ReactNode;
	unitText?: React.ReactNode;
}

const DimensionField: React.FC<DimensionFieldProps> = (props) => {
	const { icon, unitText, ...rest } = props;

	return (
		<TextField
			type="number"
			{...rest}
			InputProps={{
				startAdornment: icon && (
					<InputAdornment position="start">{icon}</InputAdornment>
				),
				endAdornment: unitText && (
					<InputAdornment position="end">{unitText}</InputAdornment>
				),
				inputProps: {
					style: { textAlign: 'right' },
				},
				...rest.InputProps,
			}}
		/>
	);
};

export default DimensionField;
