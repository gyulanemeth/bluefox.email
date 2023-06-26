---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Send beautiful newsletters
  text: for 85X cheaper.
  tagline: Design systems + AWS SES = Success!
  image: '/assets/bluefoxemail-logo.png'
  actions:
    - theme: brand
      text: Join Our Waitlist
      link: /signup-waitlist

features:
  - title: Keep your brand consistent
    details: Our design systems ensures consistent branding and visual identity across email campaigns, creating a professional and cohesive brand image. Additionally, a design system streamlines the email creation process, saving time and effort by providing pre-designed components and templates that can be easily reused, resulting in faster and more efficient email production.
    icon: 🎨
  - title: Reach your readers' inboxes.
    details: Harness the unmatched power of AWS SES for superior email delivery. With its scalable and reliable platform, backed by Amazon's renowned reputation for deliverability, you can confidently reach your audience's inboxes. Maximize engagement and effectively communicate your brand's message with AWS SES, ensuring high deliverability rates and achieving your marketing goals with ease.
    icon: 📨
  - title: Invite any teammates
    details: Invite as many teammates into your account as you want, without being held back by user-based pricing limitations. Enjoy unrestricted scalability, enhanced collaboration, and seamless communication, empowering your organization to thrive. Say goodbye to user restrictions and experience the freedom to maximize productivity. Join us and unlock limitless possibilities for your team's success.
    icon: 👥
---

<script setup>
  import PricingComponent from './components/Pricing.vue'
</script>

<PricingComponent />



