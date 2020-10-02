/**
 * Common Icons
 */

import React from 'react';
import RectangleIcon from 'mdi-material-ui/VectorRectangle';
import TriangleIcon from 'mdi-material-ui/VectorTriangle';
import DrillIcon from 'mdi-material-ui/ScrewMachineFlatTop';
import { SectionType } from './interfaces';

export { RectangleIcon, TriangleIcon, DrillIcon };

export const getSectionTypeIcon = (type: SectionType): React.ReactNode => {
	switch (type) {
		case 'rectangle':
			return <RectangleIcon />;
		case 'triangle':
			return <TriangleIcon />;
		case 'drill':
			return <DrillIcon />;
		default:
			return <></>;
	}
};
