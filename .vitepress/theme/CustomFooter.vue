<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

// Configuration constants
const FOOTER_CONFIG = {
  allowedPaths: ['/', '/pricing', '/tutorials', '/articles', '/tools', '/comparisons',],
  allowedPrefixes: ['/for', '/email-sending-concepts', '/aws-concepts', '/comparisons/'],
  currentYear: new Date().getFullYear(),
  
  links: {
    company: [
      { text: 'About', href: '/about' },
      { text: 'Why?', href: '/why' },
      { text: 'Partners', href: '/partners' }
    ],
    resources: [
      { text: 'Documentation', href: '/docs/' },
      { text: 'Tutorials', href: '/tutorials' },
      { text: 'Articles', href: '/articles' },
      { text: 'Comparisons', href: '/comparisons' },
      { text: 'Tools', href: '/tools' }
    ],
    connect: [
      { text: 'Email', href: 'mailto:hello@bluefox.email' },
      { text: 'Twitter', href: 'https://x.com/bluefoxemail', external: true },
      { text: 'LinkedIn', href: 'https://www.linkedin.com/company/bluefox-email/', external: true }
    ],
    glossary: [
      { text: 'Email Sending Concepts', href: '/email-sending-concepts/' },
      { text: 'AWS Concepts', href: '/aws-concepts/' }
    ]
  },
  
  policies: [
    { text: 'Terms of use', href: '/terms-of-use' },
    { text: 'Privacy policy', href: '/privacy-policy' },
    { text: 'Refund policy', href: '/refund-policy' }
  ]
}

// Utilities
const normalizePath = (path) => path.rstrip ? path.rstrip('/') : path.replace(/\/+$/, '')

// Main computed properties
const route = useRoute()
const shouldShowFooter = computed(() => {
  const currentPath = route.path
  const normalizedCurrent = normalizePath(currentPath)
  const normalizedAllowed = FOOTER_CONFIG.allowedPaths.map(normalizePath)
  
  // Check exact path matches (normalized to handle trailing slashes)
  if (normalizedAllowed.includes(normalizedCurrent)) {
    return true
  }
  
  // Check prefix matches
  return FOOTER_CONFIG.allowedPrefixes.some(prefix => 
    currentPath.startsWith(prefix)
  )
})

// Destructure for template
const { links: footerLinks, policies: policyLinks, currentYear } = FOOTER_CONFIG
</script>

<template>  
  <footer v-if="shouldShowFooter" class="custom-footer">
    <div class="footer-container">
      <div class="footer-top">
        <!-- Logo Section -->
        <div class="footer-logo-wrapper">
          <div class="footer-logo">
            <a href="/" class="logo-link" aria-label="BlueFox Email Home">
              <img 
                src="/assets/logo-text_inline.webp" 
                alt="BlueFox Email logo" 
                width="250" 
                height="auto"
                loading="lazy"
              />
            </a>
            <p class="footer-tagline">
              BlueFox Email helps SaaS companies create and send beautiful transactional and marketing emails with high deliverability across all devices.
            </p>
          </div>
        </div>
        
        <!-- Links Section -->
        <div class="footer-links-wrapper">
          <nav class="footer-links" aria-label="Footer navigation">
            <div 
              v-for="(links, section) in footerLinks" 
              :key="section"
              class="footer-column"
            >
              <h4>{{ section.charAt(0).toUpperCase() + section.slice(1) }}</h4>
              <a 
                v-for="link in links"
                :key="link.text"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
              >
                {{ link.text }}
              </a>
            </div>
          </nav>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="footer-bottom">
        <nav class="footer-policy-links" aria-label="Policy links">
          <template v-for="(link, index) in policyLinks" :key="link.text">
            <a :href="link.href">{{ link.text }}</a>
            <span 
              v-if="index < policyLinks.length - 1" 
              class="policy-separator" 
              aria-hidden="true"
            >
              |
            </span>
          </template>
        </nav>
        
        <div class="footer-copyright">
          Copyright © {{ currentYear }} Innovaris Group LLC.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Base Footer Styles */
.custom-footer {
  width: 100%;
  margin-top: 40px;
  padding-top: 27px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  position: relative;
  z-index: 10;
  font-size: 10px;
}

.vp-doc-aside-container .custom-footer {
  padding-right: calc(220px + 32px);
}

.footer-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Layout Styles */
.footer-top {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 15px;
  margin-bottom: 6px;
}

.footer-logo-wrapper {
  flex: 0 0 220px;
}

.footer-links-wrapper {
  flex: 1;
}

/* Logo Section */
.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: -15px 0 20px 0;
  padding-left: 0;
}

.footer-logo img {
  max-width: 100%;
  height: auto;
  margin-bottom: 4px;
}

.logo-link {
  display: block;
  padding: 0;
  margin: 0;
}

.footer-tagline {
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  margin: 0;
  width: 240px;
  padding-left: 0.8rem;
}

/* Links Section */
.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.footer-column {
  flex: 0 1 auto;
  min-width: 145px;
  display: flex;
  flex-direction: column;
  padding: 4px 0 8px;
}

.footer-column h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
  min-height: 18px;
}

.footer-column a {
  font-size: 13px;
  line-height: 12px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
  margin-bottom: 10px;
  padding: 3px 0;
}

.footer-column a:hover {
  color: #13B0EE;
}

/* Bottom Section */
.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 0 5px;
}

.footer-policy-links {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  gap: 4px;
  margin: -9px 0 0 0;
  padding: 3px 0;
}

.footer-policy-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 3px;
}

.footer-policy-links a:hover {
  color: var(--vp-c-text-1);
}

.policy-separator {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.footer-copyright {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-align: center;
  margin: -12px 0 10px 0;
  padding: 5px 0 10px;
}

/* Responsive Design */
@media (max-width: 919px) {
  .custom-footer { padding-top: 30px; margin-top: 24px; }
  .footer-container { padding: 0 24px; }
  .footer-top { gap: 60px; }
  .footer-logo-wrapper { width: 220px; }
  .footer-links { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-gap: 16px 20px; 
  }
  .footer-column { margin: 0; }
}

@media (max-width: 760px) {
  .custom-footer { padding-top: 30px; margin-top: 24px; }
  .footer-top { flex-direction: column; padding-bottom: 16px; gap: 15px; }
  .footer-logo-wrapper { width: 100%; display: flex; justify-content: center; }
  .footer-logo { 
    max-width: 220px; 
    margin: 0 auto 10px; 
    align-items: center; 
    text-align: center; 
  }
  .footer-tagline { text-align: center; width: 100%; max-width: 280px; padding-left: 0; }
  .footer-links-wrapper { width: 100%; }
  .footer-links { width: 100%; justify-content: center; grid-gap: 10px 20px; }
  .footer-bottom { flex-wrap: wrap; padding-top: 12px; }
  .footer-column { 
    min-width: unset; 
    width: 100%; 
    margin: 0; 
    align-items: center; 
    text-align: center; 
  }
  .footer-column h4, .footer-column a { text-align: center; }
}

@media (max-width: 640px) {
  .custom-footer { padding-top: 25px; }
  .footer-links { grid-gap: 12px 24px; }
  .footer-policy-links { margin-top: 12px; }
}

@media (max-width: 540px) {
  .custom-footer { padding-top: 25px; }
  .footer-container { padding: 0 16px; }
  .footer-top { padding-bottom: 15px; }
  .footer-logo { margin-bottom: 30px; }
  .footer-links { grid-gap: 10px; }
  .footer-column { margin-bottom: 10px; }
  .footer-column h4 { margin-bottom: 8px; text-align: center; }
  .footer-column a { text-align: center; line-height: 24px; margin-bottom: 6px; }
  .footer-policy-links { 
    flex-direction: row; 
    align-items: center; 
    margin-top: 15px; 
    justify-content: center; 
  }
  .footer-policy-links a { margin: 0; font-size: 13px; }
  .policy-separator { font-size: 13px; }
  .footer-copyright { margin-top: 15px; font-size: 13px; }
}

@media (max-width: 380px) {
  .custom-footer { padding-top: 20px; }
  .footer-logo img { max-width: 200px; }
  .footer-tagline { font-size: 13px; max-width: 250px; }
  .footer-column a { padding: 6px 0; margin-bottom: 0; }
  .footer-policy-links a { padding: 6px 5px; font-size: 12px; }
  .policy-separator { font-size: 12px; }
  .footer-copyright { margin-bottom: 24px; }
}
</style>
