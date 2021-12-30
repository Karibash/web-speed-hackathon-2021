import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { AuthModalContainer } from '../AuthModalContainer';
import { NewPostModalContainer } from '../NewPostModalContainer';

const TimelineContainer = loadable(() => import('../TimelineContainer').then(module => ({ default: module.TimelineContainer })));
const UserProfileContainer = loadable(() => import('../UserProfileContainer').then(module => ({ default: module.UserProfileContainer })));
const PostContainer = loadable(() => import('../PostContainer').then(module => ({ default: module.PostContainer })));
const TermContainer = loadable(() => import('../TermContainer').then(module => ({ default: module.TermContainer })));
const NotFoundContainer = loadable(() => import('../NotFoundContainer').then(module => ({ default: module.NotFoundContainer })));

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
    <>
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
    </>
  );
};

export { AppContainer };
