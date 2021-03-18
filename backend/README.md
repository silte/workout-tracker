# Backend for custom app to analyze your Suunto / Sports-tracker workout data

## Fetch your workout data from Suunto / Sports-tracker API

### Get your api token

Open https://www.sports-tracker.com/dashboard and login. After that run following command in developer console (F12) to get your API token.
`prompt("your api token", document.cookie.replaceAll(" ", "").split(";").find(i => typeof i !== "undefined" && i.substr(0,11) == 'sessionkey=').substr(11))`

### Fetch data

Run following command
`npm run update-workout-data YOUR-API-TOKEN`
