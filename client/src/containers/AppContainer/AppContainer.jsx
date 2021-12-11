import React, { lazy } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { Suspense } from '../../components/foundation/Suspense';
import { useModalState } from '../../contexts/ModalProvider';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';

const TimelineContainer = lazy(() => import('../TimelineContainer').then(module => ({ default: module.TimelineContainer })));
const UserProfileContainer = lazy(() => import('../UserProfileContainer').then(module => ({ default: module.UserProfileContainer })));
const PostContainer = lazy(() => import('../PostContainer').then(module => ({ default: module.PostContainer })));
const TermContainer = lazy(() => import('../TermContainer').then(module => ({ default: module.TermContainer })));
const NotFoundContainer = lazy(() => import('../NotFoundContainer').then(module => ({ default: module.NotFoundContainer })));

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const modalType = useModalState();

  if (isLoading) {
    return (
      <Helmet>
        <title>読込中 - CAwitter</title>
      </Helmet>
    );
  }

  return (
    <>
      <AppPage activeUser={activeUser}>
        <Routes>
          <Route element={<Suspense><TimelineContainer /></Suspense>} path="/" />
          <Route element={<Suspense><UserProfileContainer /></Suspense>} path="/users/:username" />
          <Route element={<Suspense><PostContainer /></Suspense>} path="/posts/:postId" />
          <Route element={<Suspense><TermContainer /></Suspense>} path="/terms" />
          <Route element={<Suspense><NotFoundContainer /></Suspense>} path="*" />
        </Routes>
      </AppPage>

      {modalType === 'auth' && <AuthModalContainer onUpdateActiveUser={setActiveUser} /> }
      {modalType === 'post' && <NewPostModalContainer />}
    </>
  );
};

export { AppContainer };
