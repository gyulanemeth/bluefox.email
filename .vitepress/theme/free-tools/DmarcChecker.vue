<template>
  <div class="dmarc-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDmarc">
        <div class="form-group">
          <label for="domain">Domain:</label>
          <input 
            type="text" 
            id="domain"
            name="domain"
            v-model="formData.domain" 
            placeholder="example.com"
            required
            :disabled="loading"
          />
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

        <button type="submit" :disabled="loading || !captcha.image || !formData.captchaText" class="check-btn">
          {{ loading ? 'Checking...' : 'Check DMARC' }}
        </button>
      </form>
    </div>

    <div v-if="result" class="result-section">
      <h3>DMARC Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ DMARC Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>✗ DMARC Record Missing or Invalid</strong></p>
        </div>
        
        <div v-if="result.score">
          <p><strong>Security Score:</strong> {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</p>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p v-if="result.checkedRecord"><strong>Checked Record:</strong> {{ result.checkedRecord }}</p>
        <p><strong>Record:</strong> {{ result.record || 'Not found' }}</p>
        
        <div v-if="result.policy">
          <p><strong>Policy:</strong> {{ result.policy }}</p>
          <p><strong>Subdomain Policy:</strong> {{ result.subdomainPolicy || 'Inherits from main policy' }}</p>
          <p><strong>Coverage:</strong> {{ result.percentage || '100' }}%</p>
          
          <div v-if="result.rua && result.rua.length">
            <p><strong>Aggregate Reports:</strong></p>
            <ul>
              <li v-for="email in result.rua" :key="email">{{ email }}</li>
            </ul>
          </div>
          
          <div v-if="result.ruf && result.ruf.length">
            <p><strong>Forensic Reports:</strong></p>
            <ul>
              <li v-for="email in result.ruf" :key="email">{{ email }}</li>
            </ul>
          </div>
        </div>

        <!-- Enhanced Mailauth Information -->
        <div v-if="result.mailauthResult" class="mailauth-section">
          <h5>Email Authentication Analysis</h5>
          <div class="authentication-results">
            <pre>{{ JSON.stringify(result.mailauthResult, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Policy Analysis -->
      <div v-if="result.analysis" class="analysis-section">
        <h4>Policy Analysis</h4>
        <div v-for="(explanation, key) in result.analysis" :key="key">
          <p><strong>{{ key.toUpperCase() }}:</strong> {{ explanation }}</p>
        </div>
      </div>

      <!-- Warnings -->
      <div v-if="result.warnings && result.warnings.length" class="warnings-section">
        <h4>⚠️ Warnings</h4>
        <ul>
          <li v-for="warning in result.warnings" :key="warning">{{ warning }}</li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div v-if="result.recommendations && result.recommendations.length" class="recommendations-section">
        <h4>💡 Recommendations</h4>
        <ul>
          <li v-for="recommendation in result.recommendations" :key="recommendation">{{ recommendation }}</li>
        </ul>
      </div>
      
      <!-- Errors -->
      <div v-if="result.errors && result.errors.length" class="errors-section">
        <h4>Errors</h4>
        <ul>
          <li v-for="error in result.errors" :key="error">{{ error }}</li>
        </ul>
      </div>
    </div>

    <div v-if="error" class="error-section">
      <p class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DmarcChecker',
  data() {
    return {
      formData: {
        domain: '',
        captchaText: ''
      },
      captcha: {
        image: null,
        probe: null,
        loading: false
      },
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

    async checkDmarc() {
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
        
        const response = await fetch(`${apiUrl}/v1/analyze-dmarc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            domain: this.formData.domain,
            captchaText: this.formData.captchaText,
            captchaProbe: this.captcha.probe
          })
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
        console.log('Backend response:', data) // Debug log

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

        this.result = {
          valid: resultData.success || false,
          domain: resultData.domain || this.formData.domain,
          record: resultData.rawRecord || resultData.record || 'Not found',
          policy: resultData.parsed?.p || resultData.policy,
          subdomainPolicy: resultData.parsed?.sp || resultData.subdomainPolicy,
          percentage: resultData.parsed?.pct || resultData.percentage || 100,
          rua: resultData.parsed?.rua || resultData.rua || [],
          ruf: resultData.parsed?.ruf || resultData.ruf || [],
          errors: resultData.success ? [] : [resultData.error || 'Unknown error occurred'],
          analysis: resultData.explanations || resultData.analysis,
          score: resultData.score,
          warnings: resultData.warnings || [],
          recommendations: resultData.recommendations || [],
          mailauthResult: resultData.mailauthRecord || resultData.mailauthResult,
          checkedRecord: resultData.checkedRecord
        }
        
        // Refresh captcha after successful submission
        await this.refreshCaptcha()
        
      } catch (err) {
        console.error('DMARC check error:', err)
        this.error = err?.message || 'Failed to check DMARC. Please try again.'
        
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
    }
  }
}
</script>

<style scoped>
.dmarc-checker {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.tool-form {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1, #374151);
  font-size: 0.9rem;
}

.form-group input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--vp-c-border, #e5e7eb);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: var(--vp-c-bg, #ffffff);
  color: var(--vp-c-text-1, #374151);
}

.form-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1, #10B1EF);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft, rgba(16, 177, 239, 0.1));
}

.form-group input:disabled {
  background: var(--vp-c-bg-mute, #f1f5f9);
  opacity: 0.6;
  cursor: not-allowed;
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
  margin-top: 0.75rem !important;
}

.captcha-help {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2, #6b7280);
  font-size: 0.875rem;
  font-style: italic;
}

.check-btn {
  background: var(--vp-c-brand-1, #10B1EF);
  color: #ffffff;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.check-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2, #0891d4);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.check-btn:disabled {
  background: var(--vp-c-bg-mute, #9ca3af);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.result-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-border, #e5e7eb);
  border-radius: 12px;
  background: var(--vp-c-bg, #ffffff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.result-section h3 {
  margin: 0 0 1.5rem 0;
  color: var(--vp-c-text-1, #1a202c);
  font-size: 1.5rem;
  font-weight: 700;
}

.status-box {
  background: var(--vp-c-bg-soft, #f8f9fa);
  padding: 1.25rem;
  border: 1px solid var(--vp-c-border-soft, #dee2e6);
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.status-box p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.info-section, 
.analysis-section, 
.warnings-section, 
.recommendations-section, 
.errors-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.info-section h4, 
.analysis-section h4, 
.warnings-section h4, 
.recommendations-section h4, 
.errors-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.info-section p,
.analysis-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.info-section ul,
.warnings-section ul,
.recommendations-section ul,
.errors-section ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.info-section li,
.warnings-section li,
.recommendations-section li,
.errors-section li {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
}

.warnings-section {
  background: var(--vp-warning-soft, #fffbf0);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-warning-1, #ffc107);
  margin-top: 1.5rem;
}

.warnings-section h4 {
  color: var(--vp-c-warning-1, #d69e2e);
}

.recommendations-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
  margin-top: 1.5rem;
}

.recommendations-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.errors-section {
  background: var(--vp-danger-soft, #fdf2f2);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-danger-1, #dc3545);
  margin-top: 1.5rem;
}

.errors-section h4 {
  color: var(--vp-c-danger-1, #dc3545);
}

.error-section {
  background: var(--vp-danger-soft, #f8d7da);
  color: var(--vp-c-danger-1, #721c24);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-danger-2, #f5c6cb);
}

.error-message {
  margin: 0;
  font-weight: 500;
}

.mailauth-section {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-soft, #f8f9fa);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-text-3, #6c757d);
}

.mailauth-section h5 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2, #495057);
  font-size: 1.1rem;
  font-weight: 600;
}

.authentication-results {
  background: var(--vp-c-bg, #ffffff);
  border: 1px solid var(--vp-c-border, #dee2e6);
  border-radius: 6px;
  padding: 1rem;
  font-family: var(--vp-font-family-mono, 'Courier New', monospace);
  font-size: 0.875rem;
  overflow-x: auto;
  color: var(--vp-c-text-1, #2d3748);
}

.authentication-results pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .check-btn {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .check-btn:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  
  .result-section {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .dmarc-checker {
    padding: 0 0.5rem;
  }
  
  .tool-form,
  .result-section {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .form-group input,
  .check-btn {
    padding: 0.75rem;
  }
  
  .result-section h3 {
    font-size: 1.25rem;
  }
  
  .info-section h4,
  .analysis-section h4,
  .warnings-section h4,
  .recommendations-section h4,
  .errors-section h4 {
    font-size: 1.1rem;
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
