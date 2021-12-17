import React from 'react';
import { Helmet } from 'react-helmet';
import { Router, lazy } from 'preact-iso';

import { AppPage } from '../../components/application/AppPage';
import { Route } from '../../components/foundation/Route';
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
          <Route component={TimelineContainer} path="/" />
          <Route component={UserProfileContainer} path="/users/:username" />
          <Route component={PostContainer} path="/posts/:postId" />
          <Route component={TermContainer} path="/terms" />
          <Route component={NotFoundContainer} path="*" />
        </Router>
      </AppPage>
      <AuthModalContainer onUpdateActiveUser={setActiveUser} />
      <NewPostModalContainer />
    </>
  );
};

export { AppContainer };
