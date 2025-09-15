<template>
  <div class="container">
    <div class="card">
      <!-- Logo Section -->
      <Logo />

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
          ></div>
        </div>
        <div class="progress-text">
          Step {{ currentStep }} of {{ totalSteps }}
        </div>
      </div>

      <!-- Section Navigation -->
      <div class="section-nav">
        <button
          v-for="(section, index) in sections"
          :key="index"
          type="button"
          @click="goToSection(index)"
          :class="['nav-btn', { active: currentStep === index + 1, completed: completedSections.includes(index) }]"
          :disabled="!canNavigateToSection(index)"
        >
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-title">{{ section.title }}</span>
        </button>
      </div>

      <!-- Dynamic Section Components -->
      <PersonalInfoSection
        v-if="currentStep === 1"
        :formData="formData"
        :errors="errors"
        @update:formData="updateFormData"
        @next="validateAndNext(1)"
      />

      <JobInfoSection
        v-if="currentStep === 2"
        :formData="formData"
        :errors="errors"
        @update:formData="updateFormData"
        @next="validateAndNext(2)"
        @previous="previousStep"
      />

      <EducationSection
        v-if="currentStep === 3"
        :formData="formData"
        @update:formData="updateFormData"
        @next="validateAndNext(3)"
        @previous="previousStep"
      />

      <WorkExperienceSection
        v-if="currentStep === 4"
        :formData="formData"
        @update:formData="updateFormData"
        @next="validateAndNext(4)"
        @previous="previousStep"
      />

      <CertificationsProjectsSection
        v-if="currentStep === 5"
        :formData="formData"
        @update:formData="updateFormData"
        @submit="validateAndNext(5)"
        @previous="previousStep"
      />

    </div>
  </div>
</template>

<script>
import PersonalInfoSection from '@/components/PersonalInfoSection.vue'
import JobInfoSection from '@/components/JobInfoSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import WorkExperienceSection from '@/components/WorkExperienceSection.vue'
import CertificationsProjectsSection from '@/components/CertificationsProjectsSection.vue'
import axios from 'axios'
import Logo from '@/components/Logo.vue'

export default {
  name: 'CVForm',
  components: {
    PersonalInfoSection,
    JobInfoSection,
    EducationSection,
    WorkExperienceSection,
    CertificationsProjectsSection,
    Logo
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 5,
      completedSections: [],
      errors: {},
      sections: [
        { title: 'Personal Info', key: 'personal' },
        { title: 'Job & Summary', key: 'job' },
        { title: 'Education', key: 'education' },
        { title: 'Experience', key: 'experience' },
        { title: 'Certs & Projects', key: 'final' }
      ],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        jobDescription: '',
        summary: '',
        skills: '',
        education: [
          {
            degree: '',
            institution: '',
            year: ''
          }
        ],
        workExperience: [
          {
            title: '',
            company: '',
            duration: '',
            description: ''
          }
        ],
        certifications: [
          {
            name: '',
            organization: '',
            date: ''
          }
        ],
        keyProjects: [
          {
            name: '',
            technologies: '',
            description: ''
          }
        ]
      }
    }
  },  methods: {
    // Navigation methods
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    goToSection(index) {
      if (this.canNavigateToSection(index)) {
        this.currentStep = index + 1
      }
    },
    canNavigateToSection(index) {
      const targetStep = index + 1

      // Always allow navigation to current step
      if (targetStep === this.currentStep) {
        return true
      }

      // Allow navigation to previous completed steps
      if (targetStep < this.currentStep && this.completedSections.includes(index)) {
        return true
      }

      // For navigation to future steps, check if all previous steps are completed
      if (targetStep > this.currentStep) {
        // Check if all previous sections (0 to index-1) are completed
        for (let i = 0; i < index; i++) {
          if (!this.completedSections.includes(i)) {
            return false
          }
        }
        return true
      }

      return false
    },

    // Form data update method
    updateFormData(newData) {
      this.formData = { ...this.formData, ...newData }
    },

    // Validation methods
    validateSection(step) {
      this.errors = {}
      let isValid = true

      switch (step) {
        case 1:
          if (!this.formData.firstName.trim()) {
            this.errors.firstName = 'First name is required'
            isValid = false
          }
          if (!this.formData.lastName.trim()) {
            this.errors.lastName = 'Last name is required'
            isValid = false
          }
          if (!this.formData.email.trim()) {
            this.errors.email = 'Email is required'
            isValid = false
          } else if (!this.isValidEmail(this.formData.email)) {
            this.errors.email = 'Please enter a valid email address'
            isValid = false
          }
          break

        case 2:
          if (!this.formData.jobTitle.trim()) {
            this.errors.jobTitle = 'Job title is required'
            isValid = false
          }
          break

        case 3:
        case 4:
        case 5:
          // These sections are optional but we can add validation if needed
          break
      }

      return isValid
    },

    validateAndNext(step) {
      if (this.validateSection(step)) {
        // Mark section as completed
        if (!this.completedSections.includes(step - 1)) {
          this.completedSections.push(step - 1)
        }

        if (step === this.totalSteps) {
          this.submitForm()
        } else {
          this.nextStep()
        }
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    // Form submission
    async submitForm() {
      // Final validation
      let allValid = true
      for (let i = 1; i <= this.totalSteps; i++) {
        if (!this.validateSection(i)) {
          allValid = false
          this.currentStep = i
          break
        }
      }

      if (!allValid) {
        alert('Please complete all required fields')
        return
      }

      try {
        const submitButton = document.querySelector('.submit-btn')
        if (submitButton) {
          submitButton.disabled = true
          submitButton.textContent = 'Submitting...'
        }

        // Restructure data to combine firstName and lastName into fullname
        const submissionData = { ...this.formData }

        // Create fullName object and remove individual firstName/lastName
        submissionData.fullName = {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName
        }
        delete submissionData.firstName
        delete submissionData.lastName

        // Send form data
        await axios.post(
          import.meta.env.VITE_API_URL,
          submissionData,
          {
            headers: {
              'Content-Type': 'application/json',
              [import.meta.env.VITE_API_KEY_NAME]: import.meta.env.VITE_API_KEY
            }
          }
        )

        // Store form data locally as backup
        localStorage.setItem('cvFormData', JSON.stringify(this.formData))

        // Reset form data
        this.resetFormData()

        // Reset completed sections and current step
        this.completedSections = []
        this.currentStep = 1

        // Navigate to thank you page
        this.$router.push('/thank-you')
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('There was an error submitting your form. Please try again.')

        // Reset button state
        const submitButton = document.querySelector('.submit-btn')
        if (submitButton) {
          submitButton.disabled = false
          submitButton.textContent = 'Submit CV'
        }
      }
    },

    // Reset form data to initial state
    resetFormData() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        jobDescription: '',
        summary: '',
        skills: '',
        education: [
          {
            degree: '',
            institution: '',
            year: ''
          }
        ],
        workExperience: [
          {
            title: '',
            company: '',
            duration: '',
            description: ''
          }
        ],
        certifications: [
          {
            name: '',
            organization: '',
            date: ''
          }
        ],
        keyProjects: [
          {
            name: '',
            technologies: '',
            description: ''
          }
        ]
      }
    }
  },

  // Auto-save functionality
  watch: {
    formData: {
      handler(newData) {
        localStorage.setItem('cvFormDraft', JSON.stringify(newData))
      },
      deep: true
    }
  },

  // Load draft data on component mount
  mounted() {
    const draftData = localStorage.getItem('cvFormDraft')
    if (draftData) {
      try {
        this.formData = { ...this.formData, ...JSON.parse(draftData) }
      } catch (e) {
        console.error('Error loading draft data:', e)
      }
    }
  }
}
</script>
