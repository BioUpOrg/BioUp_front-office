import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';


export const useAuthActions = () => {
   /* const dispatch = useDispatch();
  
    const actions = useMemo(
      () =>
        bindActionCreators(
          {
            signUp: authActions.signUp,
          },
          dispatch
        ),
      [dispatch]
    );
  
  
    const signUp = useCallback((user) => actions.signUp(user), [actions]);
  
  
    return {
      signUp
    };*/
  };
