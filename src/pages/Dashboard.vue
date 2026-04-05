<template>
  <q-page padding>
    <div class="row q-col-gutter-md">

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-2" v-for="card in stats" :key="card.label">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center justify-between">
              <span class="text-caption text-grey">{{ card.label }}</span>
              <q-icon :name="card.icon" :color="card.color" size="24px" />
            </div>
            <div class="text-h4 text-weight-medium q-mt-sm">{{ card.value }}</div>
            <div class="text-caption text-grey q-mt-xs">
              <q-badge :color="card.badgeColor">{{ card.trend }}</q-badge>
              {{ card.sub }}
            </div>
          </q-card-section>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      stats: [
        { label: 'Total Documents', value: '1,284', icon: 'description', color: 'deep-purple', trend: '+12%', sub: 'vs last month', badgeColor: 'green' },
        { label: 'Pending Review',  value: '47',    icon: 'schedule',    color: 'amber-9',    trend: '+8',    sub: 'since yesterday', badgeColor: 'red' },
        { label: 'Approved',        value: '938',   icon: 'check_circle',color: 'green',      trend: '+5%',   sub: 'vs last month', badgeColor: 'green' },
      //  { label: 'Rejected',        value: '23',    icon: 'cancel',      color: 'red',        trend: '-2',    sub: 'vs last month', badgeColor: 'red' },
      //  { label: 'In Transit',      value: '76',    icon: 'local_shipping', color: 'blue',   trend: 'Active', sub: 'currently tracking', badgeColor: 'blue' },
        { label: 'Offices',         value: '18',    icon: 'home_work',   color: 'teal',       trend: 'Registered', sub: 'departments', badgeColor: 'teal' },
      ]
    }
  }
}
</script>
