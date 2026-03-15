export interface Pet {
  id?: number;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  peso: number;
  nome_dono: string;
  telefone_dono: string;
  status: string;
}

export interface PetsResponse {
  pets: Pet[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPetsParams {
  page?: number;
  limit?: number;
  search?: string;
}
