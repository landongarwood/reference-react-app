import { CalendarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  ModalCloseButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { BundleLinePatchRequestDto, DealDto, DealSolrDto } from "../../api";
import { QUERY_KEYS } from "../../constants/query";
import { useAppToast } from "../../hooks";
import { useBundleLineUpdate } from "../../hooks/api/mutations";
import { useBundleLines } from "../../hooks/api/queries";
import { getFormattedDate } from "../../utils/datetime";
import { ExclamationCircleIcon } from "../icons";

const schema = yup
  .object({
    dealNumber: yup
      .string()
      .when("isDealNumberDisabled", ([isDealNumberDisabled], schema) => {
        return isDealNumberDisabled
          ? schema
          : schema.required("Please enter a valid deal number.");
      }),
    dealVersion: yup
      .string()
      .when("isDealVersionDisabled", ([isDealVersionDisabled], schema) => {
        return isDealVersionDisabled
          ? schema
          : schema.required("Please enter a valid deal version.");
      }),
    expirationDate: yup
      .date()
      .when(
        "isExpirationDateDisabled",
        ([isExpirationDateDisabled], schema) => {
          return isExpirationDateDisabled
            ? schema
            : schema.required("Please enter a valid expiration date.");
        }
      ),
    isDealNumberDisabled: yup.boolean().required(),
    isDealVersionDisabled: yup.boolean().required(),
    isExpirationDateDisabled: yup.boolean().required(),
    isSupplierUpliftDisabled: yup.boolean().required(),
    supplierUplift: yup
      .number()
      .when(
        "isSupplierUpliftDisabled",
        ([isSupplierUpliftDisabled], schema) => {
          return isSupplierUpliftDisabled
            ? schema
            : schema.required("Please enter a valid supplier uplift.");
        }
      ),
  })
  .required();

type FormValues = {
  dealNumber?: string;
  isDealNumberDisabled: boolean;
  dealVersion?: string;
  isDealVersionDisabled: boolean;
  expirationDate?: Date | null;
  isExpirationDateDisabled: boolean;
  supplierUplift?: number;
  isSupplierUpliftDisabled: boolean;
};

const DealsEditSelected = ({
  deals,
  isOpen,
  onClose,
  refreshAfterSuccess,
}: {
  deals: DealSolrDto[];
  isOpen: boolean;
  refreshAfterSuccess?: boolean;
  onClose: () => void;
}) => {
  const { errorToast, successToast } = useAppToast();
  const bundleLineIds: number[] = deals
    .filter((deal) => deal.bundleLineId)
    .map((deal) => deal.bundleLineId!);
  const bundleLines = useBundleLines(bundleLineIds);
  const { mutateAsync: updateBundleLine } = useBundleLineUpdate();
  const [submitting, setSubmitting] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      isDealNumberDisabled: true,
      isDealVersionDisabled: true,
      isExpirationDateDisabled: true,
      isSupplierUpliftDisabled: true,
    },
    resolver: yupResolver<FormValues>(schema),
  });
  const queryClient = useQueryClient();

  const onSubmit = useCallback(
    (values: FormValues) => {
      setSubmitting(true);
      const deal: Partial<DealDto> = {};
      if (!values.isDealNumberDisabled) {
        deal.number = values.dealNumber;
      }
      if (!values.isDealVersionDisabled) {
        deal.version = values.dealVersion;
      }
      if (!values.isExpirationDateDisabled) {
        deal.expirationDate = getFormattedDate(
          values.expirationDate,
          "yyyy-MM-dd"
        );
      }
      if (!values.isSupplierUpliftDisabled) {
        deal.uplift = values.supplierUplift;
      }
      const promises = bundleLineIds.map((bundleLineId, index) =>
        updateBundleLine({
          bundleLineId,
          request: {
            deal: {
              ...bundleLines[index].data?.deal,
              ...deal,
            } as DealDto,
            unitCost: bundleLines[index].data?.unitCost,
          } as BundleLinePatchRequestDto,
        })
      );

      Promise.allSettled(promises).then((values) => {
        const failedBundleIndexes = values
          .map((v, index) => (v.status === "rejected" ? index : -1))
          .filter((v) => v >= 0);
        const successfulBundleIndexes = values
          .map((v, index) => (v.status === "fulfilled" ? index : -1))
          .filter((v) => v >= 0);
        if (failedBundleIndexes.length) {
          errorToast(
            <Box>
              <Text>Unable to update the following Deals:</Text>
              {failedBundleIndexes.map((index) => (
                <Text key={bundleLines[index]?.data?.bundleLineId}>
                  * {deals[index].standardNumber} |{" "}
                  {bundleLines[index]?.data?.supplierCode} |{" "}
                  {bundleLines[index]?.data?.supplierPart}
                </Text>
              ))}
            </Box>
          );
        } else {
          successToast(`${bundleLineIds.length} deals updated successfully`);
        }

        if (successfulBundleIndexes.length) {
          if (refreshAfterSuccess) {
            window.location.reload();
          } else {
            queryClient.invalidateQueries([QUERY_KEYS["deals-list"]]);
          }
        }

        setSubmitting(false);
        onClose();
      });
    },
    [
      deals,
      refreshAfterSuccess,
      bundleLines,
      bundleLineIds,
      queryClient,
      updateBundleLine,
      onClose,
      successToast,
      errorToast,
    ]
  );

  const isFetchingBundles = bundleLines.every(
    (bundleLine) => bundleLine.isFetching
  );

  useEffect(() => {
    if (bundleLines.filter((bundleLine) => bundleLine.isError).length) {
      errorToast("Unable to update selected deals.");
      onClose();
    }
  }, [bundleLines, errorToast, onClose]);

  return (
    <Modal isCentered isOpen={isOpen} size="lg" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {isFetchingBundles ? (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            py={5}
          >
            <Spinner />
          </Box>
        ) : submitting ? (
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            py={5}
          >
            <Text fontSize="lg" fontWeight="medium">
              Processing... do not close this window
            </Text>
            <Spinner mt="5" />
          </Box>
        ) : (
          <>
            <ModalHeader>Edit {deals.length} Selected Deals</ModalHeader>
            <ModalCloseButton />

            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Box alignItems="flex-start" display="flex" gap="6">
                  <FormControl display="flex" isInvalid={!!errors.dealNumber}>
                    <FormLabel
                      flexShrink={0}
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight={9}
                      w={28}
                    >
                      Deal Number
                    </FormLabel>
                    <Box flex="1">
                      <InputGroup>
                        <Input
                          {...register("dealNumber")}
                          isDisabled={watch("isDealNumberDisabled")}
                          maxLength={80}
                        />
                        {errors.dealNumber ? (
                          <InputRightElement>
                            <ExclamationCircleIcon color="red.500" />
                          </InputRightElement>
                        ) : null}
                      </InputGroup>
                      {!!errors.dealNumber && (
                        <FormErrorMessage>
                          {errors.dealNumber.message}
                        </FormErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                  <Checkbox {...register("isDealNumberDisabled")} h="9">
                    Don't change
                  </Checkbox>
                </Box>

                <Box alignItems="flex-start" display="flex" gap="6">
                  <FormControl display="flex" isInvalid={!!errors.dealVersion}>
                    <FormLabel
                      flexShrink={0}
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight={9}
                      w={28}
                    >
                      Deal Version
                    </FormLabel>
                    <Box flex="1">
                      <InputGroup>
                        <Input
                          {...register("dealVersion")}
                          isDisabled={watch("isDealVersionDisabled")}
                          maxLength={80}
                        />
                        {errors.dealVersion ? (
                          <InputRightElement>
                            <ExclamationCircleIcon color="red.500" />
                          </InputRightElement>
                        ) : null}
                      </InputGroup>
                      {!!errors.dealVersion && (
                        <FormErrorMessage>
                          {errors.dealVersion.message}
                        </FormErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                  <Checkbox {...register("isDealVersionDisabled")} h="9">
                    Don't change
                  </Checkbox>
                </Box>

                <Box alignItems="flex-start" display="flex" gap="6">
                  <FormControl
                    display="flex"
                    isInvalid={!!errors.expirationDate}
                  >
                    <FormLabel
                      flexShrink={0}
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight={9}
                      w={28}
                    >
                      Expiration Date
                    </FormLabel>
                    <Box flex="1">
                      <Controller
                        control={control}
                        name="expirationDate"
                        render={({ field: { value, onChange } }) => (
                          <>
                            <DatePicker
                              shouldCloseOnSelect
                              showIcon
                              customInput={
                                <InputMask mask="99/99/9999">
                                  <Input boxSizing="border-box" />
                                </InputMask>
                              }
                              dateFormat="MM/dd/yyyy"
                              disabled={watch("isExpirationDateDisabled")}
                              icon={
                                <CalendarIcon
                                  color={
                                    watch("isExpirationDateDisabled")
                                      ? "gray.300"
                                      : "gray.500"
                                  }
                                />
                              }
                              placeholderText="mm/dd/yyyy"
                              selected={value}
                              onChange={onChange}
                            />
                          </>
                        )}
                      />
                      {!!errors.expirationDate && (
                        <FormErrorMessage>
                          {errors.expirationDate.message}
                        </FormErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                  <Checkbox {...register("isExpirationDateDisabled")} h="9">
                    Don't change
                  </Checkbox>
                </Box>

                <Box alignItems="flex-start" display="flex" gap="6">
                  <FormControl
                    display="flex"
                    isInvalid={!!errors.supplierUplift}
                  >
                    <FormLabel
                      flexShrink={0}
                      fontSize="sm"
                      fontWeight="medium"
                      lineHeight={9}
                      w={28}
                    >
                      Supplier Uplift
                    </FormLabel>
                    <Box flex="1">
                      <InputGroup>
                        <Input
                          {...register("supplierUplift")}
                          isDisabled={watch("isSupplierUpliftDisabled")}
                          type="number"
                        />
                        {errors.supplierUplift ? (
                          <InputRightElement>
                            <ExclamationCircleIcon color="red.500" />
                          </InputRightElement>
                        ) : null}
                      </InputGroup>
                      {!!errors.supplierUplift && (
                        <FormErrorMessage>
                          {errors.supplierUplift.message}
                        </FormErrorMessage>
                      )}
                    </Box>
                  </FormControl>
                  <Checkbox {...register("isSupplierUpliftDisabled")} h="9">
                    Don't change
                  </Checkbox>
                </Box>
              </ModalBody>
              <ModalFooter justifyContent="space-between">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="blue" mr={3} type="submit" variant="solid">
                  Update
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DealsEditSelected;
