import { OrderLineSolrDto } from "../../api";
import ListingPage from "../../components/pages/ListingPage";
import { withPageTitle } from "../../hocs";
import { useInfiniteOrderLinesReport } from "../../hooks/api/queries/useInfiniteOrderLinesReport";

const OrderLinesReport = () => {
  return (
    <ListingPage<OrderLineSolrDto>
      additionalColumnId="description"
      identifier="orderLineId"
      listingName="orderlines"
      useListingQueryHook={useInfiniteOrderLinesReport}
    />
  );
};

export default withPageTitle("Order Lines Report", OrderLinesReport);
