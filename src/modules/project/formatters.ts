/**
 * Project Formatters
 */

import defaults from 'lodash-es/defaults';
import type {
	Section,
	SectionDrillDimensions,
	SectionRectangleDimensions,
	SectionTriangleDimensions,
	ZoneParameters,
} from './interfaces';

export const formatSectionDimensions = (
	section: Section,
	zoneParameters?: ZoneParameters
) => {
	const dimensions = defaults({}, section.dimensions, zoneParameters);

	switch (section.type) {
		case 'rectangle':
			return formatSectionRectangleDimensions(dimensions);
		case 'triangle':
			return formatSectionTriangleDimensions(dimensions);
		case 'drill':
			return formatSectionDrillDimensions(dimensions);
		default:
			return '';
	}
};

export const formatSectionRectangleDimensions = (
	dimensions?: SectionRectangleDimensions
): string => {
	if (!dimensions) return '';
	const parts: string[] = [];

	if (dimensions.length !== undefined) parts.push(`${dimensions.length}m`);
	if (dimensions.width !== undefined) parts.push(`${dimensions.width}m`);
	const depthPart =
		dimensions.depth !== undefined ? ` @ ${dimensions.depth}mm` : '';

	return (parts.join(' x ') + depthPart).trim();
};

export const formatSectionTriangleDimensions = (
	dimensions?: SectionTriangleDimensions
): string => {
	if (!dimensions) return '';
	const parts: string[] = [];

	if (dimensions.a !== undefined) parts.push(`${dimensions.a}m`);
	if (dimensions.b !== undefined) parts.push(`${dimensions.b}m`);
	if (dimensions.c !== undefined) parts.push(`${dimensions.c}m`);
	const depthPart =
		dimensions.depth !== undefined ? ` @ ${dimensions.depth}mm` : '';

	return (parts.join(' / ') + depthPart).trim();
};

export const formatSectionDrillDimensions = (
	dimensions?: SectionDrillDimensions
): string => {
	if (!dimensions) return '';
	const { diameter, depth, count = 1 } = dimensions;

	const countPart = count > 1 ? `${count} x` : '';
	const diameterPart = diameter !== undefined ? ` ${diameter}mm` : '';
	const depthPart = depth !== undefined ? ` @ ${depth}mm` : '';

	return (countPart + diameterPart + depthPart).trim();
};

export const formatValue = (
	value?: number,
	postfix: string = '',
	invalid = '-'
): string => {
	if (!value || Number.isNaN(value)) return invalid;
	return `${value.toFixed(2)}${postfix}`;
};

export const formatInvalid = (value?: number, invalid = '-') =>
	!value || Number.isNaN(value) ? invalid : value;
