<template>
    <transition name="slide">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </transition>
</template>

<script>
import { tryToReport } from './oldjs/common'

export default {
  name: 'App',
  props: {},
  data: () => ({}),
  mounted () {
    tryToReport()
  }
}
</script>

<style>

    .theme--light.v-application {
        background: transparent;
        color: rgba(0, 0, 0, .87);
    }

    body {
        font-family: Arial, Lantinghei SC, sans-serif, serif;
        user-select: none;
    }

    [v-cloak] {
        display: none;
    }

    nav {
        position: fixed;
        top: 0;
        z-index: 1001;
    }

    .floatMenuPanel {
        padding: 12px;
        grid-gap: 4px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .floatMenuPanelItem {
        background: white;
        text-align: center;
        font-weight: 600;
        font-size: 12px;
        padding: 8px 0;
    }

    .floatMenuPanelItem.focus {
        border-radius: 12px;
        background: #367aeb;
        color: white;
        box-shadow: 0 3px 4px 0 rgba(0, 86, 255, 0.15);
    }

    .floatMenuPanelItem:active {
        border-radius: 12px;
        background: #367aeb;
        color: white;
        box-shadow: 0 3px 4px 0 rgba(0, 86, 255, 0.15);
    }

    .floatMenuPanelItem:active .innerItem {
        color: white;
    }

    .innerItem {
        background: center / contain no-repeat;
        color: #367aeb;
        height: 60px;
        font-size: 18px;
    }

    .innerItem .material-icons {
        font-size: 28px;
    }

    .innerItem .icon {
        height: 28px;
    }

    .innerItem .text {
        margin-top: 4px;
    }

    .languageSwitch div {
        cursor: pointer;
        margin-left: 4px;

    }

    .languageSwitch .active {
        color: #367aeb;
    }

    .collapse .areaTableContainer {
        display: flex;
        flex-wrap: wrap;
    }

    .collapse .tableCard {
        margin-right: 4px;
        margin-top: 4px;
        width: 48px;
        font-weight: bold;
        height: 48px;
        display: flex;
        justify-items: center;
        align-items: center;
        background: transparent;
        color: #367aeb;
        cursor: pointer;
    }

    .collapse .tableCard.notUsed {
        background: white;
        font-weight: 400;
        border-radius: 5px;
        box-shadow: 0 3px 6px #d0d2d9;
        color: black;
    }

    .collapse .tableCardName {
        width: 100%;
        text-align: center;
    }

    .collapse .areaTitle {
        margin-top: 8px;
        font-size: 16px;
        font-weight: 600;
    }

    .noFullScreen{
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        margin: 0;
        max-height: unset !important;
        max-width: 100vw;
        width: fit-content;
    }
</style>
