/**
 * Project Calculators
 */

import defaults from 'lodash-es/defaults';
import type {
	Section,
	SectionDrillDimensions,
	SectionRectangleDimensions,
	SectionTriangleDimensions,
	ZoneParameters,
} from './interfaces';

export const calculateSectionMass = (
	section?: Section,
	zoneParameters?: ZoneParameters
): number | undefined => {
	if (!section?.dimensions) return;
	const dimensions = defaults({}, section.dimensions, zoneParameters);

	switch (section.type) {
		case 'rectangle':
			return calculateRectangleMass(dimensions);
		case 'triangle':
			return calculateTriangleMass(dimensions);
		case 'drill':
			return calculateDrillMass(dimensions);
		default:
			return undefined;
	}
};

export const calculateSectionsMass = (
	sections?: Section[],
	zoneParameters?: ZoneParameters
): number | undefined =>
	sections?.reduce<number>((acc, section) => {
		const mass = calculateSectionMass(section, zoneParameters) ?? 0;
		return acc + mass;
	}, 0.0);

export const calculateMass = <T extends { density?: number }>(
	props: T,
	calcAreaFn: (props: Omit<T, 'density'>) => number | undefined
): number | undefined => {
	if (!props || !props.density) return;

	const { density, ...cubeProps } = props;
	const cube = calcAreaFn(cubeProps);
	if (!cube) return;

	return cube * density;
};

//#region Rectangle
export interface CalculateRectangleVolumeProps
	extends Omit<SectionRectangleDimensions, 'density'> {}

export const calculateRectangleVolume = (
	props?: CalculateRectangleVolumeProps
): number | undefined => {
	if (!props) return;
	const { length, width, depth } = props;

	if ([length, width, depth].some((p) => p === undefined)) return;

	return length! * width! * (depth! / 1000);
};

export interface CalculateRectangleMassProps
	extends CalculateRectangleVolumeProps {
	density?: number;
}

export const calculateRectangleMass = (
	props: CalculateRectangleMassProps
): number | undefined => calculateMass(props, calculateRectangleVolume);
//#endregion

//#region Triangle
export interface CalculateTriangleVolumeProps
	extends Omit<SectionTriangleDimensions, 'density'> {}

export const calculateTriangleVolume = (
	props?: CalculateTriangleVolumeProps
): number | undefined => {
	if (!props) return;
	const { a, b, c, depth } = props;

	if ([a, b, c, depth].some((p) => p === undefined)) return;

	// Heron's Formula
	const area =
		0.25 *
		Math.sqrt(
			(a! + b! + c!) * (-a! + b! + c!) * (a! - b! + c!) * (a! + b! - c!)
		);
	return area * (depth! / 1000);
};

export interface CalculateTriangleMassProps
	extends CalculateTriangleVolumeProps {
	density?: number;
}

export const calculateTriangleMass = (
	props: CalculateTriangleMassProps
): number | undefined => calculateMass(props, calculateTriangleVolume);
//#endregion

//#region Drill
export interface CalculateDrillVolumeProps
	extends Omit<SectionDrillDimensions, 'density'> {}

export const calculateDrillVolume = (
	props?: CalculateDrillVolumeProps
): number | undefined => {
	if (!props) return;
	const { diameter, depth, count = 1 } = props;

	if ([diameter, depth].some((p) => p === undefined)) return;

	// a = π r^2
	// v = h π r^2
	const radiusInMeters = diameter! / 1000 / 2;
	const area = Math.PI * Math.pow(radiusInMeters, 2);
	return (depth! / 1000) * area * count;
};

export interface CalculateDrillMassProps extends CalculateDrillVolumeProps {
	density?: number;
}

export const calculateDrillMass = (
	props: CalculateDrillMassProps
): number | undefined => calculateMass(props, calculateDrillVolume);
//#endregion
