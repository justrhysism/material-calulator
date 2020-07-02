/**
 * Project Interfaces
 */

export interface SectionValuesState {
	length: string;
	width: string;
	depth: string;
	cube: string;
}

export interface SectionState {
	name?: string;
	values: SectionValuesState;
}

export interface AreaState {
	name?: string;
	sections: SectionState[];
}

export interface ProjectState {
	areas: AreaState[];
}
