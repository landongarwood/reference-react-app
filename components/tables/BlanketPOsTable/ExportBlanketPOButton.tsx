import {
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import download from "downloadjs";
import FileCsvSvg from "../../../assets/svgs/file-csv.svg";
import FileExcelSvg from "../../../assets/svgs/file-excel.svg";
import FilePdfSvg from "../../../assets/svgs/file-pdf.svg";
import FileTxtSvg from "../../../assets/svgs/file-txt.svg";
import {
  EXPORT_LISTING_CONTENT_TYPES,
  EXPORT_LISTING_FILE_EXTENSIONS,
} from "../../../constants/exportListings";
import { useCookiesLive } from "../../../hooks";
import { useExportBlanketPos } from "../../../hooks/api/mutations";
import { ExportListingType } from "../../../types";
import { DownloadIcon } from "../../icons";

const ExportBlanketPOButton = () => {
  const [accountId] = useCookiesLive(["accountId"]);

  const { mutate: exportListing, isLoading } = useExportBlanketPos();

  if (!accountId) {
    return null;
  }

  const handleExportExcel = async (exportListingType: ExportListingType) => {
    exportListing(
      {
        accountId: +accountId,
        exportListingType,
      },
      {
        onSuccess: ({ data }) => {
          download(
            data,
            `BlanketPos.${EXPORT_LISTING_FILE_EXTENSIONS[exportListingType]}`,
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
        <MenuItem onClick={() => handleExportExcel("excel")}>
          <Image alt="Download Excel" mr="12px" src={FileExcelSvg} />
          <span>Excel</span>
        </MenuItem>
        <MenuItem onClick={() => handleExportExcel("comma-separated")}>
          <Image alt="Comma-separated" mr="12px" src={FileCsvSvg} />
          <span>Comma-separated</span>
        </MenuItem>
        <MenuItem onClick={() => handleExportExcel("tab-separated")}>
          <Image alt="Tab-separated" mr="12px" src={FileTxtSvg} />
          <span>Tab-separated</span>
        </MenuItem>
        <MenuItem onClick={() => handleExportExcel("pdf")}>
          <Image alt="PDF" mr="12px" src={FilePdfSvg} />
          <span>PDF</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ExportBlanketPOButton;
