import {
  Box,
  Button,
  Image,
  Input,
  Link,
  Popover as ChakraPopover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
  useToast,
} from "@chakra-ui/react";
import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useDebouncedCallback } from "use-debounce";
import { AccountSuggestResponseDto } from "../../api";
import { CONNECTION_BRAND } from "../../constants";
import { ACCOUNT_CHANGED_EVENT } from "../../constants/events";
import {
  ACCOUNT_CREDIT_CACHE_COOKIE_NAME,
  SALES_SUMMARY_SELECTED_ACCOUNT_CACHE_COOKIE_NAME,
} from "../../constants/salesSummary";
import { useCookiesLive } from "../../hooks";
import { useAccountSwitch } from "../../hooks/api/mutations";
import { useAccount, useSuggestedAccounts } from "../../hooks/api/queries";
import { useGlobalState } from "../../hooks/store/base";
import { getAppLink } from "../../utils/link";
import { splitStringWithoutCase } from "../../utils/string";
import Popover from "../Popover";
import { SettingsIcon } from "../icons";
import { OverflowTooltip } from "./OverflowTooltip";

const AccountSelector = memo(() => {
  const [, setAccount] = useGlobalState("account");
  const toast = useToast();
  const [, setCookie, removeCookie] = useCookies([
    "accountCode",
    "accountId",
    ACCOUNT_CREDIT_CACHE_COOKIE_NAME,
    SALES_SUMMARY_SELECTED_ACCOUNT_CACHE_COOKIE_NAME,
  ]);
  const [accountCode] = useCookiesLive(["accountCode"]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const {
    isOpen: isInputVisible,
    onOpen: onShowInput,
    onClose: onHideInput,
  } = useDisclosure();

  const {
    isOpen: isAccountDetailOpen,
    onToggle: onAccountDetailToggle,
    onClose: onAccountDetailClose,
  } = useDisclosure();

  const [term, setTerm] = useState("");
  const [selectedAccount, setSelectedAccount] =
    useState<AccountSuggestResponseDto>();
  const [focusedAccount, setFocusedAccount] =
    useState<AccountSuggestResponseDto>();

  const { mutate: switchAccount } = useAccountSwitch();
  const { data: suggestedAccounts } = useSuggestedAccounts(term);
  const { data: accountDetails } = useAccount(
    selectedAccount?.accountCode || accountCode
  );

  const onSwitchToInput = useCallback(() => {
    onShowInput();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [onShowInput]);

  const onChangeTerm = useDebouncedCallback(setTerm, 500);

  useOutsideClick({
    handler: (e) => {
      if (e.target !== inputRef.current) {
        onHideInput();
      }
    },
    ref: listRef,
  });

  const onReset = useCallback(() => {
    switchAccount(null);

    setTerm("");
    onAccountDetailClose();
    setSelectedAccount(undefined);
    setFocusedAccount(undefined);
    onHideInput();
    removeCookie("accountCode");
    removeCookie("accountId");
    removeCookie(SALES_SUMMARY_SELECTED_ACCOUNT_CACHE_COOKIE_NAME);
    removeCookie(ACCOUNT_CREDIT_CACHE_COOKIE_NAME);
    window.dispatchEvent(
      new CustomEvent(ACCOUNT_CHANGED_EVENT, { detail: null })
    );
  }, [onAccountDetailClose, onHideInput, removeCookie, switchAccount]);

  const onAccountSelect = useCallback(
    (account: AccountSuggestResponseDto) => {
      if (account.accountCode) {
        removeCookie(SALES_SUMMARY_SELECTED_ACCOUNT_CACHE_COOKIE_NAME);
        removeCookie(ACCOUNT_CREDIT_CACHE_COOKIE_NAME);
        switchAccount(account.accountCode, {
          onSettled(response, error) {
            if (error || response?.data?.errorMessage) {
              toast({
                description: error
                  ? "Failed to change account."
                  : response?.data?.errorMessage,
                position: "top",
                status: "error",
                variant: "subtle",
              });
              return;
            }

            setSelectedAccount(account);
            setCookie("accountCode", account.accountCode);
            setCookie("accountId", account.accountId);
            window.dispatchEvent(
              new CustomEvent(ACCOUNT_CHANGED_EVENT, {
                detail: account.accountCode,
              })
            );
          },
        });
      }
    },
    [removeCookie, setCookie, switchAccount, toast]
  );

  const onInputKeydown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (suggestedAccounts?.length) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusedAccount((prev) =>
            prev
              ? suggestedAccounts[
                  Math.min(
                    suggestedAccounts.findIndex(
                      (account) => account.accountCode === prev.accountCode
                    ) + 1,
                    suggestedAccounts.length - 1
                  )
                ]
              : suggestedAccounts[0]
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusedAccount((prev) =>
            prev
              ? suggestedAccounts[
                  Math.max(
                    suggestedAccounts.findIndex(
                      (account) => account.accountCode === prev.accountCode
                    ) - 1,
                    0
                  )
                ]
              : suggestedAccounts[suggestedAccounts.length - 1]
          );
        }

        if (e.key === "Escape") {
          onHideInput();
          setFocusedAccount(undefined);
        }

        if (e.key === "Enter" && focusedAccount) {
          onAccountSelect(focusedAccount);
          setFocusedAccount(undefined);
        }
      }
    },
    [focusedAccount, onAccountSelect, onHideInput, suggestedAccounts]
  );

  const accountDetailsName = useMemo(
    () =>
      accountDetails
        ? `(${(accountDetails as any)?.accountCode}) ${
            accountDetails?.companyName
          }`
        : "",
    [accountDetails]
  );

  useEffect(() => {
    setAccount(accountDetails);
  }, [accountDetails, setAccount]);

  return (
    <Box alignItems="center" display="flex">
      <ChakraPopover
        autoFocus={false}
        isOpen={
          isInputVisible && !!suggestedAccounts?.length && !selectedAccount
        }
        placement="bottom-start"
      >
        <PopoverTrigger>
          {accountDetails ? (
            <Box
              data-testid="account-selector-selected-account-logo"
              display="flex"
              flexDir="column"
              gap={2}
            >
              <Box alignItems="center" display="flex" gap="4">
                {accountDetails?.logoUrl ? (
                  <Image
                    height="auto"
                    my={2}
                    src={accountDetails?.logoUrl}
                    width="182px"
                  />
                ) : (
                  <Box
                    alignItems="center"
                    bg="gray.125"
                    color="gray.450"
                    display="flex"
                    fontSize="sm"
                    h="48px"
                    justifyContent="center"
                    my={2}
                    w="182px"
                  >
                    No Logo
                  </Box>
                )}
                {accountDetails?.brand?.name !== CONNECTION_BRAND &&
                  accountDetails?.brand?.printLogoUrl && (
                    <Image
                      height="auto"
                      my={2}
                      src={accountDetails?.brand?.printLogoUrl}
                      width="182px"
                    />
                  )}
              </Box>
              <Box alignItems="center" display="flex" gap="2">
                <OverflowTooltip
                  label={accountDetailsName}
                  placement="bottom-end"
                >
                  <Text
                    data-testid="account-selector-selected-account-name"
                    fontSize="sm"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    w="182px"
                    whiteSpace="nowrap"
                  >
                    {accountDetailsName}
                  </Text>
                </OverflowTooltip>
                <Popover
                  closeOnBlur
                  closeOnEsc
                  bodyElement={
                    <Box px={4} py={6}>
                      <Box display="flex" gap={8} mb={4}>
                        <Text
                          data-testid="account-selector-selected-account-name"
                          fontSize="sm"
                          fontWeight="semibold"
                        >
                          {accountDetailsName}
                        </Text>
                        <Button
                          color="blue.550"
                          colorScheme="blue"
                          data-testid="account-selector-selected-account-clear-btn"
                          fontSize="xs"
                          h="auto"
                          variant="link"
                          onClick={onReset}
                        >
                          CLEAR ACCOUNT
                        </Button>
                      </Box>
                      <Button
                        as={Link}
                        data-testid="account-selector-selected-account-customization"
                        fontSize="sm"
                        h="auto"
                        href={getAppLink("/app/Customization")}
                        variant="unstyled"
                      >
                        Manage Customization Settings
                      </Button>
                    </Box>
                  }
                  bodyProps={{ p: 0 }}
                  contentProps={{
                    _focusVisible: {
                      boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
                      outline: "none",
                    },
                    border: "none",
                    borderBottomRadius: 2,
                    borderTopRadius: 0,
                    boxShadow: "0px 8px 16px rgba(224,226,228, 1)",
                    width: "max-content",
                  }}
                  isOpen={isAccountDetailOpen}
                  placement="bottom-start"
                  triggerElement={
                    <Button
                      data-testid="account-selector-selected-account-edit-btn"
                      h="auto"
                      lineHeight={1}
                      minW={0}
                      variant="unstyled"
                      w="auto"
                      onClick={onAccountDetailToggle}
                    >
                      <SettingsIcon
                        _hover={{ color: "blue.600" }}
                        color="black"
                        cursor="pointer"
                      />
                    </Button>
                  }
                  onClose={onAccountDetailClose}
                />
              </Box>
            </Box>
          ) : isInputVisible ? (
            <Input
              ref={inputRef}
              _placeholder={{
                color: "gray.500",
              }}
              bg="white"
              borderColor="gray.300"
              borderRadius="2px"
              borderWidth="1px"
              color="gray.700"
              data-testid="account-selector-search-input"
              defaultValue={term}
              fontSize="md"
              fontWeight={400}
              height={9}
              px="18px"
              w="182px"
              onChange={(e) => onChangeTerm(e.target.value)}
              onKeyDown={onInputKeydown}
            />
          ) : (
            <Button
              bg="white"
              borderColor="gray.300"
              borderRadius="2px"
              borderWidth="1px"
              color="gray.500"
              data-testid="account-selector-select-btn"
              fontSize="md"
              fontWeight={400}
              h={9}
              px={12}
              w="182px"
              onClick={onSwitchToInput}
            >
              Select Account
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          border="none"
          borderBottomRadius={2}
          borderTopRadius={0}
          boxShadow="0px 8px 16px rgba(224,226,228, 1)"
          width="max-content"
        >
          <PopoverBody
            ref={listRef}
            data-testid="account-selector-accounts-list"
            px={0}
            py={3}
          >
            {suggestedAccounts?.map((row) => (
              <Button
                key={row.accountId}
                bg={
                  row.accountCode === focusedAccount?.accountCode
                    ? "gray.125"
                    : "transparent"
                }
                color="gray.700"
                data-testid={`account-selector-account-${row.accountCode?.toLowerCase()}`}
                display="block"
                fontSize="medium"
                p="2 18"
                textAlign="left"
                variant="unstyled"
                w="full"
                onClick={() => onAccountSelect(row)}
                onMouseEnter={() => setFocusedAccount(row)}
              >
                <Box display="flex" gap="10px" h="24px" w="full">
                  <Box
                    data-testid="account-selector-account-logo"
                    flex="0 1 91px"
                    h="full"
                    w="91px"
                  >
                    {row?.logoUrl ? (
                      <Image height="full" src={row?.logoUrl} width="auto" />
                    ) : (
                      <Box
                        alignItems="center"
                        bg="gray.125"
                        color="gray.450"
                        display="flex"
                        fontSize="sm"
                        h="full"
                        justifyContent="center"
                        w="full"
                      >
                        No Logo
                      </Box>
                    )}
                  </Box>
                  <Box
                    data-testid="account-selector-account-text"
                    flex="1 1 auto"
                  >
                    <Text as="span" fontWeight="semibold">
                      {row.accountCode}:{" "}
                    </Text>
                    {splitStringWithoutCase(row.companyName ?? "", term).map(
                      (value, index) => (
                        <Text
                          key={index}
                          as="span"
                          fontWeight={
                            value.toLowerCase() === term.toLowerCase()
                              ? "normal"
                              : "semibold"
                          }
                        >
                          {value}
                        </Text>
                      )
                    )}
                  </Box>
                </Box>
              </Button>
            ))}
          </PopoverBody>
        </PopoverContent>
      </ChakraPopover>
    </Box>
  );
});

export default AccountSelector;
