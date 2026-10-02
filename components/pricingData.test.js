// Run: node components/pricingData.test.js
import assert from 'node:assert/strict'
import { findPlan, findCheapestPacks } from './pricingData.js'

// Monthly: the smallest plan that covers the volume
assert.equal(findPlan(5000, false).name, 'Starter')
assert.equal(findPlan(50000, false).name, 'Pro')
assert.equal(findPlan(500000, false).name, 'Elite')
assert.equal(findPlan(1000000, false), null) // above the largest managed plan
assert.equal(findPlan(25000, true).name, 'Growth') // BYO Basic (20K) is too small
assert.equal(findPlan(1000000, true).name, 'Elite')

// Occasional: the cheapest pack mix for a year of sends
const tenThousandContactsFourTimes = findCheapestPacks(40000, false)
assert.equal(tenThousandContactsFourTimes.essential, 1)
assert.equal(tenThousandContactsFourTimes.premium, 0)
assert.equal(tenThousandContactsFourTimes.price, 50)

assert.equal(findCheapestPacks(550000, false).price, 350) // 1 Premium + 1 Essential
assert.equal(findCheapestPacks(1000000, false).price, 600) // 2 Premium
assert.equal(findCheapestPacks(1200000, true).price, 400) // BYO: 1 Premium + 2 Essential

console.log('pricingData ok')
