/**
 * Section Dialog
 */

import React, { useEffect, useState } from 'react';
import { DialogProps } from '@material-ui/core';
import { Section } from '../interfaces';
import DialogContent from '@material-ui/core/DialogContent';
import SectionForm from './forms/SectionForm';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { formatValue } from '../formatters';
import { calculateSectionMass } from '../calculators';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

export interface SectionDialogProps extends DialogProps {
	section?: Section;
	onSave?: (section: Section) => void;
}

const SectionDialog: React.FC<SectionDialogProps> = (props) => {
	const { section, onSave, ...dialogProps } = props;
	const [editSection, setEditSection] = useState(section);

	useEffect(() => {
		if (dialogProps.open) setEditSection(section);
	}, [dialogProps.open, section, setEditSection]);

	const handleSaveClick = () => {
		if (editSection) onSave?.(editSection);
	};

	return (
		<Dialog {...dialogProps}>
			<DialogContent>
				<SectionForm value={editSection} onChange={setEditSection} />
				<DialogContentText>
					<Box pt={1} mt={3} textAlign="right">
						<Typography component="span">Subtotal: </Typography>
						<Typography component="span" variant="h5">
							{formatValue(calculateSectionMass(editSection), 't')}
						</Typography>
					</Box>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={(event) => dialogProps.onClose?.(event, 'escapeKeyDown')}
					color="primary"
				>
					Cancel
				</Button>
				<Button onClick={handleSaveClick} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SectionDialog;
