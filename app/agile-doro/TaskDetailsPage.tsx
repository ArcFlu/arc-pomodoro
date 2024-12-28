import PomodoroMode from '../arc-timer/Pomodoro-Mode';

const TaskDetailsPage = () => {
  return (
    <div className='flex h-full w-2/3 flex-col items-center justify-center gap-2 border-4 border-red-500 p-2'>
      <h1>TASK BRUH</h1>
      <p>Time estimated: 5 minutes</p>
      <p>Actual time spent grinding: 9 hours</p>
      <PomodoroMode />
    </div>
  );
};

export default TaskDetailsPage;
