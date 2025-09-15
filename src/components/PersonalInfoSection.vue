<template>
  <div class="form-section">
    <div class="section-header">Personal Information</div>
    <form @submit.prevent="handleSubmit">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            v-model="localData.firstName"
            required
            placeholder="Enter your first name"
            :class="{ error: errors.firstName }"
            @input="$emit('update:formData', localData)"
          />
          <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            v-model="localData.lastName"
            required
            placeholder="Enter your last name"
            :class="{ error: errors.lastName }"
            @input="$emit('update:formData', localData)"
          />
          <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input
          type="email"
          id="email"
          v-model="localData.email"
          required
          placeholder="Enter your email address"
          :class="{ error: errors.email }"
          @input="$emit('update:formData', localData)"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Next Step</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfoSection',
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
  emits: ['update:formData', 'next'],
  data() {
    return {
      localData: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  watch: {
    formData: {
      handler(newData) {
        this.localData = {
          firstName: newData.firstName || '',
          lastName: newData.lastName || '',
          email: newData.email || ''
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
