<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="d-flex justify-center">
    <svg width="1040" height="370" viewBox="0 0 1040 370" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="5" dy="5" stdDeviation="5" flood-color="gray" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Card 1 -->
      <rect x="10" y="105" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g>
        <line x1="75" y1="146" x2="92" y2="127" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="92" y1="127" x2="87" y2="140" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="87" y1="140" x2="99" y2="140" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="99" y1="140" x2="83" y2="159" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="83" y1="159" x2="88" y2="146" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="88" y1="146" x2="75" y2="146" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <!-- Text -->
      <text x="85" y="180" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Trigger</text>
      <text x="85" y="205" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Contact added</text>
      <!-- Line -->
      <line x1="160" y1="180" x2="185" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>
      <line x1="185" y1="85" x2="185" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>
      <line x1="185" y1="85" x2="210" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>
      <line x1="185" y1="275" x2="210" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>


      <!-- Card 2 -->
      <rect x="210" y="10" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(262, 20) scale(1.5)">
        <path d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93zM9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2zM29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19zM29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15zM21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke="black" stroke-width="1" fill="none" />
        <path d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke="black" stroke-width="1" fill="none" />
      </g>
      <!-- Text -->
      <text x="285" y="85" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text x="285" y="110" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Premium subscribers</text>
      <!-- Line -->
      <line x1="360" y1="85" x2="410" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>

      <!-- Card 3 -->
      <rect x="410" y="10" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(462, 24) scale(0.7)">
        <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z" />
        <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z" />
        <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z" />
      </g>
      <!-- Text -->
      <text x="485" y="85" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text x="485" y="110" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Welcome</text>

      <line x1="560" y1="85" x2="610" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>
      <circle cx="618" cy="85" r="8" stroke="#13B0EE" stroke-width="2" fill="none"/>
      
      <!-- Card 4 -->
      <rect x="210" y="200" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(262, 210) scale(1.5)">
        <path d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93zM9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2zM29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19zM29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15zM21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke="black" stroke-width="1" fill="none" />
        <path d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke="black" stroke-width="1" fill="none" />
      </g>
      <!-- Text -->
      <text x="285" y="275" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text x="285" y="300" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Free subscribers</text>
      <!-- Line -->
      <line x1="360" y1="275" x2="410" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>

      <!-- Card 5 -->
      <rect x="410" y="200" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(462, 215) scale(0.7)">
        <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z" />
        <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z" />
        <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z" />
      </g>
      <!-- Text -->
      <text x="485" y="275" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text x="485" y="300" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Onboarding 1</text>
      <!-- Line -->
      <line x1="560" y1="275" x2="610" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>

      <!-- Card 6 -->
      <rect x="610" y="200" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(660, 212)">
        <path fill="black" d="M24.273 41.136c8.822 0 16-7.178 16-16s-7.178-16-16-16-16 7.178-16 16 7.178 16 16 16zm0-30c7.72 0 14 6.28 14 14s-6.28 14-14 14-14-6.28-14-14 6.281-14 14-14z" />
        <path fill="black" d="M29.73 32.007a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-5.871-5.871V13.926a1 1 0 1 0-2 0v11.21c0 .265.105.52.293.707l6.164 6.164z" />
      </g>
      
      <!-- Text -->
      <text x="685" y="275" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Timer</text>
      <text x="685" y="300" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">1 day</text>
      <!-- Line -->
      <line x1="760" y1="275" x2="810" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>

      <!-- Card 7 -->
      <rect x="810" y="200" width="150" height="150" rx="20" fill="white" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)"/>
      <!-- Icon -->
      <g transform="translate(860, 215) scale(0.7)">
        <path fill="#222" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z" />
        <path fill="#222" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z" />
        <path fill="#222" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z" />
      </g>
      <!-- Text -->
      <text x="885" y="275" font-size="16" fill="black" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text x="885" y="300" font-size="12" fill="gray" text-anchor="middle" dominant-baseline="middle">Onboarding 2</text>

      <line x1="960" y1="275" x2="1010" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round"/>
      <circle cx="1018" cy="275" r="8" stroke="#13B0EE" stroke-width="2" fill="none"/>
    </svg>
  </div>



  
</template>

<style scoped>

</style>
