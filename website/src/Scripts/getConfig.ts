import { Schema } from "../../@Types";
import { parseConfigJson } from "./parseConfigJson";
import { parseEventsJson } from "./parseEventsJson";
import { parseLinksJson } from "./parseLinksJson";
import { parsePrizesJson } from "./parsePrizesJson";
import { parseResourcesJson } from "./parseResourcesJson";
import { parseStagesJson } from "./parseStagesJson";

let schema: Schema | null = null;

export const getConfig = (): Schema => {
  if (!schema) {
    schema = readSchema();
  }
  return schema;
};

const readSchema = (): Schema => {
  const [config, configErrors] = parseConfigJson();
  const [stages, stageErrors] = parseStagesJson(config.timeZoneOffset);
  const [events, eventErrors] = parseEventsJson(config.timeZoneOffset);
  const [prizes, prizeErrors] = parsePrizesJson();
  const [resources, resourceErrors] = parseResourcesJson();
  const [links, linkErrors] = parseLinksJson();
  return {
    config,
    stages,
    events,
    prizes,
    resources,
    links,
    errors: configErrors.concat(
      stageErrors,
      eventErrors,
      prizeErrors,
      resourceErrors,
      linkErrors
    ),
  };
};
