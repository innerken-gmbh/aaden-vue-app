<template>
  <div>
    <v-navigation-drawer disable-resize-watcher dark color="orange darken-2"
                         expand-on-hover permanent stateless mini-variant style="z-index: 100" app>
      <v-card color="transparent" elevation="0" class="d-flex flex-column">
        <v-list nav dense>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-menu</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-silverware</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('点餐') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('销售额') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home-analytics</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('CHEF') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-smart-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('VIP') }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-spacer>

        </v-spacer>
      </v-card>

    </v-navigation-drawer>
    <v-main app>
      <router-view></router-view>
      <!--        下面是侧边栏的逻辑-->
    </v-main>
  </div>
</template>

<style scoped>
.tableDisplay {
  height: calc(100vh - 48px);
  overflow: scroll;
}

.tableDisplay::-webkit-scrollbar {
  width: 0 !important
}

.areaTableContainer {
  max-height: calc(100vh - 112px);
  margin-top: 18px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin-bottom: 12px;

}

.areaTitle {
  font-size: 16px;
  font-weight: 600;
}

.select-wrapper > ul {
  z-index: 0;
  top: -48px;
  width: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 86, 255, 0.08);
  opacity: 1;
  border-radius: 0px 0px 5px 5px;
}

.select-wrapper > ul > li {
  border-bottom: 0.3px solid rgba(112, 112, 112, 0.38);;
}

.select-dropdown.dropdown-content li.selected {
  background: rgba(255, 255, 255, 1);
}

.dropdown-content li > a, .dropdown-content li > span {
  padding: 13px 16px;
  color: #4b4b4b;
  font-weight: 200;
  font-size: inherit;
  line-height: inherit;
}

.dropdown-content li {
  height: 45px;
  min-height: unset;
}

.areaC {
  margin-left: 12px;
  display: flex;
  width: max-content;
}

.area {
  max-height: calc(100vh - 72px);
  margin-right: 14px;
}

.alert {
  background: red;
}
</style>
