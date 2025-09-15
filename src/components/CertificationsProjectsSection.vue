<template>
  <div class="form-section">
    <div class="section-header">Certifications & Projects</div>
    <form @submit.prevent="handleSubmit">
      <!-- Certifications -->
      <h3 class="subsection-title">Certifications</h3>
      <div v-for="(certification, index) in localData.certifications" :key="index" class="dynamic-field">
        <button
          type="button"
          @click="removeCertification(index)"
          class="remove-btn"
          v-if="localData.certifications.length > 1"
        >
          Remove
        </button>

        <div class="form-row">
          <div class="form-group">
            <label>Certification Name</label>
            <input
              type="text"
              v-model="certification.name"
              placeholder="e.g., AWS Certified Solutions Architect"
              @input="updateFormData"
            />
          </div>
          <div class="form-group">
            <label>Issuing Organization</label>
            <input
              type="text"
              v-model="certification.organization"
              placeholder="e.g., Amazon Web Services"
              @input="updateFormData"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Date Obtained</label>
          <input
            type="text"
            v-model="certification.date"
            placeholder="e.g., March 2023"
            @input="updateFormData"
          />
        </div>
      </div>

      <button type="button" @click="addCertification" class="add-btn">
        + Add Certification
      </button>

      <!-- Key Projects -->
      <h3 class="subsection-title">Key Projects</h3>
      <div v-for="(project, index) in localData.keyProjects" :key="index" class="dynamic-field">
        <button
          type="button"
          @click="removeProject(index)"
          class="remove-btn"
          v-if="localData.keyProjects.length > 1"
        >
          Remove
        </button>

        <div class="form-group">
          <label>Project Name</label>
          <input
            type="text"
            v-model="project.name"
            placeholder="e.g., E-commerce Platform"
            @input="updateFormData"
          />
        </div>

        <div class="form-group">
          <label>Technologies Used</label>
          <input
            type="text"
            v-model="project.technologies"
            placeholder="e.g., Vue.js, Node.js, MongoDB"
            @input="updateFormData"
          />
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="project.description"
            placeholder="Describe the project, your role, and key achievements..."
            @input="updateFormData"
          ></textarea>
        </div>
      </div>

      <button type="button" @click="addProject" class="add-btn">
        + Add Project
      </button>

      <div class="form-actions">
        <button type="button" @click="$emit('previous')" class="btn btn-secondary">Previous</button>
        <button type="submit" class="btn btn-success">Submit CV</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CertificationsProjectsSection',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  emits: ['update:formData', 'submit', 'previous'],
  data() {
    return {
      localData: {
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
  watch: {
    formData: {
      handler(newData) {
        if (newData.certifications && newData.certifications.length > 0) {
          this.localData.certifications = [...newData.certifications]
        }
        if (newData.keyProjects && newData.keyProjects.length > 0) {
          this.localData.keyProjects = [...newData.keyProjects]
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addCertification() {
      this.localData.certifications.push({
        name: '',
        organization: '',
        date: ''
      })
      this.updateFormData()
    },
    removeCertification(index) {
      if (this.localData.certifications.length > 1) {
        this.localData.certifications.splice(index, 1)
        this.updateFormData()
      }
    },
    addProject() {
      this.localData.keyProjects.push({
        name: '',
        technologies: '',
        description: ''
      })
      this.updateFormData()
    },
    removeProject(index) {
      if (this.localData.keyProjects.length > 1) {
        this.localData.keyProjects.splice(index, 1)
        this.updateFormData()
      }
    },
    updateFormData() {
      this.$emit('update:formData', {
        certifications: this.localData.certifications,
        keyProjects: this.localData.keyProjects
      })
    },
    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
