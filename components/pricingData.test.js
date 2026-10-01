// Run: node components/pricingData.test.js
import assert from 'node:assert/strict'
import { cheapestOption } from './pricingData.js'

const pick = (volume, byo) => {
  const o = cheapestOption(volume, byo)
  return `${o.count > 1 ? o.count + '× ' : ''}${o.name} ${o.type} $${Math.round(o.monthly * 100) / 100}`
}

// Managed
assert.equal(pick(10000), 'Basic plan $9')
assert.equal(pick(25000), 'Growth plan $19')
assert.equal(pick(50000), 'Premium pack $30') // 500K pack lasts 10 months
assert.equal(pick(100000), 'Business plan $59')
assert.equal(pick(500000), 'Elite plan $239')
assert.equal(pick(1000000), '2× Premium pack $600') // no plan covers 1M

// BYO (2× sends)
assert.equal(pick(10000, true), 'Essential pack $5') // 100K pack lasts 10 months
assert.equal(pick(50000, true), 'Growth plan $19') // Premium would expire half unused
assert.equal(pick(500000, true), 'Scale plan $129')
assert.equal(pick(1000000, true), 'Elite plan $239')

console.log('pricingData ok')
