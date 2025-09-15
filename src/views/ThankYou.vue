<template>
  <div class="container">
    <div class="card">
      <div class="thank-you">
        <!-- Logo Section -->
        <Logo />

        <!-- Thank You Message -->
        <h2>Thank You!</h2>
        <p>Your CV has been successfully submitted. We've received your information and will be in touch soon.</p>

        <!-- Back to Form Button -->
        <button @click="goBack" class="btn">
          Create Another CV
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue"

export default {
  name: 'ThankYou',
  components: {
    Logo
  },
  methods: {
    goBack() {
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

.thank-you {
  text-align: center;
}
</style>
