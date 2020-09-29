/**
 * Calculator Helpers
 */

import { defaultsDeep } from 'lodash-es';
import { uuid } from '@/lib/uuid';
import {
	AreaState,
	SectionState,
	SectionValuesState,
} from '@/modules/project/modules/calculators/area/interfaces';

export const getSectionValues = (
	props: Partial<SectionValuesState> = {}
): SectionState =>
	defaultsDeep({}, props, {
		length: '',
		width: '',
		depth: '',
		cube: '',
	});

export const getSectionState = (
	props: Partial<SectionState> = {}
): SectionState =>
	defaultsDeep({}, props, {
		id: uuid(),
		label: '',
		values: getSectionValues(),
	});

export const getAreaState = (props: Partial<SectionState> = {}): AreaState =>
	defaultsDeep({}, props, {
		id: uuid(),
		name: 'Area',
		sections: [getSectionState()],
	});

export const calculateSection = (values: SectionValuesState): number | null => {
	const { length, width, depth, cube } = values;
	const quickCheck = [length, width, depth, cube];

	if (quickCheck.some((v) => v === '' || Number.isNaN(parseFloat(v))))
		return null;

	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	return (
		Number.parseFloat(length!) *
		Number.parseFloat(width!) *
		(Number.parseFloat(depth!) / 1000) *
		Number.parseFloat(cube!)
	);
	/* eslint-enable @typescript-eslint/no-non-null-assertion */
};

export const calculateArea = ({
	sections,
}: {
	sections: SectionState[];
}): number =>
	sections.reduce(
		(acc, curr) => acc + (calculateSection(curr.values) ?? 0.0),
		0.0
	);

export const formatCalculationSection = (
	values: SectionValuesState,
	decimals = 2,
	nullOutput = '-'
): string => {
	const calc = calculateSection(values);
	if (calc === null) return nullOutput;
	return `${calc.toFixed(decimals)}t`;
};
