/**
 * Section Triangle Dimensions Form
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import DimensionField from '@app/common/components/DimensionField';
import { handleFieldChange } from '@app/utils/handlers';
import type { SectionTriangleDimensions } from '../../interfaces';
import type { SectionFormBaseProps } from '../interfaces';
import SectionDimensionsBaseForm, {
	handleBaseChange,
} from './SectionDimensionsBaseForm';

export interface SectionTriangleDimensionsFormProps
	extends SectionFormBaseProps<SectionTriangleDimensions> {}

const SectionTriangleDimensionsForm: React.FC<SectionTriangleDimensionsFormProps> = (
	props
) => {
	const { value = {}, onChange, zoneParameters } = props;

	const handleChange = (field: keyof SectionTriangleDimensions) =>
		handleFieldChange(field, value, onChange, { type: 'number' });

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
			<SectionDimensionsBaseForm
				value={value}
				zoneParameters={zoneParameters}
				onChange={handleBaseChange(value, onChange)}
				FieldContainerComponent={Grid}
				FieldContainerProps={{ item: true, xs: 6 }}
			/>
		</Grid>
	);
};

export default SectionTriangleDimensionsForm;
