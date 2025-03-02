<script setup>
import { defineProps, ref, onMounted } from 'vue'

const isFixed = ref(false)

onMounted(() => {
  const toggleState = () => {
    isFixed.value = false
    setTimeout(() => {
      isFixed.value = true
      setTimeout(toggleState, 5000)
    }, 3000)
  }

  toggleState()
})

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  lgAndUp: {
    type: Boolean,
    default: true
  },
  md: {
    type: Boolean,
    default: false
  },
  sm: {
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
<div>
  <v-container class="text-center">
    <v-row justify="center">
      <v-col cols="12" sm="auto" class="py-0">
        <v-btn
          prepend-icon="mdi-close-circle"
          :variant="isFixed ? 'text' : 'tonal'"
          :color="isFixed ? '' : 'error'"
          class="no-uppercase animated-btn"
          @click="isFixed = false"
        >
          Other templates
        </v-btn>
      </v-col>
      <v-col cols="12" sm="auto" class="py-0">
        <v-btn
          prepend-icon="mdi-check-circle"
          :color="isFixed ? 'success' : ''"
          :variant="isFixed ? 'tonal' : 'text'"
          class="no-uppercase animated-btn"
          @click="isFixed = true"
        >
          bluefox.email templates
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  
  <v-container class="d-flex justify-center renderIssuesContainer">
    <svg role="presentation" :viewBox="xs ? '170 50 145 195' : '25 25 290 195'" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
      <defs>
        <linearGradient id="blackSecondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="black" />
          <stop offset="100%" stop-color="#392C91" />
        </linearGradient>

        <clipPath id="clip-rect-desktop">
          <rect x="80" y="45" width="100" height="120" />
        </clipPath>
        <clipPath id="clip-rect-tablet">
          <rect x="80" y="45" width="100" height="120" />
        </clipPath>
        <clipPath id="clip-rect-mobile">
          <rect x="28" y="75" width="44" height="80" />
        </clipPath>
      </defs>

      <!-- Desktop -->
      <g v-if="!xs">
        <rect x="30" y="30" width="200" height="140" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
        <rect x="35" y="35" width="190" height="130" fill="#e0e0e0" rx="1"/>

        <rect x="105" y="171" width="50" height="20" :fill="isDark ? 'black' : '#ccc'" :stroke="isDark? 'black' : '#ccc'" stroke-width="1"/>
        <rect x="80" y="190" width="100" height="10" rx="3" ry="10" :fill="isDark ? 'black' : '#ccc'" :stroke="isDark? 'black' : '#ccc'" stroke-width="1"/>

        <circle cx="38" cy="38" r="1" fill="#e25241"/>
        <circle cx="41" cy="38" r="1" fill="#f29c38"/>
        <circle cx="44" cy="38" r="1" fill="#67ac5c"/>
        <rect x="37" y="40" width="120" height="3" rx="1" fill="white"/>
        <rect x="162" y="40" width="60" height="3" rx="2" ry="15" fill="white"/>

        <rect x="35" y="45" width="190" height="120" fill="#e6e6e6" rx="1"/>
        
        <!-- Email -->
        <g clip-path="url(#clip-rect-desktop)">
          <!-- Header -->
          <rect x="80" y="45" width="100" height="15" fill="#13B0EE" />
          <image
            :class="isFixed ? 'logoFixed' : 'logoBroken'"
            x="44%"
            y="47"
            href="/assets/bluefoxemail-logo.png"
            :width="isFixed ? 6 : 10"
            :height="isFixed ? 6 : 10"
          />

          <text
            x="85"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 14}px)` }"
          >
            DESIGNERS
          </text>
          <text
            x="112"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 5}px)` }"
          >
            MARKETERS
          </text>
          <text
            x="140"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -4}px)` }"
          >
            DEVS
          </text>
          <text
            x="158"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -13}px)` }"
          >
            EVERYONE
          </text>

          <!-- Hero -->
          <rect x="80" y="60" width="100" height="59" fill="white" />
          <image :class="isFixed ? 'opacity-show' : 'opacity-hide'" x="79" y="60" href="/assets/email-header-background.png" width="110" height="50" />
          <g>
            <rect x="135" y="65" width="42" height="43" fill="#f1f1f1" opacity="0.5"/>
            <rect x="137" y="67" width="38" height="39" fill="none" stroke="black" stroke-width="0.2" />

            <text x="156" y="73" font-size="3" font-family="serif" fill="black" text-anchor="middle">AMAZING</text>
            <text x="156" y="79" font-size="6" font-family="serif" font-weight="bold" fill="black" text-anchor="middle">EMAIL</text>
            <text x="156" y="87" font-size="8" font-family="Indie Flower" fill="black" text-anchor="middle">Template</text>
            <text
              x="156"
              y="93"
              font-size="2"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -7}px)` }"
            >
              Send consistent-looking &
            </text>
            <text
              x="153"
              y="95"
              font-size="2"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 13.5}px, ${isFixed ? 0 : -2}px)` }"
            >
              beautiful emails
            </text>
            <text 
              x="162.75"
              y="95"
              font-size="2"
              font-family="serif"
              fill="black"
              text-anchor="middle"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -5}px)` }"
            >
              today!
            </text>
            <rect
              :class="isFixed ? 'button1Fixed' : 'button1Broken'"
              :x="isFixed ? 148 : 150.5"
              :y="isFixed ? 98 : 99"
              fill="black"
              :width="isFixed ? 17 : 12"
              :height="isFixed ? 4 : 1.75"
              :rx="isFixed ? 1 : 0" 
            />
            <text x="156.5" y="100.5" font-size="2" font-family="sans-serif" fill="white" text-anchor="middle">START NOW</text>
          </g>

          <!-- Main -->
          <rect x="80" y="112" width="100" height="35" fill="white"/>

          <text x="105" y="122" font-size="5" font-family="serif" font-weight="bold" fill="black" text-anchor="middle">RELIABLE</text>
          <text 
            x="105"
            y="126"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -10}px)` }"
          >
            On our platform, your email will
          </text>
          <text 
            x="102"
            y="128"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 16}px, ${isFixed ? 0 : -2}px)` }"
          >
            never break, ensuring it
          </text>
          <text 
            x="115"
            y="128"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -30}px` }"
          >
            always
          </text>
          <text 
            x="105"
            y="130"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -4}px, ${isFixed ? 0 : -2}px)` }"
          >
            looks flawless and professional
          </text>
          <text 
            x="95.5"
            y="132"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 18.5}px, ${isFixed ? 0 : -4}px)` }"
          >
            across all email
          </text>
          <text 
            x="108.5"
            y="132"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -6}px, ${isFixed ? 0 : -2}px)` }"
          >
            clients.
          </text>

          <line
            x1="82"
            y1="134.5"
            x2="150"
            y2="134.5"
            stroke="lightgray"
            stroke-width="0.1"
            :style="{ transition: `opacity ${isFixed ? '2.5' : '0.5'}s ease`, opacity: `${isFixed ? 0 : 1}` }"
          />

          <rect
            :class="isFixed ? 'button1Fixed' : 'button1Broken'"
            :x="isFixed ? 97 : 99"
            :y="isFixed ? 136 : 137"
            :rx="isFixed ? 1 : 0" 
            fill="black"
            :width="isFixed ? 17 : 13.5"
            :height="isFixed ? 4 : 1.75"
          />
          <text x="105.5" y="138.5" font-size="2" font-family="sans-serif" fill="white" text-anchor="middle">SIGN UP NOW</text>

          <image
            x="130"
            y="100"
            href="/assets/email-placeholder-mountains.png"
            width="50"
            height="59"
            :style="{
              transition: `transform ${isFixed ? '2.5' : '0.5'}s ease-in-out`,
              transform: isFixed ? 'scale(1)' : 'scale(1.5)',
              transformOrigin: 'center'
            }"
          />

          <!-- Bottom text -->
          <rect x="80" y="147" width="100" height="12" fill="url(#blackSecondaryGradient)"/>
          <rect
            x="80"
            y="147"
            width="100"
            height="12"
            fill="white"
            :style="{ transition: `opacity ${isFixed ? '2.5' : '0.5'}s ease`, opacity: `${isFixed ? 0 : 1}` }"
          />
          <text x="130" y="155" font-size="5" font-family="serif" fill="#e9e9e9" text-anchor="middle">TRY BLUEFOX.EMAIL NOW</text>

          <!-- Footer -->
          <rect x="80" y="158" width="100" height="7" fill="black"/>

          <text 
            x="111"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 4}px)` }"
          >
            123 Anywhere st., any city |
          </text>
          <text 
            x="133.5"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
          >
            +123-456-7890 |
          </text>
          <text 
            x="153"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -4.5}px)` }"
          >
            reallygreatsite.com
          </text>
        </g>
      </g>

      <!-- Tablet -->
      <g transform="translate(180, 40)">
        <rect x="30" y="30" width="100" height="140" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
        <circle cx="80" cy="165" r="3" fill="#d0d0d0"/>

        <rect x="35" y="40" width="90" height="120" fill="#e0e0e0" rx="1"/>

        <!-- Email -->
        <g transform="translate(-37, -5) scale(0.9, 1)" clip-path="url(#clip-rect-tablet)">
          <!-- Header -->
          <rect x="80" y="45" width="100" height="15" fill="#13B0EE" />
          <image
            :class="isFixed ? 'logoFixed' : 'logoBroken'"
            x="44%"
            y="47"
            href="/assets/bluefoxemail-logo.png"
            :width="isFixed ? 6 : 10"
            :height="isFixed ? 6 : 10"
          />

          <text
            x="85"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 14}px)` }"
          >
            DESIGNERS
          </text>
          <text
            x="112"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 5}px)` }"
          >
            MARKETERS
          </text>
          <text
            x="140"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -4}px)` }"
          >
            DEVS
          </text>
          <text
            x="158"
            y="57"
            font-size="3"
            font-family="serif"
            fill="white"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -13}px)` }"
          >
            EVERYONE
          </text>

          <!-- Hero -->
          <rect x="80" y="60" width="100" height="59" fill="white" />
          <image :class="isFixed ? 'opacity-show' : 'opacity-hide'" x="79" y="60" href="/assets/email-header-background.png" width="110" height="50" />
          <g>
            <rect x="135" y="65" width="42" height="43" fill="#f1f1f1" opacity="0.5"/>
            <rect x="137" y="67" width="38" height="39" fill="none" stroke="black" stroke-width="0.2" />

            <text x="156" y="73" font-size="3" font-family="serif" fill="black" text-anchor="middle">AMAZING</text>
            <text x="156" y="79" font-size="6" font-family="serif" font-weight="bold" fill="black" text-anchor="middle">EMAIL</text>
            <text x="156" y="87" font-size="8" font-family="Indie Flower" fill="black" text-anchor="middle">Template</text>
            <text
              x="156"
              y="93"
              font-size="2"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -7}px)` }"
            >
              Send consistent-looking &
            </text>
            <text
              x="153"
              y="95"
              font-size="2"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 13.5}px, ${isFixed ? 0 : -2}px)` }"
            >
              beautiful emails
            </text>
            <text 
              x="162.75"
              y="95"
              font-size="2"
              font-family="serif"
              fill="black"
              text-anchor="middle"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -5}px)` }"
            >
              today!
            </text>
            <rect
              :class="isFixed ? 'button1Fixed' : 'button1Broken'"
              :x="isFixed ? 148 : 150.5"
              :y="isFixed ? 98 : 99"
              fill="black"
              :width="isFixed ? 17 : 12"
              :height="isFixed ? 4 : 1.75"
              :rx="isFixed ? 1 : 0" 
            />
            <text x="156.5" y="100.5" font-size="2" font-family="sans-serif" fill="white" text-anchor="middle">START NOW</text>
          </g>

          <!-- Main -->
          <rect x="80" y="112" width="100" height="35" fill="white"/>

          <text x="105" y="122" font-size="5" font-family="serif" font-weight="bold" fill="black" text-anchor="middle">RELIABLE</text>
          <text 
            x="105"
            y="126"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -10}px)` }"
          >
            On our platform, your email will
          </text>
          <text 
            x="102"
            y="128"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 16}px, ${isFixed ? 0 : -2}px)` }"
          >
            never break, ensuring it
          </text>
          <text 
            x="115"
            y="128"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -30}px` }"
          >
            always
          </text>
          <text 
            x="105"
            y="130"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -4}px, ${isFixed ? 0 : -2}px)` }"
          >
            looks flawless and professional
          </text>
          <text 
            x="95.5"
            y="132"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 18.5}px, ${isFixed ? 0 : -4}px)` }"
          >
            across all email
          </text>
          <text 
            x="108.5"
            y="132"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -6}px, ${isFixed ? 0 : -2}px)` }"
          >
            clients.
          </text>

          <line
            x1="82"
            y1="134.5"
            x2="150"
            y2="134.5"
            stroke="lightgray"
            stroke-width="0.1"
            :style="{ transition: `opacity ${isFixed ? '2.5' : '0.5'}s ease`, opacity: `${isFixed ? 0 : 1}` }"
          />

          <rect
            :class="isFixed ? 'button1Fixed' : 'button1Broken'"
            :x="isFixed ? 97 : 99"
            :y="isFixed ? 136 : 137"
            :rx="isFixed ? 1 : 0" 
            fill="black"
            :width="isFixed ? 17 : 13.5"
            :height="isFixed ? 4 : 1.75"
          />
          <text x="105.5" y="138.5" font-size="2" font-family="sans-serif" fill="white" text-anchor="middle">SIGN UP NOW</text>

          <image
            x="130"
            y="100"
            href="/assets/email-placeholder-mountains.png"
            width="50"
            height="59"
            :style="{
              transition: `transform ${isFixed ? '2.5' : '0.5'}s ease-in-out`,
              transform: isFixed ? 'scale(1)' : 'scale(1.5)',
              transformOrigin: 'center'
            }"
          />

          <!-- Bottom text -->
          <rect x="80" y="147" width="100" height="12" fill="url(#blackSecondaryGradient)"/>
          <rect
            x="80"
            y="147"
            width="100"
            height="12"
            fill="white"
            :style="{ transition: `opacity ${isFixed ? '2.5' : '0.5'}s ease`, opacity: `${isFixed ? 0 : 1}` }"
          />
          <text x="130" y="155" font-size="5" font-family="serif" fill="#e9e9e9" text-anchor="middle">TRY BLUEFOX.EMAIL NOW</text>

          <!-- Footer -->
          <rect x="80" y="158" width="100" height="7" fill="black"/>

          <text 
            x="111"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : 4}px)` }"
          >
            123 Anywhere st., any city |
          </text>
          <text 
            x="133.5"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
          >
            +123-456-7890 |
          </text>
          <text 
            x="153"
            y="162"
            font-size="2"
            font-family="serif"
            fill="white"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -4.5}px)` }"
          >
            reallygreatsite.com
          </text>
        </g>
      </g>

      <!-- Mobile -->
      <g transform="translate(150, 50)">
        <rect x="25" y="65" width="50" height="100" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
        <circle cx="50" cy="160" r="3" fill="#d0d0d0"/>
        <rect x="43" y="70" width="15" height="2" rx="2" ry="15" fill="#d0d0d0"/>

        <rect x="28" y="75" width="44" height="80" fill="#e0e0e0" rx="1"/>

        <!-- Email -->
        <g clip-path="url(#clip-rect-mobile)">
          <!-- Header -->
          <rect x="28" y="75" width="44" height="8" fill="#13B0EE" />
          <image
            x="47"
            y="76"
            href="/assets/bluefoxemail-logo.png"
            width="6"
            height="6"
          />

          <!-- Hero -->
          <rect x="28" y="83" width="44" height="31" fill="#f1f1f1" />
          <image :class="isFixed ? 'opacity-show' : 'opacity-hide'" x="28" y="76" href="/assets/email-header-background.png" width="60" height="45" />
          <g>
            <rect x="28" y="82.6" width="45" height="31.75" fill="white" opacity="0.6"/>
            <rect x="30" y="84.6" width="40" height="28" fill="none" stroke="black" stroke-width="0.2" />

            <text x="50" y="88" font-size="2" font-family="serif" fill="black" text-anchor="middle">AMAZING</text>
            <text x="50" y="92" font-size="4" font-family="serif" font-weight="bold" fill="black" text-anchor="middle">EMAIL</text>
            <text x="50" y="97" font-size="6" font-family="Indie Flower" fill="black" text-anchor="middle">Template</text>
            <text
              x="50"
              y="101"
              font-size="1.75"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateX(${isFixed ? 0 : -5}px)` }"
            >
              Send consistent-looking & beautiful
            </text>
            <text
              x="50.5"
              y="103"
              font-size="1.75"
              font-family="serif"
              text-anchor="middle"
              fill="black"
              :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 12.5}px, ${isFixed ? 0 : -2}px)` }"
            >
              emails today!
            </text>
            <rect
              :class="isFixed ? 'button1Fixed' : 'button1Broken'"
              :x="isFixed ? 42 : 45"
              :y="isFixed ? 106 : 107"
              fill="black"
              :width="isFixed ? 17 : 10"
              :height="isFixed ? 4 : 1.75"
              :rx="isFixed ? 1 : 0" 
            />
            <text x="50" y="108.5" font-size="1.75" font-family="sans-serif" fill="white" text-anchor="middle">START NOW</text>
          </g>

          <!-- Main -->
          <rect x="28" y="114.5" width="44" height="41" fill="white"/>
          
          <image
            x="30"
            y="115"
            href="/assets/email-placeholder-mountains.png"
            width="40"
            height="59"
            :style="{ 
              transition: `transform ${isFixed ? '2.5' : '0.5'}s ease-in-out`, 
              transformOrigin: 'center', 
              transform: isFixed ? `translate(${xs ? '-8' : '-37'}px, -1px) scale(0.6)` : 'translate(0, 0) scale(1)'
            }"
          />

          <text 
            x="50"
            y="135"
            font-size="2.5"
            font-family="serif"
            font-weight="bold"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translateY(${isFixed ? 0 : -18}px)` }"
          >
            RELIABLE
          </text>
          <text 
            x="50"
            y="139"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -9}px, ${isFixed ? 0 : -20}px)` }"
          >
            On our platform, your email will
          </text>
          <text 
            x="46"
            y="141"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 17.25}px, ${isFixed ? 0 : -22}px)` }"
          >
            never break, ensuring
          </text>
          <text 
            x="59"
            y="141"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -27}px, ${isFixed ? 0 : -20}px)` }"
          >
            it always
          </text>
          <text 
            x="50"
            y="143"
            font-size="2"
            font-family="serif"
            fill="black"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -1.5}px, ${isFixed ? 0 : -22}px)` }"
          >
            looks flawless and professional
          </text>
          <text 
            x="41"
            y="145"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : 21}px, ${isFixed ? 0 : -24}px)` }"
          >
            across all
          </text>
          <text 
            x="49"
            y="145"
            font-size="2"
            font-family="serif"
            fill="black"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -5}px, ${isFixed ? 0 : -22}px)` }"
          >
            email clients.
          </text>

          <line
            x1="28"
            y1="126"
            x2="72"
            y2="126"
            stroke="lightgray"
            stroke-width="0.1"
            :style="{ transition: `opacity ${isFixed ? '2.5' : '0.5'}s ease`, opacity: `${isFixed ? 0 : 1}` }"
          />

          <rect
            :class="isFixed ? 'button1Fixed' : 'button1Broken'"
            :x="isFixed ? 42 : 42"
            :y="isFixed ? 148 : 127"
            fill="black"
            :rx="isFixed ? 1 : 0"
            :width="isFixed ? 17 : 13.5"
            :height="isFixed ? 4 : 1.75"
          />
          <text
            x="50.5"
            y="150.75"
            font-size="2"
            font-family="sans-serif"
            fill="white"
            text-anchor="middle"
            :style="{ transition: `all ${isFixed ? '2.5' : '0.5'}s ease-in-out`, transform: `translate(${isFixed ? 0 : -2}px, ${isFixed ? 0 : -22}px)` }"
          >
            SIGN UP NOW
          </text>
        </g>
      </g>
    </svg>
  </v-container>
</div>
</template>

<style scoped>
.renderIssuesContainer {
  width: 100%;
  max-width: 800px;
}

.opacity-show {
  opacity: 1;
  transition: opacity 2.5s ease;
}
.opacity-hide {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.logoFixed {
  transition: width 2.5s ease-in-out, height 2.5s ease-in-out;
}
.logoBroken {
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out;
}

.button1Fixed {
  transition: width 2.5s ease-in-out, height 2.5s ease-in-out, x 2.5s ease-in-out, y 2.5s ease-in-out;
}

.button1Broken {
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out, x 0.5s ease-in-out, y 0.5s ease-in-out;
}


.animated-btn {
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
}

.animated-btn.tonal-enter-active {
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
}

.animated-btn.tonal-leave-active {
  transition: none;
}
</style>
