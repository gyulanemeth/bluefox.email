// Prices shared by PricingCalculator.vue and BYOPriceCalculator.vue.
// Keep BlueFox numbers in sync with pricing.md and byo-amazon-ses-pricing.md.

// [name, monthly price, sends per month] (managed; BYO gets 2× the sends)
const PLANS = [
  ['Starter', 6, 5000],
  ['Basic', 9, 10000],
  ['Growth', 19, 25000],
  ['Pro', 35, 50000],
  ['Business', 59, 100000],
  ['Scale', 129, 250000],
  ['Elite', 239, 500000]
]

// [name, one-time price, sends valid for 12 months] (managed; BYO gets 2× the sends)
const PACKS = [
  ['Essential', 50, 50000],
  ['Premium', 300, 500000]
]

// Cheapest way to send `volume` emails every month: a monthly plan, or a pack
// spread over the months it lasts (capped at its 12-month expiry).
export function cheapestOption (volume, byo = false) {
  const m = byo ? 2 : 1
  const plans = PLANS
    .filter(([, , sends]) => sends * m >= volume)
    .map(([name, price, sends]) => ({ type: 'plan', name, price, sends: sends * m, count: 1, months: 1, monthly: price }))
  const packs = PACKS.map(([name, price, sends]) => {
    const s = sends * m
    if (s < volume) {
      const count = Math.ceil(volume / s)
      return { type: 'pack', name, price, sends: s, count, months: 1, monthly: count * price }
    }
    const months = Math.min(s / volume, 12)
    return { type: 'pack', name, price, sends: s, count: 1, months, monthly: price / months }
  })
  // Plans come first, so a tie goes to the plan.
  return [...plans, ...packs].reduce((best, o) => (o.monthly < best.monthly ? o : best))
}

// Monthly list prices in USD excl. tax, checked 2026-10-01 (Mailchimp: regular price after promo,
// as shown outside the US; it localizes prices by region).
// Scenario: marketing sends, contacts = monthly sends / 5.
// null = no verified public price at this volume (shown as "—").
export const COMPETITORS = [
  {
    name: 'Mailchimp',
    href: '/comparisons/bluefox-vs-mailchimp',
    // Standard stores up to 100,000 contacts; Premium above that.
    plan: volume => (volume > 500000 ? 'Premium' : 'Standard'),
    prices: { 10000: 43.82, 25000: 66.02, 50000: 86.51, 100000: 165.04, 250000: 261.79, 500000: 438.22, 750000: 785.38, 1000000: 961.81 }
  },
  {
    name: 'SendGrid',
    href: '/comparisons/bluefox-vs-sendgrid',
    plan: () => 'Advanced',
    prices: { 10000: 60, 25000: 60, 50000: 60, 100000: 100, 250000: 250, 500000: 450, 750000: 900, 1000000: 900 }
  },
  {
    name: 'MailerSend',
    href: '/comparisons/bluefox-vs-mailersend',
    plan: () => 'Professional',
    // 750K and 1M: the 500K tier ($525) plus $0.80/1,000 overage beats the $1,000 1M tier.
    prices: { 10000: 110, 25000: 110, 50000: 110, 100000: 140, 250000: 275, 500000: 525, 750000: 725, 1000000: 925 }
  }
]
