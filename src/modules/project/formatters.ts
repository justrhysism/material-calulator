/**
 * Project Formatters
 */

import {
	Section,
	SectionDrillDimensions,
	SectionRectangleDimensions,
	SectionTriangleDimensions,
} from './interfaces';

export const formatSectionDimensions = (
	section: Section,
	includeType?: boolean
) => {
	switch (section.type) {
		case 'rectangle':
			return formatSectionRectangleDimensions(section.dimensions, includeType);
		case 'triangle':
			return formatSectionTriangleDimensions(section.dimensions, includeType);
		case 'drill':
			return formatSectionDrillDimensions(section.dimensions, includeType);
		default:
			return '';
	}
};

export const formatSectionRectangleDimensions = (
	dimensions?: SectionRectangleDimensions,
	includeType?: boolean
): string => {
	if (!dimensions) return '';
	const parts: string[] = [];

	if (dimensions.length !== undefined) parts.push(`${dimensions.length}m`);
	if (dimensions.width !== undefined) parts.push(`${dimensions.width}m`);
	const depthPart =
		dimensions.depth !== undefined ? ` @ ${dimensions.depth}mm` : '';

	const typePrefix = includeType ? 'Rect: ' : '';
	return (typePrefix + parts.join(' x ') + depthPart).trim();
};

export const formatSectionTriangleDimensions = (
	dimensions?: SectionTriangleDimensions,
	includeType?: boolean
): string => {
	if (!dimensions) return '';
	const parts: string[] = [];

	if (dimensions.a !== undefined) parts.push(`${dimensions.a}m`);
	if (dimensions.b !== undefined) parts.push(`${dimensions.b}m`);
	if (dimensions.c !== undefined) parts.push(`${dimensions.c}m`);
	const depthPart =
		dimensions.depth !== undefined ? ` @ ${dimensions.depth}mm` : '';

	const typePrefix = includeType ? 'Tri: ' : '';
	return (typePrefix + parts.join(' / ') + depthPart).trim();
};

export const formatSectionDrillDimensions = (
	dimensions?: SectionDrillDimensions,
	includeType?: boolean
): string => {
	if (!dimensions) return '';
	const { diameter, depth, count = 1 } = dimensions;

	const countPart = count > 1 ? `${count} x` : '';
	const diameterPart = diameter !== undefined ? ` ${diameter}mm` : '';
	const depthPart = depth !== undefined ? ` @ ${depth}mm` : '';

	const typePrefix = includeType ? 'Drill: ' : '';
	return (typePrefix + countPart + diameterPart + depthPart).trim();
};

export const formatValue = (
	value?: number,
	postfix?: string,
	invalid = '-'
): string => {
	if (!value || Number.isNaN(value)) return invalid;
	return `${value.toFixed(2)}${postfix}`;
};
