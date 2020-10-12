/**
 * Section Dialog
 */

import React, { useEffect, useState } from 'react';
import type { DialogProps } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { calculateSectionMass } from '../calculators';
import { formatValue } from '../formatters';
import type { Section } from '../interfaces';
import SectionForm from './forms/SectionForm';
import type { ZoneParametersProps } from './interfaces';

export interface SectionDialogProps extends DialogProps, ZoneParametersProps {
	section?: Section;
	onSave?: (section: Section) => void;
}

const SectionDialog: React.FC<SectionDialogProps> = (props) => {
	const { section, onSave, zoneParameters, ...dialogProps } = props;
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
				<SectionForm
					value={editSection}
					onChange={setEditSection}
					zoneParameters={zoneParameters}
				/>
				<DialogContentText>
					<Box component="span" display="block" pt={1} mt={3} textAlign="right">
						<Typography component="span">Subtotal: </Typography>
						<Typography component="span" variant="h6">
							{formatValue(
								calculateSectionMass(editSection, zoneParameters),
								't'
							)}
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
