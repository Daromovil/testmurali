// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  API_URL_Local: "http://localhost:5000/api/",
  API_URL_Azure: "https://vedic-wiki-api.azurewebsites.net/api/",
  API_URL: "https://vedic-wiki-api.azurewebsites.net/api/",
  API_TIME_OUT_IN_SEC: 30,
  ROWS_PER_PAGE: 25,
  DEFAULT_LANG_CODE: "te"
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
