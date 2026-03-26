<script setup>
const team = [
  {
    name: 'Gyula Németh',
    role: 'Founder & CEO',
    photo: '/assets/me.webp',
    bio: 'Gyula has been in the world of HTML email since 2013. He co-founded edmdesigner.com, chamaileon.io, and emailhero.io before building BlueFox Email to solve the exact problems marketing agencies deal with every day.',
  },
  {
    name: 'Ahmed Qudaih',
    role: 'Senior Developer',
    photo: '/assets/AhmedQaudih.jpg',
    bio: 'Ahmed builds and maintains the core platform. He owns reliability, ships features fast, and makes complex agency workflows feel effortless. If it\'s fast and it works, he had a hand in it.',
  },
  {
    name: 'Parth Tiwari',
    role: 'Developer Relations',
    photo: '/assets/parth.jpeg',
    bio: 'Parth bridges the product and the people using it. He writes docs, creates tutorials, and helps developers get up and running quickly. If a guide actually made sense, that\'s probably him.',
  },
]
</script>

<template>
  <div class="team-wrapper">
    <div
      v-for="(member, i) in team"
      :key="member.name"
      class="member-section"
      :class="{ reversed: i % 2 !== 0 }"
    >
      <!-- Subtle grid overlay like homepage problem-section -->
      <div class="grid-overlay" aria-hidden="true"></div>

      <div class="section-inner">
        <!-- Photo with gradient ring -->
        <div class="photo-side">
          <div class="photo-ring">
            <img
              :src="member.photo"
              :alt="member.name"
              class="member-photo"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Text -->
        <div class="text-side">
          <v-chip color="primary" size="small" variant="tonal" class="role-chip">
            {{ member.role }}
          </v-chip>
          <h2 class="member-name">{{ member.name }}</h2>
          <div class="name-accent" aria-hidden="true"></div>
          <p class="member-bio">{{ member.bio }}</p>
        </div>
      </div>

      <!-- Gradient divider -->
      <div v-if="i < team.length - 1" class="section-divider" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>
/* Break out of VitePress container */
.team-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

/* ── Section per person ───────────────────────────────── */
.member-section {
  padding: 88px 24px;
  position: relative;
  overflow: hidden;
  /* Alternating subtle gradient backgrounds like the homepage */
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.02) 0%, rgba(57, 44, 145, 0.03) 100%);
}

.member-section:nth-child(even) {
  background: linear-gradient(135deg, rgba(57, 44, 145, 0.03) 0%, rgba(19, 176, 238, 0.02) 100%);
}

html.dark .member-section {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.05) 0%, rgba(57, 44, 145, 0.06) 100%);
}

html.dark .member-section:nth-child(even) {
  background: linear-gradient(135deg, rgba(57, 44, 145, 0.06) 0%, rgba(19, 176, 238, 0.04) 100%);
}

/* Subtle grid pattern overlay (matches homepage problem-section) */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  opacity: 0.5;
}

html.dark .grid-overlay {
  background-image:
    linear-gradient(rgba(19, 176, 238, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 176, 238, 0.04) 1px, transparent 1px);
}

/* ── Inner layout ─────────────────────────────────────── */
.section-inner {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 72px;
  position: relative;
  z-index: 1;
}

.reversed .section-inner {
  flex-direction: row-reverse;
}

/* ── Photo with gradient ring ─────────────────────────── */
.photo-side {
  flex-shrink: 0;
}

.photo-ring {
  width: 270px;
  height: 270px;
  border-radius: 50%;
  padding: 5px;
  background: linear-gradient(135deg, #13B0EE 0%, #392C91 100%);
  box-shadow:
    0 16px 48px rgba(19, 176, 238, 0.2),
    0 8px 24px rgba(57, 44, 145, 0.15);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-ring:hover {
  transform: scale(1.04);
  box-shadow:
    0 24px 64px rgba(19, 176, 238, 0.3),
    0 12px 32px rgba(57, 44, 145, 0.2);
}

.member-photo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* ── Text ─────────────────────────────────────────────── */
.text-side {
  flex: 1;
  min-width: 0;
}

.role-chip {
  margin-bottom: 16px;
}

.member-name {
  font-size: clamp(30px, 3.5vw, 44px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0 0 0;
  border-top: none !important;
  padding-top: 0 !important;
  /* Gradient text matching homepage titles */
  background: linear-gradient(135deg, #1f2937 0%, #392C91 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

html.dark .member-name {
  background: linear-gradient(135deg, #f3f4f6 0%, #13B0EE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Short gradient accent bar under name */
.name-accent {
  width: 48px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, #13B0EE, #392C91);
  margin: 16px 0 20px;
}

.member-bio {
  font-size: 16px;
  color: #4b5563;
  line-height: 1.8;
  margin: 0;
  max-width: 480px;
}

html.dark .member-bio {
  color: #9ca3af;
}

/* ── Gradient divider between sections ────────────────── */
.section-divider {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(400px, 60%);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(19, 176, 238, 0.3), rgba(57, 44, 145, 0.3), transparent);
}

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 768px) {
  .member-section {
    padding: 56px 24px;
  }

  .section-inner,
  .reversed .section-inner {
    flex-direction: column;
    text-align: center;
    gap: 36px;
  }

  .photo-ring {
    width: 210px;
    height: 210px;
  }

  .name-accent {
    margin-left: auto;
    margin-right: auto;
  }

  .member-bio {
    max-width: 100%;
  }
}
</style>
