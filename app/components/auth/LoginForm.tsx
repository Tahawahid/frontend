import { notifyError, loginApi, storeToken } from "@/lib/api-client";
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

export function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = React.useState(false);

  const handleChange =
    (field: "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!form.email) nextErrors.email = "Email is required";
    if (!form.password) nextErrors.password = "Password is required";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await loginApi(form);
      storeToken(result.token);
      toaster.create({
        type: "success",
        title: "Signed in",
        description: `Welcome back${result.user.full_name ? `, ${result.user.full_name}` : ""}!`,
      });
      navigate("/onboarding");
    } catch (error) {
      notifyError(error, "Unable to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="4">
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
            <Field.HelperText>Use the email you registered with.</Field.HelperText>
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
            autoComplete="current-password"
          />
          {errors.password ? (
            <Field.ErrorText>{errors.password}</Field.ErrorText>
          ) : (
            <Field.HelperText>At least 8 characters.</Field.HelperText>
          )}
        </Field.Root>

        <Button type="submit" colorScheme="blue" loading={loading}>
          Sign in
        </Button>

        <HStack justify="space-between" gap="2">
          <Text color="fg.muted" fontSize="sm">
            Don&apos;t have an account?
          </Text>
          <Link asChild color="blue.600" fontWeight="semibold">
            <RouterLink to="/auth/register">Create one</RouterLink>
          </Link>
        </HStack>
      </Stack>
    </form>
  );
}
