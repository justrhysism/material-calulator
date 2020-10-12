/**
 * useAmbientLightSensor Hook
 */

import { useCallback, useEffect, useState } from 'react';
import { hasAmbientLightSensor } from '../detects';

const useAmbientLightSensor = (enabled?: boolean) => {
	const [state, setState] = useState();

	const listener = useCallback(
		(value) => {
			setState(value);
		},
		[setState]
	);

	useEffect(() => {
		if (!hasAmbientLightSensor() || !enabled) return;
		// @ts-ignore
		const sensor = new AmbientLightSensor();
		sensor.onreading = () => {
			console.log('Current light level:', sensor.illuminance);
			listener(sensor.illuminance);
		};

		sensor.onerror = (event: any) => {
			console.log(event.error.name, event.error.message);
		};

		sensor.start();
		return () => sensor.stop();
	}, [listener, enabled]);

	return state;
};

export default useAmbientLightSensor;
