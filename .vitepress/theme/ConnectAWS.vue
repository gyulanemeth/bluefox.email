<script setup>
defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
<div class="connectGrid">
  <article class="connectCard">
    <h3 class="cardTitle">Access Keys</h3>
    <p class="cardBody">Connect using your Access Key ID and Secret Access Key, if you prefer a simple setup. This method is straightforward, but less secure than using STS.</p>
  </article>

  <article class="connectCard connectCard--featured">
    <span class="featuredBadge">Recommended</span>
    <h3 class="cardTitle">STS</h3>
    <p class="cardBody">Use temporary credentials via AWS STS for a more secure, limited-scope connection. You stay in control of permissions and can revoke access anytime.</p>
  </article>

  <article class="connectCard">
    <h3 class="cardTitle">Using our CloudFormation Script</h3>
    <p class="cardBody">We provide an AWS-native script to automate everything safely. Just review and deploy.</p>
  </article>
</div>
<p class="connectFoot">It literally takes a few minutes to get started!</p>
</template>

<style scoped>
.connectGrid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.connectCard {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px 24px 24px;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px -8px rgba(15, 23, 42, 0.08);
}

.connectCard--featured {
  padding-top: 40px;
}

.connectCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -16px rgba(15, 23, 42, 0.18);
}

html.dark .connectCard {
  background: #0f172a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 4px 12px -8px rgba(0, 0, 0, 0.5);
}

html.dark .connectCard:hover {
  box-shadow: 0 12px 28px -16px rgba(0, 0, 0, 0.7);
}

.connectCard--featured {
  border: 2px solid transparent;
  background:
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(120deg, #392c91 5%, #13b0ee) border-box;
  box-shadow:
    0 4px 10px -2px rgba(57, 44, 145, 0.2),
    0 16px 32px -12px rgba(19, 176, 238, 0.3);
}

.connectCard--featured:hover {
  box-shadow:
    0 6px 14px -2px rgba(57, 44, 145, 0.28),
    0 22px 40px -14px rgba(19, 176, 238, 0.4);
}

html.dark .connectCard--featured {
  background:
    linear-gradient(#0f172a, #0f172a) padding-box,
    linear-gradient(120deg, #8a7ed8 5%, #13b0ee) border-box;
  box-shadow:
    0 4px 10px -2px rgba(138, 126, 216, 0.25),
    0 16px 32px -12px rgba(19, 176, 238, 0.35);
}

html.dark .connectCard--featured:hover {
  box-shadow:
    0 6px 14px -2px rgba(138, 126, 216, 0.35),
    0 22px 40px -14px rgba(19, 176, 238, 0.5);
}

.featuredBadge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 14px 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: linear-gradient(120deg, #392c91 5%, #13b0ee);
  border-radius: 0 0 8px 8px;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1;
}

html.dark .featuredBadge {
  background: linear-gradient(120deg, #8a7ed8 5%, #13b0ee);
}

.cardTitle {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
  color: #0f172a;
  border-top: 0 !important;
  padding-top: 0 !important;
}

html.dark .cardTitle {
  color: #f1f5f9;
}

.cardBody {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #475569;
  flex: 1;
}

html.dark .cardBody {
  color: #94a3b8;
}

.connectFoot {
  margin: 28px 0 0;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #392c91;
}

html.dark .connectFoot {
  color: #8a7ed8;
}

@media (max-width: 960px) {
  .connectGrid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
