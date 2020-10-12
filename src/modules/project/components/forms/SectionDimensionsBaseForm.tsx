/**
 * Section Base Dimensions Form
 */

import React from 'react';
import GradientIcon from '@material-ui/icons/Gradient';
import ArrowExpandDownIcon from 'mdi-material-ui/ArrowExpandDown';
import { handleFieldChange } from '@app/utils/handlers';
import DimensionField from '@app/common/components/DimensionField';
import type { SectionDimensionsBase } from '../../interfaces';
import type { SectionFormBaseProps } from '../interfaces';

export interface SectionDimensionsBaseFormProps<
	TFieldContainerComponent extends React.ComponentType<any> = any
> extends SectionFormBaseProps<SectionDimensionsBase> {
	/**
	 * The container component used to wrap the fields..
	 */
	FieldContainerComponent?: TFieldContainerComponent;

	/**
	 * Props applied to the container component if used.
	 */
	FieldContainerProps?: React.ComponentProps<TFieldContainerComponent>;
}

const SectionDimensionsBaseForm: React.FC<SectionDimensionsBaseFormProps> = (
	props
) => {
	const {
		value = {},
		onChange,
		FieldContainerComponent = React.Fragment,
		FieldContainerProps,
		zoneParameters,
	} = props;

	const handleChange = (field: keyof SectionDimensionsBase) =>
		handleFieldChange(field, value, onChange, { type: 'number' });

	return (
		<>
			<FieldContainerComponent {...FieldContainerProps}>
				<DimensionField
					label="Depth"
					icon={<ArrowExpandDownIcon />}
					unitText="mm"
					value={value?.depth ?? ''}
					onChange={handleChange('depth')}
					placeholder={zoneParameters?.depth?.toString()}
				/>
			</FieldContainerComponent>
			<FieldContainerComponent {...FieldContainerProps}>
				<DimensionField
					label="Density"
					icon={<GradientIcon />}
					unitText={
						<>
							t/m<sup>3</sup>
						</>
					}
					value={value?.density ?? ''}
					onChange={handleChange('density')}
					placeholder={zoneParameters?.density?.toString()}
				/>
			</FieldContainerComponent>
		</>
	);
};

export default SectionDimensionsBaseForm;

export const handleBaseChange = <T extends object>(
	value: T,
	onChange?: (value: T) => void
) => (updated: SectionDimensionsBase) => onChange?.({ ...value, ...updated });
