import { useRef, createContext, useContext } from 'react';
import IdleTimer from 'react-idle-timer';
import { useRouter } from 'next/router';

import { useCognito } from '@components/context/AuthContext';

interface IdleTimerContextValue {
  resumeIdle: () => void;
  pauseIdle: () => void;
  resetIdle: () => void;
  resumeAndResetIdle: () => void;
}

const IdleTimerContext = createContext(null);

const IdleTimerProvder = ({ children }) => {
  const idleTimerRef = useRef<IdleTimer>(null);
  const { signOut } = useCognito();
  const router = useRouter();

  const resumeIdle = () => {
    const idleTimer = idleTimerRef.current;

    idleTimer.resume();
  };

  const pauseIdle = () => {
    const idleTimer = idleTimerRef.current;

    idleTimer.pause();
  };

  const resetIdle = () => {
    const idleTimer = idleTimerRef.current;

    idleTimer.reset();
  };

  const resumeAndResetIdle = () => {
    resumeIdle();
    resetIdle();
  };

  return (
    <>
      <IdleTimer
        ref={idleTimerRef as any}
        timeout={1000 * 60 * 15}
        onIdle={() => {
          signOut();
          router.push('/');
        }}
      />
      <IdleTimerContext.Provider
        value={{
          resumeIdle,
          pauseIdle,
          resetIdle,
          resumeAndResetIdle,
        }}
      >
        {children}
      </IdleTimerContext.Provider>
    </>
  );
};

export const useIdleTimer = (): IdleTimerContextValue => {
  return useContext(IdleTimerContext);
};

export default IdleTimerProvder;
