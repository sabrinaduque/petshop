import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import handleError from '@/utils/handleToast';
import { IPetsParams, Pet, PetsResponse } from '@/interfaces/pets.interface';
import api from './api';

export const usePets = (params: IPetsParams) => {
  const getPets = async () => {
    const { data } = await api.get<PetsResponse>('/pets', {
      params,
    });

    return data;
  };

  return useQuery({
    queryKey: ['getPets', params],
    queryFn: getPets,
  });
};

export const useDetailPets = (id: string) => {
  const getPet = async () => {
    const { data } = await api.get<Pet>(`/pets/${id}`);
    return data;
  };

  return useQuery({
    queryKey: ['getDetailPets', id],
    queryFn: getPet,
    enabled: !!id,
  });
};

export const useCreatePets = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Pet) => {
      const { data: response } = await api.post('/pets', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPets'] });
    },
    onError: error => {
      handleError(error);
    },
  });
};

export const useEditPet = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Pet) => {
      const { data: response } = await api.put(`/pets/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getPets'] });
    },
    onError: error => {
      handleError(error);
    },
  });
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/pets/${id}`);
      return data;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['getPets'] });
      queryClient.invalidateQueries({
        queryKey: ['getDetailPets', String(id)],
      });
    },
    onError: error => {
      handleError(error);
    },
  });
};
