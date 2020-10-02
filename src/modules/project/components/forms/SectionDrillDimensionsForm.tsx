/**
 * Section Drill Dimensions Form
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowExpandDownIcon from 'mdi-material-ui/ArrowExpandDown';
import ArrowExpandHorizontalIcon from 'mdi-material-ui/ArrowExpandHorizontal';
import PoundIcon from 'mdi-material-ui/Pound';
import GradientIcon from '@material-ui/icons/Gradient';

import DimensionField from 'common/components/DimensionField';
import { SectionDrillDimensions } from '../../interfaces';

export interface SectionDrillDimensionsFormProps {
	value?: SectionDrillDimensions;
	onChange?: (value: SectionDrillDimensions) => void;
}

const SectionDrillDimensionsForm: React.FC<SectionDrillDimensionsFormProps> = (
	props
) => {
	const { value, onChange } = props;

	const handleChange = (field: keyof SectionDrillDimensions) => (
		event: React.ChangeEvent<HTMLInputElement>
	) =>
		onChange?.({
			...value,
			[field]: event.target.valueAsNumber,
		});

	return (
		<Grid container spacing={2}>
			<Grid item xs={6}>
				<DimensionField
					label="Count"
					icon={<PoundIcon />}
					value={value?.count}
					onChange={handleChange('count')}
				/>
			</Grid>
			<Grid item xs={6}>
				<DimensionField
					label="Width"
					icon={<ArrowExpandHorizontalIcon />}
					unitText="mm"
					value={value?.diameter}
					onChange={handleChange('diameter')}
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

export default SectionDrillDimensionsForm;
