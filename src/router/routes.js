


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/admin/dashboard',
        component: () => import('pages/DashboardOffice.vue'),
        name: 'dashboard-office',
      },
       {
        path: '/office/dashboard',
        component: () => import('pages/DashboardOffice.vue'),
        name: 'dashboard-office',
      },
       {
        path: '/outgoing/new',
        component: () => import('pages/OutGoing/NewDocument.vue'),
      },
       {
        path: '/outgoing',
        component: () => import('pages/OutGoing/OutGoingList.vue'),
        name: 'outgoing-list',
      },
      {
        path: '/incoming',
        component: () => import('pages/InComing/IncomingList.vue'),
        name: 'incoming-list',
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
