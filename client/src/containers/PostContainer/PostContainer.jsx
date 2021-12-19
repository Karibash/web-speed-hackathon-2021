import React from 'react';

import { InfiniteScroll } from '../../components/foundation/InfiniteScroll';
import { Title } from '../../components/foundation/Title';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

/** @type {React.VFC} */
const PostContainer = ({ postId }) => {
  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  if (isLoadingPost) {
    return <Title>読込中 - CAwitter</Title>;
  }

  if (post === null) {
    return <NotFoundContainer />;
  }

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <Title>{post.user.name} さんのつぶやき - CAwitter</Title>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export { PostContainer };
