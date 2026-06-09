//export const baseUrl = "https://back-end-with-odata-btp-triumphant-hyrax-wg.cfapps.us10-001.hana.ondemand.com";

const env = 'dev';
export const baseUrl = env === 'dev' ? "" : "https://back-end-with-odata-btp-triumphant-hyrax-wg.cfapps.us10-001.hana.ondemand.com"