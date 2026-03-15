import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useRouter, useParams } from 'next/navigation';
import Modal from '@mui/material/Modal';
import { IoIosArrowBack } from 'react-icons/io';
import { LuSave } from 'react-icons/lu';

import { maskPhone, unmaskPhone } from '@/utils/mask';
import {
  RegisterPetFormData,
  RegisterPetSchema,
} from '@/validations/RegisterPetsSchema';
import { useCreatePets } from '@/services/pets';
import handleError from '@/utils/handleToast';
import {
  Container,
  Title,
  ContentBox,
  Footer,
  ContentWrapper,
  FormGrid,
  FormRow,
  ModalContent,
  ModalActions,
} from './styles';

const PetForm = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;
  const isEditMode = !!id;
  const createMutation = useCreatePets();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  // const editMutation = useEditPet(id as string);
  // const { data } = useDetailsPet(id as string);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterPetFormData>({
    resolver: yupResolver(RegisterPetSchema),
  });

  const { isPending } = createMutation;

  // useEffect(() => {
  //   if (isEditMode && id) {
  //     reset({});
  //   }
  // }, [isEditMode, id, data, reset]);

  const onSubmit = async (formData: RegisterPetFormData) => {
    try {
      if (isEditMode && id) {
        // const payload = formData;
        // await editPetMutation.mutateAsync({
        //
        // });

        return;
      }

      const payload = formData;
      await createMutation.mutateAsync({
        nome: payload.nome,
        especie: payload.especie,
        raca: payload.raca,
        idade: payload.idade,
        peso: payload.peso,
        nome_dono: payload.nome_dono,
        telefone_dono: unmaskPhone(payload.telefone_dono ?? ''),
        status: payload.status,
      });
      setIsSuccessOpen(true);
      reset();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Container>
      <Title>
        <IoIosArrowBack onClick={handleBack} style={{ cursor: 'pointer' }} />
        {isEditMode ? 'Editar pet' : 'Adicionar pet'}
      </Title>

      <ContentWrapper>
        <ContentBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGrid>
              <FormRow>
                <Input
                  label="Nome"
                  labelVariant="bold"
                  placeholder="Digite o nome"
                  {...register('nome')}
                  error={errors.nome?.message}
                />

                <Input
                  label="Espécie"
                  labelVariant="bold"
                  placeholder="Digite a espécie"
                  {...register('especie')}
                  error={errors.especie?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Raça"
                  placeholder="Digite a raça"
                  {...register('raca')}
                  error={errors.raca?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Idade"
                  placeholder="Digite a idade"
                  {...register('idade')}
                  error={errors.idade?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Peso"
                  placeholder="Digite o peso"
                  {...register('peso')}
                  error={errors.peso?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Status"
                  placeholder="Digite o status"
                  {...register('status')}
                  error={errors.status?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Nome do dono"
                  placeholder="Digite o nome do dono"
                  {...register('nome_dono')}
                  error={errors.nome_dono?.message}
                />

                <Input
                  labelVariant="bold"
                  label="Telefone do dono"
                  placeholder="Digite os números"
                  maskFunction={maskPhone}
                  {...register('telefone_dono')}
                  error={errors.telefone_dono?.message}
                />
              </FormRow>
            </FormGrid>

            <Footer>
              <Button
                type="submit"
                background="#4fa3b6"
                hover="#1f5f6f"
                width="auto"
                disabled={isPending}
              >
                <LuSave />
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </Footer>
          </form>
        </ContentBox>
      </ContentWrapper>

      <Modal open={isSuccessOpen} onClose={handleCloseSuccess}>
        <ModalContent>
          <h2>Sucesso!</h2>
          <p>Pet cadastrado com sucesso.</p>
          <ModalActions>
            <Button
              type="button"
              background="#4fa3b6"
              hover="#1f5f6f"
              width="auto"
              onClick={handleBack}
            >
              Voltar
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default PetForm;
