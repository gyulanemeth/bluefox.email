<script setup>
import { ref, computed } from 'vue'

const emailsPerMonth = ref(5000)
const bluefoxAnnual = 100
const bluefoxMonthly = bluefoxAnnual / 12

function formatNum(num) {
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const sesPerEmail = 0.0001
const sesDelivery = 0
const sesMonthly = computed(() => sesDelivery + emailsPerMonth.value * sesPerEmail)
const sesAnnual = computed(() => sesMonthly.value * 12)

const cmPerEmail = 0.01
const cmDelivery = 5
const cmMonthly = computed(() => cmDelivery + emailsPerMonth.value * cmPerEmail)
const cmAnnual = computed(() => cmMonthly.value * 12)

const mcDelivery = 0
const mcMonthly = computed(() => {
  let mcPerEmail = 0.01
  if(emailsPerMonth.value <= 5000) {
    mcPerEmail = 0.03
  } else if (emailsPerMonth.value <= 25000) {
    mcPerEmail = 0.02
  }

  return mcDelivery + emailsPerMonth.value * mcPerEmail
})
const mcAnnual = computed(() => mcMonthly.value * 12)

const bluefoxPlusSesMonthly = computed(() => bluefoxMonthly + sesMonthly.value)
const bluefoxPlusSesAnnual = computed(() => bluefoxPlusSesMonthly.value * 12)
</script>

<template>
  <section class="pricing">
    <div class="content">
      <div class="current-bluefox-price">
        <div class="bg"></div>
        <div class="annual-price-wrapper">
          <div class="current-price-label">Current price:</div>
          <div class="annual-price">${{bluefoxAnnual}}</div>
          <div class="annual-access-label">1-year access</div>
        </div>
      </div>
      <div class="calculator">
        <div class="calculator-inner">
          <h2>Cost comparision</h2>
          <div>
            How many emails do you send per month? Use the slider below.
          </div>
          <div>
            <input class="num" type="number" min="100" max="500000" v-model="emailsPerMonth" :style="{
              'marginLeft': `calc(${emailsPerMonth / 5000}% - ${emailsPerMonth / 10000}px)`
            }" />
          </div>
          <div>
            <input class="slider" type="range" min="100" max="500000" v-model="emailsPerMonth" />
          </div>

          <table>
            <tr>
              <th>Cost calculator</th>
              <th>Monthly</th>
              <th>Yearly</th>
            </tr>
            <tr>
              <td>MailChimp</td>
              <td>{{formatNum(mcMonthly)}}</td>
              <td>{{formatNum(mcAnnual)}}</td>
            </tr>
            <!--
            <tr>
              <td>Campaign Monitor</td>
              <td>{{formatNum(cmMonthly)}}</td>
              <td>{{formatNum(cmAnnual)}}</td>
            </tr>
            -->
            <tr>
              <td><strong>AWS SES</strong></td>
              <td><strong>{{formatNum(sesMonthly)}}</strong></td>
              <td><strong>{{formatNum(sesAnnual)}}</strong></td>
            </tr>
            <tr>
              <td><strong>bluefox.email</strong></td>
              <td><strong>{{formatNum(bluefoxMonthly)}}</strong></td>
              <td><strong>{{formatNum(bluefoxAnnual)}}</strong></td>
            </tr>
            <tr>
              <td><strong>bluefox.email + AWS SES</strong></td>
              <td><strong>{{formatNum(bluefoxPlusSesMonthly)}}</strong></td>
              <td><strong>{{formatNum(bluefoxPlusSesAnnual)}}</strong></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

.pricing {
  margin-top: 150px;
}

.pricing h2 {
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
}
.pricing .current-bluefox-price {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pricing .calculator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pricing .calculator .calculator-inner {
  padding: 20px;
}

.pricing .calculator .num {
  width: 50px;
}
.pricing .calculator .slider {
  width: 100%;
}
.pricing .current-bluefox-price .bg {
  position: absolute;
  width: 320px;
  height: 320px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  border-radius: 50%;
}

.pricing .current-bluefox-price .annual-price-wrapper {
  z-index: 1;
  position: relative;
}

.pricing .current-bluefox-price .annual-price-wrapper .current-price-label {
  position: absolute;
  font-size: 20px;
  top: -30px;
  left: -40px;
  font-weight: 600;
}

.pricing .current-bluefox-price .annual-price-wrapper .annual-access-label {
  position: absolute;
  font-size: 20px;
  bottom: -30px;
  right: -40px;
  font-weight: 600;
}

.pricing .current-bluefox-price .annual-price {
  font-size: 72px;
  line-height: 72px;
  font-weight: 600;

  color: var(--vp-c-brand);

  background: -webkit-linear-gradient(
    90deg,
    #392C91 -30%,
    #13B0EE 30%,
    #13B0EE 70%,
    #392C91 130%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}
.pricing .content {
  display: flex;
  width: 1152px;
  max-width: 100%;

  margin: 0 auto;
}

.pricing .content .current-bluefox-price {
  width: 50%;
}

.pricing .content .calculator {
  width: 50%;
}

.pricing .calculator table {
  width: 100%;
  margin-top: 20px;
}
.pricing .calculator table td {
  border: 1px dotted #ccc;
  text-align: right;
  padding: 5px;
}

.pricing .calculator table td:first-child {
  text-align: left;
}

.pricing .calculator table tr:last-child {
  background: var(--vp-c-brand);
}

@media only screen and (max-width: 959px) {
  .pricing .content {
    display: block;
  }
  .pricing .content .current-bluefox-price {
    width: 100%;
  }

  .pricing .content .calculator {
    margin-top: 150px;
    width: 100%;
  }

  .pricing .current-bluefox-price .bg {
    width: 256px;
    height: 256px;
  }

  .pricing .current-bluefox-price .annual-price {
    font-size: 64px;
    line-height: 64px;
  }

  .pricing .current-bluefox-price .annual-price-wrapper .current-price-label {
    font-size: 18px;
  }

  .pricing .current-bluefox-price .annual-price-wrapper .annual-access-label {
    font-size: 18px;
  }
}

@media only screen and (max-width: 639px) {
  .pricing .content .calculator {
    margin-top: 120px;
  }
  .pricing .current-bluefox-price .bg {
    width: 192px;
    height: 192px;
  }

  .pricing .current-bluefox-price .annual-price {
    font-size: 52px;
    line-height: 52px;
  }

  .pricing .current-bluefox-price .annual-price-wrapper .current-price-label {
    font-size: 16px;
  }

  .pricing .current-bluefox-price .annual-price-wrapper .annual-access-label {
    font-size: 16px;
  }
}
</style>
