/**
 * UUID
 */

import { v4 } from 'uuid';
import { useState } from 'react';
export default v4;

export const useUuid = (uuid?: string) => {
	const [id] = useState<string>(uuid ?? v4());
	return id;
};
