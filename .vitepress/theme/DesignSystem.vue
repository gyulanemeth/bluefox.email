<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue'
import DesignSystemLeftSvg from './DesignSystemLeftSvg.vue'
import DesignSystemMiddleSvg from './DesignSystemMiddleSvg.vue'
import DesignSystemRightSvg from './DesignSystemRightSvg.vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  }
})

const selectedDesignSystem = ref(0)
const selectedDesignSystemLogo = ref('/assets/bluefoxemail-logo.png')

function selectDesignSystem (idx) {
  selectedDesignSystem.value = idx
  if (idx === 0) {
    selectedDesignSystemLogo.value = '/assets/bluefoxemail-logo.png'
    return
  }
  if (idx === 1) {
    selectedDesignSystemLogo.value = '/assets/design-system-logo-2.png'
    return
  }
  if (idx === 2) {
    selectedDesignSystemLogo.value = '/assets/design-system-logo-3.png'
    return
  }
}

let intervalId

onMounted(() => {
  setInterval(() => {
    let actSelVal = selectedDesignSystem.value
    actSelVal += 1
    actSelVal %= 3
    selectDesignSystem(actSelVal)
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" class="d-flex flex-column justify-center">
        <v-card
          :elevation="selectedDesignSystem === 0 ? '16' : '1'"
          class="mx-auto"
          width="100%"
          max-width="500px"
          :theme="isDark ? 'dark' : 'light'"
          @click="selectDesignSystem(0)"
        >
          <template v-slot:title>
            <span>Brand 1</span>
          </template>
          <template v-slot:append>
            <v-avatar size="36">
              <v-img
                alt="Bluefox logo"
                src="/assets/bluefoxemail-logo.webp"
              />
            </v-avatar>
          </template>
          <v-card-text>
            <v-row>
              <v-col class="pr-0">
                <v-sheet
                  class="d-flex"
                  color="primary"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="#8a7ed8"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="secondary"
                  height="36"
                />
              </v-col>
              <v-col class="pl-0">
                <v-sheet
                  class="d-flex"
                  color="black"
                  height="36"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card
          :elevation="selectedDesignSystem === 1 ? '20' : '1'"
          class="mx-auto mt-6"
          width="100%"
          max-width="500px"
          :theme="isDark ? 'dark' : 'light'"
          @click="selectDesignSystem(1)"
        >
          <template v-slot:title>
            <span class="design-system-2-font">Brand 2</span>
          </template>
          <template v-slot:append>
            <v-avatar size="36">
              <v-img
                alt="Logo 2"
                src="/assets/design-system-logo-2.png"
              />
            </v-avatar>
          </template>
          <v-card-text>
            <v-row>
              <v-col class="pr-0">
                <v-sheet
                  class="d-flex"
                  color="#626F47"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="#A4B465"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="#FFCF50"
                  height="36"
                />
              </v-col>
              <v-col class="pl-0">
                <v-sheet
                  class="d-flex"
                  color="#FEFAE0"
                  height="36"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card
          :elevation="selectedDesignSystem === 2 ? '20' : '1'"
          class="mx-auto mt-6"
          width="100%"
          max-width="500px"
          :theme="isDark ? 'dark' : 'light'"
          @click="selectDesignSystem(2)"
        >
          <template v-slot:title>
            <span class="design-system-3-font"><b>Brand 3</b></span>
          </template>
          <template v-slot:append>
            <v-avatar size="36">
              <v-img
                alt="Bluefox logo"
                src="/assets/design-system-logo-3.png"
              />
            </v-avatar>
          </template>
          <v-card-text>
            <v-row>
              <v-col class="pr-0">
                <v-sheet
                  class="d-flex"
                  color="#ede7dc"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="#dcd2cc"
                  height="36"
                />
              </v-col>
              <v-col class="px-0">
                <v-sheet
                  class="d-flex"
                  color="#ccafa5"
                  height="36"
                />
              </v-col>
              <v-col class="pl-0">
                <v-sheet
                  class="d-flex"
                  color="#bdc3cb"
                  height="36"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" class="d-flex">
        <svg viewBox="20 10 250 180" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
          <!-- Left screen -->
          <g>
            <rect x="30" y="30" width="100" height="140" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
            <!-- Dots -->
            <circle cx="40" cy="40" r="2.5" fill="#d0d0d0"/>
            <circle cx="46" cy="40" r="2.5" fill="#d0d0d0"/>
            <circle cx="52" cy="40" r="2.5" fill="#d0d0d0"/>
            <!-- Text field -->
            <rect x="60" y="37" width="60" height="5" rx="2.5" fill="#d0d0d0"/>
            <!-- Screen -->
            <rect x="35" y="48" width="90" height="117" fill="#e0e0e0" rx="4"/>
            <DesignSystemLeftSvg
              x="26"
              y="48"
              width="100"
              height="117"
              :logo-src="selectedDesignSystemLogo"
              :selected-design-system="selectedDesignSystem"
              :is-dark="isDark"
            />
          </g>

          <!-- Right screen -->
          <g>
            <rect x="170" y="30" width="100" height="140" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
            <circle cx="180" cy="40" r="2.5" fill="#d0d0d0"/>
            <circle cx="186" cy="40" r="2.5" fill="#d0d0d0"/>
            <circle cx="192" cy="40" r="2.5" fill="#d0d0d0"/>
            <rect x="200" y="37" width="60" height="5" rx="2.5" fill="#d0d0d0"/>
            <rect x="175" y="48" width="90" height="117" fill="#e0e0e0" rx="4"/>
            <DesignSystemRightSvg
              x="174"
              y="48"
              width="100"
              height="117"
              :logo-src="selectedDesignSystemLogo"
              :selected-design-system="selectedDesignSystem"
              :is-dark="isDark"
            />
          </g>

          <!-- Middle screen -->
          <g>
            <rect x="100" y="20" width="100" height="160" rx="8" :fill="isDark ? 'black' : '#f3f3f3'" :stroke="isDark? '#3e3e42' : '#ccc'" stroke-width="1"/>
            <circle cx="110" cy="30" r="2.5" fill="#d0d0d0"/>
            <circle cx="116" cy="30" r="2.5" fill="#d0d0d0"/>
            <circle cx="122" cy="30" r="2.5" fill="#d0d0d0"/>
            <rect x="130" y="27" width="60" height="5" rx="2.5" fill="#d0d0d0"/>
            <rect x="105" y="40" width="90" height="135" fill="white" rx="4"/>
            <DesignSystemMiddleSvg
              x="25"
              y="40"
              width="250"
              height="135"
              :logo-src="selectedDesignSystemLogo"
              :selected-design-system="selectedDesignSystem"
              :is-dark="isDark"
            />
          </g>
          </svg>
          
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
  .design-system-2-font {
    font-family: "Amatic SC", serif;
    font-weight: 700;
    font-style: normal;
  }

  .design-system-3-font {
    font-family: "Indie Flower", serif;
    font-weight: 400;
    font-style: normal;
  }
</style>
