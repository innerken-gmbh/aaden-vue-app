<template>
  <div
      class="d-flex align-center flex-column"
      @click="$emit('click')"
  >
    <div class="position-relative">
      <v-badge
          :content="badgeCount"
          :value="badgeCount > 0"
          color="red"
          offset-x="16"
          offset-y="12"
          bordered
          dot-size="8"
          overlap
      >
        <v-card
            :color="color"
            elevation="0"
            :class="isActive?'pa-2':'pa-1'"
            style="border-radius: 12px !important;"
        >
          <v-responsive :aspect-ratio="1">
            <div
                class="d-flex flex-column justify-center align-center"
                style="height: 100%;width: 100%"
            >
              <div
                  class="px-1"
                  v-if="loading"
              >
                <v-progress-circular
                    size="16"
                    indeterminate

                ></v-progress-circular>
              </div>

              <div v-else-if="(''+icon).startsWith('mdi-')">
                <v-icon
                    color="white"
                    :size="isActive?'':'28'"
                >{{ icon }}
                </v-icon>
              </div>
              <div
                  v-else
                  class="text-caption font-weight-black text-no-wrap text-center"
                  style="width: 28px"
              >
                {{ icon }}
              </div>
            </div>
          </v-responsive>
        </v-card>
      </v-badge>
    </div>

    <div
        class="d-block overflow-hidden"
        style="max-width: 56px"
    >
      <div
          style="font-size: 0.65rem !important;"
          class="mt-1 text-truncate text-caption
               font-weight-black white--text text-capitalize"
      >
        {{ $t(text) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    isActive: {},
    color: {},
    icon: {},
    text: {},
    loading: {},
    badgeCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
