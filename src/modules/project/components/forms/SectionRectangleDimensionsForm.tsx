/**
 * Section Rectangle Dimensions Form
 */

import React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';
import ArrowExpandHorizontalIcon from 'mdi-material-ui/ArrowExpandHorizontal';
import ArrowExpandVerticalIcon from 'mdi-material-ui/ArrowExpandVertical';

import DimensionField from '@app/common/components/DimensionField';
import { handleFieldChange } from '@app/utils/handlers';
import type { SectionRectangleDimensions } from '../../interfaces';
import SectionDimensionsBaseForm, {
	handleBaseChange,
} from './SectionDimensionsBaseForm';
import type { SectionFormBaseProps } from '../interfaces';

export interface SectionRectangleDimensionsFormProps
	extends SectionFormBaseProps<SectionRectangleDimensions> {}

const SectionRectangleDimensionsForm: React.FC<SectionRectangleDimensionsFormProps> = (
	props
) => {
	const { value = {}, onChange, zoneParameters } = props;

	const handleChange = (field: keyof SectionRectangleDimensions) =>
		handleFieldChange(field, value, onChange, { type: 'number' });

	const fieldContainerProps: GridProps = { item: true, xs: 6 };

	return (
		<Grid container spacing={2}>
			<Grid {...fieldContainerProps}>
				<DimensionField
					label="Length"
					icon={<ArrowExpandVerticalIcon />}
					unitText="m"
					value={value?.length}
					onChange={handleChange('length')}
				/>
			</Grid>
			<Grid {...fieldContainerProps}>
				<DimensionField
					label="Width"
					icon={<ArrowExpandHorizontalIcon />}
					unitText="m"
					value={value?.width}
					onChange={handleChange('width')}
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

export default SectionRectangleDimensionsForm;
