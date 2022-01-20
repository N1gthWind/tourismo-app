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
  CheckIcon,
} from "native-base";
import { Overlay, Icon } from 'react-native-elements';

const CheckoutModal = (props) => {

  let transaction_data = props.transactionData;
  return (
    
    <Modal m="0" _backdrop={{
      _dark: {
        bg: "coolGray.800",
      },
      bg: "coolGray.800",
    }} style={{ margin: 0, height: "100%" }} isOpen={props.isModalOpen} onClose={props.closeModal} size="xl"
    overlayVisible={true}
    closeOnOverlayClick={true}
    >
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>
          <HStack alignItems="center" space={2}>
            <Icon
              name='check'
              type='font-awesome'
              color='#10b981' />
            <HStack justifyContent="center">
              <Text color="emerald.500" fontSize="lg">
                Reservation was placed!
              </Text>
            </HStack>
          </HStack>
        </Modal.Header>
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
