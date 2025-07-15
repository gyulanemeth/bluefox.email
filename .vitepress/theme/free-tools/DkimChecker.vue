<template>
  <div class="dkim-checker">
    <div class="tool-form">
      <form @submit.prevent="checkDkim">
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

        <div class="form-group">
          <label for="selector">DKIM Selector:</label>
          <input 
            type="text" 
            id="selector"
            name="selector"
            v-model="formData.selector" 
            placeholder="default, google, mail, etc."
            :disabled="loading"
          />
          <small class="help-text">Common selectors: default, google, mail, dkim, selector1, selector2</small>
        </div>

        <button type="submit" :disabled="loading" class="check-btn">
          {{ loading ? 'Checking...' : 'Check DKIM' }}
        </button>
      </form>
    </div>

    <div v-if="result" class="result-section">
      <h3>DKIM Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ DKIM Record Found</strong></p>
        </div>
        <div v-else>
          <p><strong>✗ DKIM Record Missing or Invalid</strong></p>
        </div>
        
        <div v-if="result.score">
          <p><strong>Security Score:</strong> {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</p>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Selector:</strong> {{ result.selector }}</p>
        <p v-if="result.checkedRecord"><strong>Checked Record:</strong> {{ result.checkedRecord }}</p>
        <p><strong>DKIM Record:</strong> {{ result.record || 'Not found' }}</p>

        <!-- Enhanced Mailauth Information -->
        <div v-if="result.mailauthResult && result.mailauthResult.headers" class="mailauth-section">
          <h5>Email Authentication Analysis</h5>
          <div class="authentication-results">
            <pre>{{ result.mailauthResult.headers }}</pre>
          </div>
        </div>
      </div>

      <!-- DKIM Key Information -->
      <div v-if="result.valid && result.record" class="key-info-section">
        <h4>DKIM Key Information</h4>
        <div class="key-details">
          <p v-if="result.record.includes('v=DKIM1')"><strong>Version:</strong> DKIM1</p>
          <p v-if="result.record.includes('k=rsa')"><strong>Key Type:</strong> RSA</p>
          <p v-if="result.record.includes('h=sha256')"><strong>Hash Algorithm:</strong> SHA-256</p>
          <p v-else-if="result.record.includes('h=sha1')"><strong>Hash Algorithm:</strong> SHA-1 (Consider upgrading to SHA-256)</p>
          <p v-if="result.record.includes('p=') && !result.record.includes('p=;')"><strong>Public Key:</strong> Present</p>
          <p v-else-if="result.record.includes('p=;')"><strong>Public Key:</strong> Revoked/Empty</p>
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
  name: 'DkimChecker',
  data() {
    return {
      formData: {
        domain: '',
        selector: 'default'
      },
      result: null,
      error: null,
      loading: false
    }
  },
  methods: {
    async checkDkim() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        const apiUrl = import.meta.env.VITE_TOOLS_API_URL
        const response = await fetch(`${apiUrl}/analyze-dkim`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            domain: this.formData.domain,
            selector: this.formData.selector || 'default'
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        this.result = {
          valid: data.success,
          domain: data.domain,
          selector: data.selector,
          record: data.rawRecord,
          checkedRecord: data.checkedRecord,
          errors: data.success ? [] : [data.error],
          score: data.score,
          warnings: data.warnings,
          recommendations: data.recommendations,
          mailauthResult: data.mailauthResult
        }

      } catch (err) {
        this.error = err?.message || 'Failed to check DKIM. Please try again.'
        console.error('DKIM check error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.dkim-checker {
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

.help-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2, #6b7280);
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
.key-info-section, 
.warnings-section, 
.recommendations-section, 
.errors-section {
  border-top: 1px solid var(--vp-c-border-soft, #eee);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
}

.info-section h4, 
.key-info-section h4, 
.warnings-section h4, 
.recommendations-section h4, 
.errors-section h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1, #333);
  font-size: 1.25rem;
  font-weight: 600;
}

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.key-info-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #28a745);
  margin-top: 1.5rem;
}

.key-info-section h4 {
  color: var(--vp-c-tip-1, #28a745);
}

.key-details p {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.5;
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
  .dkim-checker {
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
  .key-info-section h4,
  .warnings-section h4,
  .recommendations-section h4,
  .errors-section h4 {
    font-size: 1.1rem;
  }
}
</style>
