import React from "react";
import {
  Button,
  Modal,
  VStack,
  HStack,
  Text,
  Radio,
  Center,
  NativeBaseProvider,
} from "native-base";

const CheckoutModal = (props) => {

  let transaction_data = props.transactionData;
  return (
    <Modal isOpen={props.isModalOpen} onClose={props.closeModal} size="xl">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>PayPal Order:</Modal.Header>
        <Modal.Body>
          <VStack space={3}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Email:</Text>
              <Text color="blueGray.400">{transaction_data.payer_email}</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Client Name:</Text>
              <Text color="blueGray.400">{transaction_data.payer_first_name + " " + transaction_data.payer_last_name}</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="medium">Total Amount:</Text>
              <Text color="green.500">€{transaction_data.total_paid}</Text>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
      
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CheckoutModal;
