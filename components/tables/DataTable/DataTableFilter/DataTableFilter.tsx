import { useDisclosure } from "@chakra-ui/react";
import { Header } from "@tanstack/react-table";
import { memo } from "react";
import { ColumnType } from "../../../../types";
import Popover from "../../../Popover";
import BooleanFilter from "./BooleanFilter";
import DataTableFilterInput from "./DataTableFilterInput";
import DateFilter from "./DateFilter";
import NumberFilter from "./NumberFilter";
import TextFilter from "./TextFilter";

const DataTableFilter = <TData, TValue>({
  header,
}: {
  header: Header<TData, TValue>;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const { meta, id: element } = header.column.columnDef;
  const type = meta as ColumnType;

  const isNumberFilter = [
    "integer",
    "currency",
    "decimal",
    "percentage",
  ].includes(type);

  return (
    <Popover
      closeOnBlur
      closeOnEsc
      bodyElement={
        <>
          {(type === "text" || type === "multiText") && (
            <TextFilter header={header} onClose={onClose} />
          )}
          {type === "boolean" && (
            <BooleanFilter header={header} onClose={onClose} />
          )}
          {type === "date" && <DateFilter header={header} onClose={onClose} />}
          {isNumberFilter && <NumberFilter header={header} onClose={onClose} />}
        </>
      }
      bodyProps={{
        p: 1,
      }}
      bodyTestId={`dt-text-filter-${element}`}
      contentProps={{
        _focusVisible: {
          boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
          outline: "none",
        },
        border: "none",
        boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
        width: type === "date" ? "50rem" : isNumberFilter ? "sm" : "xs",
      }}
      isOpen={isOpen}
      placement="bottom-start"
      returnFocusOnClose={false}
      triggerElement={
        <DataTableFilterInput
          element={element ?? ""}
          type={type}
          onFacetClick={onToggle}
        />
      }
      onClose={onClose}
    />
  );
};

export default memo(DataTableFilter) as typeof DataTableFilter;
