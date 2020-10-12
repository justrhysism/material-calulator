/**
 * Zone Detail
 */

import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import type { Section, SectionDimensionsBase, Zone } from '../interfaces';
import SectionForm from './forms/SectionForm';
import SectionList from './SectionList';
import { calculateSectionMass, calculateSectionsMass } from '../calculators';
import { formatValue } from '../formatters';
import Box from '@material-ui/core/Box';
import SectionDialog from './SectionDialog';
import { InputBase } from '@material-ui/core';
import clsx from 'clsx';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { useUuid } from '../../../lib/uuid';
import SectionDimensionsBaseForm from './forms/SectionDimensionsBaseForm';
import Grid from '@material-ui/core/Grid';
import type { ModelForm } from '@app/common/interfaces';
import { useRecoilValue } from 'recoil';
import { appSettingDensity } from '../../application/store/settings';

const useStyles = makeStyles((theme) =>
	createStyles({
		details: {
			padding: 0,
			flexDirection: 'column',
		},
		list: {
			padding: 0,
			width: `100%`,
		},
		expandedHide: {
			'.Mui-expanded &': {
				display: 'none',
			},
		},
		expandedShow: {
			display: 'none',

			'.Mui-expanded &': {
				display: 'block',
			},
		},
		nameLabel: {
			width: '100%',
		},
		nameInput: {
			padding: 0,
			lineHeight: theme.typography.body1.lineHeight,
		},
		notesInput: {
			padding: theme.spacing(2),
		},
		notesInputBase: {
			...theme.typography.body2,
		},
	})
);

export interface ZoneDetailProps extends ModelForm<Zone> {
	defaultExpanded?: boolean;
}

const ZoneDetail: React.FC<ZoneDetailProps> = (props) => {
	const { value, onChange, defaultExpanded } = props;
	const classes = useStyles();

	const id = useUuid();

	//#region Name & Notes
	const handleNameClick = (event: React.MouseEvent<HTMLInputElement>) => {
		event.stopPropagation();
	};

	const handleInputChange = (field: keyof StringKeys<Zone>) => (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		onChange?.({
			...value,
			[field as string]: event.target.value,
		});
	};
	//#endregion

	//#region Parameters
	const handleBaseChange = (values: SectionDimensionsBase) =>
		onChange?.({ ...value, parameters: values });
	//#endregion

	//#region Sections
	const sectionSubheaderId = useUuid();
	const [editSection, setEditSection] = useState<Section | undefined>();
	const isEditSectionOpen = Boolean(editSection);

	const clearEditSection = () => setEditSection(undefined);
	const handleSectionSave = (section: Section) => {
		if (!value?.sections || !onChange) {
			clearEditSection();
			return;
		}

		const sections = [...value.sections];

		const sectionIndex = sections.findIndex((s) => s.id === section.id);
		sections[sectionIndex] = section;

		onChange?.({
			...value,
			sections,
		});

		clearEditSection();
	};
	//#endregion

	return (
		<>
			<Accordion defaultExpanded={defaultExpanded} square>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`${id}-content`}
					id={`${id}-header`}
				>
					<Typography className={clsx(classes.nameLabel, classes.expandedHide)}>
						{value?.name}
					</Typography>
					<InputBase
						value={value?.name}
						onChange={handleInputChange('name')}
						onClick={handleNameClick}
						className={classes.expandedShow}
						inputProps={{ className: classes.nameInput }}
						fullWidth
					/>
					<Typography className={classes.expandedHide}>
						{formatValue(calculateSectionsMass(value?.sections), 't')}
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.details}>
					<InputBase
						value={value?.notes}
						onChange={handleInputChange('notes')}
						placeholder="Notes"
						className={classes.notesInputBase}
						inputProps={{ className: classes.notesInput }}
						multiline
						fullWidth
					/>

					<Accordion square>
						<AccordionSummary
							aria-controls={`${id}-parameters-content`}
							id={`${id}-parameters-header`}
							expandIcon={<ExpandMoreIcon fontSize="small" />}
						>
							<Typography variant="subtitle2" color="textSecondary">
								Parameters
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid container spacing={2}>
								{/* TODO: Separate parameters form */}
								<SectionDimensionsBaseForm
									value={value?.parameters}
									onChange={handleBaseChange}
									FieldContainerComponent={Grid}
									FieldContainerProps={{ item: true, xs: 6 }}
								/>
							</Grid>
						</AccordionDetails>
					</Accordion>

					<SectionList
						className={classes.list}
						items={value?.sections}
						zoneParameters={value?.parameters}
						onItemClick={setEditSection}
						withTotal
						aria-labelledby={sectionSubheaderId}
						subheader={
							<ListSubheader component="div" id={sectionSubheaderId}>
								Sections
							</ListSubheader>
						}
					/>
				</AccordionDetails>
			</Accordion>

			<SectionDialog
				open={isEditSectionOpen}
				section={editSection}
				onClose={() => clearEditSection()}
				onSave={handleSectionSave}
				zoneParameters={value?.parameters}
			/>
		</>
	);
};

export default ZoneDetail;
