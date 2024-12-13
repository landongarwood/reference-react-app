import { Box, Button, Link } from "@chakra-ui/react";
import {
  ControlledMenu,
  MenuItem,
  SubMenu,
  useMenuState,
} from "@szhsin/react-menu";
import { kebabCase } from "lodash";
import { memo, useCallback, useRef } from "react";
import { MenuItem as MenuItemType } from "../../constants/header";
import { getAppLink } from "../../utils/link";

const NavigationMenu = memo(
  ({ buttonText, items }: { buttonText: string; items: MenuItemType[] }) => {
    const ref = useRef(null);
    const [menuProps, toggleMenu] = useMenuState({ transition: true });

    const renderMenuItem = useCallback(
      (item: MenuItemType) =>
        item.children ? (
          <SubMenu key={item.key ?? item.name} label={item.name}>
            {item.children.map(renderMenuItem)}
          </SubMenu>
        ) : (
          <MenuItem key={item.key ?? item.name}>
            <Link
              data-testid={`navigation-link-${kebabCase(item.name)}`}
              href={getAppLink(item.path ?? "/")}
            >
              {item.name}
            </Link>
          </MenuItem>
        ),
      []
    );

    return (
      <Box
        data-testid={`navigation-link-menu-${kebabCase(buttonText)}`}
        onPointerLeave={() => toggleMenu(false)}
      >
        <Button
          ref={ref}
          variant="navigation-menu"
          onPointerEnter={() => toggleMenu(true)}
        >
          {buttonText}
        </Button>

        <ControlledMenu
          {...menuProps}
          anchorRef={ref}
          onClose={() => toggleMenu(false)}
        >
          {items.map(renderMenuItem)}
        </ControlledMenu>
      </Box>
    );
  }
);

export default NavigationMenu;
