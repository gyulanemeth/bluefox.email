<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  logoSrc: {
    type: String,
    default: ''
  },
  selectedDesignSystem: {
    type: Number,
    default: 0
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <svg role="presentation" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg" :class="`svg-design-system-${selectedDesignSystem + 1}`">
    <!-- Background -->
    <rect width="210" height="297" class="svgBackground" />

    <!-- Header -->
    <rect class="svgHeader" width="210" height="30" />
    <image x="45%" y="5" :href="logoSrc" width="20" height="20" />
    
    <!-- Lock icon -->
    <circle class="svgLockCircle" cx="105" cy="70" r="25" />
    <g transform="translate(89, 50) scale(0.1)">
      <path class="svgLock" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
        S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
        s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
        C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"/>
    </g>

    <!-- Title -->
    <text x="50%" y="115" text-anchor="middle" class="svgTitle">FORGOT YOUR PASSWORD?</text>

    <!-- Text -->
    <text class="svgText" x="50%" y="127" font-size="4" font-family="sans-serif" text-anchor="middle">
      Oh no, it happens to the best of us! If you've forgotten your
    </text>
    <text class="svgText" x="50%" y="133" font-size="4" font-family="sans-serif" text-anchor="middle">
      password, don't worry – we've got you covered.
    </text>

    <!-- Reset Password button -->
    <rect class="svgButton" x="65" y="150" width="80" height="12" stroke-width="1" rx="3" ry="3" />
    <text class="svgText" x="105" y="158" font-size="5" font-family="sans-serif" text-anchor="middle" font-weight="bold">
      RESET PASSWORD
    </text>

    <!-- Text -->
    <text class="svgText" x="50%" y="180" font-size="3" font-family="sans-serif" text-anchor="middle">
      If you encounter any issues during this process or need further assistance,
    </text>
    <text class="svgText" x="50%" y="185" font-size="3" font-family="sans-serif" text-anchor="middle">
      don't hesitate to contact our friendly support team. We're here to help you
    </text>
    <text class="svgText" x="50%" y="190" font-size="3" font-family="sans-serif" text-anchor="middle">
      get back on track and ensure your account is secure.
    </text>

    <text class="svgText" x="50%" y="200" font-size="3" font-family="sans-serif" text-anchor="middle">
      Remember to keep your password safe and avoid sharing it with anyone. If
    </text>
    <text class="svgText" x="50%" y="205" font-size="3" font-family="sans-serif" text-anchor="middle">
      you have any concerns about your account's security, consider enabling
    </text>
    <text class="svgText" x="50%" y="210" font-size="3" font-family="sans-serif" text-anchor="middle">
      two-factor authentication for an extra layer of protection.
    </text>

    <text class="svgText" x="50%" y="220" font-size="3" font-family="sans-serif" text-anchor="middle">
      Thank you for choosing us as your trusted platform, and we're thrilled to
    </text>
    <text class="svgText" x="50%" y="225" font-size="3" font-family="sans-serif" text-anchor="middle">
      have you back on board. Let's continue on this journey together!
    </text>

    <!-- Footer -->
    <rect y="280" width="210" height="17" class="svgFooter" />
    <text class="svgFooterText" x="50%" y="287" font-size="3" font-family="sans-serif" text-anchor="middle">
      Visit bluefox.email | View in browser | Unsubscribe
    </text>
    <text class="svgFooterText" x="50%" y="292" font-size="3" font-family="sans-serif" text-anchor="middle">
      123 Anywhere St., Any City, ST 12345 | 123-456-7890 | hello@reallygreatsite.com
    </text>
  </svg>
</template>

<style scoped>
.svg-design-system-1 .svgBackground {
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgBackground {
  fill: #FEFAE0;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgBackground {
  fill: #dcd2cc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgHeader {
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgHeader {
  fill: #FEFAE0;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgHeader {
  fill: #ede7dc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgLockCircle {
  fill: #392C91;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgLockCircle {
  fill: #FFCF50;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgLockCircle {
  fill: #dcd2cc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgLock {
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgLock {
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgLock {
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTitle {
  fill: #13B0EE;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 9px;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTitle {
  fill: #626F47;
  font-family: "Amatic SC", serif;
  font-weight: bold;
  font-size: 15px;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTitle {
  font-family: 'Indie Flower', fantasy;
  font-size: 10px;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgText {
  font-family: sans-serif;
  font-size: 4px;
  fill: black;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgText {
  font-family: serif;
  font-size: 5px;
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgText {
  font-family: fantasy;
  font-size: 4px;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgButton {
  stroke: #13B0EE;
  fill: none;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgButton {
  stroke: #626F47;
  fill: #FFCF50;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgButton {
  stroke: #ccafa5;
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgFooter {
  fill: #392C91;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgFooter {
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgFooter {
  fill: #ede7dc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgFooterText {
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgFooterText {
  font-family: "Amatic SC", serif;
  font-size: 4px;
  font-weight: bold;
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgFooterText {
  font-family: fantasy;
  fill: black;
  transition: fill 1s ease;
}
</style>
