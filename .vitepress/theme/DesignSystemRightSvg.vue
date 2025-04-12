<script setup>
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
    <rect class="svgBackground" width="210" height="297" />

    <!-- Header -->
    <image x="45%" y="8"  :href="logoSrc" width="20" height="20" />

    <!-- Placeholder image -->
    <transition name="fade">
      <g v-if="selectedDesignSystem === 0">
        <rect x="20" y="30" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0" />
        <!-- Mountains -->
        <polygon points="40,100 80,60 120,100" fill="#d1d5db" />
        <polygon points="90,100 130,70 170,100" fill="#c4c4c4" />
        <!-- Sun -->
        <circle cx="50" cy="50" r="7" fill="#bcbcbc" />
      </g>
      <g v-else-if="selectedDesignSystem === 1">
        <rect x="20" y="30" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0" />
        <!-- House -->
        <rect x="40" y="80" width="40" height="20" fill="#d1d5db"/>
        <rect x="90" y="70" width="40" height="30" fill="#c4c4c4"/>
        <!-- Roofs -->
        <polygon points="30,80 60,50 90,80" fill="#bcbcbc"/>
        <polygon points="80,70 110,40 140,70" fill="#a9a9a9"/>
        <!-- Sun -->
        <circle cx="40" cy="50" r="7" fill="#bcbcbc" />
      </g>
      <g v-else>
        <rect x="20" y="30" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0"/>
        <!-- Trees -->
        <rect x="40" y="80" width="10" height="20" fill="#a9a9a9"/>
        <circle cx="45" cy="70" r="15" fill="#d1d5db"/>
        <rect x="90" y="70" width="10" height="30" fill="#a9a9a9"/>
        <circle cx="95" cy="55" r="20" fill="#c4c4c4"/> 
        <rect x="140" y="75" width="10" height="25" fill="#a9a9a9"/>
        <circle cx="145" cy="60" r="18" fill="#bcbcbc"/> 
      </g>
    </transition>

    <!-- Text background -->
    <rect class="svgTextBackground" x="20" y="110" width="170" height="150" />

    <!-- Title -->
    <text class="svgTitle" x="50%" y="130" font-size="10" text-anchor="middle" font-weight="bold">
      Exclusive Sale Alert!
    </text>
    <text class="svgTitle" x="50%" y="145" font-size="10" text-anchor="middle" font-weight="bold">
      30% OFF
    </text>

    <!-- Text -->
    <text class="svgText" x="50%" y="165" font-size="5" font-family="sans-serif" text-anchor="middle">
      Hello [Customer's Name],
    </text>
    <text class="svgText" x="50%" y="175" font-size="5" font-family="sans-serif" text-anchor="middle">
      We hope this message finds you well. As a valued member of
    </text>
    <text class="svgText" x="50%" y="185" font-size="5" font-family="sans-serif" text-anchor="middle">
      our community, we're excited to bring you an exclusive
    </text>
    <text class="svgText" x="50%" y="195" font-size="5" font-family="sans-serif" text-anchor="middle">
      opportunity to save big on your favorite products/services
    </text>
    <text class="svgText" x="50%" y="205" font-size="5" font-family="sans-serif" text-anchor="middle">
      through our email newsletter.
    </text>

    <!-- CTA Button -->
    <rect class="svgButton" x="85" y="230" rx="5" ry="5" width="40" height="10" />
    <text class="svgButtonText" x="105" y="237" font-size="4" font-family="sans-serif" text-anchor="middle" font-weight="bold">
      SHOP NOW
    </text>

    <!-- Footer -->
    <text class="svgFooterText" x="50%" y="270" font-size="3" font-family="sans-serif" text-anchor="middle">
      View more updates on our social media
    </text>

    <!-- Social icons -->
    <circle class="svgSocialIcon" cx="90" cy="280" r="3" />
    <circle class="svgSocialIcon" cx="105" cy="280" r="3"/>
    <circle class="svgSocialIcon" cx="120" cy="280" r="3" />
  </svg>
</template>

<style scoped>
.svg-design-system-1 .svgBackground {
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgBackground {
  fill: #FEFAE0;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgBackground {
  fill: #ede7dc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTextBackground {
  fill: #392C91;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTextBackground {
  fill: #FFCF50;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTextBackground {
  fill: #dcd2cc;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTitle {
  font-family: 'Inter', sans-serif;
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTitle {
  font-family: "Amatic SC", serif;
  font-size: 15px;
  fill: black;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTitle {
  font-family: 'Indie Flower', fantasy;
  font-size: 12px;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgText {
  font-family: sans-serif;
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgText {
  font-family: serif;
  fill: black;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgText {
  font-family: fantasy;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgButton {
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgButton {
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgButton {
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgButtonText {
  font-family: 'Inter', sans-serif;
  fill: #392C91;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgButtonText {
  font-family: "Amatic SC", serif;
  font-size: 7px;
  font-weight: bold;
  fill: #FEFAE0;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgButtonText {
  font-family: 'Indie Flower', fantasy;
  font-size: 6px;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgFooterText {
  font-family: sans-serif;
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgFooterText {
  font-family: serif;
  fill: black;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgFooterText {
  font-family: fantasy;
  fill: black;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgSocialIcon {
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgSocialIcon {
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgSocialIcon {
  fill: #ccafa5;
  transition: fill 1s ease;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
