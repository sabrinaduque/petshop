import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Pagination,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePets } from '@/services/pets';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { HiOutlineEye } from 'react-icons/hi';
import {
  Container,
  HeaderActions,
  PaginationWrapper,
  PageWrapper,
  SearchWrapper,
  StyledTableCell,
  StyledTableRow,
  ActionWrapper,
} from './styles';

const Pets = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const capitalizeFirstLetter = (value?: string | null) => {
    const text = (value ?? '').toString().trim();
    if (!text) return '';

    return (
      text.charAt(0).toLocaleUpperCase('pt-BR') +
      text.slice(1).toLocaleLowerCase('pt-BR')
    );
  };

  const debouncedSearch = useDebounce(500, search);
  const { data } = usePets({ page, limit: 10, search: debouncedSearch });

  const handleChange = (_: unknown, value: number) => setPage(value);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <PageWrapper>
      <HeaderActions>
        <SearchWrapper>
          <Input
            placeholder="Buscar por nome, espécie, raça ou dono"
            hasSearch
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Buscar pets"
            width="40rem"
          />
        </SearchWrapper>

        <Button
          width="14rem"
          background={theme.colors.secondary}
          onClick={() => router.push('/pets/registrar')}
          type="button"
        >
          Adicionar
        </Button>
      </HeaderActions>

      <Container>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '24px',
            overflow: 'hidden',
            border: `1px solid ${theme.colors.gray200}`,
            boxShadow: 'none',
          }}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Espécie</StyledTableCell>
                <StyledTableCell>Raça</StyledTableCell>
                <StyledTableCell>Dono</StyledTableCell>
                <StyledTableCell align="right">Ações</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.pets.map(pet => (
                <StyledTableRow key={pet.id}>
                  <StyledTableCell>
                    {capitalizeFirstLetter(pet.nome)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {capitalizeFirstLetter(pet.especie)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {capitalizeFirstLetter(pet.raca)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {capitalizeFirstLetter(pet.nome_dono)}
                  </StyledTableCell>
                  <StyledTableCell className="actions">
                    <ActionWrapper>
                      <HiOutlineEye
                        size={24}
                        className="eye"
                        color="#A2A2A2"
                        onClick={() => router.push(`/pets/${pet.id}`)}
                        style={{ cursor: 'pointer' }}
                      />
                    </ActionWrapper>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <PaginationWrapper>
          <div>
            Mostrando {data?.pets.length || 0} de {data?.pagination.total || 0}{' '}
            resultados
          </div>

          <Pagination
            count={data?.pagination.totalPages || 0}
            page={data?.pagination.page || 1}
            defaultPage={data?.pagination.page || 1}
            onChange={handleChange}
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1.6rem',
                fontWeight: 500,
                fontFamily: `${theme.fonts.inter}`,
                color: theme.colors.gray700,
                backgroundColor: theme.colors.surface,
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                color: `${theme.colors.white} !important`,
                backgroundColor: `${theme.colors.secondary} !important`,
                borderRadius: '50%',
              },
              '& .MuiPaginationItem-root.Mui-selected:hover': {
                color: `${theme.colors.white} !important`,
                backgroundColor: `${theme.colors.secondary} !important`,
                borderRadius: '50%',
              },
              '& .MuiPaginationItem-previousNext': {
                backgroundColor: 'transparent !important',
              },
              '& .MuiPaginationItem-root:hover': {},
            }}
          />
        </PaginationWrapper>
      </Container>
    </PageWrapper>
  );
};

export default Pets;
