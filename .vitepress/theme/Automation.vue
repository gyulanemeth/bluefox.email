<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})

const isAnimating = ref(true)
let animationLoop

onMounted(() => {
  playAnimation()
})

onUnmounted(() => {
  stopAnimation()
})

async function playAnimation () {
  if (!isAnimating.value) {
    return
  }
  await startAnimation()
  await delay(2000)
  resetAnimation()
  await delay(1000)
  await startAnimation2()
  await delay(2000)
  resetAnimation()
  await delay(1000)
  
  animationLoop = setTimeout(playAnimation, 0)
}

function stopAnimation() {
  isAnimating.value = false
  clearTimeout(animationLoop)
}

const triggerDone = ref(false)
const triggerLine1Done = ref(false)
const triggerLine2Done = ref(false)
const triggerLine3Done = ref(false)

const filter1Done = ref(false)
const filter1LineDone = ref(false)

const email1Done = ref(false)
const email1LineDone = ref(false)

const branch1Done = ref(false)

const triggerLine4Done = ref(false)
const triggerLine5Done = ref(false)

const filter2Done = ref(false)
const filter2LineDone = ref(false)

const email2Done = ref(false)
const email2LineDone = ref(false)

const timerDone = ref(false)
const timerLineDone = ref(false)

const email3Done = ref(false)
const email3LineDone = ref(false)

const branch2Done = ref(false)

// or animation-delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function startAnimation() {
  triggerDone.value = true
  await delay(2000)

  triggerLine1Done.value = true
  await delay(500)

  triggerLine2Done.value = true
  await delay(500)

  triggerLine3Done.value = true
  await delay(500)

  filter1Done.value = true
  await delay(2000)

  filter1LineDone.value = true
  await delay(500)

  email1Done.value = true
  await delay(2000)

  email1LineDone.value = true
  await delay(500)

  branch1Done.value = true

  await delay(3000)
}

async function startAnimation2() {
  triggerDone.value = true
  await delay(2000)

  triggerLine1Done.value = true
  await delay(500)

  triggerLine4Done.value = true
  await delay(500)

  triggerLine5Done.value = true
  await delay(500)

  filter2Done.value = true
  await delay(2000)

  filter2LineDone.value = true
  await delay(500)

  email2Done.value = true
  await delay(2000)

  email2LineDone.value = true
  await delay(500)

  timerDone.value = true
  await delay(2000)

  timerLineDone.value = true
  await delay(500)

  email3Done.value = true
  await delay(2000)

  email3LineDone.value = true
  await delay(500)

  branch2Done.value = true
}

function resetAnimation () {
  triggerDone.value = false
  triggerLine1Done.value = false
  triggerLine2Done.value = false
  triggerLine3Done.value = false
  triggerLine4Done.value = false
  triggerLine5Done.value = false

  filter1Done.value = false
  filter2Done.value = false

  filter1LineDone.value = false
  filter2LineDone.value = false

  email1Done.value = false
  email1LineDone.value = false
  email2Done.value = false
  email2LineDone.value = false
  email3Done.value = false
  email3LineDone.value = false

  timerDone.value = false
  timerLineDone.value = false

  branch1Done.value = false
  branch2Done.value = false
}

</script>

<template>
  <div>
  <div v-if="!xs" class="d-flex justify-center">
    <svg width="1040" height="370" viewBox="0 0 1040 370" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="5" dy="5" stdDeviation="5" flood-color="gray" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Card 1 LINES -->
      <line class="placeholderLine" x1="160" y1="180" x2="185" y2="180" stroke-width="2" stroke-linecap="round"/>
      <line :class="triggerLine1Done ? 'lineDone' : 'lineToDo'" x1="160" y1="180" x2="185" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="25" stroke-dashoffset="25" />

      <line x1="185" y1="85" x2="185" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" />
      <line class="placeholderLine" :class="triggerLine2Done ? 'lineDoneVertical' : 'lineToDo'" x1="185" y1="85" x2="185" y2="180" stroke-width="2" stroke-linecap="round" stroke-dasharray="95" stroke-dashoffset="95" />
      <line 
        x1="185" y1="85" x2="185" y2="180" stroke="gray" stroke-width="2" stroke-linecap="round"
        :style="{
          opacity: triggerLine2Done ? 0 : 1,
          stroke: triggerLine2Done ? '#13B0EE' : `${isDark ? '#3e3e42' : 'lightgray'}`,
          transition: triggerLine2Done ? 'none' : 'stroke 1s ease'
        }"
      />
      
      <line class="placeholderLine" x1="185" y1="181" x2="185" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line :class="triggerLine4Done ? 'lineDoneVerticalDown' : 'lineToDo'" x1="185" y1="181" x2="185" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="95" stroke-dashoffset="95" />

      <line class="placeholderLine" x1="185" y1="85" x2="210" y2="85" stroke-width="2" stroke-linecap="round"/>
      <line :class="triggerLine3Done ? 'lineDone' : 'lineToDo'" x1="185" y1="85" x2="210" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="25" stroke-dashoffset="25" />
      
      <line class="placeholderLine" x1="185" y1="275" x2="210" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line :class="triggerLine5Done ? 'lineDone' : 'lineToDo'" x1="185" y1="275" x2="210" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="25" stroke-dashoffset="25" />

      <!-- Card 2 LINES -->
      <line class="placeholderLine" x1="360" y1="85" x2="410" y2="85" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="filter1LineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="360" y1="85" x2="410" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <!-- Card 3 LINES -->
      <line class="placeholderLine" x1="560" y1="85" x2="610" y2="85" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email1LineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="560" y1="85" x2="610" y2="85" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <!-- Card 4 LINES -->
      <line class="placeholderLine" x1="360" y1="275" x2="410" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="filter2LineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="360" y1="275" x2="410" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <!-- Card 5 LINES -->
      <line class="placeholderLine" x1="560" y1="275" x2="610" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email2LineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="560" y1="275" x2="610" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <!-- Card 6 LINES -->
      <line class="placeholderLine" x1="760" y1="275" x2="810" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="timerLineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="760" y1="275" x2="810" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <!-- Card 7 LINES -->
      <line class="placeholderLine" x1="960" y1="275" x2="1010" y2="275" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email3LineDone ? 'lineDoneLong' : 'lineToDo'"
        x1="960" y1="275" x2="1010" y2="275" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />


      <!-- Card 1 -->
      <rect :class="triggerDone ? 'cardDone' : 'cardToDo'" x="10" y="105" width="150" height="150" rx="20" stroke-width="2" filter="url(#shadow)" transform-origin="85px 180px" />
      <!-- Icon -->
      <g
        class="cardIcon"
        :class="{ animateTriggerIcon: triggerDone }"
        :style="{ transformOrigin: '87px 140px' }"
      >
        <line x1="75" y1="146" x2="92" y2="127" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="92" y1="127" x2="87" y2="140" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="87" y1="140" x2="99" y2="140" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="99" y1="140" x2="83" y2="159" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="83" y1="159" x2="88" y2="146" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="88" y1="146" x2="75" y2="146" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <!-- Text -->
      <text class="cardTitle" x="85" y="180" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Trigger</text>
      <text class="cardSubtitle" x="85" y="205" font-size="12" text-anchor="middle" dominant-baseline="middle">Subscription changed</text>

      <!-- Card 2 -->
      <rect :class="filter1Done ? 'cardDone' : 'cardToDo'" x="210" y="10" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="285px 85px"/>
      <!-- Icon -->
      <g class="cardIcon" transform="translate(262, 20) scale(1.5)">
        <path
          d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93z" stroke-width="1" fill="none" />
        <path
          d="M9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2z" stroke-width="1" fill="none" />
        <path
          d="M29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19z" stroke-width="1" fill="none" />
        <path
          d="M29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15z" stroke-width="1" fill="none" />
        <path
          :style="{
            fill: filter1Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter1Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter1Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter1Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke-width="1"
        />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="285" y="85" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text class="cardSubtitle" x="285" y="110" font-size="12" text-anchor="middle" dominant-baseline="middle">Premium subscribers</text>

      <!-- Card 3 -->
      <rect :class="email1Done ? 'cardDone' : 'cardToDo'" x="410" y="10" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="485px 85px"/>
      <!-- Icon -->
      <g transform="translate(460, 22) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIcon"
        :class="{ emailFlying: email1Done }"
        transform="translate(460, 22) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="485" y="85" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="485" y="110" font-size="12" text-anchor="middle" dominant-baseline="middle">Welcome</text>

      <circle
        :style="{
          stroke: branch1Done ? '#13B0EE' : `${isDark ? '#3e3e42' : 'lightgray'}`,
          fill: branch1Done ? '#13B0EE' : 'rgba(0,0,0,0)',
          transition: `fill ${branch1Done ? 1 : 0.5}s ease-in-out, stroke ${branch1Done ? 1 : 0.5}s ease-in-out`
        }"
        cx="618" cy="85" r="8" stroke="#13B0EE" stroke-width="2" fill="none"
      />
      
      <!-- Card 4 -->
      <rect :class="filter2Done ? 'cardDone' : 'cardToDo'" x="210" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="285px 275px"/>
      <!-- Icon -->
      <g class="cardIcon" transform="translate(262, 210) scale(1.5)">
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15z" stroke-width="1" fill="none"
        />
        <path d="M21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke-width="1" fill="none" />
        <path d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke-width="1" fill="none" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="285" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text class="cardSubtitle" x="285" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">Free subscribers</text>

      <!-- Card 5 -->
      <rect :class="email2Done ? 'cardDone' : 'cardToDo'" x="410" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="485px 275px"/>
      <!-- Icon -->
      <g
        transform="translate(460, 213) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIcon2"
        :class="{ emailFlying2: email2Done }"
        transform="translate(460, 213) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="485" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="485" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">Onboarding 1</text>

      <!-- Card 6 -->
      <rect :class="timerDone ? 'cardDone' : 'cardToDo'" x="610" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="685px 275px"/>
      <!-- Icon -->
      <g class="cardIcon">
        <circle cx="686" cy="236" r="16" stroke-width="2" fill="none" />
        <line 
          x1="686" y1="236" 
          x2="696" y2="236"
          stroke-width="2"
          stroke-linecap="round"
          transform-origin="686px 236px"
          class="hour-hand"
          :class="{ rotate: timerDone }"
        />
        <line 
          x1="686" y1="236" 
          x2="686" y2="223"
          stroke-width="1.25"
          stroke-linecap="round"
          transform-origin="686px 236px"
          class="minute-hand"
          :class="{ rotateMinute: timerDone }"
        />
      </g>
      
      <!-- Text -->
      <text class="cardTitle" x="685" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Timer</text>
      <text class="cardSubtitle" x="685" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">1 day</text>

      <!-- Card 7 -->
      <rect :class="email3Done ? 'cardDone' : 'cardToDo'" x="810" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="885px 275px"/>
      <!-- Icon -->
      <g
        transform="translate(858, 213) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIcon3"
        :class="{ emailFlying3: email3Done }"
        transform="translate(858, 213) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="885" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="885" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">Onboarding 2</text>
      
      <circle
        :style="{
          stroke: branch2Done ? '#13B0EE' : `${isDark ? '#3e3e42' : 'lightgray'}`,
          fill: branch2Done ? '#13B0EE' : 'rgba(0,0,0,0)',
          transition: `fill ${branch2Done ? 1 : 0.5}s ease-in-out, stroke ${branch2Done ? 1 : 0.5}s ease-in-out`
        }"
        cx="1018" cy="275" r="8" stroke="#13B0EE" stroke-width="2" fill="none"
      />
    </svg>
  </div>

  <div v-else class="d-flex justify-center">
    <svg width="100%" height="95vh" min-height="650px" max-height="980" viewBox="0 0 400 980" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="5" dy="5" stdDeviation="5" flood-color="gray" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Card 1 LINES -->
      <line class="placeholderLine" x1="200" y1="160" x2="200" y2="180" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="triggerLine1Done ? 'lineDoneVerticalShortMobile' : 'lineToDo'"
        x1="200" y1="160" x2="200" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="20" stroke-dashoffset="20"
      />

      <line class="placeholderLine" x1="200" y1="180" x2="85" y2="180" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="triggerLine2Done ? 'lineDoneHorizontalMobile' : 'lineToDo'"
        x1="200" y1="180" x2="85" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="115" stroke-dashoffset="115"
      />

      <line class="placeholderLine" x1="85" y1="180" x2="85" y2="200" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="triggerLine3Done ? 'lineDoneVerticalShortMobile' : 'lineToDo'"
        x1="85" y1="180" x2="85" y2="200" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="50" stroke-dashoffset="50"
      />

      <line class="placeholderLine" x1="200" y1="180" x2="315" y2="180" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="triggerLine4Done ? 'lineDoneHorizontalMobile' : 'lineToDo'"
        x1="200" y1="180" x2="315" y2="180" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="115" stroke-dashoffset="115"
      />

      <line class="placeholderLine" x1="315" y1="180" x2="315" y2="200" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="triggerLine5Done ? 'lineDoneVerticalShortMobile' : 'lineToDo'"
        x1="315" y1="180" x2="315" y2="200" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="20" stroke-dashoffset="20"
      />

      <!-- Card 2 LINES -->
      <line class="placeholderLine" x1="85" y1="350" x2="85" y2="390" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="filter1LineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="85" y1="350" x2="85" y2="390" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 3 LINES -->
      <line class="placeholderLine" x1="85" y1="540" x2="85" y2="580" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email1LineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="85" y1="540" x2="85" y2="580" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 4 LINES -->
      <line class="placeholderLine" x1="315" y1="350" x2="315" y2="390" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="filter2LineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="315" y1="350" x2="315" y2="390" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 5 LINES -->
      <line class="placeholderLine" x1="315" y1="540" x2="315" y2="580" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email2LineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="315" y1="540" x2="315" y2="580" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 6 LINES -->
      <line class="placeholderLine" x1="315" y1="730" x2="315" y2="770" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="timerLineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="315" y1="730" x2="315" y2="770" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 7 LINES -->
      <line class="placeholderLine" x1="315" y1="920" x2="315" y2="960" stroke-width="2" stroke-linecap="round"/>
      <line
        :class="email3LineDone ? 'lineDoneVerticalMobile' : 'lineToDo'"
        x1="315" y1="920" x2="315" y2="960" stroke="#13B0EE" stroke-width="2" stroke-linecap="round" stroke-dasharray="40" stroke-dashoffset="40"
      />

      <!-- Card 1 -->
      <rect :class="triggerDone ? 'cardDone' : 'cardToDo'" x="125" y="10" width="150" height="150" rx="20" fill="none" stroke-width="2" filter="url(#shadow)" transform-origin="200px 85px"/>
      <!-- Icon -->
      <g
        class="cardIcon"
        :class="{ animateTriggerIcon: triggerDone }"
        :style="{ transformOrigin: '202px 45px' }"
      >
        <line x1="190" y1="51" x2="207" y2="32" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="207" y1="32" x2="202" y2="45" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="202" y1="45" x2="214" y2="45" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="214" y1="45" x2="198" y2="64" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="198" y1="64" x2="203" y2="51" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="203" y1="51" x2="190" y2="51" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <!-- Text -->
      <text class="cardTitle" x="200" y="85" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Trigger</text>
      <text class="cardSubtitle" x="200" y="110" font-size="12" text-anchor="middle" dominant-baseline="middle">Subscription changed</text>
      <!-- Line -->

      <!-- Card 2 -->
      <rect :class="filter1Done ? 'cardDone' : 'cardToDo'" x="10" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="85px 275px" />
      <!-- Icon -->
      <g class="cardIcon" transform="translate(60, 210) scale(1.5)">
        <path
          d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93z" stroke-width="1" fill="none" />
        <path
          d="M9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2z" stroke-width="1" fill="none" />
        <path
          d="M29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19z" stroke-width="1" fill="none" />
        <path
          d="M29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15z" stroke-width="1" fill="none" />
        <path
          :style="{
            fill: filter1Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter1Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter1Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter1Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke-width="1"
        />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="85" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text class="cardSubtitle" x="85" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">Premium subscribers</text>

      <!-- Card 3 -->
      <rect :class="email1Done ? 'cardDone' : 'cardToDo'" x="10" y="390" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="85px 465px" />
      <!-- Icon -->
      <g transform="translate(59, 400) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIconMobile"
        :class="{ emailFlyingMobile: email1Done }"
        transform="translate(59, 400) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="85" y="465" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="85" y="490" font-size="12" text-anchor="middle" dominant-baseline="middle">Welcome</text>

      <circle
        :style="{
          stroke: branch1Done ? '#13B0EE' : `${isDark ? '#3e3e42' : 'lightgray'}`,
          fill: branch1Done ? '#13B0EE' : 'rgba(0,0,0,0)',
          transition: `fill ${branch1Done ? 1 : 0.5}s ease-in-out, stroke ${branch1Done ? 1 : 0.5}s ease-in-out`
        }"
        cx="85" cy="588" r="8" stroke="#13B0EE" stroke-width="2" fill="none"
      />

      <!-- Card 4 -->
      <rect :class="filter2Done ? 'cardDone' : 'cardToDo'" x="240" y="200" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="315px 275px"/>
      <!-- Icon -->
      <g class="cardIcon" transform="translate(292, 210) scale(1.5)">
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M6.23 20.93A5.9 5.9 0 0 1 2.54 19 6 6 0 0 0 1 23v3a1 1 0 0 0 1 1H6.18A3 3 0 0 1 6 26V23A9.45 9.45 0 0 1 6.23 20.93z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M9.78 15.2A6.91 6.91 0 0 1 9 12V10.56A3.91 3.91 0 0 0 7 10a4 4 0 0 0-4 4v1a4 4 0 0 0 3.85 4A10 10 0 0 1 9.78 15.2z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M29.46 19a5.9 5.9 0 0 1-3.69 1.93A9.45 9.45 0 0 1 26 23v3a3 3 0 0 1-.18 1H30a1 1 0 0 0 1-1V23A6 6 0 0 0 29.46 19z" stroke-width="1" fill="none"
        />
        <path
          :style="{
            fill: filter2Done ? `${isDark ? 'white' : 'black'}` : 'rgba(0,0,0,0)',
            transition: `fill ${filter2Done ? 2 : 0.5}s ease-in-out`
          }"
          d="M29 15V14a4 4 0 0 0-4-4 3.91 3.91 0 0 0-2 .56V12a6.91 6.91 0 0 1-.78 3.2A10 10 0 0 1 25.15 19 4 4 0 0 0 29 15z" stroke-width="1" fill="none"
        />
        <path d="M21.07 16.82a7 7 0 0 1-10.14 0A8 8 0 0 0 8 23v3a1 1 0 0 0 1 1H23a1 1 0 0 0 1-1V23A8 8 0 0 0 21.07 16.82z" stroke-width="1" fill="none" />
        <path d="M16,17a5,5,0,0,0,5-5V10a5,5,0,0,0-10,0v2A5,5,0,0,0,16,17Z" stroke-width="1" fill="none" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="315" y="275" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Audience filter</text>
      <text class="cardSubtitle" x="315" y="300" font-size="12" text-anchor="middle" dominant-baseline="middle">Free subscribers</text>


      <!-- Card 5 -->
      <rect :class="email2Done ? 'cardDone' : 'cardToDo'" x="240" y="390" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="315px 465px" />
      <g
        transform="translate(290, 400) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIconMobile2"
        :class="{ emailFlyingMobile2: email2Done }"
        transform="translate(290, 400) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="315" y="465" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="315" y="490" font-size="12" text-anchor="middle" dominant-baseline="middle">Onboarding 1</text>

      <!-- Card 6 -->
      <rect :class="timerDone ? 'cardDone' : 'cardToDo'" x="240" y="580" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="315px 655px"/>
      <!-- Icon -->
      <g class="cardIcon">
        <circle cx="315" cy="618" r="16" stroke-width="2" fill="none" />
        <line 
          x1="315" y1="618" 
          x2="325" y2="618"
          stroke-width="2"
          stroke-linecap="round"
          transform-origin="315px 618px"
          class="hour-hand"
          :class="{ rotate: timerDone }"
        />
        <line 
          x1="315" y1="618" 
          x2="315" y2="605"
          stroke-width="1.25"
          stroke-linecap="round"
          transform-origin="315px 618px"
          class="minute-hand"
          :class="{ rotateMinute: timerDone }"
        />
      </g>
      
      <!-- Text -->
      <text class="cardTitle" x="315" y="655" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Timer</text>
      <text class="cardSubtitle" x="315" y="680" font-size="12" text-anchor="middle" dominant-baseline="middle">1 day</text>


      <!-- Card 7 -->
      <rect :class="email3Done ? 'cardDone' : 'cardToDo'" x="240" y="770" width="150" height="150" rx="20" fill="none" stroke="#13B0EE" stroke-width="2" filter="url(#shadow)" transform-origin="315px 855px"/>
      <!-- Icon -->
      <g
        transform="translate(290, 780) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" :fill="`${isDark ? 'gray' : 'lightgray'}`" />
      </g>
      <g
        class="cardIcon emailIconMobile3"
        :class="{ emailFlyingMobile3: email3Done }"
        transform="translate(290, 780) scale(0.5)">
        <path d="M88 23H12c-1.1 0-2 .9-2 2v50c0 1.1.9 2 2 2h76c1.1 0 2-.9 2-2V25c0-1.1-.9-2-2-2zm-4.8 4L50 60.2 16.8 27h66.4zM14 29.8 34.2 50 14 70.2V29.8zM16.9 73 37 52.9l11.6 11.6c.8.8 2 .8 2.8 0L63 52.9 83.1 73H16.9zM86 70.2 65.8 50 86 29.8v40.4z" />
      </g>
      <!-- Text -->
      <text class="cardTitle" x="315" y="845" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle">Send email</text>
      <text class="cardSubtitle" x="315" y="870" font-size="12" text-anchor="middle" dominant-baseline="middle">Onboarding 2</text>

      <circle
        :style="{
          stroke: branch2Done ? '#13B0EE' : `${isDark ? '#3e3e42' : 'lightgray'}`,
          fill: branch2Done ? '#13B0EE' : 'rgba(0,0,0,0)',
          transition: `fill ${branch2Done ? 1 : 0.5}s ease-in-out, stroke ${branch2Done ? 1 : 0.5}s ease-in-out`
        }"
        cx="315" cy="968" r="8" stroke="#13B0EE" stroke-width="2" fill="none"
      />
    </svg>
  </div>
  </div>
</template>

<style scoped>
@keyframes cardGrow {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.cardDone {
  stroke: #13B0EE;
  transition: stroke 2s ease-in-out;
  animation: cardGrow 2s ease-in-out;
  fill: white;
}
html.dark .cardDone {
  fill: var(--vp-c-bg);
}

.cardToDo {
  stroke: lightgray;
  transition: stroke 0.5s ease-in-out;
  fill: white;
}
html.dark .cardToDo {
  stroke: #3e3e42;
  fill: var(--vp-c-bg);
}

.cardTitle {
  fill: black;
}
html.dark .cardTitle {
  fill: white;
}

.cardSubtitle {
  fill: gray;
}
html.dark .cardSubtitle {
  fill: lightgray;
}

.cardIcon {
  stroke: black;
  fill: black;
}
html.dark .cardIcon {
  stroke: white;
  fill: white;
}

@keyframes growLine {
  0% { stroke-dashoffset: 25; }
  100% { stroke-dashoffset: 0; }
}

@keyframes growLineLong {
  0% { stroke-dashoffset: 50; }
  100% { stroke-dashoffset: 0; }
}

@keyframes growLineVertical {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 95; }
}

@keyframes growLineVerticalDown {
  0% { stroke-dashoffset: 95; }
  100% { stroke-dashoffset: 0; }
}

@keyframes growLineVerticalMobile {
  0% { stroke-dashoffset: 40; }
  100% { stroke-dashoffset: 0; }
}

@keyframes growLineVerticalShortMobile {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}

@keyframes growLineHorizontalMobile {
  0% { stroke-dashoffset: 115; }
  100% { stroke-dashoffset: 0; }
}

.placeholderLine {
  stroke: lightgray;
}
html.dark .placeholderLine {
  stroke: #3e3e42;
}

.lineDone {
  animation: growLine 0.5s forwards;
}

.lineDoneLong {
  animation: growLineLong 0.5s forwards;
}

.lineDoneVertical {
  animation: growLineVertical 0.5s forwards;
}

.lineDoneVerticalDown {
  animation: growLineVerticalDown 0.5s forwards;
}

.lineDoneVerticalShortMobile {
  animation: growLineVerticalShortMobile 0.5s forwards;
}

.lineDoneVerticalMobile {
  animation: growLineVerticalMobile 0.5s forwards;
}

.lineDoneHorizontalMobile {
  animation: growLineHorizontalMobile 0.5s forwards;
}

.lineToDo {
  opacity: 1;
  stroke: lightgray;
  stroke-dashoffset: 0;
  transition: stroke 0.5s ease-in-out;
}
html.dark .lineToDo {
  stroke: #3e3e42;
}

.strokeNone {
  opacity: 0;
  transition: opacity 0.5s ease
}

@keyframes scaleBounce {
  0% { transform: scale(1); }
  25% { transform: scale(1.2); }
  50% { transform: scale(1); }
  75% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* Trigger */
.animateTriggerIcon {
  animation: scaleBounce 1s ease-in-out forwards;
}

/* Audience */
.filteredAudience {
  fill: black;
  transition: fill 2s ease-in-out;
}

/* Email */
.emailFlying {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(600px, 0px) scale(0.5);
  opacity: 0;
}

.emailFlying2 {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(600px, 180px) scale(0.5);
  opacity: 0;
}

.emailFlying3 {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(998px, 180px) scale(0.5);
  opacity: 0;
}

.emailFlyingMobile {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(210px, 375px) scale(0.5);
  opacity: 0;
}

.emailFlyingMobile2 {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(441px, 375px) scale(0.5);
  opacity: 0;
}

.emailFlyingMobile3 {
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
  transform: translate(441px, 755px) scale(0.5);
  opacity: 0;
}

.emailIcon:not(.emailFlying) {
  transform: translate(460px, 22px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.emailIcon2:not(.emailFlying2) {
  transform: translate(460px, 213px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.emailIcon3:not(.emailFlying3) {
  transform: translate(858px, 213px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.emailIconMobile:not(.emailFlyingMobile) {
  transform: translate(59px, 400px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.emailIconMobile2:not(.emailFlyingMobile2) {
  transform: translate(290px, 400px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.emailIconMobile3:not(.emailFlyingMobile3) {
  transform: translate(290px, 780px) scale(0.5);
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

/* Clock */
.hour-hand.rotate {
  transform: rotate(30deg); /* Moves from 3 o'clock (90°) to 4 o'clock (120°) */
  transition: transform 2s ease-in-out;
}

.hour-hand:not(.rotate) {
  transform: rotate(0deg);
  transition: transform 0.5s ease-in-out;
}

.minute-hand.rotateMinute {
  transform: rotate(360deg);
  transition: transform 2s ease-in-out;
}

.minute-hand:not(.rotateMinute) {
  transform: rotate(0deg);
  transition: transform 0.5s ease-in-out;
}

</style>
