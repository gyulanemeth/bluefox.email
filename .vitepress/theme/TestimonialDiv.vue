<script setup>
import { ref } from 'vue'

const selectedTestimonialId = ref(0)
const testimonials = [
  {
    id: 0,
    name: 'Matt Luo',
    initials: 'ML',
    company: 'Founder of ClarityText.com',
    testimonial: `ClarityText chose Bluefox because it guides us toward success. Unlike with other vendors and libraries, it's Bluefox's responsibility to make sure that our emails fit in every client and device. This is a big relief for a startup. Also, Bluefox's pricing is easy to understand, unlike a typical and complicated contacts-based pricing.`,
    profileImg: '/assets/testimonials/matt-luo.jpg',
    logo: '/assets/testimonials/clarity-text.svg',
    url: 'https://www.claritytext.com'
  },
  {
    id: 1,
    name: 'Gabriel Varaljay',
    initials: 'GV',
    company: 'Founder of TrendFingers.com',
    testimonial: `I’ve been using Blue Fox to send out my newsletters, and I couldn’t be happier. The system integrates seamlessly with my own AWS SES, giving me full control and transparency without the hefty price tag of overpriced black-box solutions like Mailchimp. Plus, I’ve noticed a significantly lower bounce rate compared to my previous provider—it’s an excellent choice for anyone seeking reliability and efficiency.`,
    profileImg: '/assets/testimonials/gabriel-varaljay.jpg',
    logo: '/assets/testimonials/trendfingers.png',
    url: 'https://trendfingers.com'
  }
]
</script>

<template>
    <v-card elevation="6">
      <div class="pa-2">
        <v-icon color="red" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="orange" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="green" size="medium">mdi-circle</v-icon>
      </div>
      <v-divider opacity="100" class="my-0" />
      <div>
        <v-row class="pa-3">
          <v-col cols="3" class="rightBorder" />
          <v-col cols="7" class="d-flex justify-space-between">  
            <v-icon class="mx-3">mdi-email-outline</v-icon>
            <v-icon class="mr-6">mdi-square-edit-outline</v-icon>

            <div class="d-flex justify-space-between">
              <v-icon class="mr-3">mdi-archive-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon class="ml-3 mr-3">mdi-trash-can-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon class="ml-3">mdi-package-variant-remove</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon class="mr-3">mdi-reply</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon class="ml-3 mr-3">mdi-reply-all</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon class="ml-3">mdi-share</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon class="mr-1" color="red">mdi-flag</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon class="ml-1">mdi-chevron-down</v-icon>
            </div>

            <v-icon class="">mdi-bell-off-outline</v-icon>

            <div class="d-flex justify-space-between">
              <v-icon>mdi-folder-outline</v-icon>
              <v-icon>mdi-chevron-down</v-icon>
            </div>
          </v-col>
          <v-col cols="2">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              disabled
            />
          </v-col>
        </v-row>
      </div>
      <v-divider opacity="100" class="my-0" />
      <div>
        <v-row class="pa-3">
          <v-col cols="3" class="rightBorder">
            <v-list lines="two" color="secondary">
              <v-list-item
                v-for="item in testimonials"
                :key="item.id"
                :value="item.id"
                :active="item.id === selectedTestimonialId"
                @click="selectedTestimonialId = item.id"
              >
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle class="mb-1 opacity-80">{{ item.company }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ item.testimonial }}</v-list-item-subtitle>
                <v-divider opacity="100" class="mb-0" />
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="9" class="d-flex flex-column">
            <div>
              <div class="d-flex align-center">
                <v-avatar
                  color="secondary"
                  class="mr-3"
                >
                  <span>{{ testimonials[selectedTestimonialId].initials }}</span>
                </v-avatar>
                <div class="d-flex flex-column">
                  <span><b>{{ testimonials[selectedTestimonialId].name }}</b></span>
                  <span class="text-subtitle-2">{{ testimonials[selectedTestimonialId].company }}</span>
                </div>
              </div>
              <v-divider opacity="100"/>
            </div>
            <div class="d-flex align-center flex-column flex-grow-1">
              <div style="height: 500px; overflow-y: auto;">
                <div class="d-flex justify-center">
                <v-card
                  width="80%"
                  color=""
                  variant="tonal"
                  class="pa-6 mt-6 d-flex align-center"
                >
                <v-card-text
                    class="d-flex align-center"
                    style=""
                  >
                    <v-avatar
                      :image="testimonials[selectedTestimonialId].profileImg"
                      size="200"
                      class="mr-6"
                    />
                    <div>
                      <div style="color: black">
                        <v-icon>mdi-format-quote-close</v-icon>
                        {{ testimonials[selectedTestimonialId].testimonial }}
                        <v-icon>mdi-format-quote-close</v-icon>
                      </div>
                      <div class="d-flex justify-end">
                        <a
                          :href="testimonials[selectedTestimonialId].url"
                          target="_blank"
                        >
                          <img
                            :src="testimonials[selectedTestimonialId].logo"
                            style="height: 50px"
                          />
                        </a>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
</template>

<style scoped>
.verticalDivider {
  height: 24px;
  border: 1px solid var(--vp-c-divider);
}
.rightBorder {
  border-right: 1px solid var(--vp-c-divider);
}
</style>
