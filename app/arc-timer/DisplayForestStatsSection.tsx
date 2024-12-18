import { Card, ToggleModeButton } from '@/components/index';

const DisplayForestStatsSection: React.FC = () => {
  return (
    <Card className='flex h-1/3 items-start justify-center border-4 border-blue-500'>
      <h1 className='pt-2 text-xl'>Display Forest Stats Section</h1>
      <ToggleModeButton />
    </Card>
  );
};

export default DisplayForestStatsSection;
