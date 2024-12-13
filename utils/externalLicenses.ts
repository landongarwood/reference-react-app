import csvToJson from "csvtojson";
import { format } from "date-fns";
import { type ExpirationDto, ExternalLicenseDto } from "../api";
import {
  ImportExternalLicensesColumnDef,
  ImportExternalLicensesFileRecord,
} from "../types";

const getDateValue = (
  record: ImportExternalLicensesFileRecord,
  index: number | undefined | null
): string | undefined => {
  const value = record?.[index ?? -2];
  if (!value) {
    return undefined;
  }

  return format(new Date(value), "yyyy-MM-dd");
};
export const generateExternalResourceEntity = (
  columnMapping: Record<string, number | null>,
  record: ImportExternalLicensesFileRecord
): ExternalLicenseDto => ({
  endUser: {
    companyName: getStringValue(record, columnMapping.companyName),
    email: getStringValue(record, columnMapping.email),
    name: getStringValue(record, columnMapping.name),
    phone: getStringValue(record, columnMapping.phone),
  },
  expirations: getExpirations(columnMapping, record),
  licenseKey: getStringValue(record, columnMapping.licenseKey),
  manufacturer: getStringValue(record, columnMapping.manufacturer),
  manufacturerPart: getStringValue(record, columnMapping.manufacturerPart),
  notes: getStringValue(record, columnMapping.notes),
  quantity: getNumberValue(record, columnMapping.quantity),
  reference: getStringValue(record, columnMapping.reference),
});

const getExpirations = (
  columnMapping: Record<string, number | null>,
  record: ImportExternalLicensesFileRecord
): Array<ExpirationDto> | undefined => {
  const type = getStringValue(record, columnMapping.expirationType);
  const date = getDateValue(record, columnMapping.expirationDate);

  if (type && date) {
    return [
      {
        date,
        type,
      },
    ];
  }

  return undefined;
};
const getStringValue = (
  record: ImportExternalLicensesFileRecord,
  index: number | undefined | null
): string | undefined => {
  const value = record?.[index ?? -2];
  if (value === undefined || value === null) {
    return undefined;
  }

  return String(value);
};
const getNumberValue = (
  record: ImportExternalLicensesFileRecord,
  index: number | undefined | null
): number | undefined => {
  const stringValue = getStringValue(record, index);

  return stringValue !== undefined
    ? parseFloat(stringValue as string)
    : undefined;
};

export const guessColumnIndex = (
  columnDef: ImportExternalLicensesColumnDef,
  fileColumnNames: string[]
): number | null => {
  const suggestions = [
    columnDef.name,
    columnDef.label,
    ...columnDef.suggestions,
  ].map((name) => name.toLowerCase());

  const columnIndex = fileColumnNames.findIndex((fileColumName) =>
    suggestions.includes(fileColumName.toLowerCase())
  );

  return columnIndex < 0 ? null : columnIndex;
};

export const readCsvFile = async (file: File) =>
  new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const records = await csvToJson({ noheader: true }).fromString(
          (event.target?.result ?? "") as string
        );
        resolve(records.map((record) => Object.values(record)));
      } catch (error) {
        reject("Error parsing CSV: " + error);
      }
    };

    reader.onerror = () => {
      reject("Error reading file");
    };

    reader.readAsText(file);
  });
