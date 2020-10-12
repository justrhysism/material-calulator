/**
 * Section Drill Dimensions Form
 */

import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import ArrowExpandHorizontalIcon from 'mdi-material-ui/ArrowExpandHorizontal';
import PoundIcon from 'mdi-material-ui/Pound';

import DimensionField from '@app/common/components/DimensionField';
import { handleFieldChange } from '@app/utils/handlers';
import type { SectionDrillDimensions } from '../../interfaces';
import SectionDimensionsBaseForm, {
	handleBaseChange,
} from './SectionDimensionsBaseForm';
import type { SectionFormBaseProps } from '../interfaces';

export interface SectionDrillDimensionsFormProps
	extends SectionFormBaseProps<SectionDrillDimensions> {}

const SectionDrillDimensionsForm: React.FC<SectionDrillDimensionsFormProps> = (
	props
) => {
	const { value = {}, onChange, zoneParameters } = props;

	const handleChange = (field: keyof SectionDrillDimensions) =>
		handleFieldChange(field, value, onChange, { type: 'number' });

	const fieldContainerProps: GridProps = { item: true, xs: 6 };

	return (
		<Grid container spacing={2}>
			<Grid {...fieldContainerProps}>
				<DimensionField
					label="Count"
					icon={<PoundIcon />}
					value={value?.count}
					onChange={handleChange('count')}
				/>
			</Grid>
			<Grid {...fieldContainerProps}>
				<DimensionField
					label="Width"
					icon={<ArrowExpandHorizontalIcon />}
					unitText="mm"
					value={value?.diameter}
					onChange={handleChange('diameter')}
				/>
			</Grid>
			<SectionDimensionsBaseForm
				value={value}
				onChange={handleBaseChange(value, onChange)}
				zoneParameters={zoneParameters}
				FieldContainerComponent={Grid}
				FieldContainerProps={fieldContainerProps}
			/>
		</Grid>
	);
};

export default SectionDrillDimensionsForm;
