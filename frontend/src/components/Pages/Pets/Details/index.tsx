'use client';

import { useParams, useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

import { useDetailPets } from '@/services/pets';
import { maskPhone } from '@/utils/mask';

import {
  Container,
  ContentBox,
  Field,
  Grid,
  Label,
  Title,
  Value,
} from './styles';

const PetsDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: pet, isLoading, isError } = useDetailPets(id);

  const handleBack = () => {
    router.back();
  };

  return (
    <Container>
      <Title>
        <IoIosArrowBack onClick={handleBack} style={{ cursor: 'pointer' }} />
        Detalhes do pet
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
    </Container>
  );
};

export default PetsDetails;
