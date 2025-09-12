import { useCallback, useState } from "react";
import { ZodSchema } from "zod";
import { FormErrors } from "@/types/auth";
import { transformZodErrors } from "@/utils/auth";

export const useFormValidation = <T extends Record<string, any>>(
  schema: ZodSchema<T>
) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback(
    (data: T): boolean => {
      const result = schema.safeParse(data);

      if (!result.success) {
        const formErrors = transformZodErrors(result.error);
        setErrors(formErrors);
        return false;
      }

      setErrors({});
      return true;
    },
    [schema]
  );

  const clearError = useCallback((fieldName: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback(
    (fieldName: keyof FormErrors, message: string) => {
      setErrors((prev) => ({ ...prev, [fieldName]: message }));
    },
    []
  );

  return {
    errors,
    validateForm,
    clearError,
    clearAllErrors,
    setFieldError,
  };
};
