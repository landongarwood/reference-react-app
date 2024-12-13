import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  StyleProps,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BlanketPoResponseDto } from "../../../api";
import {
  STORED_IN_ALLOWWED_DEFAULT_HEADERS,
  STORED_IN_HEADER_MAPPING,
} from "../../../constants/blanketPOsTable";
import { useAppToast, useCookiesLive } from "../../../hooks";
import { useBlanketPoCreate } from "../../../hooks/api/mutations/useBlanketPoCreate";
import { useBlanketPoUpdate } from "../../../hooks/api/mutations/useBlanketPoUpdate";
import { useAccount } from "../../../hooks/api/queries";
import { formatCurrency } from "../../../utils/currency";
import {
  ExclamationCircleIcon,
  FileEditIcon,
  FileRemoveIcon,
} from "../../icons";
import BlanketPOField from "./BlanketPOField";

const tdStyle: StyleProps = {
  color: "gray.700",
  fontSize: "sm",
  fontWeight: "normal",
  h: 12,
  px: 4,
  py: 0,
};

type FormValues = {
  description?: string;
  po: string;
  storedInHeaderField: string;
  value: number;
};

const schema = yup
  .object({
    description: yup.string(),
    po: yup
      .string()
      .required("Please enter a valid Blanket PO.")
      .max(40, "Only 40 characters are allowed."),
    storedInHeaderField: yup
      .string()
      .required("Please select a Stored In Field."),
    value: yup
      .number()
      .typeError("Please enter a valid value.")
      .required("Please enter a valid value.")
      .min(0.01, "Must be greater than $0.")
      .max(99999999.99, "Must be less than $100,000,000."),
  })
  .required();

const BlanketPOsTableRow = ({
  blanketPo,
  onClickEdit,
  onClickCancel,
  onClickDelete,
  isEditing = false,
}: {
  blanketPo?: BlanketPoResponseDto;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  onClickCancel: () => void;
  isEditing?: boolean;
}) => {
  const [accountId, accountCode] = useCookiesLive(["accountId", "accountCode"]);
  const { errorToast, successToast } = useAppToast();
  const { data: accountData } = useAccount(accountCode);

  const { mutate: createBlanketPo, isLoading: isCreatingBlanketPo } =
    useBlanketPoCreate();
  const { mutate: updateBlanketPo, isLoading: isUpdatingBlanketPo } =
    useBlanketPoUpdate(accountId ? +accountId : undefined);

  const isLoading = isCreatingBlanketPo || isUpdatingBlanketPo;

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({
    defaultValues: {
      description: blanketPo?.description ?? "",
      po: blanketPo?.po ?? "",
      storedInHeaderField: blanketPo?.storedInHeaderField ?? "",
      value: blanketPo?.value ?? undefined,
    },
    resolver: yupResolver<FormValues>(schema),
  });

  const getStoredInHeaderItemName = (
    storedInHeaderField?: string,
    po?: string
  ) => {
    if (accountData && storedInHeaderField && po) {
      const headerItem = accountData.metaDataFields?.standardHeader?.find(
        (header) => header.label === storedInHeaderField
      );
      if (headerItem?.name && STORED_IN_HEADER_MAPPING[headerItem.name]) {
        return {
          [STORED_IN_HEADER_MAPPING[headerItem.name]]: po,
        };
      } else {
        const additionalHeaderItem =
          accountData.metaDataFields?.additionalHeaders?.find(
            (header) => header.label === storedInHeaderField
          );
        if (additionalHeaderItem?.id) {
          return {
            [`customField${additionalHeaderItem.id}`]: po,
          };
        }
      }
    }
    return {};
  };

  const handleClickCancel = useCallback(() => {
    onClickCancel();
  }, [onClickCancel]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (blanketPo) {
        updateBlanketPo(
          {
            blanketPoId: blanketPo.blanketPoId!,
            request: {
              ...values,
              description: (values.description
                ? values.description
                : null) as any,
            },
          },
          {
            onError: () => {
              errorToast("Unable to update Blanket PO.");
            },
            onSettled: () => {
              handleClickCancel();
            },
            onSuccess: () => {
              successToast("Blanket PO has been updated");
            },
          }
        );
      } else {
        createBlanketPo(
          {
            accountId: accountId ? +accountId : undefined,
            request: {
              ...values,
              description: (values.description
                ? values.description
                : null) as any,
            },
          },
          {
            onError: () => {
              errorToast(<>Unable to create Blanket PO.</>);
            },
            onSettled: () => {
              handleClickCancel();
            },
            onSuccess: () => {
              successToast("Blanket PO has been created");
            },
          }
        );
      }
    },
    [
      accountId,
      blanketPo,
      createBlanketPo,
      errorToast,
      handleClickCancel,
      successToast,
      updateBlanketPo,
    ]
  );

  const sotredInHeaderValues = useMemo(
    () => [
      ...STORED_IN_ALLOWWED_DEFAULT_HEADERS,
      ...(accountData?.metaDataFields?.additionalHeaders ?? [])
        .filter((header) => header.enabled)
        .map((header) => header.label),
    ],

    [accountData]
  );

  return (
    <>
      {blanketPo && !isEditing ? (
        <Tr _hover={{ bg: "gray.100" }}>
          <Td {...tdStyle}>{blanketPo.po}</Td>
          <Td {...tdStyle}>{blanketPo.description}</Td>
          <Td {...tdStyle}>{blanketPo.storedInHeaderField?.toUpperCase()}</Td>
          <Td {...tdStyle}>{formatCurrency(blanketPo.value)}</Td>
          <Td {...tdStyle}>
            <BlanketPOField
              fieldKey="invoiceTotal"
              fs={getStoredInHeaderItemName(
                blanketPo.storedInHeaderField,
                blanketPo.po
              )}
              id={blanketPo.blanketPoId}
            />
          </Td>
          <Td {...tdStyle}>
            <BlanketPOField
              fieldKey="openOrderValue"
              fs={getStoredInHeaderItemName(
                blanketPo.storedInHeaderField,
                blanketPo.po
              )}
              id={blanketPo.blanketPoId}
            />
          </Td>
          <Td {...tdStyle}>
            <BlanketPOField
              fieldKey="availableValue"
              id={blanketPo.blanketPoId}
            />
          </Td>
          <Td {...tdStyle}>
            <IconButton
              aria-label="Edit Blanket PO"
              bg="transparent"
              color="blue.700"
              icon={<FileEditIcon h={31} w={23} />}
              variant="link"
              onClick={onClickEdit}
            />
            <IconButton
              aria-label="Remove Blanket PO"
              bg="transparent"
              color="red.500"
              icon={<FileRemoveIcon h={31} w={23} />}
              variant="link"
              onClick={onClickDelete}
            />
          </Td>
        </Tr>
      ) : (
        <Tr>
          <Td {...tdStyle} paddingTop={3} verticalAlign="top">
            <InputGroup>
              <Input
                {...register("po")}
                disabled={isLoading}
                isInvalid={!!errors.po}
                readOnly={blanketPo !== undefined}
              />
              {errors.po?.message ? (
                <InputRightElement>
                  <ExclamationCircleIcon color="red.500" />
                </InputRightElement>
              ) : null}
            </InputGroup>
            {errors.po?.message && (
              <Text
                sx={{
                  color: "red.600",
                  fontSize: "xs",
                  marginBottom: 0,
                  marginTop: "8px",
                }}
              >
                {errors.po?.message}
              </Text>
            )}
          </Td>
          <Td {...tdStyle} paddingTop={3} verticalAlign="top">
            <Input
              {...register("description")}
              disabled={isLoading}
              isInvalid={!!errors.description}
            />
          </Td>
          <Td {...tdStyle} paddingTop={3} verticalAlign="top">
            <InputGroup>
              <Select
                {...register("storedInHeaderField")}
                borderColor={
                  !!errors.storedInHeaderField ? "red.300" : undefined
                }
                disabled={isLoading}
              >
                {sotredInHeaderValues.map((label) => (
                  <option key={label} value={label}>
                    {label?.toUpperCase()}
                  </option>
                ))}
              </Select>
              {errors.storedInHeaderField?.message ? (
                <InputRightElement right="25px">
                  <ExclamationCircleIcon color="red.500" />
                </InputRightElement>
              ) : null}
            </InputGroup>
            {errors.storedInHeaderField?.message && (
              <Text
                sx={{
                  color: "red.600",
                  fontSize: "xs",
                  marginBottom: 0,
                  marginTop: "8px",
                }}
              >
                {errors.storedInHeaderField?.message}
              </Text>
            )}
          </Td>
          <Td {...tdStyle} minW="145px" paddingTop={3} verticalAlign="top">
            <InputGroup>
              <InputLeftElement
                children="$"
                color="gray.300"
                pointerEvents="none"
              />
              <Input
                type="number"
                {...register("value")}
                disabled={isLoading}
                isInvalid={!!errors.value}
              />
              {errors.value?.message ? (
                <InputRightElement right="20px">
                  <ExclamationCircleIcon color="red.500" />
                </InputRightElement>
              ) : null}
            </InputGroup>
            {errors.value?.message && (
              <Text
                sx={{
                  color: "red.600",
                  fontSize: "xs",
                  marginBottom: 0,
                  marginTop: "8px",
                }}
              >
                {errors.value?.message}
              </Text>
            )}
          </Td>
          <Td {...tdStyle} colSpan={4} paddingTop={3} verticalAlign="top">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                data-testid="blanket-po-edit-cancel-button"
                isDisabled={isLoading}
                sx={{ mr: 3, px: "40px" }}
                variant="outline"
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                data-testid="blanket-po-edit-save-button"
                isLoading={isLoading}
                sx={{ px: "40px" }}
                variant="solid"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Box>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default BlanketPOsTableRow;
