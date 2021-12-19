import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { Title } from '../../components/foundation/Title';
import { UserProfilePage } from '../../components/user_profile/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

/** @type {React.VFC} */
const UserProfileContainer = ({ username }) => {
  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON);

  if (isLoadingUser) {
    return <Title>読込中 - CAwitter</Title>;
  }

  if (user === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Title>{user.name} さんのタイムライン - CAwitter</Title>
      <UserProfilePage timeline={posts} user={user} />
    </InfiniteScroll>
  );
};

export { UserProfileContainer };
