import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Pagination,
  Modal,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useDeletePet, usePets } from '@/services/pets';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { HiOutlineEye } from 'react-icons/hi';
import { LuTrash2 } from 'react-icons/lu';
import { Pet } from '@/interfaces/pets.interface';
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
import { ModalActions, ModalContent } from './PetsForm/styles';

const Pets = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pet, setPet] = useState<Pet | null>(null);
  const [showModal, setShowModal] = useState({
    warning: false,
    success: false,
  });
  const deleteMutation = useDeletePet();

  const handleDelete = async (petId: number) => {
    if (!petId) return;

    await deleteMutation.mutateAsync(petId, {
      onSuccess: () => {
        setShowModal({
          ...showModal,
          warning: false,
          success: true,
        });
      },
    });
  };

  const handleCloseModal = () => {
    setShowModal({
      warning: false,
      success: false,
    });
  };

  const handleBack = () => {
    handleCloseModal();
    setPet(null);
  };

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

                      <LuTrash2
                        size={24}
                        color="#A2A2A2"
                        onClick={() => {
                          setPet(pet);
                          setShowModal({ ...showModal, warning: true });
                        }}
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

      <Modal open={showModal.warning} onClose={handleBack}>
        <ModalContent>
          <h2>Excluir Pet</h2>
          <p>Tem certeza que deseja excluir este pet?</p>
          <ModalActions>
            <Button
              type="button"
              background="#28a745"
              hover="#1e7e34"
              width="90px"
              onClick={handleBack}
            >
              Voltar
            </Button>

            <Button
              type="button"
              background="transparent"
              border="#28a745"
              color="#28a745"
              hover="rgba(40, 167, 69, 0.12)"
              width="90px"
              onClick={() => handleDelete(pet?.id || 0)}
            >
              Excluir
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>

      <Modal open={showModal.success} onClose={handleBack}>
        <ModalContent>
          <h2>Sucesso!</h2>
          <p>Pet excluído com sucesso!</p>
          <ModalActions>
            <Button
              type="button"
              background="#28a745"
              hover="#1e7e34"
              width="50%"
              onClick={handleBack}
            >
              Fechar
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </PageWrapper>
  );
};

export default Pets;
