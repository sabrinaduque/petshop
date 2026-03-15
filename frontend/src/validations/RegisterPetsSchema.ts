import * as yup from 'yup';

export const RegisterPetSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  especie: yup.string().required('A espécie é obrigatória'),
  raca: yup.string().required('A raça é obrigatória'),
  idade: yup
    .number()
    .typeError('A idade deve ser um número')
    .required('A idade é obrigatória')
    .positive('A idade deve ser um número positivo')
    .integer('A idade deve ser um número inteiro'),
  peso: yup
    .number()
    .typeError('O peso deve ser um número')
    .required('O peso é obrigatório')
    .positive('O peso deve ser um número positivo'),
  nome_dono: yup.string().required('O nome do dono é obrigatório'),
  telefone_dono: yup
    .string()
    .required('O celular é obrigatório')
    .test('phone-valid', 'Celular inválido', value => {
      if (!value) return false;
      const cleanPhone = value.replace(/\D/g, '');
      return cleanPhone.length >= 10;
    }),
  status: yup
    .string()
    .required('O status é obrigatório')
    .oneOf(
      ['crítico', 'moderado', 'leve'],
      'O status deve ser "crítico", "moderado" ou "leve"',
    ),
});

export type RegisterPetFormData = yup.InferType<typeof RegisterPetSchema>;
