<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  type: { type: String, default: 'video/mp4' },
  width: { type: [String, Number], default: 800 },
  height: { type: [String, Number], default: 450 },
})

const videoRef = ref(null)
let observer = null
let playTimeout = null

onMounted(() => {
  const video = videoRef.value
  if (!video) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        playTimeout = setTimeout(() => {
          video.play()
        }, 1000)
      } else {
        clearTimeout(playTimeout)
        video.pause()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(video)
})

onUnmounted(() => {
  clearTimeout(playTimeout)
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <video
    ref="videoRef"
    :width="props.width"
    :height="props.height"
    loop
    muted
    controls
    playsinline
  >
    <source :src="props.src" :type="props.type" />
  </video>
</template>
