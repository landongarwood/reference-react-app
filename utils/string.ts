export const includesLowerCase = (value: string) => /[a-z]/.test(value);

export const includesNumber = (value: string) => /\d/.test(value);

export const includesUpperCase = (value: string) => /[A-Z]/.test(value);

export const isValidEmail = (email?: string) =>
  String(email)
    .trim()
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export const parseJsonString = (params: string | null) => {
  try {
    const parsedCriteriaFromUrl = JSON.parse(params ?? "");
    return parsedCriteriaFromUrl;
  } catch (err) {}
  return null;
};

export const splitNumberAndString = (value: string) =>
  value.match(/[a-zA-Z]+|[0-9]+/g);

export const splitStringWithoutCase = (value: string, splitter: string) => {
  const regex = new RegExp(`(${splitter})`, "i");
  const result = value.split(regex);

  return result;
};
