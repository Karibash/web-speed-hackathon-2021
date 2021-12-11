import React from 'react';

import BalanceScaleIcon from '../../../assets/svg/fa-balance-scale-solid.svg';
import EditIcon from '../../../assets/svg/fa-edit-solid.svg';
import HomeIcon from '../../../assets/svg/fa-home-solid.svg';
import SignInAltIcon from '../../../assets/svg/fa-sign-in-alt-solid.svg';
import UserIcon from '../../../assets/svg/fa-user-solid.svg';
import { useModalDispatch } from '../../../contexts/ModalProvider';
import { NavigationItem } from '../NavigationItem';

/**
 * @typedef {object} Props
 * @property {Models.User | null} activeUser
 */

/** @type {React.VFC<Props>} */
const Navigation = ({ activeUser }) => {
  const dispatch = useModalDispatch();

  const onRequestOpenPostModal = React.useCallback(() => {
    dispatch('post');
  }, []);

  const onRequestOpenAuthModal = React.useCallback(() => {
    dispatch('auth');
  }, []);

  return (
    <nav className="fixed z-10 bottom-0 left-0 right-0 h-12 bg-white border-t border-gray-300 lg:relative lg:w-48 lg:h-full lg:border-r lg:border-t-0">
      <ul className="relative grid grid-flow-col items-center justify-evenly lg:fixed lg:gap-2 lg:grid-flow-row lg:justify-start lg:p-2 lg:w-48 lg:h-full lg:auto-rows-min">
        <NavigationItem href="/" icon={<HomeIcon className="font-awesome" />} text="ホーム" />
        {activeUser !== null ? (
          <NavigationItem
            icon={<EditIcon className="font-awesome" />}
            onClick={onRequestOpenPostModal}
            text="投稿する"
          />
        ) : null}
        {activeUser !== null ? (
          <NavigationItem
            href={`/users/${activeUser.username}`}
            icon={<UserIcon className="font-awesome" />}
            text="マイページ"
          />
        ) : null}
        {activeUser === null ? (
          <NavigationItem
            icon={<SignInAltIcon className="font-awesome" />}
            onClick={onRequestOpenAuthModal}
            text="サインイン"
          />
        ) : null}
        <NavigationItem
          href="/terms"
          icon={<BalanceScaleIcon className="font-awesome" />}
          text="利用規約"
        />
      </ul>
    </nav>
  );
};

export { Navigation };
