<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div
    :style="$vuetify.breakpoint.mobile && active ? 'background: #1e1e1e;' : ''"
    :class="$vuetify.breakpoint.mobile ? 'flex-nowrap justify-left navMobile-item' : 'flex-column justify-center px-2 navigation-item'"
    class="d-flex align-center py-2"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <v-card
      class="d-flex align-center flex-column justify-center"
      width="56"
      height="32"
      elevation="0"
      color="transparent"
      style="border-radius: 18px !important;"
    >
      <v-icon
        v-if="locked"
        size="26"
        color="#1e1e1e"
      >
        mdi-lock
      </v-icon>
      <v-icon
        v-else
        :class="$vuetify.breakpoint.mobile && !locked ? 'showOnHover' : ''"
        :color="active ?'#f1f1f1 !important':'#1e1e1e'"
        :style="active && !$vuetify.breakpoint.mobile?'text-shadow: 0 0 2px #fff':''"
        size="26"
      >
        {{ icon }}
      </v-icon>
      <v-icon
        v-if="$vuetify.breakpoint.mobile && !locked"
        :class="$vuetify.breakpoint.mobile && !locked ? 'hideOnHover' : ''"
        :color="active ?'#f1f1f1 !important':'#1e1e1e'"
        :style="active && !$vuetify.breakpoint.mobile?'text-shadow: 0 0 2px #fff':''"
        size="26"
      >
        {{ !$vuetify.breakpoint.mobile ? icon : iconFx }}
      </v-icon>
      <v-chip
        v-if="!$vuetify.breakpoint.mobile"
        :color="active ? '#001d35 !important' : 'transparent'"
        :class="active ? 'd-block absoluteBtn hoverFx hoverAni' : 'd-none'"
      />
      <v-chip
        v-if="!$vuetify.breakpoint.mobile"
        :color="active ? '#3E3E3EFF !important' : 'transparent'"
        :class="!active?'d-block':'d-none'"
        class="absoluteBtn hoverFx hoverAni"
      />
    </v-card>

    <v-card
      elevation="0"
      color="transparent"
      :class="locked?'text--secondary':''"
      class="text-caption text-no-wrap"
    >
      <div
        :style="$vuetify.breakpoint.mobile && active ? 'color: #f1f1f1;' : ''"
        style="font-size: 12px; color: #001d35;"
        :class="active ? 'font-weight-regular' : ''"
        class="mt-1 text-truncate font-weight-light"
      >
        {{ $t(title) }}
      </div>
    </v-card>
    <v-icon
      v-if="level === 1 && !locked"
      class="ml-auto mr-4"
      size="24"
      :color="active ? '#f1f1f1' : '#001d35'"
    >
      mdi-arrow-right
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'NavigationItem',
  props: {
    icon: {},
    title: {},
    locked: {},
    active: {},
    iconFx: {},
    level: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

.absoluteBtn {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.showOnHover{
  display: none;
}

.navMobile-item:hover .showOnHover{
  display: block;
  transition: 0s linear;
}

.navMobile-item:hover .hideOnHover {
  display: none;
}

.activeItem{
  color: #f1f1f1 !important;
  background: #3E3E3EFF;
  text-shadow: 0 0 1px #fff;
}

.hoverFx{
  z-index: -1;
  transition: .05s ease-in-out;
}
.hoverAni {
  animation: hoverFx .20s ease-out !important;
}
.navigation-item:hover .hoverAni{
  background: #1111 !important;
}
.navigation-item .text-truncate {
  transition: .1s ease-in-out;
}
.navigation-item:hover .text-truncate {
  text-shadow: 0 0 0px #001d35
}

.navigation-item i {
  color: #1E1E1E;
  transform: scale(.9);
}
.navigation-item:hover i {
  transform: scale(1);
  color: #001d35 !important;
  text-shadow: 0 0 1px #001d35
}

.navMobile-item{
  border-radius: 9999px !important;
}

.navMobile-item:hover {
  background: #1111;
}

@keyframes hoverFx {
  0% {
    transform: scaleX(0);
  }
  100%{
  transform: scaleX(1);
}
}

</style>
