<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated>
      <q-toolbar style="background-color: #27ae60">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-subtitle1 text-weight-regular">
          TrackDocs

          <div class="text-white text-caption text-weight-regular" style="margin-top: -4px">
            Document Management & Tracking System
          </div>
        </q-toolbar-title>

        <div>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-mt-md">
        <q-item clickable v-ripple @click="$router.push({ name: 'dashboard-office' })">
          <q-item-section avatar>
            <q-icon name="donut_small" size="35px" style="color: #8e44ad" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="all_inbox" size="35px" color="brown" />
            </q-item-section>
            <q-item-section >
              <q-item-label>Document Management</q-item-label>
            </q-item-section>
          </template>

          <q-list class="text-weight-regular text-subtitle2 q-pl-md">
            <q-item clickable v-ripple @click="$router.push({name:'incoming-list'})">
              <q-item-section avatar>
                <q-icon name="mark_email_unread" size="24px" color="red" />
              </q-item-section>
              <q-item-section>Incoming Documents
              </q-item-section>
                <q-badge class="text-caption" rounded color="red" text-color="white">
                  5
                </q-badge>
            </q-item>

            <q-item clickable v-ripple @click="$router.push({ name: 'outgoing-list' })">
              <q-item-section avatar>
                <q-icon name="create_new_folder" size="24px" color="green" />
              </q-item-section>
              <q-item-section>Outgoing Documents</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="archive" size="24px" color="orange" />
              </q-item-section>
              <q-item-section>Archived Documents</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item default-opened>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="settings" size="35px" color="grey-8" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Settings</q-item-label>
            </q-item-section>
          </template>
           <q-item clickable v-ripple class="q-ml-md">
              <q-item-section avatar>
                <q-icon name="tune" size="24px" style="color: #3498db;"/>
              </q-item-section>
              <q-item-section>Libraries</q-item-section>
            </q-item>
             <q-item clickable v-ripple class="q-ml-md">
              <q-item-section avatar>
                <q-icon name="supervisor_account" size="24px" color="purple" />
              </q-item-section>
              <q-item-section>User Management</q-item-section>
            </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {},

  setup() {
    return {}
  },

  data() {
    return {
      leftDrawerOpen: false,
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  },
}
</script>
