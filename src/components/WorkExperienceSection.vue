<template>
  <div class="form-section">
    <div class="section-header">Work Experience</div>
    <form @submit.prevent="handleSubmit">
      <div v-for="(experience, index) in localData.workExperience" :key="index" class="dynamic-field">
        <button
          type="button"
          @click="removeExperience(index)"
          class="remove-btn"
          v-if="localData.workExperience.length > 1"
        >
          Remove
        </button>

        <div class="form-group">
          <label>Job Title</label>
          <input
            type="text"
            v-model="experience.title"
            placeholder="e.g., Software Developer"
            @input="updateFormData"
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Company</label>
            <input
              type="text"
              v-model="experience.company"
              placeholder="Company name"
              @input="updateFormData"
            />
          </div>
          <div class="form-group">
            <label>Duration</label>
            <input
              type="text"
              v-model="experience.duration"
              placeholder="e.g., Jan 2020 - Present"
              @input="updateFormData"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="experience.description"
            placeholder="Describe your responsibilities and achievements..."
            @input="updateFormData"
          ></textarea>
        </div>
      </div>

      <button type="button" @click="addExperience" class="add-btn">
        + Add Work Experience
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
  name: 'WorkExperienceSection',
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
        workExperience: [
          {
            title: '',
            company: '',
            duration: '',
            description: ''
          }
        ]
      }
    }
  },
  watch: {
    formData: {
      handler(newData) {
        if (newData.workExperience && newData.workExperience.length > 0) {
          this.localData.workExperience = [...newData.workExperience]
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addExperience() {
      this.localData.workExperience.push({
        title: '',
        company: '',
        duration: '',
        description: ''
      })
      this.updateFormData()
    },
    removeExperience(index) {
      if (this.localData.workExperience.length > 1) {
        this.localData.workExperience.splice(index, 1)
        this.updateFormData()
      }
    },
    updateFormData() {
      this.$emit('update:formData', { workExperience: this.localData.workExperience })
    },
    handleSubmit() {
      this.$emit('next')
    }
  }
}
</script>
