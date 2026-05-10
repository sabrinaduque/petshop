'use client';

import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosTrash } from 'react-icons/io';

import { useDeletePet, useDetailPets } from '@/services/pets';
import { maskPhone } from '@/utils/mask';

import Button from '@/components/Button/Button';
import { LuTrash2 } from 'react-icons/lu';
import { useState } from 'react';
import { Modal } from '@mui/material';
import {
  Container,
  ContentBox,
  Field,
  Grid,
  Label,
  Title,
  TitleLeft,
  Value,
} from './styles';
import { ModalActions, ModalContent } from '../PetsForm/styles';

const PetsDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: pet, isLoading, isError } = useDetailPets(id);
  const [showModal, setShowModal] = useState({
    warning: false,
    success: false,
  });

  const deleteMutation = useDeletePet();

  const handleCloseModal = () => {
    setShowModal({
      warning: false,
      success: false,
    });
  };

  const handleDelete = async () => {
    if (!id || Number.isNaN(id)) return;

    await deleteMutation.mutateAsync(Number(id), {
      onSuccess: () => {
        setShowModal({
          ...showModal,
          warning: false,
          success: true,
        });
      },
    });
  };

  return (
    <Container>
      <Title>
        <TitleLeft>
          <IoIosArrowBack
            onClick={() => router.back()}
            style={{ cursor: 'pointer' }}
          />
          Detalhes do pet
        </TitleLeft>

        <Button
          type="button"
          onClick={() => setShowModal({ ...showModal, warning: true })}
          disabled={!id || isLoading || deleteMutation.isPending}
          width="150px"
        >
          Excluir pet
          <LuTrash2 size={18} />
        </Button>
      </Title>

      <ContentBox>
        {!id && <p>ID do pet inválido.</p>}
        {id && isLoading && <p>Carregando...</p>}
        {id && isError && <p>Não foi possível carregar os detalhes.</p>}

        {pet && (
          <Grid>
            <Field>
              <Label>Nome</Label>
              <Value>{pet.nome || '--'}</Value>
            </Field>

            <Field>
              <Label>Espécie</Label>
              <Value>{pet.especie || '--'}</Value>
            </Field>

            <Field>
              <Label>Raça</Label>
              <Value>{pet.raca || '--'}</Value>
            </Field>

            <Field>
              <Label>Status</Label>
              <Value>{pet.status || '--'}</Value>
            </Field>

            <Field>
              <Label>Idade</Label>
              <Value>
                {typeof pet.idade === 'number' ? `${pet.idade}` : '--'}
              </Value>
            </Field>

            <Field>
              <Label>Peso</Label>
              <Value>
                {pet.peso !== undefined && pet.peso !== null
                  ? `${pet.peso}`
                  : '--'}
              </Value>
            </Field>

            <Field>
              <Label>Nome do dono</Label>
              <Value>{pet.nome_dono || '--'}</Value>
            </Field>

            <Field>
              <Label>Telefone do dono</Label>
              <Value>
                {pet.telefone_dono ? maskPhone(pet.telefone_dono) : '--'}
              </Value>
            </Field>
          </Grid>
        )}
      </ContentBox>

      <Modal open={showModal.warning} onClose={handleCloseModal}>
        <ModalContent>
          <h2>Excluir Pet</h2>
          <p>Tem certeza que deseja excluir este pet?</p>
          <ModalActions>
            <Button
              type="button"
              background="#28a745"
              hover="#1e7e34"
              width="90px"
              onClick={handleCloseModal}
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
              onClick={() => handleDelete()}
            >
              Excluir
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>

      <Modal
        open={showModal.success}
        onClose={() => {
          setShowModal({ ...showModal, success: false });
          router.push('/pets');
        }}
      >
        <ModalContent>
          <h2>Sucesso!</h2>
          <p>Pet excluído com sucesso!</p>
          <ModalActions>
            <Button
              type="button"
              background="#28a745"
              hover="#1e7e34"
              width="50%"
              onClick={() => {
                setShowModal({ ...showModal, success: false });
                router.push('/pets');
              }}
            >
              Fechar
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PetsDetails;
