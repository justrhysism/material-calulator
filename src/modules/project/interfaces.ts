/**
 * Project Interfaces
 */

export type SectionType = 'rectangle' | 'triangle' | 'drill';

export interface SectionDimensionsBase {
	/** Depth in millimeters (mm) */
	depth?: number;

	/** Density in tonne per cubic meter (t/m^3) */
	density?: number;
}

export interface SectionRectangleDimensions extends SectionDimensionsBase {
	/** Length in meters (m) */
	length?: number;

	/** Width in meters (m) */
	width?: number;
}

export interface SectionTriangleDimensions extends SectionDimensionsBase {
	/** Side in meters (m) */
	a?: number;

	/** Side in meters (m) */
	b?: number;

	/** Side in meters (m) */
	c?: number;
}

export interface SectionDrillDimensions extends SectionDimensionsBase {
	/** Number of drill holes */
	count?: number;

	/** Diameter in millimeters (mm) */
	diameter?: number;
}

interface SectionBase {
	id?: string;
	name?: string;
	type?: SectionType;
}

export type SectionRectangle = SectionBase & {
	type: 'rectangle';
	dimensions?: SectionRectangleDimensions;
};

export type SectionTriangle = SectionBase & {
	type: 'triangle';
	dimensions?: SectionTriangleDimensions;
};

export type SectionDrill = SectionBase & {
	type: 'drill';
	dimensions?: SectionDrillDimensions;
};

export type Section = SectionRectangle | SectionTriangle | SectionDrill;

export interface ZoneParameters extends SectionDimensionsBase {}

export interface Zone {
	id?: string;
	name?: string;
	notes?: string;
	parameters?: ZoneParameters;
	sections?: Section[];
}
