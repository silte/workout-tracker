import { updateUserWorkoutData } from "./integrations/suunto/updateUserWorkoutData";

const init = async () => {
  const customArgs = process.argv.slice(2);
  if (customArgs.length === 0) {
    console.log("Api token is required parameter.\n");
    console.log("Go to https://www.sports-tracker.com/dashboard");
    console.log(
      'And type `prompt("your api token", document.cookie.split(";").find(i => i.substr(0,11) == \'sessionkey=\').substr(11))` to the console to get your api token.'
    );
    process.exit();
  }
  const [apiToken] = customArgs;

  await updateUserWorkoutData(apiToken)
};

init();
