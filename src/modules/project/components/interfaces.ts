/**
 * Shared Component Interfaces
 */
import type { ModelForm } from '@app/common/interfaces';
import type { ZoneParameters } from '../interfaces';

export interface ZoneParametersProps {
	zoneParameters?: ZoneParameters;
}

export interface SectionFormBaseProps<T extends object>
	extends ModelForm<T>,
		ZoneParametersProps {}
