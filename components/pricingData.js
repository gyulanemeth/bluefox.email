// Prices shared by PricingCalculator.vue (pricing.md and byo-amazon-ses-pricing.md).
// Keep BlueFox numbers in sync with those two pages.

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

// One-time packs, sends valid for 12 months (managed; BYO gets 2× the sends)
const ESSENTIAL = { price: 50, sends: 50000 }
const PREMIUM = { price: 300, sends: 500000 }

// Smallest monthly plan covering `volume` sends a month, or undefined above the largest plan.
export function planFor (volume, byo = false) {
  const m = byo ? 2 : 1
  const plan = PLANS.find(([, , sends]) => sends * m >= volume)
  return plan && { name: plan[0], price: plan[1], sends: plan[2] * m }
}

// Cheapest mix of packs covering `total` sends within their 12-month validity.
export function packsFor (total, byo = false) {
  const m = byo ? 2 : 1
  let best
  for (let premium = 0; premium <= Math.ceil(total / (PREMIUM.sends * m)); premium++) {
    const essential = Math.ceil(Math.max(0, total - premium * PREMIUM.sends * m) / (ESSENTIAL.sends * m))
    const price = premium * PREMIUM.price + essential * ESSENTIAL.price
    if (!best || price < best.price) {
      best = { premium, essential, price, sends: (premium * PREMIUM.sends + essential * ESSENTIAL.sends) * m }
    }
  }
  return best
}

// Monthly list prices in USD excl. tax, checked 2026-10-01 (Mailchimp: regular price after promo,
// as shown outside the US; it localizes prices by region).
// Keyed by monthly sends; contacts = monthly sends / 5.
// perContact: bills by stored contacts every month, whether you send or not.
export const COMPETITORS = [
  {
    name: 'Mailchimp',
    href: '/comparisons/bluefox-vs-mailchimp',
    perContact: true,
    // Standard stores up to 100,000 contacts; Premium above that.
    plan: volume => (volume > 500000 ? 'Premium' : 'Standard'),
    prices: { 5000: 29.64, 10000: 43.82, 25000: 66.02, 50000: 86.51, 100000: 165.04, 250000: 261.79, 500000: 438.22, 750000: 785.38, 1000000: 961.81 }
  },
  {
    name: 'SendGrid',
    href: '/comparisons/bluefox-vs-sendgrid',
    perContact: true,
    plan: () => 'Advanced',
    prices: { 5000: 60, 10000: 60, 25000: 60, 50000: 60, 100000: 100, 250000: 250, 500000: 450, 750000: 900, 1000000: 900 }
  },
  {
    name: 'MailerSend',
    href: '/comparisons/bluefox-vs-mailersend',
    perContact: false,
    plan: () => 'Professional',
    // 750K and 1M: the 500K tier ($525) plus $0.80/1,000 overage beats the $1,000 1M tier.
    prices: { 5000: 110, 10000: 110, 25000: 110, 50000: 110, 100000: 140, 250000: 275, 500000: 525, 750000: 725, 1000000: 925 }
  }
]
