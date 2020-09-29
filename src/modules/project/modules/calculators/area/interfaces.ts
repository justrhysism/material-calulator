/**
 * Area Calculator Interfaces
 */

export interface SectionValuesState {
	length: string;
	width: string;
	depth: string;
	cube: string;
}

export interface SectionState {
	id: string;
	name?: string;
	values: SectionValuesState;
}

export interface AreaState {
	id: string;
	name?: string;
	sections: SectionState[];
}
