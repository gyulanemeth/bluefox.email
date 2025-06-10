<!--
  A custom footer component that will replace the default VitePress footer.
  It will not be displayed on documentation pages.
-->
<template>
  <footer v-if="show" class="custom-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-column">
          <h3>Product</h3>
          <ul>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/docs/">Documentation</a></li>
            <li><a href="/why">Why BlueFox?</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/email-marketing-concepts/">Email Marketing</a></li>
            <li><a href="/email-sending-concepts/">Glossary</a></li>
            <li><a href="/email-best-practices-for-saas/">Best Practices</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/partners">Partners</a></li>
            <li><a href="https://x.com/bluefoxemail" target="_blank">Twitter</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="/terms-of-use">Terms of Use</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/refund-policy">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="logo">
          <img src="/assets/bluefoxemail-logo-24x24.webp" alt="BlueFox Email Logo" />
          <span>bluefox.email</span>
        </div>
        <div class="copyright">
          Copyright © {{ currentYear }} Innovaris Group LLC.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
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
    '/articles',
    '/about',
    '/why'
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
  border-top: 1px solid var(--vp-c-divider);
  padding: 40px 0;
  margin-top: 40px;
  background-color: var(--vp-c-bg-soft);
}

.container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  margin-bottom: 8px;
}

.footer-column a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.footer-column a:hover {
  color: var(--vp-c-brand);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider-light);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 24px;
  height: 24px;
}

.logo span {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.copyright {
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

<!-- Global styles (not scoped) to hide default VitePress footer -->
<style>
/* Hide the default VitePress footer since we're using a custom one */
.VPFooter {
  display: none !important;
}

/* Additional styling for the custom footer */
.custom-footer {
  margin-top: 2rem;
}
</style>
