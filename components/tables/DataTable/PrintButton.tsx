import { IconButton } from "@chakra-ui/react";
import { useExportListing } from "../../../hooks/api/mutations/useExportListing";
import { PrinterIcon } from "../../icons";
import { useDataTableContext } from "./DataTableContext";

const PrintButton = () => {
  const { listingName, criteria } = useDataTableContext();

  const { mutate: exportListing, isLoading } = useExportListing();

  const handleClick = async () => {
    exportListing(
      {
        criteria: JSON.stringify(criteria),
        exportListingType: "pdf",
        listingName: listingName ?? "",
      },
      {
        onSuccess: ({ data }) => {
          const blob = new Blob([data], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const newTab = window.open(url, "_blank");

          if (newTab) {
            newTab.onload = () => {
              newTab.document.title = "Print";
              newTab.print();
            };
          }
        },
      }
    );
  };

  return (
    <IconButton
      aria-label="Print"
      data-testid="dt-controls-print"
      icon={<PrinterIcon />}
      isLoading={isLoading}
      onClick={handleClick}
    />
  );
};

export default PrintButton;
