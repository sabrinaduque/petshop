import { format } from 'date-fns';

export const maskCpf = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 11);

  return onlyDigits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const unmaskCpf = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.replace(/\D/g, '').substring(0, 11);
};

export const maskCnpj = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 14);

  return onlyDigits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
};

export const maskCpfOrCnpj = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '');

  if (onlyDigits.length <= 11) {
    return maskCpf(onlyDigits);
  }
  return maskCnpj(onlyDigits);
};

export const maskRG = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 9);

  return onlyDigits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskPhone = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 11);

  return onlyDigits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export const unmaskPhone = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.replace(/\D/g, '').substring(0, 11);
};

export const maskCep = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 8);
  return onlyDigits.replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskEmail = (value: string): string => {
  if (!value) return '';
  // Remove espaços e força minúsculas
  const sanitized = value.replace(/\s+/g, '').toLowerCase();
  // Remove caracteres inválidos para email
  return sanitized.replace(/[^a-z0-9@._-]/gi, '');
};

export const maskDate = (value: string): string => {
  if (!value) {
    return '';
  }
  const onlyDigits = value.replace(/\D/g, '').substring(0, 8);
  return onlyDigits
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
};

export function isValidDate(dateString: string): boolean {
  // Verifica se a string tem o formato correto (DD/MM/YYYY)
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return false;

  // Extrai dia, mês e ano
  const [day, month, year] = dateString.split('/').map(Number);

  // Cria um objeto Date e verifica se é válido
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => {
  const formatted = Math.abs(value).toFixed(2).replace('.', ',');
  const prefix = value < 0 ? '- R$ ' : 'R$ ';
  return prefix + formatted;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '--';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '--';

  const dateWithOffset = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000,
  );

  return format(dateWithOffset, 'dd/MM/yyyy');
};
