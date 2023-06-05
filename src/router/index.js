import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView';
import NotFoundView from '@/views/NotFoundView';
import ContactView from '@/views/ContactView';
import RoomsView from '@/views/RoomsView';
import CreateRoomView from '@/views/CreateRoomView';
import DrawerView from '@/views/DrawerView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomsView
  },
  {
    path: '/create/room',
    name: 'create room',
    component: CreateRoomView
  },
  {
    path: '/room/:roomid',
    name: 'room',
    component: DrawerView
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
