import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { isNumber } from "lodash";
import { memo, useCallback, useEffect, useRef } from "react";
import { AccountSalesSummaryDto } from "../../api";
import { TABLE_ROW_HEIGHT } from "../../constants/dataTable";
import { SALES_SUMMARY_ACCOUNTS_PAGE_SIZE } from "../../constants/salesSummary";
import { useAccountSwitch } from "../../hooks/api/mutations";
import { useInfiniteTransactionsSalesSummary } from "../../hooks/api/queries/useInfiniteTransactionsSalesSummary";
import { formatCurrency } from "../../utils/currency";
import { convertNumberToPercentFormat } from "../../utils/number";

const AccountTransactionsTable = memo(() => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteTransactionsSalesSummary();
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const { mutate: switchAccount } = useAccountSwitch();

  const accounts =
    data?.pages.flatMap((page) =>
      (page.accounts ?? []).slice(0, SALES_SUMMARY_ACCOUNTS_PAGE_SIZE)
    ) ?? [];

  useEffect(() => {
    if (!tableContainerRef.current) {
      return;
    }

    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          tableContainerRef.current;
        const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceToBottom < 100 && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    const container = tableContainerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, tableContainerRef]);

  const onAccountRowClick = useCallback(
    (account: AccountSalesSummaryDto) => {
      if (account.accountCode) {
        switchAccount(account.accountCode, {
          onSuccess: () => {
            window.location.reload();
          },
        });
      }
    },
    [switchAccount]
  );

  return (
    <TableContainer
      ref={tableContainerRef}
      data-testid="att-container"
      maxHeight="600px"
      overflowY="auto"
    >
      <Table data-testid="att-table" size="lg" variant="unstyled">
        <Thead data-testid="att-table-header">
          <Tr>
            <Th bg="gray.100"></Th>
            <Th bg="gray.100">QTD Booked</Th>
            <Th bg="gray.100">QTD INVOICED</Th>
            <Th bg="gray.100">QTD GP%</Th>
            <Th bg="gray.100">OVERDUE AR</Th>
          </Tr>
        </Thead>
        <Tbody data-testid="att-table-body">
          {isLoading && (
            <Tr>
              <Td
                colSpan={5}
                data-testid="att-loading-spinner-cell"
                textAlign="center"
              >
                <Spinner />
              </Td>
            </Tr>
          )}
          {!isLoading &&
            accounts.map((account) => (
              <Tr
                key={account.accountCode}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                height={TABLE_ROW_HEIGHT}
                onClick={() => onAccountRowClick(account)}
              >
                <Td>
                  <Text
                    _hover={{ textDecoration: "underline" }}
                    as="span"
                    className="text-link"
                    color="blue.400"
                  >{`(${account.accountCode}) ${account.companyName}`}</Text>
                </Td>
                <Td>{formatCurrency(account.totalOrdersBooked, 0)}</Td>
                <Td>{formatCurrency(account.totalInvoiced, 0)}</Td>
                <Td>
                  {isNumber(account.repGpPercent)
                    ? convertNumberToPercentFormat(account.repGpPercent)
                    : ""}
                </Td>
                <Td>{formatCurrency(account.overdueArBalance, 0)}</Td>
              </Tr>
            ))}
          {isFetchingNextPage && (
            <Tr>
              <Td
                colSpan={5}
                data-testid="att-loading-spinner-cell"
                textAlign="center"
              >
                <Spinner />
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

export default AccountTransactionsTable;
