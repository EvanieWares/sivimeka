<template>
  <div class="form-section">
    <div class="section-header">Job Information</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="jobTitle">Job Title *</label>
        <input
          type="text"
          id="jobTitle"
          v-model="localData.jobTitle"
          required
          placeholder="e.g., Senior Software Engineer"
          :class="{ error: errors.jobTitle }"
          @input="$emit('update:formData', localData)"
        />
        <span v-if="errors.jobTitle" class="error-message">{{ errors.jobTitle }}</span>
      </div>

      <div class="form-group">
        <label for="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          v-model="localData.jobDescription"
          placeholder="Describe the position you're applying for..."
          @input="$emit('update:formData', localData)"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="summary">Professional Summary</label>
        <textarea
          id="summary"
          v-model="localData.summary"
          placeholder="Write a brief summary of your professional background..."
          @input="$emit('update:formData', localData)"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="skills">Skills</label>
        <textarea
          id="skills"
          v-model="localData.skills"
          placeholder="e.g., JavaScript, Vue.js, Python, Project Management..."
          @input="$emit('update:formData', localData)"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="$emit('previous')" class="btn btn-secondary">Previous</button>
        <button type="submit" class="btn btn-primary">Next Step</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'JobInfoSection',
  props: {
    formData: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:formData', 'next', 'previous'],
  data() {
    return {
      localData: {
        jobTitle: '',
        jobDescription: '',
        summary: '',
        skills: ''
      }
    }
  },
  watch: {
    formData: {
      handler(newData) {
        this.localData = {
          jobTitle: newData.jobTitle || '',
          jobDescription: newData.jobDescription || '',
          summary: newData.summary || '',
          skills: newData.skills || ''
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('next')
    }
  }
}
</script>
