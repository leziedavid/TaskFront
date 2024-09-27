// baseUrl.ts

const BASE_URL_DEV = 'http://localhost:8090/api/v1';
const BASE_URL_PROD = 'https://backend.covoitivoire.com/api/v1';

export const getBaseUrl = (): string => {
    return BASE_URL_DEV;
};
