<script setup>
import { useData } from 'vitepress'
import { useDisplay } from 'vuetify'
import PersonaLanding from '../components/PersonaLanding.vue'
import EducationAudienceGrid from './EducationAudienceGrid.vue'
import UniversitySegmentation from './UniversitySegmentation.vue'
import UniversityEditor from './UniversityEditor.vue'
import UniversityTemplateShowcase from './UniversityTemplateShowcase.vue'
import UniversitySocialProof from './UniversitySocialProof.vue'
import UniversityITRequirements from './UniversityITRequirements.vue'
import AgencyAnalytics from '../marketing-agencies/AgencyAnalytics.vue'
import DesignSystem from '../../.vitepress/theme/DesignSystem.vue'

const { isDark } = useData()
const { lgAndUp, md, sm, xs } = useDisplay()
</script>

<template>
  <PersonaLanding
    hero-badge="For colleges & universities"
    hero-title="University email without the contact-based pricing"
    hero-description="Send newsletters, alumni updates and event invitations. Segment your audience, keep every email on-brand, and pay only for what you send."
    :hero-highlights="['Pay per send, not per contact', 'Credits that fit the academic calendar', 'Segment alumni by year, students by department']"
    :hero-feature-items="[]"
    cta-text="Start free. 3,000 sends included"
    cta-href="https://app.bluefox.email/accounts/create-account"
    hero-primary-cta-text="Talk to the founder"
    hero-primary-cta-href="mailto:gyula@bluefox.email"
    hero-secondary-cta-text="Start free. 3,000 sends included"
    hero-secondary-cta-href="https://app.bluefox.email/accounts/create-account"
    hero-cta-supporting-text="Questions about using BlueFox at your university? Email Gyula directly."
    :show-testimonials="false"
    :show-automation="false"
    :show-integrations="false"
    :show-analytics="false"
    :show-design="false"
    mid-cta-title=""
    after-pain-stripe="white"
    deliverability-stripe="white"
    bottom-stripe="white"
    final-cta-stripe="white"
    final-title="Start with your team"
    final-description="You do not need a university-wide rollout to get started. Try BlueFox with your newsletter, alumni program or communications team first."
    final-primary-cta-text="Talk to the founder"
    final-primary-cta-href="mailto:gyula@bluefox.email"
    final-secondary-cta-text="Start free"
    final-secondary-cta-href="https://app.bluefox.email/accounts/create-account"
    final-cta-supporting-text="Questions about using BlueFox at your university? Email Gyula directly."
  >
    <template #heroVisual>
      <UniversityTemplateShowcase
        :is-dark="isDark"
        :lg-and-up="lgAndUp"
        :md="md"
        :sm="sm"
        :xs="xs"
      />
    </template>

    <template #afterPain>
      <div class="edu-slot-reset">
        <!-- 2. Social proof -->
        <div class="edu-stripe edu-stripe--white">
          <div class="edu-stripe-inner">
            <UniversitySocialProof :is-dark="isDark" />
          </div>
        </div>

        <!-- 3. What universities send -->
        <div class="edu-stripe edu-stripe--blue">
          <div class="edu-stripe-inner">
            <EducationAudienceGrid />
          </div>
        </div>

        <!-- 4. List management & segmentation -->
        <div class="edu-stripe edu-stripe--white">
          <div class="edu-stripe-inner">
            <UniversitySegmentation
              :is-dark="isDark"
              :lg-and-up="lgAndUp"
              :md="md"
              :sm="sm"
              :xs="xs"
            />
          </div>
        </div>

        <!-- 5. Visual editor, saved blocks & templates -->
        <div class="edu-stripe edu-stripe--blue">
          <div class="edu-stripe-inner">
            <UniversityEditor />
          </div>
        </div>
      </div>
    </template>

    <!-- 6. Analytics (blue, uses PersonaLanding's own deliverability stripe) -->
    <template #deliverabilityContent>
      <div class="edu-analytics">
        <AgencyAnalytics
          title="See what your audience actually reads"
          description="Track opens, clicks, bounces and complaints, then see which links and messages get the most engagement."
          secondary-description="Compare performance over time and learn what works for your audience."
          default-tab="hourly"
        />
      </div>
    </template>

    <template #bottom>
      <div class="edu-slot-reset">
        <!-- 7. Mid CTA -->
        <div class="edu-stripe edu-stripe--blue">
          <section class="edu-stripe-inner edu-stripe-inner--cta" aria-labelledby="edu-mid-cta-heading">
            <div class="edu-mid-cta-inner">
              <h2 id="edu-mid-cta-heading">Send your first newsletter in minutes.</h2>
              <p>No subscription. Buy credits, use them across the academic year.</p>
              <v-btn
                size="large"
                color="primary"
                variant="flat"
                class="edu-mid-cta-btn"
                href="https://app.bluefox.email/accounts/create-account"
                target="_blank"
              >
                <strong>Start free. 3,000 sends included</strong>
              </v-btn>
            </div>
          </section>
        </div>

        <!-- 8. Start with one team, scale across the university -->
        <div class="edu-stripe edu-stripe--white">
          <section id="design-system" class="edu-stripe-inner" aria-labelledby="edu-design-title">
            <h2 id="edu-design-title" class="section-title">Start with one team. Scale across the university.</h2>
            <p class="section-subtitle constrained">One faculty, department or alumni team can start using BlueFox on its own. As other teams join, they can keep separate email workflows while sharing the same university design system.</p>
            <p class="section-subtitle section-subtitle--second constrained">Keep colors, typography, reusable content and email design consistent without forcing every team into the same newsletter setup.</p>
            <DesignSystem :is-dark="isDark" class="mt-6" />
          </section>
        </div>

        <!-- 9. IT / institutional requirements -->
        <div class="edu-stripe edu-stripe--blue">
          <div class="edu-stripe-inner">
            <UniversityITRequirements />
          </div>
        </div>
      </div>
    </template>
  </PersonaLanding>
</template>

<style scoped>
/* PersonaLanding wraps every slot in `.persona-slot`, which carries its own
   padding (64/24/96, tightening at 760px and 480px). This page supplies its own
   full-bleed stripes instead, so the wrapper cancels that padding vertically —
   otherwise the first and last sections in each slot get it twice. The values
   below mirror PersonaLanding.vue exactly and must move with it. */
.edu-slot-reset {
  margin-top: -64px;
  margin-bottom: -96px;
}

/* AgencyAnalytics carries its own 36px/24px padding. Inside the slot that stacks
   on `.persona-slot`'s, pushing this section 24px right of every other heading on
   the page. Neutralised here only — marketing-agencies keeps its own spacing. */
.edu-analytics :deep(.agency-analytics) {
  padding: 0;
}

/* PersonaLanding's stripe styles are scoped to that component, so slot content
   needs its own copy. Values mirror PersonaLanding.vue exactly. */
.edu-stripe {
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
}

.edu-stripe--white { background: #ffffff; }
.edu-stripe--blue { background: #eef8fd; }

html.dark .edu-stripe--white { background: #0f172a; }
html.dark .edu-stripe--blue { background: #0c1e2d; }

.edu-stripe-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 96px;
}

.edu-stripe-inner--cta {
  padding: 56px 24px 80px;
}

.edu-mid-cta-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.edu-mid-cta-inner h2 {
  font-size: clamp(24px, 3.5vw, 38px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.edu-mid-cta-inner p {
  margin: 0 0 24px;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
}

html.dark .edu-mid-cta-inner p { color: #9ca3af; }

.edu-mid-cta-btn {
  text-transform: none !important;
  letter-spacing: 0 !important;
  border-radius: 10px !important;
  min-height: 50px !important;
  padding: 0 28px !important;
  text-decoration: none !important;
}

.edu-mid-cta-btn :deep(.v-btn__content) { line-height: 1.2; }
.edu-mid-cta-btn strong { line-height: 1.2; }

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
  text-align: left;
}

.section-subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle { color: #9ca3af; }

.section-subtitle--second { margin-top: 10px; }

.constrained { max-width: 760px; }

@media (max-width: 760px) {
  .edu-slot-reset {
    margin-top: -48px;
    margin-bottom: -72px;
  }
  .edu-stripe-inner {
    padding: 48px 16px 72px;
  }
  .edu-stripe-inner--cta {
    padding: 48px 16px 64px;
  }
}

@media (max-width: 480px) {
  .edu-slot-reset {
    margin-top: -36px;
    margin-bottom: -56px;
  }
  .edu-stripe-inner {
    padding: 36px 14px 56px;
  }
  .edu-stripe-inner--cta {
    padding: 36px 14px 48px;
  }
  .edu-mid-cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
