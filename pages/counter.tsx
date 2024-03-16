// components/Counter.tsx

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { increment, decrement } from '@/redux/slice';

function Counter() {
  const dispatch: AppDispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count.value);
  console.log(count)
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;
