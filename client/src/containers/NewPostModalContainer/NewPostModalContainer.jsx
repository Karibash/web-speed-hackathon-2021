import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../../components/modal/Modal';
import { NewPostModalPage } from '../../components/new_post_modal/NewPostModalPage';
import { useModalState, useModalDispatch } from '../../contexts/ModalProvider';
import { sendFile, sendJSON } from '../../utils/fetchers';

/**
 * @param {object} params
 * @param {Array<File>} [params.images]
 * @param {File} [params.movie]
 * @param {File} [params.sound]
 * @param {string} params.text
 * @returns {Promise<Models.Post>}
 */
async function sendNewPost({ images, movie, sound, text }) {
  const payload = {
    images: images ? await Promise.all(images.map((image) => sendFile('/api/v1/images', image))) : [],
    movie: movie ? await sendFile('/api/v1/movies', movie) : undefined,
    sound: sound ? await sendFile('/api/v1/sounds', sound) : undefined,
    text,
  };

  return sendJSON('/api/v1/posts', payload);
}

/** @type {React.VFC} */
const NewPostModalContainer = () => {
  const navigate = useNavigate();

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
    async (params) => {
      try {
        setIsLoading(true);
        const post = await sendNewPost(params);
        onRequestCloseModal();
        navigate(`/posts/${post.id}`);
      } catch (_err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onRequestCloseModal, navigate],
  );

  if (state !== 'post') return null;
  return (
    <Modal onRequestCloseModal={onRequestCloseModal}>
      <NewPostModalPage
        hasError={hasError}
        isLoading={isLoading}
        onResetError={handleResetError}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

export { NewPostModalContainer };
