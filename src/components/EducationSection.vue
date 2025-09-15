<template>
  <div class="form-section">
    <div class="section-header">Education</div>
    <form @submit.prevent="handleSubmit">
      <div v-for="(education, index) in localData.education" :key="index" class="dynamic-field">
        <button
          type="button"
          @click="removeEducation(index)"
          class="remove-btn"
          v-if="localData.education.length > 1"
        >
          Remove
        </button>

        <div class="form-group">
          <label>Degree/Qualification</label>
          <input
            type="text"
            v-model="education.degree"
            placeholder="e.g., Bachelor of Computer Science"
            @input="updateFormData"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Institution</label>
            <input
              type="text"
              v-model="education.institution"
              placeholder="University/School name"
              @input="updateFormData"
            />
          </div>
          <div class="form-group">
            <label>Year</label>
            <input
              type="text"
              v-model="education.year"
              placeholder="e.g., 2020-2024"
              @input="updateFormData"
            />
          </div>
        </div>
      </div>

      <button type="button" @click="addEducation" class="add-btn">
        + Add Education
      </button>

      <div class="form-actions">
        <button type="button" @click="$emit('previous')" class="btn btn-secondary">Previous</button>
        <button type="submit" class="btn btn-primary">Next Step</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EducationSection',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  emits: ['update:formData', 'next', 'previous'],
  data() {
    return {
      localData: {
        education: [
          {
            degree: '',
            institution: '',
            year: ''
          }
        ]
      }
    }
  },
  watch: {
    formData: {
      handler(newData) {
        if (newData.education && newData.education.length > 0) {
          this.localData.education = [...newData.education]
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addEducation() {
      this.localData.education.push({
        degree: '',
        institution: '',
        year: ''
      })
      this.updateFormData()
    },
    removeEducation(index) {
      if (this.localData.education.length > 1) {
        this.localData.education.splice(index, 1)
        this.updateFormData()
      }
    },
    updateFormData() {
      this.$emit('update:formData', { education: this.localData.education })
    },
    handleSubmit() {
      this.$emit('next')
    }
  }
}
</script>
