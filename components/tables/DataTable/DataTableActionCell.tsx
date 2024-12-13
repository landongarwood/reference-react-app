import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Td,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { TABLE_ACTION_COLUMN_WIDTH } from "../../../constants/dataTable";

import { useDataTableContext } from "./DataTableContext";

const DataTableActionCell = <TData extends Record<string, any>>({
  entity,
  onActionMenuOpened,
  onActionMenuClosed,
  isActiveRow,
}: {
  entity: TData;
  onActionMenuOpened: () => void;
  onActionMenuClosed: () => void;
  isActiveRow: boolean;
}) => {
  const { actionColumnItems } = useDataTableContext();

  const visibleActionColumnItems = useMemo(
    () =>
      actionColumnItems?.filter((actionColumnItem) =>
        actionColumnItem.isVisible(entity)
      ) || [],
    [actionColumnItems, entity]
  );

  return (
    <Td
      alignItems="center"
      data-testid="dt-action-cell"
      display="flex"
      justifyContent="center"
      width={TABLE_ACTION_COLUMN_WIDTH}
    >
      {visibleActionColumnItems.length > 0 && (
        <Menu
          data-testid="dt-action-cell-menu"
          onClose={onActionMenuClosed}
          onOpen={onActionMenuOpened}
        >
          <MenuButton
            aria-label="Row Action"
            as={IconButton}
            colorScheme="blue"
            data-testid="dt-action-cell-menu-button"
            icon={
              isActiveRow ? (
                <ChevronUpIcon boxSize={6} />
              ) : (
                <ChevronDownIcon boxSize={6} />
              )
            }
            size="sm"
          />
          <Portal>
            <MenuList>
              {visibleActionColumnItems.map((actionColumnItem, index) => (
                <MenuItem
                  key={index}
                  data-testid={`dt-action-cell-menu-item-${actionColumnItem.label}`}
                  onClick={() => actionColumnItem.onClick?.(entity)}
                >
                  {actionColumnItem.label}
                </MenuItem>
              ))}
            </MenuList>
          </Portal>
        </Menu>
      )}
    </Td>
  );
};

export default DataTableActionCell;
