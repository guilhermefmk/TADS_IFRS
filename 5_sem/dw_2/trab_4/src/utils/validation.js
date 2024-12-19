import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  dueDate: yup.date(),
  categoryId: yup.number().integer().positive()
});

export const categorySchema = yup.object().shape({
  name: yup.string().required()
});

export const shareCategorySchema = yup.object().shape({
  email: yup.string().email().required()
});

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};

