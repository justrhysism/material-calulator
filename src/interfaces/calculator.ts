/**
 * Calculator Interfaces
 */

export interface SectionValuesState {
	length: string;
	width: string;
	depth: string;
	cube: string;
}

export interface SectionState {
	label?: string;
	values: SectionValuesState;
}

export interface AreaState {
	label?: string;
	sections: SectionState[];
}
