/**
 * Application Settings
 */

import { atom } from 'recoil';
import { DarkModeSetting } from '../enums';

// TODO: Extract
const storageValue = <T extends string = string>(
	key: string,
	defaultValue: T
) => window.localStorage.getItem(key) ?? defaultValue;

const storageNumber = <T extends number = number>(
	key: string,
	defaultValue: T
) => {
	const value = window.localStorage.getItem(key);
	if (value === null) return defaultValue;

	const parsed = Number.parseFloat(value);
	if (Number.isNaN(parsed)) return defaultValue;
	return parsed;
};

export const APP_SETTING_TRUCK_CAPACITY = 'appTruckCapacity';
export const APP_SETTING_DENSITY = 'appDensity';
export const APP_SETTING_DARK_MODE = 'appDarkMode';

// TODO: Create hook which syncs atoms and Storage

export const appSettingTruckCapacity = atom({
	key: APP_SETTING_TRUCK_CAPACITY,
	default: storageNumber(APP_SETTING_TRUCK_CAPACITY, 12),
});

export const appSettingDensity = atom({
	key: APP_SETTING_DENSITY,
	default: storageNumber(APP_SETTING_DENSITY, 2.3),
});

export const appSettingDarkMode = atom<DarkModeSetting>({
	key: APP_SETTING_DARK_MODE,
	default: storageValue(
		APP_SETTING_DARK_MODE,
		DarkModeSetting.AUTO
	) as DarkModeSetting,
});
