import {
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import download from "downloadjs";
import { useMemo } from "react";
import { ViewRes } from "../../../api";
import FileCsvSvg from "../../../assets/svgs/file-csv.svg";
import FileExcelSvg from "../../../assets/svgs/file-excel.svg";
import FilePdfSvg from "../../../assets/svgs/file-pdf.svg";
import FileTxtSvg from "../../../assets/svgs/file-txt.svg";
import {
  EXPORT_LISTING_CONTENT_TYPES,
  EXPORT_LISTING_FILE_EXTENSIONS,
  EXPORT_LISTING_LIMITATIONS,
} from "../../../constants/exportListings";
import { useCookiesLive } from "../../../hooks";
import { useExportListing } from "../../../hooks/api/mutations/useExportListing";
import { ExportListingType } from "../../../types";
import { DownloadIcon } from "../../icons";
import { useDataTableContext } from "./DataTableContext";

const ExportButton = ({
  totalElements,
  activeView,
}: {
  totalElements: number;
  activeView?: ViewRes;
}) => {
  const [accountCode] = useCookiesLive(["accountCode"]);
  const { listingName, criteria, additionalColumnId, additionalColumnState } =
    useDataTableContext();

  const { mutate: exportListing, isLoading } = useExportListing();
  const fileName = useMemo(
    () =>
      `${activeView ? activeView.name : listingName}${
        accountCode ? " - " + accountCode : ""
      }`,
    [activeView, listingName, accountCode]
  );
  const visibleAdditionalColumnId = useMemo(
    () =>
      additionalColumnId && additionalColumnState === "subRow"
        ? additionalColumnId
        : null,
    [additionalColumnId, additionalColumnState]
  );
  const formattedCriteria = useMemo(
    () => ({
      ...criteria,
      fields: [
        ...(criteria.fields ?? []).filter(
          (columnId) => columnId !== visibleAdditionalColumnId
        ),
        ...(visibleAdditionalColumnId ? [visibleAdditionalColumnId] : []),
      ],
    }),
    [criteria, visibleAdditionalColumnId]
  );

  const handleExportExcel = async (exportListingType: ExportListingType) => {
    exportListing(
      {
        criteria: JSON.stringify(formattedCriteria),
        exportListingType,
        listingName: listingName ?? "",
      },
      {
        onSuccess: ({ data }) => {
          download(
            data,
            `${fileName}.${EXPORT_LISTING_FILE_EXTENSIONS[exportListingType]}`,
            EXPORT_LISTING_CONTENT_TYPES[exportListingType]
          );
        },
      }
    );
  };

  return (
    <Menu>
      <MenuButton
        aria-label="Download"
        as={IconButton}
        data-testid="dt-controls-download"
        icon={<DownloadIcon />}
        isLoading={isLoading}
      />
      <MenuList>
        {EXPORT_LISTING_LIMITATIONS["excel"] > totalElements && (
          <MenuItem onClick={() => handleExportExcel("excel")}>
            <Image alt="Download Excel" mr="12px" src={FileExcelSvg} />
            <span>Excel</span>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleExportExcel("comma-separated")}>
          <Image alt="Comma-separated" mr="12px" src={FileCsvSvg} />
          <span>Comma-separated</span>
        </MenuItem>
        <MenuItem onClick={() => handleExportExcel("tab-separated")}>
          <Image alt="Tab-separated" mr="12px" src={FileTxtSvg} />
          <span>Tab-separated</span>
        </MenuItem>
        {EXPORT_LISTING_LIMITATIONS["pdf"] > totalElements && (
          <MenuItem onClick={() => handleExportExcel("pdf")}>
            <Image alt="PDF" mr="12px" src={FilePdfSvg} />
            <span>PDF</span>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default ExportButton;
