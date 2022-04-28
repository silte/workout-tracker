import {
  addFetchMessageRow,
  setFetchMessage,
} from "../../services/suunto-api-info-service";

export const expandSuuntoEventlog = async (
  userId: string,
  logMessage: string,
  additionalConsoleMessage = ""
): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(logMessage, additionalConsoleMessage);
  await addFetchMessageRow(userId, logMessage);
};

export const setSuuntoEventlog = async (
  userId: string,
  logMessage: string,
  additionalConsoleMessage = ""
): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(logMessage, additionalConsoleMessage);
  await setFetchMessage(userId, logMessage);
};
