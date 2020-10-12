/**
 * Handler Utilities
 */

interface HandleFieldChangeOptions {
	type?: 'string' | 'number' | 'date';
}

export const handleFieldChange = <T>(
	field: keyof T,
	value: T,
	onChange?: (value: T) => void,
	options?: HandleFieldChangeOptions
) => (event: React.ChangeEvent<HTMLInputElement>) =>
	onChange?.({
		...value,
		[field]: (() => {
			switch (options?.type) {
				case 'number':
					const input = event.target.valueAsNumber;
					return Number.isNaN(input) ? undefined : input;
				case 'date':
					return event.target.valueAsDate;
				default:
					return event.target.value;
			}
		})(),
	});
