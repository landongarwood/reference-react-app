import { useMemo, useState } from "react";
import { DealSolrDto } from "../../api";
import DealsEditSelected from "../../components/modals/DealsEditSelected";
import ListingPage from "../../components/pages/ListingPage";
import { withPageTitle } from "../../hocs";
import { useInfiniteDealsList } from "../../hooks/api/queries";
import { ActionRowItem } from "../../types";

const DealsList = () => {
  const [selectedDeals, setSelectedDeals] = useState<DealSolrDto[]>([]);
  const [isEditSelectedDealsModalOpened, setIsSelectedDealsModalOpened] =
    useState(false);

  const actionRowItems: ActionRowItem[] = useMemo(
    () => [
      {
        isVisible: !!selectedDeals.length,
        label: "Edit Selected Deals",
        onClick: () => setIsSelectedDealsModalOpened(true),
      },
    ],
    [selectedDeals]
  );

  return (
    <>
      <ListingPage
        isSelectable
        actionRowItems={actionRowItems}
        additionalColumnId="description"
        identifier="dealId"
        listingName="deals"
        selectedRows={selectedDeals}
        useListingQueryHook={useInfiniteDealsList}
        onRowsSelect={setSelectedDeals}
      />

      {isEditSelectedDealsModalOpened && (
        <DealsEditSelected
          isOpen
          deals={selectedDeals}
          onClose={() => {
            setIsSelectedDealsModalOpened(false);
            setSelectedDeals([]);
          }}
        />
      )}
    </>
  );
};

export default withPageTitle("Deals List", DealsList);
