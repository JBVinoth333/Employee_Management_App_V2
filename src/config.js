const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const BASE_URL = configuredBaseUrl && configuredBaseUrl !== 'undefined'
	? configuredBaseUrl.replace(/\/$/, '')
	: '';
