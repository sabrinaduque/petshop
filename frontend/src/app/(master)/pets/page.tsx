'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { usePets } from '@/services/pets';

const HomePage = () => {
  const router = useRouter();
  const { data } = usePets({ page: 1, limit: 10 });

  return (
    <Paper sx={{ padding: 2 }}>
      <Button
        variant="contained"
        onClick={() => router.push('/pets/registrar')}
      >
        Adicionar
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Espécie</TableCell>
            <TableCell>Raça</TableCell>
            <TableCell>Dono</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.pets.map(pet => (
            <TableRow key={pet.id}>
              <TableCell>{pet.nome}</TableCell>
              <TableCell>{pet.especie}</TableCell>
              <TableCell>{pet.raca}</TableCell>
              <TableCell>{pet.nome_dono}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default HomePage;
