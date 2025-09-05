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
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { ArrowLeftIcon } from '@/components/ui/icon';
import { useRouter } from "expo-router"; 
// import { useAuth } from "../../context/AuthContext";
import { use, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { useForm, Controller } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "@/api/authApi";
// import { saveToken } from '@/lib/secureStore';
import { useAuth } from '@/context/AuthContext';
import { saveToken } from '@/lib/secureStore';

type FormValues = {
  identifier: string;
  password: string;
};

export default function SignInModal({isOpen, onClose}: {isOpen?: boolean, onClose?: () => void}) {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // const loginMutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: async (data) => {
  //     // Save token securely
  //     await saveToken("auth_token", data.token);

  //     console.log("✅ Login success", data);
  //     handleClose();
  //     router.push("/(drawer)/(tabs)"); // go to home/dashboard
  //   },
  //   onError: (error: any) => {
  //     console.error("❌ Login failed", error.message);
  //   },
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });


    const handleClose = () => {
    setShowModal(false);
    onClose?.(); // ✅ notify parent
  };
  // const handleLogin = () => {
  //   // login();
  //   handleClose();
  //   router.back(); // close modal
  // };

  const { login } = useAuth();

  // const handleLogin = (data: FormValues) => {
  //   console.log("Form submitted ✅", data);
  //   loginMutation.mutate(data);
  //   // login(data) if you have an auth hook
  //   // handleClose();
  //   // router.back();
  // };

  const handleLogin = async (data: FormValues) => {
  try {
    const res = await fetch("https://app.ed-cred.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Invalid credentials");

    const result = await res.json();
    // result = { token: "...", user: {...} }

    await login(result.token, result.user);
    console.log("result.token: ", result.token);
    await saveToken("auth_token", result.token);

    console.log("✅ User logged in");
    handleClose();
    router.push("/(drawer)/(tabs)");
  } catch (err) {
    console.error("Login failed", err);
  }
};


  const handleState = () => setShowPassword((prev) => !prev);

  useEffect(() => {
    setShowModal(!!isOpen);
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
            <Heading>Want to Sign In?</Heading>
          </ModalHeader>
         {/* Email Field */}
        <ModalBody className="mb-4">
          <Text className="text-typography-500">Email</Text>
          <Controller
            control={control}
            name="identifier"
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Enter your email or username"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
          />
          {errors.identifier && (
            <Text className="text-red-500 text-sm">
              {errors.identifier.message}
            </Text>
          )}
        </ModalBody>

        {/* Password Field */}
        <ModalBody className="mb-4">
          <Text className="text-typography-500">Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}
        </ModalBody>
          <ModalFooter className="flex-col items-start">
           <Button onPress={handleSubmit(handleLogin)} className="w-full">
            <ButtonText>Login</ButtonText>
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
