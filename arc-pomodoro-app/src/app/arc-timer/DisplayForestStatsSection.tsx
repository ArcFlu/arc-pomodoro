import { Paper } from '@mui/material';

const DisplayForestStatsSection: React.FC = () => {
  return (
    <Paper
      elevation={6}
      className='flex h-1/3 items-start justify-center border-4 border-blue-500'
    >
      <h1 className='pt-2 text-xl text-foreground'>
        Display Forest Stats Section
      </h1>
    </Paper>
  );
};

export default DisplayForestStatsSection;
