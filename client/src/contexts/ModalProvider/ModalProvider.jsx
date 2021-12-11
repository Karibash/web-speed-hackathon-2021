import React from 'react';

const ModalStateContext = React.createContext(undefined);
const ModalDispatchContext = React.createContext(undefined);

/**
 * @returns {'auth' | 'post' | 'none'}
 */
const useModalState = () => {
  const state = React.useContext(ModalStateContext);
  if (!state) throw new Error('Do not use useModalState outside of ModalProvider');
  return state;
};

/**
 * @returns {(state: 'auth' | 'post' | 'none') => void}
 */
const useModalDispatch = () => {
  const dispatch = React.useContext(ModalDispatchContext);
  if (!dispatch) throw new Error('Do not use useModalDispatch outside of ModalProvider');
  return dispatch;
};

/**
 * @param {string} state
 * @param {'auth' | 'post' | 'none'} action
 * @returns {string}
 */
const modalReducer = (state, action) => {
  switch (action) {
    case 'auth':
    case 'post':
    case 'none':
      return action;
    default:
      throw new Error(`Unhandled action: ${action}`);
  }
};

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 */

/** @type {React.VFC<Props>} */
const ModalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, 'none');
  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export { useModalState, useModalDispatch, ModalProvider };
