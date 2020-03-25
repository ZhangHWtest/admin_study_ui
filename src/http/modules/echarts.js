import { reques } from "../axios";

export const getjson = url => {
  return reques({
    url
  });
};
