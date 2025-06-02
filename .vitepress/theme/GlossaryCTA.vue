<template>
  <div class="glossary-cta">
    <div class="cta-container">
    <div class="cta-text">
        <h3>Send Consistent-looking & beautiful emails today! </h3>
        <p>Email communication is part of your product! Don't let it ruin your user's experience with your brand</p>
      </div>
      <div class="cta-action">
        <a href="https://app.bluefox.email/" class="cta-button">Get started</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glossary-cta {
  margin-top: 60px;
  margin-bottom: 40px;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  padding: 40px 0;
}

.dark .glossary-cta {
  border-top: 1px solid #2d3748;
  border-bottom: 1px solid #2d3748;
}

.cta-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cta-text {
  text-align: left;
  flex: 1;
}

.cta-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #13B0EE;
  line-height: 1.3;
}

.dark .cta-text h3 {
  color: #13B0EE;
}

.cta-text p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.dark .cta-text p {
  color: #bbb;
}

.cta-action {
  margin-left: 40px;
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
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0f8ec0;
  color: #fff;
}

@media (max-width: 768px) {
  .cta-container {
    flex-direction: column;
  }
  
  .cta-text {
    text-align: center;
    margin-bottom: 24px;
  }
  
  .cta-action {
    margin-left: 0;
  }
}
</style>
