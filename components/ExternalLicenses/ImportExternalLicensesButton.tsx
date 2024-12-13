import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ExternalLicenseDto, ExternalLicenseResourceService } from "../../api";
import { useAppToast, useCookiesLive } from "../../hooks";
import { ImportExternalLicensesStep } from "../../types";
import { ImportIcon } from "../icons";
import {
  Import,
  MapCatalog,
  MapFields,
  SelectFile,
} from "../modals/ImportExternalLicenses";
import {
  ImportExternalLicensesContextProvider,
  useImportExternalLicensesContext,
} from "./ImportExternalLicensesContext";

export const ImportExternalLicensesButton = () => {
  const [importing, setImporting] = useState(false);
  const handleClickImport = () => setImporting(true);
  const handleCancel = () => setImporting(false);
  return (
    <>
      <Button variant="outline" onClick={handleClickImport}>
        <ImportIcon marginRight={2} /> Import
      </Button>
      {importing && (
        <ImportExternalLicensesContextProvider onClose={handleCancel}>
          <ImportExternalLicensesModals />
        </ImportExternalLicensesContextProvider>
      )}
    </>
  );
};

export const ImportExternalLicensesModals = () => {
  const [accountId] = useCookiesLive(["accountId"]);
  const { successToast } = useAppToast();
  const { importStep, onClose } = useImportExternalLicensesContext();

  const handleImport = async (externalLicenses: ExternalLicenseDto[]) => {
    const promises = externalLicenses.map((externalLicense) =>
      ExternalLicenseResourceService.createUsingPost3(
        externalLicense,
        accountId ? parseInt(accountId) : undefined
      )
    );

    Promise.allSettled(promises).then((results) => {
      const fulfilledCount = results.reduce(
        (acc, cur) => acc + (cur.status === "fulfilled" ? 1 : 0),
        0
      );
      onClose();

      successToast(`(${fulfilledCount}) licenses imported successfully.`);
    });
  };

  return (
    <>
      {importStep === ImportExternalLicensesStep.SelectFile && <SelectFile />}
      {importStep === ImportExternalLicensesStep.MapFields && <MapFields />}
      {importStep === ImportExternalLicensesStep.MapCatalog && (
        <MapCatalog onImport={handleImport} />
      )}
      {importStep === ImportExternalLicensesStep.Import && <Import />}
    </>
  );
};
