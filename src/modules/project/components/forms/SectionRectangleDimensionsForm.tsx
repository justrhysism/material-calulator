/**
 * Section Rectangle Dimensions Form
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowExpandDownIcon from 'mdi-material-ui/ArrowExpandDown';
import ArrowExpandHorizontalIcon from 'mdi-material-ui/ArrowExpandHorizontal';
import ArrowExpandVerticalIcon from 'mdi-material-ui/ArrowExpandVertical';
import GradientIcon from '@material-ui/icons/Gradient';

import DimensionField from 'common/components/DimensionField';
import { SectionRectangleDimensions } from '../../interfaces';

export interface SectionRectangleDimensionsFormProps {
	value?: SectionRectangleDimensions;
	onChange?: (value: SectionRectangleDimensions) => void;
}

const SectionRectangleDimensionsForm: React.FC<SectionRectangleDimensionsFormProps> = (
	props
) => {
	const { value, onChange } = props;

	const handleChange = (field: keyof SectionRectangleDimensions) => (
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
					label="Length"
					icon={<ArrowExpandVerticalIcon />}
					unitText="m"
					value={value?.length}
					onChange={handleChange('length')}
				/>
			</Grid>
			<Grid item xs={6}>
				<DimensionField
					label="Width"
					icon={<ArrowExpandHorizontalIcon />}
					unitText="m"
					value={value?.width}
					onChange={handleChange('width')}
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

export default SectionRectangleDimensionsForm;
