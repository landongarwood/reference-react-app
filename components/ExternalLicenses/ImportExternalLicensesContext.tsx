import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ExternalLicenseDto } from "../../api";
import {
  ImportExternalLicensesFileRecord,
  ImportExternalLicensesStep,
} from "../../types";

type ContextState = {
  importStep: ImportExternalLicensesStep;
  setImportStep: Dispatch<SetStateAction<ImportExternalLicensesStep>>;
  fileRecords: ImportExternalLicensesFileRecord[];
  setFileRecords: Dispatch<SetStateAction<ImportExternalLicensesFileRecord[]>>;
  externalLicenses: ExternalLicenseDto[];
  setExternalLicenses: Dispatch<SetStateAction<ExternalLicenseDto[]>>;
  onClose: () => void;
};

const ImportExternalLicensesContext = createContext<ContextState>({
  externalLicenses: [],
  fileRecords: [],
  importStep: ImportExternalLicensesStep.SelectFile,
  onClose: () => {},
  setExternalLicenses: () => {},
  setFileRecords: () => {},
  setImportStep: () => {},
});

interface ImportExternalLicensesContextProviderProps {
  children: ReactNode;
  onClose: () => void;
}

export const ImportExternalLicensesContextProvider = ({
  children,
  onClose,
}: ImportExternalLicensesContextProviderProps) => {
  const [importStep, setImportStep] = useState(
    ImportExternalLicensesStep.SelectFile
  );
  const [fileRecords, setFileRecords] = useState<
    ImportExternalLicensesFileRecord[]
  >([]);
  const [externalLicenses, setExternalLicenses] = useState<
    ExternalLicenseDto[]
  >([]);

  return (
    <ImportExternalLicensesContext.Provider
      value={{
        externalLicenses,
        fileRecords,
        importStep,
        onClose,
        setExternalLicenses,
        setFileRecords,
        setImportStep,
      }}
    >
      {children}
    </ImportExternalLicensesContext.Provider>
  );
};

export const useImportExternalLicensesContext = () => {
  return useContext<ContextState>(ImportExternalLicensesContext);
};
