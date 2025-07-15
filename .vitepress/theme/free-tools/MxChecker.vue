<template>
  <div class="mx-checker">
    <div class="tool-form">
      <form @submit.prevent="checkMx">
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

        <button type="submit" :disabled="loading" class="check-btn">
          {{ loading ? 'Checking...' : 'Check MX Records' }}
        </button>
      </form>
    </div>

    <div v-if="result" class="result-section">
      <h3>MX Records Check Results</h3>
      
      <!-- Status -->
      <div class="status-box">
        <div v-if="result.valid">
          <p><strong>✓ MX Records Found</strong></p>
          <p><strong>Total Records:</strong> {{ result.records ? result.records.length : 0 }}</p>
        </div>
        <div v-else>
          <p><strong>✗ No MX Records Found</strong></p>
        </div>
        
        <div v-if="result.score">
          <p><strong>Configuration Score:</strong> {{ result.score.value }}/{{ result.score.outOf }} ({{ result.score.level }})</p>
        </div>
      </div>

      <!-- MX Records Information -->
      <div v-if="result.records && result.records.length" class="mx-records-section">
        <h4>MX Records</h4>
        <div class="mx-table">
          <table>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Mail Server</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in result.records" :key="record.exchange">
                <td>{{ record.priority }}</td>
                <td>{{ record.exchange }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="info-section">
        <h4>Basic Information</h4>
        <p><strong>Domain:</strong> {{ result.domain }}</p>
        <p><strong>Records Found:</strong> {{ result.records ? result.records.length : 0 }}</p>
        
        <div v-if="result.records && result.records.length">
          <p><strong>Primary Mail Server:</strong> {{ result.records[0].exchange }} (Priority: {{ result.records[0].priority }})</p>
          
          <div v-if="result.records.length > 1">
            <p><strong>Backup Servers:</strong></p>
            <ul>
              <li v-for="record in result.records.slice(1)" :key="record.exchange">
                {{ record.exchange }} (Priority: {{ record.priority }})
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Configuration Analysis -->
      <div v-if="result.valid" class="analysis-section">
        <h4>Configuration Analysis</h4>
        <div class="analysis-grid">
          <div class="analysis-item">
            <span class="label">Redundancy:</span>
            <span class="value" :class="result.records.length > 1 ? 'good' : 'warning'">
              {{ result.records.length > 1 ? 'Multiple servers configured' : 'Single server (consider adding backup)' }}
            </span>
          </div>
          
          <div class="analysis-item">
            <span class="label">Priority Configuration:</span>
            <span class="value" :class="hasUniquePriorities(result.records) ? 'good' : 'warning'">
              {{ hasUniquePriorities(result.records) ? 'Proper priority setup' : 'Some records have same priority' }}
            </span>
          </div>
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
  name: 'MxChecker',
  data() {
    return {
      formData: {
        domain: ''
      },
      result: null,
      error: null,
      loading: false
    }
  },
  methods: {
    async checkMx() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        const apiUrl = import.meta.env.VITE_TOOLS_API_URL
        const response = await fetch(`${apiUrl}/analyze-mx`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ domain: this.formData.domain })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        this.result = {
          valid: data.success,
          domain: data.domain,
          records: data.records || [],
          errors: data.success ? [] : [data.error],
          score: data.score,
          warnings: data.warnings,
          recommendations: data.recommendations
        }

      } catch (err) {
        this.error = err?.message || 'Failed to check MX records. Please try again.'
        console.error('MX check error:', err)
      } finally {
        this.loading = false
      }
    },

    hasUniquePriorities(records) {
      if (!records || records.length === 0) return true;
      const priorities = records.map(r => r.priority);
      const uniquePriorities = [...new Set(priorities)];
      return uniquePriorities.length === records.length;
    }
  }
}
</script>

<style scoped>
.mx-checker {
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

.mx-records-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #28a745);
  margin-top: 1.5rem;
}

.mx-records-section h4 {
  color: var(--vp-c-tip-1, #28a745);
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.mx-table {
  margin-top: 1rem;
}

.mx-table table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg, #ffffff);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.mx-table th,
.mx-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--vp-c-border, #dee2e6);
}

.mx-table th {
  background: var(--vp-c-bg-soft, #f8f9fa);
  font-weight: 600;
  color: var(--vp-c-text-2, #495057);
}

.mx-table tr:hover {
  background: var(--vp-c-bg-soft, #f8f9fa);
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

.info-section p {
  margin: 0.75rem 0;
  color: var(--vp-c-text-2, #4a5568);
  line-height: 1.6;
}

.analysis-section {
  background: var(--vp-tip-soft, #f0f9ff);
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-tip-1, #17a2b8);
  margin-top: 1.5rem;
}

.analysis-section h4 {
  color: var(--vp-c-tip-1, #17a2b8);
}

.analysis-grid {
  display: grid;
  gap: 1rem;
}

.analysis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--vp-c-bg, #ffffff);
  border-radius: 6px;
  border: 1px solid var(--vp-c-border, #e5e7eb);
}

.analysis-item .label {
  font-weight: 600;
  color: var(--vp-c-text-1, #495057);
}

.analysis-item .value {
  font-weight: 500;
}

.analysis-item .value.good {
  color: var(--vp-c-green-1, #28a745);
}

.analysis-item .value.warning {
  color: var(--vp-c-warning-1, #ffc107);
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
  .mx-checker {
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
  .mx-records-section h4,
  .analysis-section h4,
  .warnings-section h4,
  .recommendations-section h4,
  .errors-section h4 {
    font-size: 1.1rem;
  }
}
</style>
