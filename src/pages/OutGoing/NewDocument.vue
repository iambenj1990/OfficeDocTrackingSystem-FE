<template>
  <q-page padding>
    <div class="text-h6 q-mb-md">New Outgoing Document</div>

    <q-form @submit.prevent="onSubmit" @reset="onReset">
      <q-card flat bordered class="q-pa-md">

        <!-- Document Information -->
        <div class="section-label q-mb-sm">Document Information</div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12">
            <q-input
              v-model="form.title"
              label="Title *"
              outlined
              dense
              placeholder="e.g. Memorandum on Budget Allocation"
              :rules="[val => !!val || 'Title is required']"
              lazy-rules
            />
          </div>
          <div class="col-12">
            <q-input
              v-model="form.subject"
              label="Description *"
              outlined
              dense
              placeholder="Brief description"
              :rules="[val => !!val || 'Description is required']"
              lazy-rules
            />
          </div>
          <div class="col-12">
            <q-select
              v-model="form.keywords"
              label="Keywords"
              outlined
              dense
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              placeholder="Type and press Enter..."
              hint="Press Enter to add each keyword"
            />
          </div>
        </div>

        <q-separator class="q-mb-md" />

        <!-- Issuer & Contact -->
        <div class="section-label q-mb-sm">Issuer &amp; Contact</div>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="form.issuer"
              label="Issuer *"
              outlined
              dense
              placeholder="Department or individual name"
              :rules="[val => !!val || 'Issuer is required']"
              lazy-rules
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="form.contact_person"
              label="Contact Person"
              outlined
              dense
              placeholder="Full name"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="form.contact_number"
              label="Contact Number"
              outlined
              dense
              placeholder="+63 XXX XXX XXXX"
              type="tel"
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-select
              v-model="form.document_type"
              label="Document Type *"
              outlined
              dense
              :options="documentTypeOptions"
              :rules="[val => !!val || 'Document type is required']"
              lazy-rules
              emit-value
              map-options
            />
          </div>
        </div>

        <q-separator class="q-mb-md" />

        <!-- Dates -->
        <div class="section-label q-mb-sm">Dates</div>
        <div class="row q-col-gutter-md q-mb-sm">
          <div class="col-12 col-sm-6">
            <q-input
              v-model="form.issue_date"
              label="Issue Date *"
              outlined
              dense
              type="date"
              :rules="[val => !!val || 'Issue date is required']"
              lazy-rules
              stack-label
            />
          </div>
          <div class="col-12 col-sm-6">
            <q-input
              v-model="form.effect_date"
              label="Effectivity Date"
              outlined
              dense
              type="date"
              stack-label
            />
          </div>
        </div>

        <div class="q-mb-md">
          <q-checkbox
            v-model="form.range_dates"
            label="Use date range"
          >
            <q-tooltip>Document covers a specific start and end period</q-tooltip>
          </q-checkbox>

          <q-slide-transition>
            <div v-if="form.range_dates" class="row q-col-gutter-md q-mt-xs q-pa-sm range-bg rounded-borders">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.range_date_start"
                  label="Range Start"
                  outlined
                  dense
                  type="date"
                  stack-label
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.range_date_end"
                  label="Range End"
                  outlined
                  dense
                  type="date"
                  stack-label
                />
              </div>
            </div>
          </q-slide-transition>
        </div>

        <q-separator class="q-mb-md" />

        <!-- Approval -->
        <div class="section-label q-mb-sm">Approval</div>
        <div class="row items-center q-mb-md">
          <q-checkbox
            v-model="form.need_approval"
            label="Requires approval before release"
          />
          <q-badge
            v-if="form.need_approval"
            color="warning"
            text-color="dark"
            label="Pending Approval"
            class="q-ml-sm"
          />
        </div>

        <q-separator class="q-mb-md" />

        <!-- Actions -->
        <div class="row justify-end q-gutter-sm">
          <q-btn
            flat
            label="Clear"
            type="reset"
            color="grey-7"
          />
          <q-btn
            outline
            label="Save as Draft"
            color="primary"
            @click="onSaveDraft"
          />
          <q-btn
            unelevated
            label="Submit Document"
            type="submit"
            color="primary"
          />
        </div>

      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'OutgoingDocumentForm',

  data () {
    return {
      form: {
        title: '',
        subject: '',
        keywords: [],
        issuer: '',
        contact_person: '',
        contact_number: '',
        document_type: null,
        issue_date: '',
        effect_date: '',
        range_dates: false,
        range_date_start: '',
        range_date_end: '',
        need_approval: false
      },

      documentTypeOptions: [
        { label: 'Memorandum', value: 'memorandum' },
        { label: 'Letter', value: 'letter' },
        { label: 'Resolution', value: 'resolution' },
        { label: 'Order', value: 'order' },
        { label: 'Notice', value: 'notice' },
        { label: 'Report', value: 'report' },
        { label: 'Certificate', value: 'certificate' },
        { label: 'Other', value: 'other' }
      ]
    }
  },

  methods: {
    onSubmit () {
      this.$q.notify({
        type: 'positive',
        message: 'Document submitted successfully.',
        position: 'top'
      })
      console.log('Form data:', this.form)
    },

    onReset () {
      this.form = {
        title: '',
        subject: '',
        keywords: [],
        issuer: '',
        contact_person: '',
        contact_number: '',
        document_type: null,
        issue_date: '',
        effect_date: '',
        range_dates: false,
        range_date_start: '',
        range_date_end: '',
        need_approval: false
      }
    },

    onSaveDraft () {
      this.$q.notify({
        type: 'info',
        message: 'Draft saved.',
        position: 'top'
      })
      console.log('Draft data:', this.form)
    }
  }
}
</script>

<style scoped>
.section-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: grey;
}

.range-bg {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
