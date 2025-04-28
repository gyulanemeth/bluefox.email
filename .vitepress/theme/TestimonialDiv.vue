<script setup>
import { ref, defineProps } from 'vue'

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

const selectedTestimonialId = ref(0)
const testimonials = [
  {
    id: 0,
    name: 'Garth Brennan',
    initials: 'GB',
    company: 'POS Solutions Australia',
    testimonial: 'We have recently started using Bluefox. The combination of the Bluefox design tools and the reliability of AWS is very impressive. The emails we create appear in our clients\' inboxes exactly how we have designed them. This is a big step forward for us, after having issues with other email platforms, where the design was definitely not uniform across all email clients.',
    profileImg: '/assets/testimonials/garth-brennan.jpg',
    logo: '/assets/testimonials/possolutions-logo.png',
    logoAlt: 'POS Solutions Logo',
    url: 'https://possolutions.com.au'
  },
  {
    id: 1,
    name: 'Matt Luo',
    initials: 'ML',
    company: 'Founder of ClarityText.com',
    testimonial: `ClarityText chose Bluefox because it guides us toward success. Unlike with other vendors and libraries, it's Bluefox's responsibility to make sure that our emails fit in every client and device. This is a big relief for a startup. Also, Bluefox's pricing is easy to understand, unlike a typical and complicated contacts-based pricing.`,
    profileImg: '/assets/testimonials/matt-luo.jpg',
    logo: '/assets/testimonials/clarity-text.svg',
    logoAlt: 'ClarityText Logo',
    url: 'https://www.claritytext.com'
  },
  {
    id: 2,
    name: 'Gabriel Varaljay',
    initials: 'GV',
    company: 'Founder of TrendFingers.com',
    testimonial: `I’ve been using Blue Fox to send out my newsletters, and I couldn’t be happier. The system integrates seamlessly with my own AWS SES, giving me full control and transparency without the hefty price tag of overpriced black-box solutions like Mailchimp. Plus, I’ve noticed a significantly lower bounce rate compared to my previous provider—it’s an excellent choice for anyone seeking reliability and efficiency.`,
    profileImg: '/assets/testimonials/gabriel-varaljay.jpg',
    logo: '/assets/testimonials/trendfingers.png',
    logoAlt: 'TrendFingers Logo',
    url: 'https://trendfingers.com'
  },
  {
    id: 3,
    name: 'Gergely Csaba Nagy',
    initials: 'GN',
    company: 'Head of Marketing @chamaileon.io',
    testimonial: `When I saw the delivery stats from my first campaign sent with BlueFox, I had to double-check the click rate—I could hardly believe it! It appears that every email landed in the primary inbox, and the deliverability and tracking are simply outstanding. BlueFox has set a new standard for me.`,
    profileImg: '/assets/testimonials/gergely-nagy.png',
    logo: '/assets/testimonials/chamaileon.svg',
    logoAlt: 'Chamaileon Logo',
    url: 'https://chamaileon.io/'
  }
]

const mobileEmailView = ref(true)

function selectTestimonialEmail (id) {
  selectedTestimonialId.value = id
  mobileEmailView.value = true
}
</script>

<template>
    <v-card
      v-if="lgAndUp || md"
      elevation="6"
      :theme="isDark ? 'dark' : 'light'"
    >
      <div class="pa-2">
        <v-icon color="red" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="orange" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="green" size="medium">mdi-circle</v-icon>
      </div>
      <v-divider opacity="100" class="my-0" />
      <div>
        <v-row class="pa-3">
          <v-col cols="3" class="rightBorder" />
          <v-col :cols="lgAndUp ? 7 : 9" class="d-flex justify-space-between">  
            <v-icon disabled class="mx-3">mdi-email-outline</v-icon>
            <v-icon disabled class="mr-6">mdi-square-edit-outline</v-icon>

            <div class="d-flex justify-space-between">
              <v-icon disabled class="mr-3">mdi-archive-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3 mr-3">mdi-trash-can-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3">mdi-package-variant-remove</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon disabled class="mr-3">mdi-reply</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3 mr-3">mdi-reply-all</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3">mdi-share</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon disabled class="mr-1" color="red">mdi-flag</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-1">mdi-chevron-down</v-icon>
            </div>

            <v-icon disabled>mdi-bell-off-outline</v-icon>

            <div class="d-flex justify-space-between">
              <v-icon disabled>mdi-folder-outline</v-icon>
              <v-icon disabled>mdi-chevron-down</v-icon>
            </div>

            <v-icon v-if="md">mdi-magnify</v-icon>
          </v-col>
          <v-col v-if="lgAndUp" cols="2">
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
          <v-col cols="3" class="rightBorder" style="max-height: 600px; overflow-y: auto">
            <v-list lines="two" color="secondary">
              <v-list-item
                v-for="item in testimonials"
                :key="item.id"
                :value="item.id"
                :active="item.id === selectedTestimonialId"
                @click="selectTestimonialEmail(item.id)"
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
                      <div>
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
                            :alt="testimonials[selectedTestimonialId].logoAlt"
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
    <v-card
      v-else-if="sm"
      :theme="isDark ? 'dark' : 'light'"
      elevation="6"
    >
      <div class="pa-2">
        <v-icon color="red" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="orange" size="medium" class="mr-1">mdi-circle</v-icon>
        <v-icon color="green" size="medium">mdi-circle</v-icon>
      </div>
      <v-divider opacity="100" class="my-0" />
      <div>
        <v-row class="pa-3">
          <v-col cols="3" class="rightBorder" />
          <v-col cols="9" class="d-flex justify-space-between">  
            <div class="d-flex justify-space-between">
              <v-icon disabled class="mx-3">mdi-email-outline</v-icon>
              <v-icon disabled class="mr-6">mdi-square-edit-outline</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon disabled class="mr-3">mdi-archive-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3 mr-3">mdi-trash-can-outline</v-icon>
              <v-divider vertical class="verticalDivider my-0 border-opacity-50"/>
              <v-icon disabled class="ml-3">mdi-package-variant-remove</v-icon>
            </div>

            <div class="d-flex justify-space-between">
              <v-icon disabled>mdi-chevron-double-right</v-icon>
              <v-icon disabled>mdi-magnify</v-icon>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider opacity="100" class="my-0" />
      <div>
        <v-row class="pa-3">
          <v-col cols="3" class="rightBorder" style="max-height: 600px; overflow-y: auto">
            <v-list lines="two" color="secondary">
              <v-list-item
                v-for="item in testimonials"
                :key="item.id"
                :value="item.id"
                :active="item.id === selectedTestimonialId"
                @click="selectTestimonialEmail(item.id)"
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
            <div class="d-flex align-center flex-grow-1">
              <div style="height: 500px; overflow-y: auto;">
                <div class="d-flex justify-center">
                  <v-card
                    width="80%"
                    color=""
                    variant="tonal"
                    class="pa-6 mt-6 d-flex align-center"
                  >
                  <v-card-text
                      class="d-flex align-center flex-column"
                      style=""
                    >
                      <v-avatar
                        :image="testimonials[selectedTestimonialId].profileImg"
                        size="200"
                        class="mr-6 mb-4"
                      />
                      <div>
                        <div>
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
                              :alt="testimonials[selectedTestimonialId].logoAlt"
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
    <div v-else-if="xs && mobileEmailView">
      <v-card
        :theme="isDark ? 'dark' : 'light'"
        elevation="6"
      >
        <div class="pa-2 d-flex">
          <v-btn
            title="Back to Testimonials"
            icon
            variant="text"
            density="compact"
            @click="mobileEmailView = false"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn
            title="Previous Testimonial"
            icon
            variant="text"
            density="compact"
            :disabled="selectedTestimonialId === 0"
            @click="selectedTestimonialId--"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
          <v-btn
            title="Next Testimonial"
            icon
            variant="text"
            density="compact"
            :disabled="selectedTestimonialId === testimonials.length - 1"
            @click="selectedTestimonialId++"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <v-divider opacity="100" class="my-0" />
        <div>
          <v-row class="pa-3">
            <v-col cols="12" class="d-flex justify-space-between">  
              <v-icon disabled class="mr-3">mdi-archive-outline</v-icon>
              <v-icon disabled class="mr-3">mdi-folder-outline</v-icon>
              <v-icon disabled class="mr-3">mdi-reply</v-icon>
              <v-icon disabled class="mr-3">mdi-square-edit-outline</v-icon>
            </v-col>
          </v-row>
        </div>
        <v-divider opacity="100" class="my-0" />
        <div>
          <v-row class="pa-3">
            <v-col cols="12" class="d-flex flex-column">
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
              <div class="d-flex align-center flex-grow-1">
                <div style="height: 500px; overflow-y: auto;">
                  <div class="d-flex justify-center">
                    <v-card
                      color=""
                      variant="tonal"
                      class="mt-6 d-flex align-center"
                    >
                    <v-card-text
                        class="d-flex align-center flex-column"
                        style=""
                      >
                        <v-avatar
                          :image="testimonials[selectedTestimonialId].profileImg"
                          size="200"
                          class="mr-6 mb-4"
                        />
                        <div>
                          <div>
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
                                :alt="testimonials[selectedTestimonialId].logoAlt"
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
    
      <div class="d-flex pa-3 justify-center">
        <v-btn
          title="Previous Testimonial"
          icon
          variant="tonal"
          size="x-large"
          :disabled="selectedTestimonialId === 0"
          @click="selectedTestimonialId--"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn
          title="Next Testimonial"
          icon
          variant="tonal"
          size="x-large"
          :disabled="selectedTestimonialId === testimonials.length - 1"
          @click="selectedTestimonialId++"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-else-if="xs">
      <v-card
        :theme="isDark ? 'dark' : 'light'"
        elevation="6"
      >
        <div class="pa-2 d-flex">
          <v-icon disabled>mdi-chevron-left</v-icon>
          <v-spacer />
          <v-icon disabled>mdi-square-edit-outline</v-icon>
        </div>
        <v-divider opacity="100" class="my-0" />
        <div>
          <v-row class="pa-3">
            <v-col cols="12" class="d-flex justify-space-between">  
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                label="Search"
                variant="plain"
                density="compact"
                hide-details
                disabled
              />
            </v-col>
          </v-row>
        </div>
        <v-divider opacity="100" class="my-0" />
        <div>
          <v-row class="pa-3">
            <v-col cols="12" class="d-flex flex-column" style="height: 600px; overflow-y: auto">
              <v-list lines="two" color="secondary">
                <v-list-item
                  v-for="item in testimonials"
                  :key="item.id"
                  :value="item.id"
                  :active="item.id === selectedTestimonialId"
                  @click="selectTestimonialEmail(item.id)"
                >
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle class="mb-1 opacity-80">{{ item.company }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ item.testimonial }}</v-list-item-subtitle>
                  <v-divider opacity="100" class="mb-0" />
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
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
