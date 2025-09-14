<template>
  <div class="container">
    <div class="card">
      <!-- Logo Section -->
      <div class="logo">
        <h1>Sivi Meka</h1>
        <p>Professional CV Builder</p>
      </div>

      <!-- CV Form -->
      <form @submit.prevent="submitForm">
        <!-- Personal Information -->
        <div class="section-header">Personal Information</div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              v-model="formData.firstName"
              required
              placeholder="Enter your first name"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              v-model="formData.lastName"
              required
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email Address *</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            placeholder="Enter your email address"
          />
        </div>

        <!-- Job Information -->
        <div class="section-header">Job Information</div>
        
        <div class="form-group">
          <label for="jobTitle">Job Title *</label>
          <input
            type="text"
            id="jobTitle"
            v-model="formData.jobTitle"
            required
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div class="form-group">
          <label for="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            v-model="formData.jobDescription"
            placeholder="Describe the position you're applying for..."
          ></textarea>
        </div>

        <!-- Professional Summary -->
        <div class="section-header">Professional Summary</div>
        
        <div class="form-group">
          <label for="summary">Summary *</label>
          <textarea
            id="summary"
            v-model="formData.summary"
            required
            placeholder="Write a brief summary of your professional background..."
          ></textarea>
        </div>

        <!-- Skills -->
        <div class="section-header">Skills</div>
        
        <div class="form-group">
          <label for="skills">Skills (comma-separated)</label>
          <textarea
            id="skills"
            v-model="formData.skills"
            placeholder="e.g., JavaScript, Vue.js, Python, Project Management..."
          ></textarea>
        </div>

        <!-- Education -->
        <div class="section-header">Education</div>
        
        <div v-for="(education, index) in formData.education" :key="index" class="dynamic-field">
          <button type="button" @click="removeEducation(index)" class="remove-btn" v-if="formData.education.length > 1">
            Remove
          </button>
          
          <div class="form-group">
            <label>Degree/Qualification</label>
            <input
              type="text"
              v-model="education.degree"
              placeholder="e.g., Bachelor of Computer Science"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Institution</label>
              <input
                type="text"
                v-model="education.institution"
                placeholder="University/School name"
              />
            </div>
            <div class="form-group">
              <label>Year</label>
              <input
                type="text"
                v-model="education.year"
                placeholder="e.g., 2020-2024"
              />
            </div>
          </div>
        </div>
        
        <button type="button" @click="addEducation" class="add-btn">
          + Add Education
        </button>

        <!-- Work Experience -->
        <div class="section-header">Work Experience</div>
        
        <div v-for="(experience, index) in formData.workExperience" :key="index" class="dynamic-field">
          <button type="button" @click="removeExperience(index)" class="remove-btn" v-if="formData.workExperience.length > 1">
            Remove
          </button>
          
          <div class="form-group">
            <label>Job Title</label>
            <input
              type="text"
              v-model="experience.title"
              placeholder="e.g., Software Developer"
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Company</label>
              <input
                type="text"
                v-model="experience.company"
                placeholder="Company name"
              />
            </div>
            <div class="form-group">
              <label>Duration</label>
              <input
                type="text"
                v-model="experience.duration"
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="experience.description"
              placeholder="Describe your responsibilities and achievements..."
            ></textarea>
          </div>
        </div>
        
        <button type="button" @click="addExperience" class="add-btn">
          + Add Work Experience
        </button>

        <!-- Certifications -->
        <div class="section-header">Certifications</div>
        
        <div v-for="(certification, index) in formData.certifications" :key="index" class="dynamic-field">
          <button type="button" @click="removeCertification(index)" class="remove-btn" v-if="formData.certifications.length > 1">
            Remove
          </button>
          
          <div class="form-row">
            <div class="form-group">
              <label>Certification Name</label>
              <input
                type="text"
                v-model="certification.name"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>
            <div class="form-group">
              <label>Issuing Organization</label>
              <input
                type="text"
                v-model="certification.organization"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>Date Obtained</label>
            <input
              type="text"
              v-model="certification.date"
              placeholder="e.g., March 2023"
            />
          </div>
        </div>
        
        <button type="button" @click="addCertification" class="add-btn">
          + Add Certification
        </button>

        <!-- Key Projects -->
        <div class="section-header">Key Projects</div>
        
        <div v-for="(project, index) in formData.keyProjects" :key="index" class="dynamic-field">
          <button type="button" @click="removeProject(index)" class="remove-btn" v-if="formData.keyProjects.length > 1">
            Remove
          </button>
          
          <div class="form-group">
            <label>Project Name</label>
            <input
              type="text"
              v-model="project.name"
              placeholder="e.g., E-commerce Platform"
            />
          </div>
          
          <div class="form-group">
            <label>Technologies Used</label>
            <input
              type="text"
              v-model="project.technologies"
              placeholder="e.g., Vue.js, Node.js, MongoDB"
            />
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="project.description"
              placeholder="Describe the project, your role, and key achievements..."
            ></textarea>
          </div>
        </div>
        
        <button type="button" @click="addProject" class="add-btn">
          + Add Project
        </button>

        <!-- Submit Button -->
        <button type="submit" class="btn">
          Submit CV
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CVForm',
  data() {
    return {
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
  },
  methods: {
    // Education methods
    addEducation() {
      this.formData.education.push({
        degree: '',
        institution: '',
        year: ''
      })
    },
    removeEducation(index) {
      if (this.formData.education.length > 1) {
        this.formData.education.splice(index, 1)
      }
    },
    
    // Work experience methods
    addExperience() {
      this.formData.workExperience.push({
        title: '',
        company: '',
        duration: '',
        description: ''
      })
    },
    removeExperience(index) {
      if (this.formData.workExperience.length > 1) {
        this.formData.workExperience.splice(index, 1)
      }
    },
    
    // Certification methods
    addCertification() {
      this.formData.certifications.push({
        name: '',
        organization: '',
        date: ''
      })
    },
    removeCertification(index) {
      if (this.formData.certifications.length > 1) {
        this.formData.certifications.splice(index, 1)
      }
    },
    
    // Project methods
    addProject() {
      this.formData.keyProjects.push({
        name: '',
        technologies: '',
        description: ''
      })
    },
    removeProject(index) {
      if (this.formData.keyProjects.length > 1) {
        this.formData.keyProjects.splice(index, 1)
      }
    },
    
    // Form submission
    submitForm() {
      // Basic validation
      if (!this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.jobTitle || !this.formData.summary) {
        alert('Please fill in all required fields marked with *')
        return
      }
      
      // Store form data (in a real app, this would be sent to a server)
      localStorage.setItem('cvFormData', JSON.stringify(this.formData))
      
      // Navigate to thank you page
      this.$router.push('/thank-you')
    }
  }
}
</script>