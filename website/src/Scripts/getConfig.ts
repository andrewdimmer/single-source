import { Schema } from "../../@Types";
import { parseConfigJson } from "./parseConfigJson";

let schema: Schema | null = null;

export const getConfig = (): Schema => {
  if (!schema) {
    schema = readSchema();
  }
  return schema;
};

const readSchema = (): Schema => {
  const [config, configErrors] = parseConfigJson();
  return {
    config,
    errors: configErrors,
  };
};