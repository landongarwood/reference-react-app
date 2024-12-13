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
import { memo, useEffect, useRef } from "react";
import { OrderListing } from "../../api";
import { TABLE_ROW_HEIGHT } from "../../constants/dataTable";
import { useCookiesLive } from "../../hooks";
import { useInfiniteOrders } from "../../hooks/api/queries/useInfiniteOrders";
import { getFormattedDate } from "../../utils/datetime";
import { getAppLink } from "../../utils/link";

const RecentOrdersTable = memo(() => {
  const [accountCode] = useCookiesLive(["accountCode"]);
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteOrders({
      sort: [
        {
          desc: 1,
          field: "orderNum",
        },
      ],
      ...(accountCode ? { eq: [{ accountCode: [accountCode] }] } : {}),
    });
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const orders =
    data?.pages.flatMap((page) => page._embedded?.entities ?? []) ?? [];

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

  const handleOrderRowClick = (order: OrderListing) => {
    window.location.href = getAppLink(
      `CBSDirectRep/OrderDetailsX.php?ordernum=${encodeURIComponent(
        order?.orderNum ?? ""
      )}`
    );
  };

  return (
    <TableContainer
      ref={tableContainerRef}
      data-testid="rot-container"
      maxHeight="600px"
      overflowY="auto"
    >
      <Table data-testid="rot-table" size="lg" variant="unstyled">
        <Thead data-testid="rot-table-header">
          <Tr>
            <Th bg="gray.100">Order Number</Th>
            <Th bg="gray.100">PO Number</Th>
            <Th bg="gray.100">Date</Th>
            <Th bg="gray.100">Status</Th>
            <Th bg="gray.100">Subtotal</Th>
          </Tr>
        </Thead>
        <Tbody data-testid="rot-table-body">
          {isLoading && (
            <Tr>
              <Td
                colSpan={5}
                data-testid="rot-loading-spinner-cell"
                textAlign="center"
              >
                <Spinner />
              </Td>
            </Tr>
          )}
          {!isLoading &&
            orders.map((order) => (
              <Tr
                key={order.orderNum}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                height={TABLE_ROW_HEIGHT}
                onClick={() => handleOrderRowClick(order)}
              >
                <Td>
                  <Text
                    _hover={{ textDecoration: "underline" }}
                    as="span"
                    className="text-link"
                    color="blue.400"
                  >
                    {order.orderNum}
                  </Text>
                </Td>
                <Td>{order.custPo}</Td>
                <Td>{getFormattedDate(order.orderDate)}</Td>
                <Td>{order.repDisplay}</Td>
                <Td>${order.subtotal?.toLocaleString()}</Td>
              </Tr>
            ))}
          {isFetchingNextPage && (
            <Tr>
              <Td
                colSpan={5}
                data-testid="rot-loading-spinner-cell"
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

export default RecentOrdersTable;
