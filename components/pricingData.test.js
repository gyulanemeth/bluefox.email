// Run: node components/pricingData.test.js
import assert from 'node:assert/strict'
import { planFor, packsFor } from './pricingData.js'

const plan = (v, byo) => { const p = planFor(v, byo); return p && `${p.name} $${p.price}` }
const packs = (v, byo) => { const p = packsFor(v, byo); return `${p.premium}P+${p.essential}E $${p.price}` }

// Monthly: smallest plan that covers the volume
assert.equal(plan(5000), 'Starter $6')
assert.equal(plan(50000), 'Pro $35')
assert.equal(plan(500000), 'Elite $239')
assert.equal(plan(1000000), undefined) // above the largest managed plan
assert.equal(plan(25000, true), 'Growth $19') // BYO Basic (20K) is too small
assert.equal(plan(1000000, true), 'Elite $239')

// Occasional: cheapest pack mix for a year of sends
assert.equal(packs(40000), '0P+1E $50') // 10K contacts × 4 sends a year
assert.equal(packs(550000), '1P+1E $350')
assert.equal(packs(1000000), '2P+0E $600')
assert.equal(packs(40000, true), '0P+1E $50')
assert.equal(packs(1200000, true), '1P+2E $400')

console.log('pricingData ok')
