import DictionaryController from '../model/controller/DictionaryController';
import GroupsController from '../model/controller/GroupsController';
import UsersController from '../model/controller/UsersController';
import UsersGroupsController from '../model/controller/UsersGroupsController';

const routes: any[] = [
    /**
     * Groups
     */
    {
        method: 'get',
        route: '/g',
        controller: GroupsController,
        action: 'all',
    },

    /**
     * Users
     */
    {
        method: 'get',
        route: '/u',
        controller: UsersController,
        action: 'all',
    },
    {
        method: 'post',
        route: '/u',
        controller: UsersController,
        action: 'save',
    },
    {
        method: 'get',
        route: '/login',
        controller: UsersController,
        action: 'login',
    },
    {
        method: 'get',
        route: '/logout',
        controller: UsersController,
        action: 'logout',
    },
    {
        method: 'put',
        route: '/register',
        controller: UsersController,
        action: 'register',
    },

    /**
     * UsersGroups
     */
    {
        method: 'get',
        route: '/ug',
        controller: UsersGroupsController,
        action: 'all',
    },

    /**
     * Dictionary
     */
    {
        method: 'get',
        route: '/words',
        controller: DictionaryController,
        action: 'words',
    },

//     {
//     method: 'post',
//     route: '/users',
//     controller: UserController,
//     action: 'save'
// }, {
//     method: 'delete',
//     route: '/users',
//     controller: UserController,
//     action: 'remove'
// }, {
//     method: 'get',
//     route: '/photos',
//     controller: PhotoController,
//     action: 'all'
// }
];

export default routes;
