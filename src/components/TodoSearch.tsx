import { UpdateSearch } from '../types';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface TodoSearchProps {
  updateSearch: UpdateSearch;
}

export default function TodoSearch({ updateSearch }: TodoSearchProps) {
  const [search, setSearch] = useState('')

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);
    updateSearch(text);
  };
  
  return (
    <div>
      <Stack
        component="form"
        sx={{
          width: '25ch',
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          defaultValue="Normal"
          variant="filled"
          onChange={onUpdate}
          value={search}
        />
      </Stack>
    </div>
  );
}
