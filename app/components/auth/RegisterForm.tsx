import { notifyError, registerApi, storeToken } from "@/lib/api-client";
import { toaster } from "@/components/ui/toaster";
import {
  Button,
  Field,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router";

export function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = React.useState(false);

  const handleChange =
    (field: "fullName" | "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.fullName) nextErrors.fullName = "Name is required";
    if (!form.email) nextErrors.email = "Email is required";
    if (!form.password) nextErrors.password = "Password is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await registerApi(form);
      storeToken(result.token);
      toaster.create({
        type: "success",
        title: "Account created",
        description: `Welcome aboard, ${result.user.full_name || result.user.email}!`,
      });
      navigate("/onboarding");
    } catch (error) {
      notifyError(error, "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="4">
        <Field.Root required invalid={Boolean(errors.fullName)}>
          <Field.Label>Full name</Field.Label>
          <Input
            name="fullName"
            value={form.fullName}
            onChange={handleChange("fullName")}
            placeholder="Alex Doe"
            autoComplete="name"
          />
          {errors.fullName ? (
            <Field.ErrorText>{errors.fullName}</Field.ErrorText>
          ) : (
            <Field.HelperText>This will appear on your account.</Field.HelperText>
          )}
        </Field.Root>

        <Field.Root required invalid={Boolean(errors.email)}>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email ? (
            <Field.ErrorText>{errors.email}</Field.ErrorText>
          ) : (
            <Field.HelperText>We&apos;ll never share your email.</Field.HelperText>
          )}
        </Field.Root>

        <Field.Root required invalid={Boolean(errors.password)}>
          <Field.Label>Password</Field.Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange("password")}
            placeholder="********"
            autoComplete="new-password"
          />
          {errors.password ? (
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          ) : (
            <Field.HelperText>Min 8 characters for security.</Field.HelperText>
          )}
        </Field.Root>

        <Button type="submit" colorScheme="blue" loading={loading}>
          Create account
        </Button>

        <HStack justify="space-between" gap="2">
          <Text color="fg.muted" fontSize="sm">
            Already have an account?
          </Text>
          <Link asChild color="blue.600" fontWeight="semibold">
            <RouterLink to="/auth/login">Sign in</RouterLink>
          </Link>
        </HStack>
      </Stack>
    </form>
  );
}
