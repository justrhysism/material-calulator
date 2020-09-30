/**
 * Area Calculator Interfaces
 */

interface SectionValuesBaseState {
	depth: number;
	density: number;
}

export interface SectionSquareValuesState extends SectionValuesBaseState {
	length: number;
	width: number;
}

export interface SectionRoundValuesState extends SectionValuesBaseState {
	diameter: number;
	quantity: number;
}

interface SectionStateBase {
	id: string;
	name?: string;
}

export type SectionStateType = 'square' | 'round';

type SectionStateTypes =
	| {
			type: SectionStateType;
			values: SectionSquareValuesState;
	  }
	| {
			type: SectionStateType;
			values: SectionRoundValuesState;
	  };

export type SectionState = SectionStateBase & SectionStateTypes;

export interface AreaState {
	id: string;
	name?: string;
	sections: SectionState[];
}
