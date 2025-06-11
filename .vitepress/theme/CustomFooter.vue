<!--
  A custom footer component that will replace the default VitePress footer.
  It will not be displayed on documentation pages.
-->
<template>
  <div v-if="show" class="custom-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo">
          <a href="/" class="logo-link">
            <img src="/assets/logo-text_inline.png" alt="bluefox.email logo" width="250" height="auto" />
          </a>
          <p class="footer-tagline">BlueFox.email helps SaaS companies create and send beautiful transactional and marketing emails with high deliverability across all devices.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/why">Why?</a>
            <a href="/partners">Partners</a>
          </div>
          <div class="footer-column">
            <h4>Resources</h4>
            <a href="/docs/">Documentation</a>
            <a href="/tutorials">Tutorials</a>
            <a href="/articles">Articles</a>
          </div>
          <div class="footer-column">
            <h4>Connect</h4>
            <a href="mailto:hello@bluefox.email">Email</a>
            <a href="https://x.com/bluefoxemail" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.linkedin.com/company/bluefox-email/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div class="footer-column">
            <h4>Glossary</h4>
            <a href="/email-sending-concepts/">Email Sending Concepts</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-policy-links">
          <a href="/terms-of-use">Terms of use</a><span class="policy-separator">|</span>
          <a href="/privacy-policy">Privacy policy</a><span class="policy-separator">|</span>
          <a href="/refund-policy">Refund policy</a>
        </div>
        <div class="footer-copyright">
          Copyright © {{ currentYear }} Innovaris Group LLC.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';

// Get current year for copyright
const currentYear = new Date().getFullYear();

// Control visibility of footer
const route = useRoute();
const show = computed(() => {
  // List of paths/sections where footer should be shown (whitelist approach)
  const allowedPaths = [
    '/', // Home page
    '/pricing',
    '/tutorials',
    '/articles'
    // Removing '/about' and '/why' as requested
  ];
  
  // Only show footer on specifically allowed paths
  if (allowedPaths.includes(route.path)) {
    return true;
  }
  
  // Hide everywhere else
  return false;
});
</script>

<style scoped>
.custom-footer {
  padding-top: 60px;
  margin-top: 40px;
  background-color: var(--vp-c-bg-soft);
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--vp-c-divider);
}
/* Add right padding on glossary page to prevent overlap with the side navigation */
.vp-doc-aside-container .custom-footer {
  padding-right: calc(220px + 32px); /* Navigation width + some spacing */
}
.footer-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 32px;
}
.footer-top {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--vp-c-divider);
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 30px;
}
.footer-logo {
  margin-bottom: 40px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 250px;
  margin-top: -18px;
  padding-left: 0;
  box-sizing: border-box;
  position: relative;
}
.footer-logo img {
  max-width: 100%;
  height: auto;
  margin-bottom: 12px;
  margin-left: 0;
}
.logo-link {
  display: block;
  padding: 0;
  margin: 0;
}
.footer-tagline {
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin: 0;
  text-align: left;
  width: 270px;
  padding-left: 1rem;
}
.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  width: calc(100% - 280px);
}
.footer-column {
  flex: 0 1 auto;
  min-width: 145px;
  display: flex;
  flex-direction: column;
  margin-left: 0px;
  padding-top: 4px;
  text-align: left;
}
.footer-column h4 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 0;
  padding-top: 0;
  color: var(--vp-c-text-1);
  text-align: left;
}
.footer-column a {
  font-size: 14px;
  line-height: 28px;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
  margin-bottom: 8px;
  text-decoration: none !important;
  text-align: left;
  display: block;
}
.footer-column a:hover {
  color: var(--vp-c-brand);
}
.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
  border-top: none;
}
.footer-policy-links {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.policy-separator {
  margin: 0 4px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
.footer-policy-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.footer-copyright {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 1px;
  margin-bottom: 32px;
  text-align: center;
  padding-bottom: 8px;
}
@media (max-width: 768px) {
  .footer-container {
    padding: 0 24px;
  }
  .footer-top {
    flex-direction: column;
  }
  
  .footer-logo {
    margin-bottom: 40px;
    width: 100%;
    max-width: 250px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    align-items: center;
    text-align: center;
  }
  .footer-tagline {
    text-align: center;
    width: 100%;
    max-width: 250px;
  }
  
  .footer-links {
    gap: 20px;
    width: 100%;
    justify-content: center;
  }
  
  .footer-column {
    min-width: 125px;
    margin: 0 10px;
  }
  
  .footer-bottom {
    flex-wrap: wrap;
  }
}
@media (max-width: 640px) {
  .footer-links {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 24px;
  }
  
  .footer-column {
    min-width: calc(50% - 24px);
    margin: 0 0 20px 0;
  }
}
@media (max-width: 540px) {
  .footer-links {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
  
  .footer-column {
    min-width: 100%;
    text-align: left;
    margin-bottom: 0;
  }
  
  .footer-column h4 {
    margin-bottom: 8px;
  }
  
  .footer-policy-links {
    flex-direction: row;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .footer-policy-links a {
    margin: 0;
  }
}
</style>

<!-- Global styles (not scoped) to hide default VitePress footer -->
<style>
/* Hide the default VitePress footer since we're using a custom one */
.VPFooter {
  display: none !important;
}
</style>
