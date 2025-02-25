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
  <svg viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg" :class="`svg-design-system-${selectedDesignSystem + 1}`">
    <!-- Header -->
    <rect x="6" width="198" height="30" class="svgHeader" />
    <image x="45%" y="5"  :href="logoSrc" width="20" height="20" />

    <!-- Title -->
    <text class="svgTitle" x="50%" y="50" font-size="16" text-anchor="middle" font-weight="bold">Your newsletter</text>

    <!-- Subtitle -->
    <text class="svgText" x="50%" y="60" font-size="4" font-family="sans-serif" text-anchor="middle" fill="#000">The official company newsletter of your newsletter</text>

    <!-- Placeholder image -->
    <transition name="fade">
      <g v-if="selectedDesignSystem === 0" class="svgPlaceholderImg">
        <rect x="20" y="70" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0" />
        <!-- Mountains -->
        <polygon class="placeholderShape" points="40,140 80,100 120,140" fill="#d1d5db" />
        <polygon points="90,140 130,110 170,140" fill="#c4c4c4" />
        <!-- Sun -->
        <circle cx="50" cy="90" r="7" fill="#bcbcbc" />
      </g>
      <g v-else-if="selectedDesignSystem === 1">
        <rect x="20" y="70" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0" />
        <!-- House -->
        <rect x="40" y="120" width="40" height="20" fill="#d1d5db"/>
        <rect x="90" y="110" width="40" height="30" fill="#c4c4c4"/>
        <!-- Roofs -->
        <polygon points="30,120 60,90 90,120" fill="#bcbcbc"/>
        <polygon points="80,110 110,80 140,110" fill="#a9a9a9"/>
        <!-- Sun -->
        <circle cx="40" cy="90" r="7" fill="#bcbcbc" />
      </g>
      <g v-else>
        <rect x="20" y="70" width="170" height="80" fill="#f3f4f6" stroke="#e0e0e0"/>
        <!-- Trees -->
        <rect x="40" y="120" width="10" height="20" fill="#a9a9a9"/>
        <circle cx="45" cy="110" r="15" fill="#d1d5db"/>
        <rect x="90" y="110" width="10" height="30" fill="#a9a9a9"/>
        <circle cx="95" cy="95" r="20" fill="#c4c4c4"/>
        <rect x="140" y="115" width="10" height="25" fill="#a9a9a9"/>
        <circle cx="145" cy="100" r="18" fill="#bcbcbc"/>
      </g>
    </transition>

    <!-- Text box -->
    <rect class="svgTextbox" x="140" y="85" width="50" height="25" />
    <text class="svgTextboxText" x="165" y="95" font-size="3" text-anchor="middle" font-weight="bold">MORE GREAT STORIES</text>
    <text class="svgTextboxText" x="165" y="100" font-size="3" text-anchor="middle" font-weight="bold">INSIDE:</text>
    <text class="svgTextboxText" x="165" y="105" font-size="3" text-anchor="middle">bluefox.email website</text>

    <!-- Article title -->
    <text class="svgArticleTitle" x="20" y="161" font-size="5" font-family="sans-serif" font-weight="bold">THE IMPORTANCE</text>
    <text class="svgArticleTitle" x="20" y="166" font-size="5" font-family="sans-serif" font-weight="bold">OF PREHEADER TEXT</text>
    <!-- Author -->
    <text class="svgText svgAuthorText" x="20" y="175" font-size="4" fill="#000">Written by BLUEFOX</text>

    <!-- Text -->
    <text class="svgText" x="90" y="160" font-size="3" font-family="sans-serif" fill="#000">Preheader text, sometimes referred to as a “preview,” is the short</text>
    <text class="svgText" x="90" y="165" font-size="3" font-family="sans-serif" fill="#000">snippet of text that appears next to or below the subject line in</text>
    <text class="svgText" x="90" y="170" font-size="3" font-family="sans-serif" fill="#000">most email clients. It acts like a teaser for your email content,</text>
    <text class="svgText" x="90" y="175" font-size="3" font-family="sans-serif" fill="#000">giving recipients a sneak peek of what’s inside.</text>

    <text class="svgText" x="90" y="185" font-size="3" font-family="sans-serif" fill="#000">Think of it like the tagline in a movie trailer—it gives a little</text>
    <text class="svgText" x="90" y="190" font-size="3" font-family="sans-serif" fill="#000">extra context to the headline (your subject line) and helps convince</text>
    <text class="svgText" x="90" y="195" font-size="3" font-family="sans-serif" fill="#000">people that opening your email is worth their time.</text>
    <text class="svgText" x="90" y="200" font-size="3" font-family="sans-serif" fill="#000">In a crowded inbox, having well-crafted preheader text can make the</text>
    <text class="svgText" x="90" y="205" font-size="3" font-family="sans-serif" fill="#000">difference between your email being opened or ignored. Without it,</text>
    <text class="svgText" x="90" y="210" font-size="3" font-family="sans-serif" fill="#000">email clients might pull in random text from the beginning of your</text>
    <text class="svgText" x="90" y="215" font-size="3" font-family="sans-serif" fill="#000">email, which often results in poor first impressions, like “View</text>
    <text class="svgText" x="90" y="220" font-size="3" font-family="sans-serif" fill="#000">this email in your browser” or irrelevant metadata.</text>

    <!-- Article title -->
    <text class="svgArticleTitle" x="20" y="241" font-size="5" font-family="sans-serif" font-weight="bold">SENDER NAME AND</text>
    <text class="svgArticleTitle" x="20" y="246" font-size="5" font-family="sans-serif" font-weight="bold">EMAIL ADDRESS</text>
    <!-- Author -->
    <text class="svgText svgAuthorText" x="20" y="255" font-size="4" font-family="sans-serif" fill="#000">Written by BLUEFOX</text>

    <!-- Text -->
    <text class="svgText" x="90" y="240" font-size="3" font-family="sans-serif" fill="#000">Before your recipients even read your subject line, they notice</text>
    <text class="svgText" x="90" y="245" font-size="3" font-family="sans-serif" fill="#000">two things: the sender name and the email address. These details</text>
    <text class="svgText" x="90" y="250" font-size="3" font-family="sans-serif" fill="#000">form the first layer of trust. If the recipient doesn't recognize or</text>
    <text class="svgText" x="90" y="255" font-size="3" font-family="sans-serif" fill="#000">trust who the email is from, they’re likely to either ignore it or, worse,</text>
    <text class="svgText" x="90" y="260" font-size="3" font-family="sans-serif" fill="#000">mark it as spam.</text>

    <text class="svgText" x="90" y="270" font-size="3" font-family="sans-serif" fill="#000">A clear and credible sender name can increase open rates by providing</text>
    <text class="svgText" x="90" y="275" font-size="3" font-family="sans-serif" fill="#000">assurance that the email is from a legitimate source. An unfamiliar or</text>
    <text class="svgText" x="90" y="280" font-size="3" font-family="sans-serif" fill="#000">suspicious-looking sender, on the other hand, triggers doubt. In an era of</text>
    <text class="svgText" x="90" y="285" font-size="3" font-family="sans-serif" fill="#000">phishing and spam, people are highly cautious.</text>
  </svg>
</template>

<style scoped>
.svg-design-system-1 .svgHeader {
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgHeader {
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgHeader {
  fill: white;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTitle {
  font-family: 'Inter', sans-serif;
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTitle {
  font-family: "Amatic SC", serif;
  font-size: 20px;
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTitle {
  font-family: 'Indie Flower', fantasy;
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTextbox {
  fill: #392C91;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTextbox {
  fill: #FFCF50;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTextbox {
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgTextboxText {
  font-family: sans-serif;
  fill: white;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgTextboxText {
  font-family: serif;
  font-size: 3.5px;
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgTextboxText {
  font-family: fantasy;
  font-size: 4px;
  fill: white;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgArticleTitle {
  font-family: 'Inter', sans-serif;
  fill: #13B0EE;
  transition: fill 1s ease;
}
.svg-design-system-2 .svgArticleTitle {
  font-family: "Amatic SC", serif;
  font-size: 6px;
  font-weight: bold;
  letter-spacing: 0.5px;
  fill: #626F47;
  transition: fill 1s ease;
}
.svg-design-system-3 .svgArticleTitle {
  font-family: fantasy;
  font-weight: bold;
  fill: #ccafa5;
  transition: fill 1s ease;
}

.svg-design-system-1 .svgText {
  font-family: sans-serif;
}
.svg-design-system-2 .svgText {
  font-family: serif;
}
.svg-design-system-3 .svgText {
  font-family: fantasy;
}

.svg-design-system-3 .svgAuthorText {
  font-family: 'Indie Flower', fantasy;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
