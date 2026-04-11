import { theme } from '@/styles/theme';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { alpha, styled as styledMUI } from '@mui/material/styles';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 2.4rem 4rem;

  @media (max-width: 968px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.6rem 1rem;
  }
`;

export const HeaderActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TableInfo = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;

export const StudentNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const StudentAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: #e0e0e0;
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
  font-family: ${props => props.theme.fonts.inter};

  color: ${props => props.theme.colors.gray700};

  font-weight: 400;
  font-size: 1.6rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.colors.white} !important;
    background-color: ${props => props.theme.colors.gray400} !important;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const ColorDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface ColorBoxProps {
  $color: string;
}

export const ColorBox = styled.div<ColorBoxProps>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background-color: ${props => props.$color};
`;

interface StyledTableCellProps {
  $isactivecolor?: string;
}

export const StyledTableCell = styledMUI(TableCell)<StyledTableCellProps>(
  () => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: alpha(theme.colors.secondary, 0.12),
      color: theme.colors.gray700,
      fontSize: 18,
      fontWeight: 500,
      fontFamily: `${theme.fonts.inter}`,
      padding: 20,
      textAlign: 'center',
      borderBottom: `1px solid ${theme.colors.gray200}`,
    },
    [`&.${tableCellClasses.body}`]: {
      padding: '1.2rem 2rem',
      fontWeight: 400,
      fontSize: 16,
      color: theme.colors.gray700,
      fontFamily: `${theme.fonts.inter}`,
      borderBottom: `1px solid ${theme.colors.gray200}`,
      textAlign: 'center',

      '&.actions': {
        width: '10%',
        minWidth: '10%',
      },
    },
  }),
);

export const StyledTableRow = styledMUI(TableRow)(() => ({
  height: 37,
  fontSize: 14,
  padding: 0,

  '&:last-child td': {
    borderBottom: 'none',
  },

  '&:hover': {
    backgroundColor: theme.colors.gray100,
  },
}));
