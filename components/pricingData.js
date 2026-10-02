// Prices used by PricingCalculator.vue (on pricing.md and byo-amazon-ses-pricing.md).
// Keep the BlueFox numbers in sync with those two pages.

// Monthly plans (managed sending). BYO SES plans have the same price and 2× the sends.
export const PLANS = [
  { name: 'Starter', price: 6, sends: 5000 },
  { name: 'Basic', price: 9, sends: 10000 },
  { name: 'Growth', price: 19, sends: 25000 },
  { name: 'Pro', price: 35, sends: 50000 },
  { name: 'Business', price: 59, sends: 100000 },
  { name: 'Scale', price: 129, sends: 250000 },
  { name: 'Elite', price: 239, sends: 500000 }
]

// One-time packs, sends valid for 12 months (managed sending). BYO SES packs have 2× the sends.
export const ESSENTIAL_PACK = { price: 50, sends: 50000 }
export const PREMIUM_PACK = { price: 300, sends: 500000 }

function sendsMultiplier (byo) {
  if (byo) {
    return 2
  }
  return 1
}

// The smallest monthly plan that covers `monthlySends`, or null if no plan is big enough.
export function findPlan (monthlySends, byo) {
  const multiplier = sendsMultiplier(byo)

  for (const plan of PLANS) {
    const planSends = plan.sends * multiplier
    if (planSends >= monthlySends) {
      return { name: plan.name, price: plan.price, sends: planSends }
    }
  }

  return null
}

// The cheapest mix of Essential and Premium packs that covers `yearlySends`.
// Tries every number of Premium packs and fills the rest with Essential packs.
export function findCheapestPacks (yearlySends, byo) {
  const multiplier = sendsMultiplier(byo)
  const essentialSends = ESSENTIAL_PACK.sends * multiplier
  const premiumSends = PREMIUM_PACK.sends * multiplier
  const maxPremium = Math.ceil(yearlySends / premiumSends)

  let cheapest = null

  for (let premium = 0; premium <= maxPremium; premium++) {
    const remainingSends = Math.max(0, yearlySends - premium * premiumSends)
    const essential = Math.ceil(remainingSends / essentialSends)
    const price = premium * PREMIUM_PACK.price + essential * ESSENTIAL_PACK.price

    if (cheapest === null || price < cheapest.price) {
      cheapest = {
        premium,
        essential,
        price,
        sends: premium * premiumSends + essential * essentialSends
      }
    }
  }

  return cheapest
}

// billsPerContact: charges for stored contacts every month, whether you send or not.
export const COMPETITORS = [
  { key: 'mailchimp', name: 'Mailchimp', plan: 'Standard', href: '/comparisons/bluefox-vs-mailchimp', billsPerContact: true },
  { key: 'sendgrid', name: 'SendGrid', plan: 'Advanced', href: '/comparisons/bluefox-vs-sendgrid', billsPerContact: true },
  { key: 'mailersend', name: 'MailerSend', plan: 'Professional', href: '/comparisons/bluefox-vs-mailersend', billsPerContact: false }
]

// One row per calculator stop. Monthly list prices in USD excl. tax, checked 2026-10-01.
// Contacts = monthly sends / 5 (each contact gets about 5 emails a month).
// Mailchimp: regular price after promo, as shown outside the US (it localizes prices by region);
// the 200,000-contact row is its Premium plan, since Standard stores up to 100,000 contacts.
// MailerSend at 1M: its 500K tier ($525) plus $0.80 per 1,000 overage beats the $1,000 1M tier.
export const PRICE_STOPS = [
  { sends: 5000, contacts: 1000, mailchimp: 29.64, sendgrid: 60, mailersend: 110 },
  { sends: 10000, contacts: 2000, mailchimp: 43.82, sendgrid: 60, mailersend: 110 },
  { sends: 25000, contacts: 5000, mailchimp: 66.02, sendgrid: 60, mailersend: 110 },
  { sends: 50000, contacts: 10000, mailchimp: 86.51, sendgrid: 60, mailersend: 110 },
  { sends: 100000, contacts: 20000, mailchimp: 165.04, sendgrid: 100, mailersend: 140 },
  { sends: 250000, contacts: 50000, mailchimp: 261.79, sendgrid: 250, mailersend: 275 },
  { sends: 500000, contacts: 100000, mailchimp: 438.22, sendgrid: 450, mailersend: 525 },
  { sends: 1000000, contacts: 200000, mailchimp: 961.81, sendgrid: 900, mailersend: 925 }
]
