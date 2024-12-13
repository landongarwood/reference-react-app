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
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import * as yup from "yup";
import { ManufacturerProductSolrDto, ProductLineResponseDto } from "../../api";
import { useProductUpdate } from "../../hooks/api/mutations";
import { useProductDetails } from "../../hooks/api/queries";
import {
  getFormattedDate,
  isValidDateString,
  parseDate,
} from "../../utils/datetime";

const schema = yup
  .object({
    eolDateTime: yup.date().nullable(),
  })
  .required();

type FormValues = {
  eolDateTime?: Date | null;
};

const EditEolDate = ({
  product,
  isOpen,
  onClose,
}: {
  product: ManufacturerProductSolrDto;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: productDetails } = useProductDetails(
    product.manufacturerProductId
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Edit EOL for {product.mfgName} {product.mfgPart}
        </ModalHeader>
        {productDetails ? (
          <EditEolDateForm
            product={product}
            productDetails={productDetails}
            onClose={onClose}
          />
        ) : (
          <Box display="flex" justifyContent="center" m={3}>
            <Spinner />
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};

const EditEolDateForm = ({
  product,
  productDetails,
  onClose,
}: {
  product: ManufacturerProductSolrDto;
  productDetails: ProductLineResponseDto;
  onClose: () => void;
}) => {
  const { mutate: updateProduct, isLoading } = useProductUpdate();
  const toast = useToast();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      eolDateTime: productDetails.eolDateTime
        ? parseDate(productDetails.eolDateTime)
        : undefined,
    },
    resolver: yupResolver<FormValues>(schema),
  });

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (product.manufacturerProductId) {
        updateProduct(
          {
            productId: product.manufacturerProductId,
            request: {
              eolDateTime: (values.eolDateTime
                ? getFormattedDate(values.eolDateTime, "yyyy-MM-dd")
                : null) as string,
            },
          },
          {
            onError: (error) => {
              toast({
                description: error.message
                  ? error.message
                  : "Failed to update EOL Date.",
                position: "top",
                status: "error",
                variant: "subtle",
              });
            },
            onSuccess: () => {
              onClose();
              toast({
                description: "Updated EOL Date successfully.",
                position: "top",
                status: "success",
                variant: "subtle",
              });
            },
          }
        );
      }
    },
    [onClose, product.manufacturerProductId, updateProduct, toast]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <FormControl display="flex" isInvalid={!!errors.eolDateTime}>
          <FormLabel
            flexShrink={0}
            fontSize="sm"
            fontWeight="medium"
            lineHeight={9}
            w={28}
          >
            Select EOL Date:
          </FormLabel>
          <Box flex="1">
            <Controller
              control={control}
              name="eolDateTime"
              render={({ field: { value, onChange } }) => (
                <>
                  <InputGroup id="eolDateValueInput" sx={{ mb: 2 }}>
                    <InputLeftElement pointerEvents="none">
                      <CalendarIcon color="gray.300" />
                    </InputLeftElement>
                    <PatternFormat
                      customInput={Input}
                      format="##/##/####"
                      mask="_"
                      placeholder="mm/dd/yyyy"
                      sx={{ pl: 10 }}
                      value={getFormattedDate(value)}
                      onValueChange={({ formattedValue }) =>
                        isValidDateString(formattedValue, "MM/dd/yyyy")
                          ? onChange(parseDate(formattedValue, "MM/dd/yyyy"))
                          : onChange(null)
                      }
                    />
                  </InputGroup>
                  <DatePicker
                    fixedHeight
                    inline
                    dateFormat="MM/dd/yyyy"
                    selected={value}
                    onChange={(date) => onChange(date ?? undefined)}
                  />
                </>
              )}
            />
            {!!errors.eolDateTime && (
              <FormErrorMessage>{errors.eolDateTime.message}</FormErrorMessage>
            )}
          </Box>
        </FormControl>
      </ModalBody>
      <ModalFooter justifyContent="space-between">
        <Button
          data-testid="sku-modal-close-btn"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          data-testid="sku-modal-save-btn"
          isLoading={isLoading}
          mr={3}
          type="submit"
          variant="solid"
        >
          Save
        </Button>
      </ModalFooter>
    </form>
  );
};

export default EditEolDate;
