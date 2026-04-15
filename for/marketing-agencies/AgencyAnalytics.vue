<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Clear reports, fast' },
  description: {
    type: String,
    default: 'Per-project analytics are clean and visual. Client performance reviews become straightforward, and retainer conversations get easier.'
  },
  defaultTab: { type: String, default: 'daily' }
})

const activeView = ref('sending')
const activeTab  = ref(props.defaultTab)

const tabs = ['Hourly', 'Daily', 'Weekly', 'Monthly']

// ── Stats ────────────────────────────────────────────────────────────────────
const sendingStats = {
  hourly:  [
    { label: 'Sent',          value: '6,200'  },
    { label: 'Failed',        value: '0'      },
    { label: 'Opens',         value: '4,805'  },
    { label: 'Unique Opens',  value: '3,210'  },
    { label: 'Clicks',        value: '748'    },
    { label: 'Unique Clicks', value: '182'    },
    { label: 'Bounced',       value: '8'      },
    { label: 'Complaints',    value: '0'      },
  ],
  daily: [
    { label: 'Sent',          value: '35,544' },
    { label: 'Failed',        value: '0'      },
    { label: 'Opens',         value: '17,958' },
    { label: 'Unique Opens',  value: '11,687' },
    { label: 'Clicks',        value: '4,761'  },
    { label: 'Unique Clicks', value: '1,131'  },
    { label: 'Bounced',       value: '26'     },
    { label: 'Complaints',    value: '1'      },
  ],
  weekly: [
    { label: 'Sent',          value: '35,544' },
    { label: 'Failed',        value: '0'      },
    { label: 'Opens',         value: '17,958' },
    { label: 'Unique Opens',  value: '11,687' },
    { label: 'Clicks',        value: '4,761'  },
    { label: 'Unique Clicks', value: '1,131'  },
    { label: 'Bounced',       value: '26'     },
    { label: 'Complaints',    value: '1'      },
  ],
  monthly: [
    { label: 'Sent',          value: '284,200' },
    { label: 'Failed',        value: '12'      },
    { label: 'Opens',         value: '142,600' },
    { label: 'Unique Opens',  value: '96,400'  },
    { label: 'Clicks',        value: '38,100'  },
    { label: 'Unique Clicks', value: '9,080'   },
    { label: 'Bounced',       value: '312'     },
    { label: 'Complaints',    value: '8'       },
  ],
}

const subscriptionStats = {
  hourly:  [
    { label: 'New Contacts',  value: '18'   },
    { label: 'Subscriptions', value: '42'   },
    { label: 'Paused',        value: '0'    },
    { label: 'Unsubscribed',  value: '28'   },
  ],
  daily: [
    { label: 'New Contacts',  value: '209'   },
    { label: 'Subscriptions', value: '1,342' },
    { label: 'Paused',        value: '0'     },
    { label: 'Unsubscribed',  value: '1'     },
  ],
  weekly: [
    { label: 'New Contacts',  value: '209'   },
    { label: 'Subscriptions', value: '1,342' },
    { label: 'Paused',        value: '0'     },
    { label: 'Unsubscribed',  value: '1'     },
  ],
  monthly: [
    { label: 'New Contacts',  value: '2,840'  },
    { label: 'Subscriptions', value: '16,200' },
    { label: 'Paused',        value: '12'     },
    { label: 'Unsubscribed',  value: '48'     },
  ],
}

// ── Chart datasets ────────────────────────────────────────────────────────────
const sendingDatasets = {
  hourly: {
    dateRange: 'Feb 16–18, 2026  •  Hourly',
    metric: 'Opens',
    xStep: 24,
    points: [
      // Feb 16
      { l: 'Feb 16', v: 0   }, { l: '16/01', v: 0   }, { l: '16/02', v: 0   },
      { l: '16/03',  v: 0   }, { l: '16/04', v: 0   }, { l: '16/05', v: 0   },
      { l: '16/06',  v: 0   }, { l: '16/07', v: 0   }, { l: '16/08', v: 0   },
      { l: '16/09',  v: 0   }, { l: '16/10', v: 0   }, { l: '16/11', v: 794 },
      { l: '16/12',  v: 848 }, { l: '16/13', v: 415 }, { l: '16/14', v: 299 },
      { l: '16/15',  v: 209 }, { l: '16/16', v: 165 }, { l: '16/17', v: 155 },
      { l: '16/18',  v: 111 }, { l: '16/19', v: 95  }, { l: '16/20', v: 111 },
      { l: '16/21',  v: 86  }, { l: '16/22', v: 124 }, { l: '16/23', v: 100 },
      // Feb 17
      { l: 'Feb 17', v: 104 }, { l: '17/01', v: 88  }, { l: '17/02', v: 118 },
      { l: '17/03',  v: 88  }, { l: '17/04', v: 60  }, { l: '17/05', v: 29  },
      { l: '17/06',  v: 16  }, { l: '17/07', v: 10  }, { l: '17/08', v: 9   },
      { l: '17/09',  v: 21  }, { l: '17/10', v: 35  }, { l: '17/11', v: 38  },
      { l: '17/12',  v: 31  }, { l: '17/13', v: 48  }, { l: '17/14', v: 26  },
      { l: '17/15',  v: 39  }, { l: '17/16', v: 30  }, { l: '17/17', v: 18  },
      { l: '17/18',  v: 26  }, { l: '17/19', v: 26  }, { l: '17/20', v: 27  },
      { l: '17/21',  v: 22  }, { l: '17/22', v: 18  }, { l: '17/23', v: 28  },
      // Feb 18
      { l: 'Feb 18', v: 25  }, { l: '18/01', v: 23  }, { l: '18/02', v: 25  },
      { l: '18/03',  v: 19  }, { l: '18/04', v: 10  }, { l: '18/05', v: 6   },
      { l: '18/06',  v: 2   }, { l: '18/07', v: 3   }, { l: '18/08', v: 1   },
      { l: '18/09',  v: 7   }, { l: '18/10', v: 15  }, { l: '18/11', v: 17  },
      { l: '18/12',  v: 10  }, { l: '18/13', v: 20  }, { l: '18/14', v: 14  },
      { l: '18/15',  v: 11  }, { l: '18/16', v: 12  }, { l: '18/17', v: 15  },
      { l: '18/18',  v: 16  }, { l: '18/19', v: 18  }, { l: '18/20', v: 13  },
      { l: '18/21',  v: 19  }, { l: '18/22', v: 16  }, { l: '18/23', v: 21  },
    ],
  },
  daily: {
    dateRange: 'Feb 01, 2026 – Feb 28, 2026',
    metric: 'Opens',
    xStep: 5,
    points: [
      { l: '02-01', v: 45   }, { l: '02-02', v: 12   }, { l: '02-03', v: 8    },
      { l: '02-04', v: 4    }, { l: '02-05', v: 4110 }, { l: '02-06', v: 934  },
      { l: '02-07', v: 318  }, { l: '02-08', v: 165  }, { l: '02-09', v: 3410 },
      { l: '02-10', v: 1758 }, { l: '02-11', v: 436  }, { l: '02-12', v: 226  },
      { l: '02-13', v: 80   }, { l: '02-14', v: 30   }, { l: '02-15', v: 15   },
      { l: '02-16', v: 3592 }, { l: '02-17', v: 1028 }, { l: '02-18', v: 428  },
      { l: '02-19', v: 248  }, { l: '02-20', v: 151  }, { l: '02-21', v: 50   },
      { l: '02-22', v: 40   }, { l: '02-23', v: 12   }, { l: '02-24', v: 8    },
      { l: '02-25', v: 5    }, { l: '02-26', v: 3    }, { l: '02-27', v: 2    },
      { l: '02-28', v: 1    },
    ],
  },
  weekly: {
    dateRange: 'Jan 27, 2026 – Mar 02, 2026',
    metric: 'Opens',
    xStep: 1,
    points: [
      { l: 'Jan 27–Feb 02', v: 5431 },
      { l: 'Feb 03–Feb 09', v: 6105 },
      { l: 'Feb 10–Feb 16', v: 5512 },
      { l: 'Feb 17–Feb 23', v: 1845 },
      { l: 'Feb 24–Mar 02', v: 71   },
    ],
  },
  monthly: {
    dateRange: 'Mar 2025 – Feb 2026',
    metric: 'Opens',
    xStep: 2,
    points: [
      { l: 'Mar 25', v: 8200  }, { l: 'Apr 25', v: 12400 }, { l: 'May 25', v: 9800  },
      { l: 'Jun 25', v: 15600 }, { l: 'Jul 25', v: 11200 }, { l: 'Aug 25', v: 18900 },
      { l: 'Sep 25', v: 14300 }, { l: 'Oct 25', v: 22100 }, { l: 'Nov 25', v: 28400 },
      { l: 'Dec 25', v: 19600 }, { l: 'Jan 26', v: 31200 }, { l: 'Feb 26', v: 17958 },
    ],
  },
}

const subscriptionDatasets = {
  hourly: {
    dateRange: 'Feb 16–18, 2026  •  Hourly',
    metric: 'Unsubscribe',
    xStep: 24,
    points: [
      // Feb 16
      { l: 'Feb 16', v: 0 }, { l: 's16/01', v: 0 }, { l: 's16/02', v: 0 },
      { l: 's16/03',  v: 0 }, { l: 's16/04', v: 0 }, { l: 's16/05', v: 0 },
      { l: 's16/06',  v: 0 }, { l: 's16/07', v: 0 }, { l: 's16/08', v: 0 },
      { l: 's16/09',  v: 0 }, { l: 's16/10', v: 0 }, { l: 's16/11', v: 0 },
      { l: 's16/12',  v: 0 }, { l: 's16/13', v: 0 }, { l: 's16/14', v: 1 },
      { l: 's16/15',  v: 3 }, { l: 's16/16', v: 1 }, { l: 's16/17', v: 2 },
      { l: 's16/18',  v: 0 }, { l: 's16/19', v: 1 }, { l: 's16/20', v: 1 },
      { l: 's16/21',  v: 0 }, { l: 's16/22', v: 0 }, { l: 's16/23', v: 0 },
      // Feb 17
      { l: 'Feb 17',  v: 0 }, { l: 's17/01', v: 0 }, { l: 's17/02', v: 3 },
      { l: 's17/03',  v: 2 }, { l: 's17/04', v: 0 }, { l: 's17/05', v: 0 },
      { l: 's17/06',  v: 0 }, { l: 's17/07', v: 0 }, { l: 's17/08', v: 0 },
      { l: 's17/09',  v: 0 }, { l: 's17/10', v: 1 }, { l: 's17/11', v: 0 },
      { l: 's17/12',  v: 1 }, { l: 's17/13', v: 3 }, { l: 's17/14', v: 1 },
      { l: 's17/15',  v: 1 }, { l: 's17/16', v: 1 }, { l: 's17/17', v: 0 },
      { l: 's17/18',  v: 0 }, { l: 's17/19', v: 0 }, { l: 's17/20', v: 0 },
      { l: 's17/21',  v: 0 }, { l: 's17/22', v: 0 }, { l: 's17/23', v: 0 },
      // Feb 18
      { l: 'Feb 18',  v: 0 }, { l: 's18/01', v: 0 }, { l: 's18/02', v: 0 },
      { l: 's18/03',  v: 0 }, { l: 's18/04', v: 0 }, { l: 's18/05', v: 0 },
      { l: 's18/06',  v: 0 }, { l: 's18/07', v: 0 }, { l: 's18/08', v: 0 },
      { l: 's18/09',  v: 0 }, { l: 's18/10', v: 0 }, { l: 's18/11', v: 1 },
      { l: 's18/12',  v: 0 }, { l: 's18/13', v: 1 }, { l: 's18/14', v: 1 },
      { l: 's18/15',  v: 3 }, { l: 's18/16', v: 0 }, { l: 's18/17', v: 0 },
      { l: 's18/18',  v: 0 }, { l: 's18/19', v: 0 }, { l: 's18/20', v: 0 },
      { l: 's18/21',  v: 0 }, { l: 's18/22', v: 0 }, { l: 's18/23', v: 0 },
    ],
  },
  daily: {
    dateRange: 'Feb 01, 2026 – Feb 28, 2026',
    metric: 'Unsubscribe',
    xStep: 5,
    points: Array.from({ length: 28 }, (_, i) => ({
      l: `02-${String(i + 1).padStart(2, '0')}`,
      v: [9, 10].includes(i) ? 1 : [16].includes(i) ? 1 : 0,
    })),
  },
  weekly: {
    dateRange: 'Jan 27, 2026 – Mar 02, 2026',
    metric: 'Unsubscribe',
    xStep: 1,
    points: [
      { l: 'Jan 27–Feb 02', v: 0 },
      { l: 'Feb 03–Feb 09', v: 1 },
      { l: 'Feb 10–Feb 16', v: 2 },
      { l: 'Feb 17–Feb 23', v: 0 },
      { l: 'Feb 24–Mar 02', v: 0 },
    ],
  },
  monthly: {
    dateRange: 'Mar 2025 – Feb 2026',
    metric: 'New Contacts',
    xStep: 2,
    points: [
      { l: 'Mar 25', v: 142  }, { l: 'Apr 25', v: 218  }, { l: 'May 25', v: 196  },
      { l: 'Jun 25', v: 312  }, { l: 'Jul 25', v: 280  }, { l: 'Aug 25', v: 425  },
      { l: 'Sep 25', v: 388  }, { l: 'Oct 25', v: 510  }, { l: 'Nov 25', v: 640  },
      { l: 'Dec 25', v: 480  }, { l: 'Jan 26', v: 720  }, { l: 'Feb 26', v: 209  },
    ],
  },
}

// ── Computed ─────────────────────────────────────────────────────────────────
const activeDataset = computed(() =>
  activeView.value === 'sending'
    ? sendingDatasets[activeTab.value]
    : subscriptionDatasets[activeTab.value]
)

const activeStats = computed(() =>
  activeView.value === 'sending'
    ? sendingStats[activeTab.value]
    : subscriptionStats[activeTab.value]
)

const chartType = ref('bar')

const W = 660
const H = 160
const PAD_L = 40
const PAD_B = 28

const maxVal = computed(() =>
  Math.max(...activeDataset.value.points.map(p => p.v), 1)
)

const bars = computed(() => {
  const pts = activeDataset.value.points
  const n   = pts.length
  const bw  = (W - PAD_L) / n
  return pts.map((p, i) => {
    const h = (p.v / maxVal.value) * (H - PAD_B - 4)
    return {
      x: PAD_L + i * bw + 1,
      y: H - PAD_B - h,
      w: Math.max(bw - 2, 1),
      h: Math.max(h, 0),
      v: p.v,
      l: p.l,
      showLabel: h > 20 && p.v > 0,
      labelText: p.v >= 1000 ? (p.v / 1000).toFixed(1) + 'k' : String(p.v),
    }
  })
})

const xLabels = computed(() => {
  const step = activeDataset.value.xStep
  return bars.value.filter((_, i) => i % step === 0)
})

const linePoints = computed(() =>
  bars.value.map(b => `${b.x + b.w / 2},${b.y}`).join(' ')
)

const fillPath = computed(() => {
  const pts = bars.value
  if (!pts.length) return ''
  const baseline = H - PAD_B
  const first = pts[0]
  const last  = pts[pts.length - 1]
  const linePart = pts.map(b => `L ${b.x + b.w / 2},${b.y}`).join(' ')
  return `M ${first.x + first.w / 2},${baseline} ${linePart} L ${last.x + last.w / 2},${baseline} Z`
})

const yGridLines = computed(() => {
  const max = maxVal.value
  return [0.25, 0.5, 0.75, 1].map(s => ({
    y: H - PAD_B - s * (H - PAD_B - 4),
    label: max < 5
      ? (s * max).toFixed(1)
      : Math.round(s * max) >= 1000
        ? (Math.round(s * max) / 1000).toFixed(1) + 'k'
        : String(Math.round(s * max)),
  }))
})
</script>

<template>
  <section class="agency-analytics" aria-labelledby="agency-analytics-title">
    <div class="analytics-head">
      <v-chip color="primary" class="analytics-badge">
        <span class="text-overline">Analytics</span>
      </v-chip>
      <h2 id="agency-analytics-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="dashboard-shell" role="region" aria-label="Analytics dashboard preview">

      <!-- Top bar: view switcher + tab controls -->
      <div class="dash-topbar">
        <div class="dash-views">
          <button
            class="dash-view-btn"
            :class="{ active: activeView === 'sending' }"
            @click="activeView = 'sending'"
          >Email Sending Trends</button>
          <button
            class="dash-view-btn"
            :class="{ active: activeView === 'subscriptions' }"
            @click="activeView = 'subscriptions'"
          >Subscription Trends</button>
        </div>
        <div class="dash-controls">
          <div class="dash-tabs" role="tablist" aria-label="Time period">
            <button
              v-for="tab in tabs"
              :key="tab"
              class="dash-tab"
              :class="{ active: activeTab === tab.toLowerCase() }"
              role="tab"
              :aria-selected="activeTab === tab.toLowerCase()"
              @click="activeTab = tab.toLowerCase()"
            >{{ tab }}</button>
          </div>
          <div class="dash-chart-icons">
            <button class="chart-icon-btn" :class="{ active: chartType === 'line' }" @click="chartType = 'line'" aria-label="Line chart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </button>
            <button class="chart-icon-btn" :class="{ active: chartType === 'bar' }" @click="chartType = 'bar'" aria-label="Bar chart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="18" y="13" width="4" height="8"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Date range + metric -->
      <div class="dash-meta">
        <span class="dash-date">{{ activeDataset.dateRange }}</span>
        <span class="dash-metric-label">
          Metric:
          <span class="dash-metric-value">{{ activeDataset.metric }}</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>

      <!-- Stats row -->
      <div class="dash-stats" role="list">
        <div
          v-for="stat in activeStats"
          :key="stat.label"
          class="dash-stat"
          role="listitem"
        >
          <span class="stat-label">{{ stat.label }}</span>
          <span class="stat-value">{{ stat.value }}</span>
        </div>
      </div>

      <!-- Chart -->
      <div class="dash-chart-wrap">
        <svg
          :viewBox="`0 0 ${W + 20} ${H}`"
          :key="`${activeView}-${activeTab}`"
          class="dash-chart-svg"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <!-- Grid lines -->
          <line
            v-for="g in yGridLines" :key="`g-${g.y}`"
            x1="0" :y1="g.y" :x2="W + 20" :y2="g.y"
            stroke="#e5e7eb" stroke-width="1"
          />
          <line x1="0" :y1="H - PAD_B" :x2="W + 20" :y2="H - PAD_B" stroke="#d1d5db" stroke-width="1"/>

          <!-- Y-axis labels -->
          <text
            v-for="g in yGridLines" :key="`yl-${g.y}`"
            :x="PAD_L - 4" :y="g.y + 4"
            text-anchor="end" font-size="9" fill="#9ca3af"
          >{{ g.label }}</text>

          <!-- Bars -->
          <template v-if="chartType === 'bar'">
            <rect
              v-for="bar in bars" :key="`b-${bar.l}`"
              :x="bar.x" :y="bar.y" :width="bar.w" :height="bar.h"
              fill="#13b0ee" rx="1.5" class="chart-bar"
            />
            <text
              v-for="bar in bars.filter(b => b.showLabel)" :key="`bl-${bar.l}`"
              :x="bar.x + bar.w / 2" :y="bar.y - 4"
              text-anchor="middle" font-size="8.5" font-weight="600" fill="#0e7490"
            >{{ bar.labelText }}</text>
          </template>

          <!-- Line chart -->
          <template v-else>
            <path :d="fillPath" fill="rgba(19, 176, 238, 0.1)" />
            <polyline :points="linePoints" fill="none" stroke="#13b0ee" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
            <circle
              v-for="bar in bars" :key="`lp-${bar.l}`"
              :cx="bar.x + bar.w / 2" :cy="bar.y" r="2.5"
              fill="#13b0ee" class="chart-dot"
            />
          </template>

          <!-- X-axis labels -->
          <text
            v-for="bar in xLabels" :key="`xl-${bar.l}`"
            :x="bar.x + bar.w / 2" :y="H - 4"
            text-anchor="middle" font-size="9" fill="#9ca3af"
          >{{ bar.l }}</text>
        </svg>
      </div>

    </div>

    <div class="analytics-cta">
      <a href="/docs/analytics" class="analytics-cta-btn">
        See everything analytics can show you
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.agency-analytics { padding: 36px 24px; }

.analytics-head { margin-bottom: 28px; }

.analytics-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.analytics-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.analytics-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .analytics-head p { color: #94a3b8; }

/* Dashboard shell */
.dashboard-shell {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08);
  border: 1px solid #e5e7eb;
}

html.dark .dashboard-shell {
  background: #1e293b;
  border-color: #334155;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.3);
}

/* Top bar */
.dash-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
  flex-wrap: wrap;
}

html.dark .dash-topbar { border-bottom-color: #334155; }

.dash-views {
  display: flex;
  gap: 2px;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 3px;
}

html.dark .dash-views { background: #0f172a; }

.dash-view-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.dash-view-btn.active {
  background: #ffffff;
  color: #0f172a;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

html.dark .dash-view-btn { color: #94a3b8; }
html.dark .dash-view-btn.active { background: #1e293b; color: #f1f5f9; }

.dash-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dash-tabs { display: flex; gap: 2px; }

.dash-tab {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid #e2e8f0;
  background: transparent;
  border-radius: 5px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dash-tab.active {
  background: #13b0ee;
  border-color: #13b0ee;
  color: #ffffff;
}

html.dark .dash-tab { border-color: #334155; color: #94a3b8; }
html.dark .dash-tab.active { background: #13b0ee; border-color: #13b0ee; color: #fff; }

.dash-chart-icons {
  display: flex;
  gap: 4px;
}

.chart-icon-btn {
  background: none;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.chart-icon-btn:hover { color: #13b0ee; }

.chart-icon-btn.active {
  color: #13b0ee;
  background: rgba(19, 176, 238, 0.1);
  border-color: rgba(19, 176, 238, 0.3);
}

html.dark .chart-icon-btn { color: #64748b; }
html.dark .chart-icon-btn:hover { color: #13b0ee; }
html.dark .chart-icon-btn.active { background: rgba(19, 176, 238, 0.15); border-color: rgba(19, 176, 238, 0.4); }

/* Meta */
.dash-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 7px 16px;
  border-bottom: 1px solid #f1f5f9;
}

html.dark .dash-meta { border-bottom-color: #334155; }

.dash-date {
  font-size: 11px;
  color: #94a3b8;
}

.dash-metric-label {
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
}

.dash-metric-value { color: #13b0ee; font-weight: 700; }

/* Stats row */
.dash-stats {
  display: flex;
  padding: 10px 16px;
  border-bottom: 1px solid #f1f5f9;
  overflow-x: auto;
}

html.dark .dash-stats { border-bottom-color: #334155; }

.dash-stat {
  flex: 1;
  min-width: 72px;
  text-align: center;
  border-right: 1px solid #f1f5f9;
  padding: 4px 6px;
}

.dash-stat:last-child { border-right: none; }
html.dark .dash-stat { border-right-color: #334155; }

.stat-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.stat-value {
  display: block;
  font-size: 15px;
  font-weight: 800;
  color: #0f172a;
  margin-top: 2px;
}

html.dark .stat-value { color: #f1f5f9; }

/* Chart */
.dash-chart-wrap { padding: 14px 16px 8px; }

.dash-chart-svg {
  width: 100%;
  height: 190px;
  display: block;
}

.chart-bar {
  transition: opacity 0.15s ease;
}

.chart-bar:hover { opacity: 0.72; }

.chart-dot {
  transition: r 0.15s ease, opacity 0.15s ease;
}

.chart-dot:hover { r: 4; opacity: 0.8; }

.analytics-cta {
  margin-top: 20px;
  text-align: right;
}

.analytics-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: #13b0ee;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.18s ease, gap 0.18s ease, box-shadow 0.18s ease;
}

.analytics-cta-btn:hover {
  background: #0e9fd8;
  color: #ffffff;
  gap: 11px;
  box-shadow: 0 4px 14px rgba(19, 176, 238, 0.35);
}

html.dark .analytics-cta-btn { background: #13b0ee; color: #fff; }
html.dark .analytics-cta-btn:hover { background: #0e9fd8; }

@media (max-width: 760px) {
  .dash-topbar { flex-direction: column; align-items: flex-start; }
  .dash-stat { min-width: 58px; padding: 4px 3px; }
  .stat-label { font-size: 9px; }
  .stat-value { font-size: 12px; }
  .agency-analytics { padding: 24px 0; }
}
</style>
