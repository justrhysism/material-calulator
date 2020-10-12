/**
 * Common Interfaces
 */

export interface ModelForm<T extends object> {
	value?: T;
	onChange?: (value: T) => void;
}
