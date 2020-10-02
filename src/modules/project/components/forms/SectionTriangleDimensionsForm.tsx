/**
 * Section Triangle Dimensions Form
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowExpandDownIcon from 'mdi-material-ui/ArrowExpandDown';
import GradientIcon from '@material-ui/icons/Gradient';

import DimensionField from 'common/components/DimensionField';
import { SectionTriangleDimensions } from '../../interfaces';

export interface SectionTriangleDimensionsFormProps {
	value?: SectionTriangleDimensions;
	onChange?: (value: SectionTriangleDimensions) => void;
}

const SectionTriangleDimensionsForm: React.FC<SectionTriangleDimensionsFormProps> = (
	props
) => {
	const { value, onChange } = props;

	const handleChange = (field: keyof SectionTriangleDimensions) => (
		event: React.ChangeEvent<HTMLInputElement>
	) =>
		onChange?.({
			...value,
			[field]: event.target.valueAsNumber,
		});

	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<DimensionField
					label="A"
					unitText="m"
					value={value?.a}
					onChange={handleChange('a')}
				/>
			</Grid>
			<Grid item xs={4}>
				<DimensionField
					label="B"
					unitText="m"
					value={value?.b}
					onChange={handleChange('b')}
				/>
			</Grid>
			<Grid item xs={4}>
				<DimensionField
					label="C"
					unitText="m"
					value={value?.c}
					onChange={handleChange('c')}
				/>
			</Grid>
			<Grid item xs={6}>
				<DimensionField
					label="Depth"
					icon={<ArrowExpandDownIcon />}
					unitText="mm"
					value={value?.depth}
					onChange={handleChange('depth')}
				/>
			</Grid>
			<Grid item xs={6}>
				<DimensionField
					label="Density"
					icon={<GradientIcon />}
					unitText={
						<>
							t/m<sup>3</sup>
						</>
					}
					value={value?.density}
					onChange={handleChange('density')}
				/>
			</Grid>
		</Grid>
	);
};

export default SectionTriangleDimensionsForm;
