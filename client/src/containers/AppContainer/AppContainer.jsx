import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import { AppPage } from '../../components/application/AppPage';
import { ModalProvider } from '../../contexts/ModalProvider';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';

const TimelineContainer = loadable(() => import('../TimelineContainer'), { resolveComponent: module => module['TimelineContainer'] });
const UserProfileContainer = loadable(() => import('../UserProfileContainer'), { resolveComponent: module => module['UserProfileContainer'] });
const PostContainer = loadable(() => import('../PostContainer'), { resolveComponent: module => module['PostContainer'] });
const TermContainer = loadable(() => import('../TermContainer'), { resolveComponent: module => module['TermContainer'] });
const NotFoundContainer = loadable(() => import('../NotFoundContainer'), { resolveComponent: module => module['NotFoundContainer'] });

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  return (
    <ModalProvider>
      <AppPage activeUser={activeUser}>
        <Routes>
          <Route element={<TimelineContainer />} path="/" />
          <Route element={<UserProfileContainer />} path="/users/:username" />
          <Route element={<PostContainer />} path="/posts/:postId" />
          <Route element={<TermContainer />} path="/terms" />
          <Route element={<NotFoundContainer />} path="*" />
        </Routes>
      </AppPage>
      <AuthModalContainer onUpdateActiveUser={setActiveUser} />
      <NewPostModalContainer />
    </ModalProvider>
  );
};

export { AppContainer };
