<template>
  <div class="dmarc-analyzer">
    <div class="tool-header">
      <h1>Free DMARC Report Analyzer</h1>
      <p>Upload and analyze your DMARC aggregate reports to understand email authentication performance and potential issues.</p>
    </div>

    <div class="tool-form">
      <form @submit.prevent="analyzeReport" class="analyzer-form">
        <div class="form-group">
          <label for="reportFile">Upload DMARC Report (XML/ZIP):</label>
          <input 
            type="file" 
            id="reportFile"
            ref="fileInput"
            @change="handleFileSelect"
            accept=".xml,.zip,.gz"
            required
            :disabled="loading"
          />
          <div class="file-info" v-if="selectedFile">
            Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
          </div>
        </div>

        <!-- Captcha Section -->
        <div class="form-group captcha-section">
          <label for="captcha">Security Verification:</label>
          <div class="captcha-container">
            <div class="captcha-image-container">
              <div v-if="captcha.loading" class="captcha-loading">
                Loading captcha...
              </div>
              <div v-else-if="captcha.image" 
                   class="captcha-image" 
                   v-html="captcha.image">
              </div>
              <div v-else class="captcha-placeholder">
                <button type="button" @click="loadCaptcha" class="load-captcha-btn">
                  Load Captcha
                </button>
              </div>
            </div>
            <button type="button" 
                    @click="refreshCaptcha" 
                    class="refresh-captcha-btn"
                    :disabled="captcha.loading"
                    title="Refresh captcha">
              🔄
            </button>
          </div>
          <input 
            type="text" 
            id="captcha"
            name="captcha"
            v-model="formData.captchaText" 
            placeholder="Enter the text from the image above"
            required
            :disabled="loading || !captcha.image"
            autocomplete="off"
            class="captcha-input"
          />
          <small class="captcha-help">Enter the characters shown in the image above</small>
        </div>

        <button type="submit" :disabled="loading || !selectedFile || !captcha.image || !formData.captchaText" class="analyze-btn">
          {{ loading ? 'Analyzing...' : 'Analyze Report' }}
        </button>
      </form>
    </div>

    <div v-if="result" class="result-section">
      <h3>DMARC Report Analysis</h3>
      <div class="result-content">
        <div class="report-summary">
          <h4>Report Summary</h4>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="label">Organization:</span>
              <span class="value">{{ result.organization }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Domain:</span>
              <span class="value">{{ result.domain }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Report Period:</span>
              <span class="value">{{ formatDateRange(result.dateRange) }}</span>
            </div>
            <div class="summary-item">
              <span class="label">Total Messages:</span>
              <span class="value">{{ result.totalMessages.toLocaleString() }}</span>
            </div>
            <div class="summary-item">
              <span class="label">DMARC Pass Rate:</span>
              <span :class="['value', getPassRateClass(result.passRate)]">{{ result.passRate }}%</span>
            </div>
          </div>
        </div>

        <div class="policy-info">
          <h4>Policy Information</h4>
          <div class="policy-grid">
            <div class="policy-item">
              <span class="label">DMARC Policy:</span>
              <span class="value">{{ result.policy.dmarc }}</span>
            </div>
            <div class="policy-item">
              <span class="label">SPF Alignment:</span>
              <span class="value">{{ result.policy.spfAlignment }}</span>
            </div>
            <div class="policy-item">
              <span class="label">DKIM Alignment:</span>
              <span class="value">{{ result.policy.dkimAlignment }}</span>
            </div>
          </div>
        </div>

        <div v-if="result.sources && result.sources.length" class="sources-section">
          <h4>Top Email Sources</h4>
          <div class="sources-table">
            <div class="table-header">
              <span>Source IP</span>
              <span>Messages</span>
              <span>DMARC Result</span>
              <span>SPF Result</span>
              <span>DKIM Result</span>
            </div>
            <div v-for="source in result.sources.slice(0, 10)" :key="source.ip" class="table-row">
              <span class="ip">{{ source.ip }}</span>
              <span class="count">{{ source.count.toLocaleString() }}</span>
              <span :class="['result', source.dmarcResult.toLowerCase()]">{{ source.dmarcResult }}</span>
              <span :class="['result', source.spfResult.toLowerCase()]">{{ source.spfResult }}</span>
              <span :class="['result', source.dkimResult.toLowerCase()]">{{ source.dkimResult }}</span>
            </div>
          </div>
        </div>

        <div v-if="result.recommendations && result.recommendations.length" class="recommendations">
          <h4>Recommendations</h4>
          <ul>
            <li v-for="recommendation in result.recommendations" :key="recommendation">
              {{ recommendation }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DmarcReportAnalyzer',
  data() {
    return {
      formData: {
        captchaText: ''
      },
      captcha: {
        image: null,
        probe: null,
        loading: false
      },
      selectedFile: null,
      result: null,
      error: null,
      loading: false
    }
  },
  mounted() {
    // Load captcha when component mounts
    this.loadCaptcha()
  },
  methods: {
    async loadCaptcha() {
      this.captcha.loading = true
      this.error = null
      
      try {
        const apiUrl = import.meta.env.VITE_TOOLS_API_URL
        if (!apiUrl) {
          throw new Error('API URL not configured. Please set VITE_TOOLS_API_URL in your environment.')
        }
        
        const response = await fetch(`${apiUrl}/v1/captcha/generate`)
        
        if (!response.ok) {
          throw new Error(`Failed to load captcha: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.result && data.result.success && data.result.captcha) {
          this.captcha.image = data.result.captcha.image
          this.captcha.probe = data.result.captcha.probe
          this.formData.captchaText = '' // Clear previous input
        } else {
          throw new Error('Invalid captcha response from server')
        }
      } catch (err) {
        console.error('Captcha loading error:', err)
        this.error = `Failed to load captcha: ${err.message}`
      } finally {
        this.captcha.loading = false
      }
    },
    
    async refreshCaptcha() {
      await this.loadCaptcha()
    },

    handleFileSelect(event) {
      this.selectedFile = event.target.files[0]
      this.error = null
      this.result = null
    },

    async analyzeReport() {
      if (!this.selectedFile) {
        this.error = 'Please select a file to analyze.'
        return
      }

      // Validate that we have all required data
      if (!this.captcha.probe) {
        this.error = 'Please load the captcha first'
        return
      }
      
      if (!this.formData.captchaText.trim()) {
        this.error = 'Please enter the captcha text'
        return
      }

      this.loading = true
      this.error = null
      this.result = null

      try {
        const apiUrl = import.meta.env.VITE_TOOLS_API_URL
        if (!apiUrl) {
          throw new Error('API URL not configured. Please set VITE_TOOLS_API_URL in your environment.')
        }

        const uploadFormData = new FormData()
        uploadFormData.append('reportFile', this.selectedFile)
        uploadFormData.append('captchaText', this.formData.captchaText)
        uploadFormData.append('captchaProbe', this.captcha.probe)

        const response = await fetch(`${apiUrl}/v1/analyze-dmarc-report`, {
          method: 'POST',
          body: uploadFormData
        })

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`
          try {
            const errorData = await response.json()
            errorMessage = errorData.result?.error || errorData.error || errorData.message || errorMessage
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError)
          }
          throw new Error(errorMessage)
        }

        const data = await response.json()
        console.log('DMARC Report Backend response:', data) // Debug log

        // Extract the actual result data from the nested response
        const resultData = data.result || data

        // Check if the response indicates success
        if (!resultData.success && resultData.error) {
          // If it's a captcha error, refresh the captcha
          if (resultData.error.toLowerCase().includes('captcha')) {
            await this.refreshCaptcha()
          }
          throw new Error(resultData.error)
        }

        this.result = resultData
        
        // Refresh captcha after successful submission
        await this.refreshCaptcha()
      } catch (err) {
        console.error('DMARC analysis error:', err)
        this.error = err?.message || 'Failed to analyze DMARC report. Please check the file format and try again.'
        
        // Show a more user-friendly error message
        if (err.message.includes('fetch')) {
          this.error = 'Cannot connect to the server. Please make sure the backend is running.'
        } else if (err.message.includes('404')) {
          this.error = 'API endpoint not found. Please check the server configuration.'
        } else if (err.message.includes('500')) {
          this.error = 'Server error occurred. Please try again later.'
        } else if (err.message.toLowerCase().includes('captcha')) {
          this.error = err.message + ' Please try again with the new captcha.'
        }
      } finally {
        this.loading = false
      }
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    formatDateRange(dateRange) {
      if (!dateRange) return 'Unknown'
      return `${dateRange.start} - ${dateRange.end}`
    },

    getPassRateClass(passRate) {
      if (passRate >= 95) return 'excellent'
      if (passRate >= 80) return 'good'
      if (passRate >= 60) return 'warning'
      return 'poor'
    }
  }
}
</script>

<style scoped>
.dmarc-analyzer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.tool-header {
  text-align: center;
  margin-bottom: 2rem;
}

.tool-header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.tool-header p {
  color: #666;
  font-size: 1.1rem;
}

.analyzer-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
}

.file-info {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

/* Captcha specific styles */
.captcha-section {
  background: var(--vp-c-bg, #ffffff);
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.captcha-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.captcha-image-container {
  flex: 1;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff !important; /* Force white background for captcha visibility */
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 6px;
  padding: 0.5rem;
}

.captcha-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.captcha-loading,
.captcha-placeholder {
  color: #6b7280; /* Use fixed gray color for better contrast on white background */
  font-style: italic;
  text-align: center;
}

.load-captcha-btn {
  background: var(--vp-c-brand-1, #10B1EF);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;
}

.load-captcha-btn:hover {
  background: var(--vp-c-brand-2, #0891d4);
}

.refresh-captcha-btn {
  background: var(--vp-c-bg-soft, #f8f9fa);
  border: 1px solid var(--vp-c-border, #e5e7eb);
  color: var(--vp-c-text-1, #374151);
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.refresh-captcha-btn:hover:not(:disabled) {
  background: var(--vp-c-bg, #ffffff);
  border-color: var(--vp-c-brand-1, #10B1EF);
}

.refresh-captcha-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.captcha-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #374151);
  margin-top: 0.75rem !important;
}

.captcha-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16, 177, 239, 0.1));
}

.captcha-input:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
}

.captcha-help {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
}

.analyze-btn {
  background: #007bff;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.analyze-btn:hover:not(:disabled) {
  background: #0056b3;
}

.analyze-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.result-section {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.result-section h3 {
  margin-bottom: 2rem;
  color: #2c3e50;
}

.result-section h4 {
  margin-bottom: 1rem;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 0.5rem;
}

.summary-grid, .policy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.summary-item, .policy-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.label {
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
}

.value {
  font-weight: 600;
  color: #2c3e50;
}

.value.excellent { color: #28a745; }
.value.good { color: #17a2b8; }
.value.warning { color: #ffc107; }
.value.poor { color: #dc3545; }

.sources-table {
  background: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #e9ecef;
  font-weight: 600;
  color: #495057;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.table-row:last-child {
  border-bottom: none;
}

.ip {
  font-family: monospace;
  color: #495057;
}

.count {
  font-weight: 600;
}

.result {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}

.result.pass { background: #d4edda; color: #155724; }
.result.fail { background: #f8d7da; color: #721c24; }
.result.none { background: #e2e3e5; color: #495057; }

.recommendations {
  margin-top: 2rem;
}

.recommendations ul {
  margin-left: 1rem;
}

.recommendations li {
  margin-bottom: 0.5rem;
  color: #495057;
}

.error-section {
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.error-message {
  margin: 0;
}

@media (max-width: 768px) {
  .table-header, .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .summary-grid, .policy-grid {
    grid-template-columns: 1fr;
  }
  
  .captcha-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .refresh-captcha-btn {
    align-self: center;
  }
}
</style>
