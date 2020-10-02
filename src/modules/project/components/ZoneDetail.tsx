/**
 * Zone Detail
 */

import React, { useState } from 'react';
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
import { Section, Zone } from '../interfaces';
import SectionForm from './forms/SectionForm';
import SectionList from './SectionList';
import { calculateSectionMass, calculateSectionsMass } from '../calculators';
import { formatValue } from '../formatters';
import Box from '@material-ui/core/Box';
import SectionDialog from './SectionDialog';
import { InputBase } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
	createStyles({
		details: {
			padding: 0,
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
	})
);

export interface ZoneDetailProps {
	value?: Zone;
	onChange?: (zone: Zone) => void;
	defaultExpanded?: boolean;
}

const ZoneDetail: React.FC<ZoneDetailProps> = (props) => {
	const { value, onChange, defaultExpanded } = props;
	const classes = useStyles();

	//#region Name
	const handleNameClick = (event: React.MouseEvent<HTMLInputElement>) => {
		event.stopPropagation();
	};

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.value;
		onChange?.({
			...value,
			name,
		});
	};
	//#endregion

	//#region Sections
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
			<Accordion defaultExpanded={defaultExpanded}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={clsx(classes.nameLabel, classes.expandedHide)}>
						{value?.name}
					</Typography>
					<InputBase
						value={value?.name}
						onChange={handleChangeName}
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
					<SectionList
						className={classes.list}
						items={value?.sections}
						onItemClick={setEditSection}
						withTotal
					/>
				</AccordionDetails>
			</Accordion>

			<SectionDialog
				open={isEditSectionOpen}
				section={editSection}
				onClose={() => clearEditSection()}
				onSave={handleSectionSave}
			/>
		</>
	);
};

export default ZoneDetail;
