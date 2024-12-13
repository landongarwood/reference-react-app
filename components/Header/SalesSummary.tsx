import { Box, Flex, Link, Text, useDisclosure } from "@chakra-ui/react";
import { isNumber, kebabCase } from "lodash";
import { memo, useMemo } from "react";
import { useCookiesLive } from "../../hooks";
import { useAccountCredit, useSalesSummary } from "../../hooks/api/queries";
import { buildLegacyCriteriaUrl } from "../../utils/criteria";
import { getAppLink } from "../../utils/link";
import {
  convertNumberToCurrencyFormat,
  convertNumberToPercentFormat,
} from "../../utils/number";
import Popover from "../Popover";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon,
  GraphUpIcon,
} from "../icons";

const SalesSummary = memo(() => {
  const [accountCode, accountId] = useCookiesLive(["accountCode", "accountId"]);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    data: salesSummary,
    startDate: salesSummaryStartDate,
    endDate: salesSummaryEndDate,
    isFetching: isFetchingSalesSummary,
  } = useSalesSummary(accountId ? +accountId : undefined);
  const { data: accountCredit, isFetching: isFetchingAccountCredit } =
    useAccountCredit(accountCode);
  const qtdStats = [
    {
      link: `${getAppLink("/app/OrderManagement")}?${buildLegacyCriteriaUrl({
        orderDate: {
          end: salesSummaryEndDate,
          start: salesSummaryStartDate,
        },
        repDisplay: ["Over shipped", "Partially Shipped", "Pending", "Shipped"],
      })}`,
      title: "QTD Booked",
      value: convertNumberToCurrencyFormat(salesSummary?.totalOrdersBooked),
    },
    {
      link: `${getAppLink("/app/Invoice")}?${buildLegacyCriteriaUrl({
        invoiceDate: {
          end: salesSummaryEndDate,
          start: salesSummaryStartDate,
        },
      })}`,
      title: "QTD Invoiced",
      value: convertNumberToCurrencyFormat(salesSummary?.totalInvoiced),
    },
    ...(isNumber(salesSummary?.repGpPercent)
      ? [
          {
            link: `${getAppLink("/app/Invoice")}?${buildLegacyCriteriaUrl({
              invoiceDate: {
                end: salesSummaryEndDate,
                start: salesSummaryStartDate,
              },
            })}`,
            title: "QTD GP%",
            value: convertNumberToPercentFormat(salesSummary?.repGpPercent),
          },
        ]
      : []),
    {
      link: `${getAppLink("/app/Invoice")}?${buildLegacyCriteriaUrl({
        balance: { end: "", start: "0.01" },
        dueDate: { end: "yesterday", start: "" },
      })}`,
      title: "Overdue AR",
      value: convertNumberToCurrencyFormat(salesSummary?.overdueArBalance),
    },
  ];

  const creditStats = [
    {
      title: "Payment Terms",
      value: `${accountCredit?.paymentTerms}`,
    },
    {
      title: "Credit Limit",
      value: `$${Math.round(accountCredit?.creditLimit ?? 0).toLocaleString()}`,
    },
    {
      title: "AR Balance",
      value: `$${Math.round(accountCredit?.arBalance ?? 0).toLocaleString()}`,
    },
  ];

  const isCreditLessThanTwoAvgDaysOfOrders = useMemo(() => {
    if (salesSummary && "avgDailySales" in salesSummary && accountCredit) {
      const avgDailySales = salesSummary.avgDailySales;
      const availableCredit = accountCredit.availableCredit;
      if (isNumber(avgDailySales) && isNumber(availableCredit)) {
        return availableCredit < 5 * avgDailySales;
      }
    }
    return false;
  }, [accountCredit, salesSummary]);

  const isCreditLessThanTotalOfRepHoldOrders = useMemo(() => {
    if (salesSummary && "repHoldOrderTotal" in salesSummary && accountCredit) {
      const repHoldOrderTotal = salesSummary.repHoldOrderTotal;
      const availableCredit = accountCredit.availableCredit;
      if (isNumber(repHoldOrderTotal) && isNumber(availableCredit)) {
        return availableCredit < repHoldOrderTotal;
      }
    }
    return false;
  }, [accountCredit, salesSummary]);

  const isLowCredit =
    isCreditLessThanTwoAvgDaysOfOrders || isCreditLessThanTotalOfRepHoldOrders;

  return salesSummary && !isFetchingSalesSummary ? (
    <Popover
      closeOnBlur
      closeOnEsc
      bodyElement={
        <>
          <Flex
            bg="gray.75"
            borderRadius="0.625rem"
            data-testid="sales-summary-data"
            py={6}
          >
            {qtdStats.map((stat) => (
              <Link
                key={`${stat.value}-${stat.title}`}
                data-testid={`sales-summary-${kebabCase(stat.title)}`}
                href={stat.link}
              >
                <Box color="gray.700" px={3.5} textAlign="center">
                  <Text fontSize="1.3125rem" fontWeight="medium" mb="1.5">
                    {stat.value}
                  </Text>
                  <Text fontSize="xs" whiteSpace="nowrap">
                    {stat.title}
                  </Text>
                </Box>
              </Link>
            ))}
          </Flex>

          {accountCredit && !isFetchingAccountCredit && (
            <Flex
              bg="gray.75"
              borderRadius="0.625rem"
              data-testid="sales-summary-credit-info"
              py={6}
            >
              {creditStats.map((stat) => (
                <Box
                  key={`${stat.value}-${stat.title}`}
                  color="gray.700"
                  display="flex"
                  flex="1"
                  justifyContent="center"
                >
                  <Box display="inline-block">
                    <Text fontSize="sm" mb="2.5" whiteSpace="nowrap">
                      {stat.title}
                    </Text>
                    <Text fontSize="xl">{stat.value}</Text>
                  </Box>
                </Box>
              ))}
            </Flex>
          )}

          {accountCredit && !isFetchingAccountCredit && (
            <Flex
              alignItems="center"
              bg={isLowCredit ? "yellow.50" : "green.600"}
              borderRadius="0.625rem"
              data-testid="sales-summary-available-credit"
              gap={10}
              justifyContent="center"
              px={4}
              py={6}
            >
              <Text fontSize="lg" textAlign="center" whiteSpace="nowrap">
                Available Credit
              </Text>
              <Text fontSize="2xl" fontWeight="medium">
                {`$${Math.round(
                  accountCredit?.availableCredit ?? 0
                ).toLocaleString()}`}
              </Text>
            </Flex>
          )}

          {isLowCredit && (
            <Flex
              alignItems="center"
              bg="yellow.50"
              borderLeft="2px"
              borderLeftColor="yellow.100"
              borderRadius="sm"
              gap={1.5}
              justifyContent="center"
              px={4}
              py={22}
            >
              <ExclamationTriangleIcon color="yellow.100" />
              <Text fontSize="xs">
                {isCreditLessThanTwoAvgDaysOfOrders
                  ? "Available credit is less than five average days of orders"
                  : "Available credit is less than the total of rep-hold orders"}
              </Text>
            </Flex>
          )}
        </>
      }
      bodyProps={{
        color: "gray.700",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem",
        padding: 3,
      }}
      contentProps={{
        _focusVisible: {
          boxShadow: "1px 4px 16px rgba(191,191,191, 1)",
          outline: "none",
        },
        border: "none",
        borderBottomRadius: 2,
        borderTopRadius: 0,
        boxShadow: "1px 4px 16px rgba(191,191,191, 1)",
        width: "auto",
      }}
      isOpen={isOpen}
      placement="bottom-end"
      returnFocusOnClose={false}
      triggerElement={
        <Box
          _hover={{
            bg: isOpen
              ? isLowCredit
                ? "yellow.300"
                : "blue.600"
              : isLowCredit
              ? "yellow.100"
              : "blue.500",
          }}
          bg={
            isOpen
              ? isLowCredit
                ? "yellow.300"
                : "blue.600"
              : isLowCredit
              ? "yellow.100"
              : "blue.700"
          }
          borderColor={isLowCredit ? "yellow.100" : "blue.800"}
          borderRadius={2}
          borderWidth={1}
          color="white"
          cursor="pointer"
          data-testid="sales-summary-btn"
          display="inline-flex"
          fontSize="sm"
          fontWeight="medium"
          gap={2.5}
          h="auto"
          lineHeight={1}
          position="relative"
          onClick={onToggle}
        >
          <Box
            alignItems="center"
            display="inline-flex"
            gap={2.5}
            h="full"
            justifyContent="space-between"
            left="0"
            opacity={isOpen ? 1 : 0}
            paddingX={2}
            paddingY={1.5}
            position="absolute"
            top="0"
            w="full"
          >
            <GraphUpIcon />
            {isLowCredit ? (
              "Warning: Low Credit"
            ) : accountCode ? (
              <>{accountCode.toUpperCase()}&nbsp; Sales & Credit Info</>
            ) : (
              <>Sales Info</>
            )}
            <ArrowUpIcon />
          </Box>

          <Box
            display="inline-flex"
            gap={2.5}
            opacity={isOpen ? 0 : 1}
            paddingX={2}
            paddingY={1.5}
          >
            <GraphUpIcon />
            {isLowCredit ? (
              "Warning: Low Credit"
            ) : (
              <>
                QTD Invoiced:&nbsp;
                {convertNumberToCurrencyFormat(salesSummary.totalInvoiced)}
                &nbsp;&nbsp;|&nbsp;&nbsp;Overdue&nbsp;AR:&nbsp;
                {convertNumberToCurrencyFormat(salesSummary.overdueArBalance)}
              </>
            )}

            <ArrowDownIcon />
          </Box>
        </Box>
      }
      onClose={onClose}
    />
  ) : null;
});

export default SalesSummary;
