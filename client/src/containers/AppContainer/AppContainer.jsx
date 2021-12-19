import React from 'react';
import { Helmet } from 'react-helmet';
import { Router } from 'preact-router';
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
  const onChangeRoute = React.useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

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
        <Router onChange={onChangeRoute}>
          <TimelineContainer path="/" />
          <UserProfileContainer path="/users/:username" />
          <PostContainer path="/posts/:postId" />
          <TermContainer path="/terms" />
          <NotFoundContainer path="*" />
        </Router>
      </AppPage>
      <AuthModalContainer onUpdateActiveUser={setActiveUser} />
      <NewPostModalContainer />
    </>
  );
};

export { AppContainer };
