import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'boot/axios'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    document: {},
    documents: [],
  }),

  actions: {
    async Incoming_Document(){
try {
  const response = await api.get('')
  this.documents = response.data

} catch (error) {
 this.$q.notify({
          type: 'negative',
          message: 'Failed to create document. Please try again. ' + error.message,
        })
}
    },
    async NewDocument(payload) {
      try {
        const newdata = { ...payload, keywords: payload.keywords.join(','), encoded_by: 1 }
        const response = await api.post('/documents/new', newdata)
        console.log('Document created:', response.data)
        if (response.status === 201) {
          this.$q.notify({
            type: 'Positive',
            message: 'Document created successfully. ',
          })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Failed to create document. Please try again. ' + error.message,
        })
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDocumentStore, import.meta.hot))
}
