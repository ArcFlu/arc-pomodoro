import { Card, CardContent } from '@/components/shadcn-ui/card';

const TaskPanel = () => {
  const TaskCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Card className='w-full max-w-sm bg-secondary'>
      <CardContent className='flex flex-col items-center p-2'>
        {children}
      </CardContent>
    </Card>
  );
  return (
    <div className='flex h-full w-1/3 flex-col items-center gap-2 border-4 border-cyan-500 p-2 py-8'>
      <TaskCard>
        <p className='m-0 bg-red-400 text-center text-primary'>Task Bruh</p>
      </TaskCard>
      <TaskCard>
        <p className='m-0 text-center text-primary'>Task ArcFlu</p>
      </TaskCard>
      <TaskCard>
        <p className='m-0 text-center text-primary'>Task A1</p>
      </TaskCard>
    </div>
  );
};

export default TaskPanel;
