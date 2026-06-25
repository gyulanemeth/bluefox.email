<script setup>
defineProps({
  title: {
    type: String,
    default: 'Scale Your Agency with Professional Email Solutions'
  },
  description: {
    type: String,
    default: "Deliver pixel-perfect, on-brand emails for every client. Maintain consistency across campaigns and elevate your agency's reputation with reliable email infrastructure."
  },
  buttonText: {
    type: String,
    default: 'Start Free - 3000 Sends Included'
  },
  buttonUrl: {
    type: String,
    default: 'https://app.bluefox.email/'
  }
})
</script>

<template>
  <div class="page-cta">
    <div class="cta-container">
      <div class="cta-text">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
      <div class="cta-action">
        <a :href="buttonUrl" class="cta-button">{{ buttonText }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-cta {
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 0;
  background: transparent;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.dark .page-cta {
  background: transparent;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  text-align: center;
}

.cta-text {
  text-align: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.cta-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
  color: var(--vp-c-brand-accessible, hsl(197, 87%, 35%));
  line-height: 1.3;
  text-align: center;
}

.dark .cta-text h3 {
  color: hsl(197, 87%, 65%);
}

.cta-text p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 25px 0;
  text-align: center;
}

.dark .cta-text p {
  color: #bbb;
}

.cta-action {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 28px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  background: #13B0EE;
  border-radius: 22px;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(19, 176, 238, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #0f8ec0;
  color: #fff;
}

@media (max-width: 768px) {
  .cta-container {
    padding: 30px;
  }

  .cta-action {
    margin-top: 15px;
  }
}
</style>
