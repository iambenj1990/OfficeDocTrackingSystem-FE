<template>
  <q-page padding>

    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Incoming Documents</div>
      <q-btn
        unelevated
        color="primary"
        label="New Document"
        icon="add"
        @click="$router.push('/outgoing/new')"
      />
    </div>

    <!-- Table -->
    <q-table
      :rows="documents"
      :columns="columns"
      :filter="filter"
      :loading="loading"
      row-key="id"
      flat
      bordered
      wrap-cells
      :pagination="pagination"
    >

      <!-- Top slot: search + filters -->
      <template #top>
        <div class="row full-width q-col-gutter-sm items-center">
          <div class="col-12 col-sm-4">
            <q-input
              v-model="filter"
              outlined
              dense
              placeholder="Search..."
              clearable
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              v-model="filterType"
              :options="documentTypeOptions"
              outlined
              dense
              clearable
              placeholder="Filter by type"
              emit-value
              map-options
            />
          </div>
          <div class="col-12 col-sm-3">
            <q-select
              v-model="filterStatus"
              :options="statusOptions"
              outlined
              dense
              clearable
              placeholder="Filter by status"
              emit-value
              map-options
            />
          </div>
        </div>
      </template>

      <!-- Document type badge -->
      <template #body-cell-document_type="props">
        <q-td :props="props">
          <q-badge
            outline
            :color="typeColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>

      <!-- Keywords chips -->
      <template #body-cell-keywords="props">
        <q-td :props="props">
          <div class="row q-gutter-xs">
            <q-chip
              v-for="kw in props.value"
              :key="kw"
              dense
              size="sm"
              color="grey-2"
              text-color="grey-8"
            >
              {{ kw }}
            </q-chip>
            <span v-if="!props.value.length" class="text-grey-5 text-caption">—</span>
          </div>
        </q-td>
      </template>

      <!-- Need approval -->
      <template #body-cell-need_approval="props">
        <q-td :props="props" auto-width>
          <q-icon
            :name="props.value ? 'check_circle' : 'remove'"
            :color="props.value ? 'warning' : 'grey-4'"
            size="20px"
          />
        </q-td>
      </template>

      <!-- Status badge -->
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="statusColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>

      <!-- Actions -->
      <template #body-cell-actions="props">
        <q-td :props="props" auto-width>
          <q-btn flat round dense icon="visibility" color="primary" size="sm" @click="onView(props.row)">
            <q-tooltip>View</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="edit" color="grey-7" size="sm" @click="onEdit(props.row)">
            <q-tooltip>Edit</q-tooltip>
          </q-btn>
          <q-btn flat round dense icon="delete" color="negative" size="sm" @click="onDelete(props.row)">
            <q-tooltip>Delete</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <!-- Empty state -->
      <template #no-data>
        <div class="full-width column flex-center q-pa-lg text-grey-6">
          <q-icon name="description" size="48px" class="q-mb-sm" />
          <div>No outgoing documents found.</div>
        </div>
      </template>

    </q-table>

    <!-- Delete confirmation dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card style="min-width: 320px">
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="28px" class="q-mr-sm" />
          <span class="text-subtitle1">Delete Document?</span>
        </q-card-section>
        <q-card-section class="q-pt-none text-body2 text-grey-7">
          Are you sure you want to delete <strong>{{ selectedRow?.title }}</strong>? This cannot be undone.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn unelevated label="Delete" color="negative" @click="confirmDelete" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'OutgoingDocumentTable',

  data () {
    return {
      loading: false,
      filter: '',
      filterType: null,
      filterStatus: null,
      deleteDialog: false,
      selectedRow: null,

      pagination: {
        sortBy: 'issue_date',
        descending: true,
        rowsPerPage: 10
      },

      columns: [
        {
          name: 'id',
          label: '#',
          field: 'id',
          align: 'left',
          sortable: true,
          style: 'width: 60px'
        },
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
          sortable: true
        },
        {
          name: 'subject',
          label: 'Subject',
          field: 'subject',
          align: 'left',
          sortable: true
        },
        {
          name: 'document_type',
          label: 'Type',
          field: 'document_type',
          align: 'left',
          sortable: true
        },
        {
          name: 'issuer',
          label: 'Issuer',
          field: 'issuer',
          align: 'left',
          sortable: true
        },
        {
          name: 'keywords',
          label: 'Keywords',
          field: 'keywords',
          align: 'left'
        },
        {
          name: 'issue_date',
          label: 'Issue Date',
          field: 'issue_date',
          align: 'left',
          sortable: true
        },
        {
          name: 'need_approval',
          label: 'Approval',
          field: 'need_approval',
          align: 'center',
          sortable: true
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          field: 'actions',
          align: 'center'
        }
      ],

      documentTypeOptions: [
        { label: 'Memorandum', value: 'Memorandum' },
        { label: 'Letter', value: 'Letter' },
        { label: 'Resolution', value: 'Resolution' },
        { label: 'Order', value: 'Order' },
        { label: 'Notice', value: 'Notice' },
        { label: 'Report', value: 'Report' },
        { label: 'Certificate', value: 'Certificate' },
        { label: 'Other', value: 'Other' }
      ],

      statusOptions: [
        { label: 'Draft', value: 'Draft' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Released', value: 'Released' },
        { label: 'Rejected', value: 'Rejected' }
      ],

      // Sample data — replace with API call
      documents: [
        {
          id: 1,
          title: 'Budget Allocation FY2026',
          subject: 'Annual budget memo',
          document_type: 'Memorandum',
          issuer: 'Finance Department',
          keywords: ['budget', 'FY2026', 'finance'],
          issue_date: '2026-01-15',
          need_approval: true,
          status: 'Approved'
        },
        {
          id: 2,
          title: 'Office Relocation Notice',
          subject: 'New office address effective Feb 1',
          document_type: 'Notice',
          issuer: 'Admin Office',
          keywords: ['relocation', 'office'],
          issue_date: '2026-01-20',
          need_approval: false,
          status: 'Released'
        },
        {
          id: 3,
          title: 'Q1 Operations Report',
          subject: 'Summary of Q1 operations',
          document_type: 'Report',
          issuer: 'Operations',
          keywords: ['Q1', 'operations', 'report'],
          issue_date: '2026-02-01',
          need_approval: true,
          status: 'Pending'
        },
        {
          id: 4,
          title: 'Leave Policy Update',
          subject: 'Revised leave policy',
          document_type: 'Memorandum',
          issuer: 'HR Department',
          keywords: ['HR', 'leave', 'policy'],
          issue_date: '2026-02-10',
          need_approval: true,
          status: 'Draft'
        },
        {
          id: 5,
          title: 'Partnership Agreement Letter',
          subject: 'Formal letter to ABC Corp',
          document_type: 'Letter',
          issuer: 'Executive Office',
          keywords: ['partnership', 'ABC Corp'],
          issue_date: '2026-03-01',
          need_approval: false,
          status: 'Released'
        }
      ]
    }
  },

  computed: {
    filteredDocuments () {
      let rows = this.documents

      if (this.filterType) {
        rows = rows.filter(r => r.document_type === this.filterType)
      }

      if (this.filterStatus) {
        rows = rows.filter(r => r.status === this.filterStatus)
      }

      return rows
    }
  },

  methods: {
    typeColor (type) {
      const map = {
        Memorandum: 'blue',
        Letter: 'teal',
        Resolution: 'purple',
        Order: 'deep-orange',
        Notice: 'amber',
        Report: 'indigo',
        Certificate: 'green',
        Other: 'grey'
      }
      return map[type] || 'grey'
    },

    statusColor (status) {
      const map = {
        Draft: 'grey',
        Pending: 'warning',
        Approved: 'positive',
        Released: 'primary',
        Rejected: 'negative'
      }
      return map[status] || 'grey'
    },

    onView (row) {
      this.$router.push(`/outgoing/${row.id}`)
    },

    onEdit (row) {
      this.$router.push(`/outgoing/${row.id}/edit`)
    },

    onDelete (row) {
      this.selectedRow = row
      this.deleteDialog = true
    },

    confirmDelete () {
      this.documents = this.documents.filter(d => d.id !== this.selectedRow.id)
      this.$q.notify({
        type: 'negative',
        message: `"${this.selectedRow.title}" has been deleted.`,
        position: 'top'
      })
      this.selectedRow = null
    }
  }
}
</script>
