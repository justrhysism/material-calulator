/**
 * Section Form
 */

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LabelIcon from '@material-ui/icons/Label';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Tooltip from '@material-ui/core/Tooltip';
import {
	Section,
	SectionRectangleDimensions,
	SectionType,
	SectionDrillDimensions,
	SectionTriangleDimensions,
	SectionDimensionsBase,
} from '../../interfaces';
import SectionRectangleDimensionsForm from './SectionRectangleDimensionsForm';
import SectionDrillDimensionsForm from './SectionDrillDimensionsForm';
import SectionTriangleDimensionsForm from './SectionTriangleDimensionsForm';
import { getSectionTypeIcon } from '../../icons';

export interface SectionFormProps {
	value?: Section;
	onChange?: (section: Section) => void;
}

const SectionForm: React.FC<SectionFormProps> = (props) => {
	const { value, onChange } = props;

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		onChange?.({
			...value,
			name: event.target.value,
		} as Section);

	const [rectangleDimensions, setRectangleDimensions] = useState<
		SectionRectangleDimensions
	>(value?.type === 'rectangle' ? value.dimensions ?? {} : {});

	const [triangleDimensions, setTriangleDimensions] = useState<
		SectionTriangleDimensions
	>(value?.type === 'triangle' ? value.dimensions ?? {} : {});

	const [drillDimensions, setDrillDimensions] = useState<
		SectionDrillDimensions
	>(value?.type === 'drill' ? value.dimensions ?? {} : {});

	const handleDimensionsFormChange = <T extends SectionDimensionsBase>(
		type: SectionType,
		setFn: (value: T) => void
	) => (dimensions: T) => {
		setFn(dimensions);
		onChange?.({
			...value,
			type,
			dimensions,
		} as Section);
	};

	const handleTypeSwitch = (
		event: React.MouseEvent<HTMLElement>,
		type: SectionType | null
	) => {
		if (!onChange) return;

		switch (type) {
			case 'rectangle':
				onChange({ ...value, type, dimensions: rectangleDimensions });
				break;
			case 'triangle':
				onChange({ ...value, type, dimensions: triangleDimensions });
				break;
			case 'drill':
				onChange({ ...value, type, dimensions: drillDimensions });
				break;
		}
	};

	let DimensionsForm: React.ReactNode;

	switch (value?.type) {
		case 'rectangle':
			DimensionsForm = (
				<SectionRectangleDimensionsForm
					value={value?.dimensions}
					onChange={handleDimensionsFormChange(
						'rectangle',
						setRectangleDimensions
					)}
				/>
			);
			break;
		case 'triangle':
			DimensionsForm = (
				<SectionTriangleDimensionsForm
					value={value?.dimensions}
					onChange={handleDimensionsFormChange(
						'triangle',
						setTriangleDimensions
					)}
				/>
			);
			break;
		case 'drill':
			DimensionsForm = (
				<SectionDrillDimensionsForm
					value={value?.dimensions}
					onChange={handleDimensionsFormChange('drill', setDrillDimensions)}
				/>
			);
			break;
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					label="Name"
					value={value?.name}
					onChange={handleNameChange}
					placeholder="e.g. Driveway"
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LabelIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<Box textAlign="center" my={2}>
					<ToggleButtonGroup
						value={value?.type}
						onChange={handleTypeSwitch}
						exclusive
					>
						<ToggleButton value="rectangle">
							{getSectionTypeIcon('rectangle')}
						</ToggleButton>
						<ToggleButton value="triangle">
							{getSectionTypeIcon('triangle')}
						</ToggleButton>
						<ToggleButton value="drill">
							{getSectionTypeIcon('drill')}
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Grid>
			<Grid item xs={12}>
				{DimensionsForm}
			</Grid>
		</Grid>
	);
};

export default SectionForm;
