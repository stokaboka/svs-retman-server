import GroupsController from '../model/controller/GroupsController';
import UsersController from '../model/controller/UsersController';
import UsersGroupsController from '../model/controller/UsersGroupsController';
import WordsPairController from '../model/controller/WordsPairController';

const routes: any[] = [
    {
        method: 'get',
        route: '/g',
        controller: GroupsController,
        action: 'all',
    },

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

    {
        method: 'get',
        route: '/ug',
        controller: UsersGroupsController,
        action: 'all',
    },
    {
        method: 'get',
        route: '/wp',
        controller: WordsPairController,
        action: 'all',
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
