import React from 'react';

import { AuthModalPage } from '../../components/auth_modal/AuthModalPage';
import { Modal } from '../../components/modal/Modal';
import { useModalState, useModalDispatch } from '../../contexts/ModalProvider';
import { sendJSON } from '../../utils/fetchers';

/**
 * @typedef {object} Props
 * @property {(user: Models.User) => void} onUpdateActiveUser
 */

/** @type {React.VFC<Props>} */
const AuthModalContainer = ({ onUpdateActiveUser }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const state = useModalState();
  const dispatch = useModalDispatch();

  const onRequestCloseModal = React.useCallback(() => {
    dispatch('none');
  }, []);

  const handleResetError = React.useCallback(() => {
    setHasError(false);
  }, []);

  const handleSubmit = React.useCallback(
    async ({ type, ...params }) => {
      try {
        setIsLoading(true);
        if (type === 'signin') {
          const user = await sendJSON('/api/v1/signin', params);
          onUpdateActiveUser(user);
        } else if (type === 'signup') {
          const user = await sendJSON('/api/v1/signup', params);
          onUpdateActiveUser(user);
        }
        onRequestCloseModal();
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onRequestCloseModal, onUpdateActiveUser],
  );

  if (state !== 'auth') return null;
  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <AuthModalPage
        hasError={hasError}
        isLoading={isLoading}
        onRequestCloseModal={onRequestCloseModal}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { AuthModalContainer };
