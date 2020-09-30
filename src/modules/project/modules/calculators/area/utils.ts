/**
 * Calculator Helpers
 */

import { defaultsDeep } from 'lodash-es';
import { uuid } from '@/lib/uuid';
import {
	AreaState,
	SectionState,
	SectionSquareValuesState,
	SectionRoundValuesState,
} from '@/modules/project/modules/calculators/area/interfaces';

export const getSquareSectionState = (
	props: Partial<SectionSquareValuesState> = {}
) =>
	defaultsDeep({}, props, {
		length: undefined,
		width: undefined,
		depth: undefined,
		density: 2.3,
	});

export const getRoundSectionState = (
	props: Partial<SectionRoundValuesState> = {}
) =>
	defaultsDeep({}, props, {
		quantity: 1,
		diameter: undefined,
		depth: undefined,
		density: 2.3,
	});

export const getSectionState = (
	props: Partial<SectionState> = {}
): SectionState =>
	defaultsDeep({}, props, {
		id: uuid(),
		label: '',
		type: 'square',
		values: getSquareSectionState(),
	});

export const getAreaState = (props: Partial<SectionState> = {}): AreaState =>
	defaultsDeep({}, props, {
		id: uuid(),
		name: 'Area',
		sections: [getSectionState()],
	});

export const calculateSectionSquare = (
	values: Partial<SectionSquareValuesState>
): number | null => {
	const { length, width, depth, density } = values;
	const quickCheck = [length, width, depth, density];
	if (quickCheck.some((v) => v === undefined || Number.isNaN(v))) return null;

	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	return length! * width! * (depth! / 1000) * density!;
	/* eslint-enable @typescript-eslint/no-non-null-assertion */
};

export const calculateSectionRound = (
	values: Partial<SectionRoundValuesState>
): number | null => {
	const { quantity, diameter, depth, density } = values;
	const quickCheck = [quantity, diameter, depth, density];
	if (quickCheck.some((v) => v === undefined || Number.isNaN(v))) return null;

	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	const cylinder =
		(depth! / 1000) * Math.PI * Math.pow(diameter! / 1000 / 2, 2);
	return quantity! * cylinder * density!;
	/* eslint-enable @typescript-eslint/no-non-null-assertion */
};

export const calculateArea = ({
	sections,
}: {
	sections: SectionState[];
}): number =>
	sections.reduce(
		(acc, curr) => acc + (calculateSectionSquare(curr.values) ?? 0.0),
		0.0
	);

export const formatCalculationSection = <T extends Record<string, unknown>>(
	predicate: (values: T) => number | null,
	values?: T,
	decimals = 2,
	nullOutput = '-'
) => {
	if (!values) return nullOutput;
	const calc = predicate(values);
	if (calc === null) return nullOutput;
	return `${calc.toFixed(decimals)}t`;
};

export const formatCalculationSectionSquare = (
	values?: Partial<SectionSquareValuesState>,
	decimals = 2,
	nullOutput = '-'
): string =>
	formatCalculationSection(
		calculateSectionSquare,
		values,
		decimals,
		nullOutput
	);

export const formatCalculationSectionRound = (
	values?: Partial<SectionRoundValuesState>,
	decimals = 2,
	nullOutput = '-'
): string =>
	formatCalculationSection(calculateSectionRound, values, decimals, nullOutput);
