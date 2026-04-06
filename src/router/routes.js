

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Dashboard.vue'),
      },
       {
        path: '/outgoing/new',
        component: () => import('pages/OutGoing/NewDocument.vue'),
      },
       {
        path: '/outgoing/list',
        component: () => import('pages/OutGoing/OutGoingList.vue'),
        name: 'outgoing-list',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
