export type ImportExternalLicensesColumnDef = {
  label: string;
  name: string;
  required: boolean;
  suggestions: string[];
};
export type ImportExternalLicensesFileRecord = Array<string | number | Date>;
export enum ImportExternalLicensesStep {
  SelectFile = "SelectFile",
  MapFields = "MapFields",
  MapCatalog = "MapCatalog",
  Import = "Import",
}
