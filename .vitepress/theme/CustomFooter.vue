<!--
  A custom footer component that will replace the default VitePress footer.
  It will not be displayed on documentation pages.
-->
<template>  <div v-if="show" class="custom-footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo-wrapper">
          <div class="footer-logo">
            <a href="/" class="logo-link">
              <img src="/assets/logo-text_inline.png" alt="bluefox.email logo" width="250" height="auto" />
            </a>
            <p class="footer-tagline">BlueFox Email helps SaaS companies create and send beautiful transactional and marketing emails with high deliverability across all devices.</p>
          </div>
        </div>
        <div class="footer-links-wrapper">
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
              <a href="/aws-concepts/">AWS Concepts</a>
            </div>
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
  // Show footer on all email-sending-concepts and aws-concepts glossary pages including index pages
  if (route.path.startsWith('/email-sending-concepts') || route.path.startsWith('/aws-concepts')) {
    return true;
  }
  
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
.footer-top {
 display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 15px;
  margin-bottom: 6px;
}
.footer-logo-wrapper {
  flex: 0 0 auto;
  width: 220px;
}
.footer-links-wrapper {
  flex: 1;
}
.footer-logo {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-top: -15px;
  padding-left: 0;
  box-sizing: border-box;
  position: relative;
}
.footer-logo img {
  max-width: 100%;
  height: auto;
  margin-bottom: 4px;
  margin-left: 0;
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
  text-align: left;
  width: 240px;
  padding-left: 0.8rem;
}
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
  margin-left: 0px;
  padding-top: 4px;
  padding-bottom: 8px;
  text-align: left;
}
.footer-column h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  margin-top: 0;
  padding-top: 0;
  color: var(--vp-c-text-1);
  text-align: left;
  min-height: 18px;
}
.footer-column a {
  font-size: 13px;
  line-height: 12px;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
  margin-bottom: 10px;
  text-decoration: none;
  text-align: left;
  display: block;
  padding: 3px 0;
}
.footer-column a:hover {
  color: #13B0EE;
}
.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 5px;
  border-top: none;
}
.footer-policy-links {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  flex-wrap: wrap;
  margin-top: -9px;
  padding: 3px 0;
}
.policy-separator {
  margin: 0 2px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}
.footer-policy-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 3px 3px;
}
.footer-policy-links a:hover {
  color: var(--vp-c-text-1);
}
.footer-copyright {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: -12px;
  margin-bottom: 10px;
  text-align: center;
  padding: 5px 0 10px;
}
@media (max-width: 919px) {
  .custom-footer {
    padding-top: 30px;
    margin-top: 24px;
  }
  .footer-container {
    padding: 0 24px;
  }
  .footer-top {
    gap: 60px;
  }
  .footer-logo-wrapper {
    width: 220px;
  }
  .footer-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px 20px;
  }
  .footer-column {
    margin-left: 0;
    margin-right: 0;
  }
}

@media (max-width: 760px) {
  .custom-footer {
    padding-top: 30px;
    margin-top: 24px;
  }
  .footer-top {
    flex-direction: column;
    padding-bottom: 16px;
    gap: 15px;
  }
  .footer-logo-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .footer-logo {
    margin-bottom: 10px;
    max-width: 220px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    align-items: center;
    text-align: center;
  }
  .footer-tagline {
    text-align: center;
    width: 100%;
    max-width: 280px;
    padding-left: 0;
  }
  .footer-links-wrapper {
    width: 100%;
  }
  .footer-links {
    width: 100%;
    justify-content: center;
    grid-gap: 10px 20px;
  }
  .footer-bottom {
    flex-wrap: wrap;
    padding-top: 12px;
  }
}

@media (max-width: 760px) {
  .footer-column {
    min-width: unset;
    width: 100%;
    margin: 0;
    align-items: center;
    text-align: center;
  }
  
  .footer-column h4 {
    text-align: center;
  }
  
  .footer-column a {
    text-align: center;
  }
}

@media (max-width: 640px) {
  .custom-footer {
    padding-top: 25px;
  }
  .footer-links {
    grid-gap: 12px 24px;
  }
  
  .footer-policy-links {
    margin-top: 12px;
  }
}
@media (max-width: 540px) {
  .custom-footer {
    padding-top: 25px;
  }
  .footer-container {
    padding: 0 16px;
  }
  .footer-top {
    padding-bottom: 15px;
  }
  .footer-logo {
    margin-bottom: 30px;
  }
  .footer-links {
    grid-gap: 10px;
  }
  .footer-column {
    margin-bottom: 10px;
  }
  
  .footer-column h4 {
    margin-bottom: 8px;
    text-align: center;
  }
  
  .footer-column a {
    text-align: center;
    line-height: 24px;
    margin-bottom: 6px;
  }
    .footer-policy-links {
    flex-direction: row;
    align-items: center;
    gap: 2px;
    margin-top: 15px;
    justify-content: center;
  }
  
  .footer-policy-links a {
    margin: 0;
    font-size: 13px;
  }
  
  .policy-separator {
    margin: 0 2px;
    font-size: 13px;
  }
  
  .footer-copyright {
    margin-top: 15px;
    font-size: 13px;
  }
}

@media (max-width: 380px) {
  .custom-footer {
    padding-top: 20px;
  }
  .footer-logo img {
    max-width: 200px;
  }
  .footer-tagline {
    font-size: 13px;
    max-width: 250px;
  }
  .footer-column a {
    padding: 6px 0; /* Improve tap targets for mobile */
    margin-bottom: 0;
  }  
  .footer-policy-links a {
    padding: 6px 5px; /* Improve tap targets for mobile */
    font-size: 12px;
  }
  
  .policy-separator {
    font-size: 12px;
  }
  .footer-copyright {
    margin-bottom: 24px;
  }
}
</style>