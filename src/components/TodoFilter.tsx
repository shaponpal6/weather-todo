import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { UpdateFilter, OnSelect } from '../types';

interface TodoFilterProps {
  updateFilter: UpdateFilter;
  filt: string;
}

export default function TodoFilter({ updateFilter, filt }: TodoFilterProps) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'like', label: 'Completed' }
  ];

  const onSelect: OnSelect = (item) => {
    updateFilter(item.name);
  };

  const butt = buttons.map((item) => {
    const active = filt === item.name;
    const color = active ? "success" : "primary";
    return (
      <Button key={item.name} color={color} onClick={() => onSelect(item)} variant="contained">{item.label}</Button>
    );
  });

  return <Stack spacing={2} direction="row">{butt}</Stack>;
}
