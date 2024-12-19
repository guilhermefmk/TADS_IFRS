import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória')
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
});

export const todoSchema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  description: yup.string(),
  dueDate: yup.date(),
  categoryId: yup.number().integer().positive()
});

export const categorySchema = yup.object().shape({
  name: yup.string().required('Nome da categoria é obrigatório')
});

export const shareCategorySchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email é obrigatório')
});
