export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flattened = result.error.flatten();

      return res.status(400).json({
        message: "Validation failed",
        errors: flattened.fieldErrors, // key:value
        formErrors: flattened.formErrors, // ارور های کلی
      });
    }

    next();
  };
};
