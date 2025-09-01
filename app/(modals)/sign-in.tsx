// import { View, Text, Button, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../context/AuthContext";

// export default function SignInModal() {
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleLogin = () => {
//     login();
//     router.back(); // close modal
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🔐 Please Sign In</Text>
//       <Button title="Sign In" onPress={handleLogin} />
//       <Button title="Cancel" color="red" onPress={() => router.back()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 22, marginBottom: 20 },
// });

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { ArrowLeftIcon } from '@/components/ui/icon';
import { useRouter } from "expo-router"; 
// import { useAuth } from "../../context/AuthContext";
import { use, useState, useEffect } from 'react';

export default function SignInModal({isOpen, onClose}: {isOpen?: boolean, onClose?: () => void}) {
  const [showModal, setShowModal] = useState(false);


    // const { login } = useAuth();
  const router = useRouter();

    const handleClose = () => {
    setShowModal(false);
    onClose?.(); // ✅ notify parent
  };
  const handleLogin = () => {
    // login();
    handleClose();
    router.back(); // close modal
  };
  useEffect(() => {
    setShowModal(isOpen!);
  }, [isOpen]);
  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={handleClose}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader className="flex-col items-start gap-0.5">
            <Heading>Sign In?</Heading>
            {/* <Text size="sm">No worries, we'll send you reset instructions</Text> */}
          </ModalHeader>
          <ModalBody className="mb-4">
            <Input>
              <InputField placeholder="Enter your email" />
            </Input>
          </ModalBody>
          <ModalFooter className="flex-col items-start">
            <Button
              onPress={handleClose}
              className="w-full"
            >
              <ButtonText onPress={handleLogin}>Login</ButtonText>
            </Button>
            <Button
              variant="link"
              size="sm"
              onPress={handleClose}
              className="gap-1"
            >
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText onPress={() => router.push('/(drawer)/(tabs)')}>Back to Home</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
