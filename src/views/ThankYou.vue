<template>
  <div class="container">
    <div class="card">
      <div class="thank-you">
        <!-- Logo Section -->
        <div class="logo">
          <h1>Sivi Meka</h1>
          <p>Professional CV Builder</p>
        </div>

        <!-- Success Icon -->
        <div class="success-icon">✓</div>

        <!-- Thank You Message -->
        <h2>Thank You!</h2>
        <p>Your CV has been successfully submitted. We've received your information and will be in touch soon.</p>
        
        <!-- Summary of submitted data -->
        <div v-if="submittedData" class="submission-summary">
          <h3>Submission Summary:</h3>
          <div class="summary-item">
            <strong>Name:</strong> {{ submittedData.firstName }} {{ submittedData.lastName }}
          </div>
          <div class="summary-item">
            <strong>Email:</strong> {{ submittedData.email }}
          </div>
          <div class="summary-item">
            <strong>Job Title:</strong> {{ submittedData.jobTitle }}
          </div>
        </div>

        <!-- Back to Form Button -->
        <button @click="goBack" class="btn">
          Create Another CV
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYou',
  data() {
    return {
      submittedData: null
    }
  },
  mounted() {
    // Retrieve submitted data from localStorage
    const data = localStorage.getItem('cvFormData')
    if (data) {
      this.submittedData = JSON.parse(data)
    }
  },
  methods: {
    goBack() {
      // Clear stored data and go back to form
      localStorage.removeItem('cvFormData')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.submission-summary {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.submission-summary h3 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.summary-item {
  margin-bottom: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e1e8ed;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item strong {
  color: #667eea;
  margin-right: 0.5rem;
}
</style>