import React from 'react';

import CalendarAltIcon from '../../../assets/svg/fa-calendar-alt-regular.svg';
import { getProfileImagePath } from '../../../utils/get_path';
import { formatDate } from '../../../utils/format_date';

/**
 * @typedef {object} Props
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfileHeader = ({ user }) => {
  return (
    <header className="relative">
      <div className="h-32 bg-gray-300" style={{ backgroundColor: user.profileImage.averageColor }} />
      <div className="absolute left-2/4 m-0 w-28 h-28 bg-gray-300 border border-gray-300 rounded-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 sm:w-32 sm:h-32">
        <img src={getProfileImagePath(user.profileImage.id)} alt="" crossOrigin="anonymous" loading="eager" />
      </div>
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-gray-600 text-sm">
          <span className="pr-1">
            <CalendarAltIcon className="font-awesome" />
          </span>
          <span>
            <time dateTime={user.createdAt}>
              {formatDate(new Date(user.createdAt))}
            </time>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};

export { UserProfileHeader };
