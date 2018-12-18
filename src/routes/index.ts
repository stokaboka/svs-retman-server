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
        route: '/users',
        controller: UsersController,
        action: 'users',
    },
    {
        method: 'put',
        route: '/user/:id',
        controller: UsersController,
        action: 'save',
    },
    {
        method: 'post',
        route: '/login',
        controller: UsersController,
        action: 'login',
    },
    {
        method: 'post',
        route: '/logout',
        controller: UsersController,
        action: 'logout',
    },
    {
        method: 'post',
        route: '/register',
        controller: UsersController,
        action: 'register',
    },

    {
        method: 'delete',
        route: '/user/:id',
        controller: UsersController,
        action: 'delete',
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
        action: 'all',
    },

    {
        method: 'get',
        route: '/words/scope/:scope',
        controller: DictionaryController,
        action: 'words',
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang1/:lang1',
        controller: DictionaryController,
        action: 'words',
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang2/:lang2',
        controller: DictionaryController,
        action: 'words',
    },

    {
        method: 'get',
        route: '/words/scope/:scope/lang1/:lang1/lang2/:lang2',
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
