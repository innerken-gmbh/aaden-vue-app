<template>
    <keep-alive>
        <router-view/>
    </keep-alive>
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

    table {
        width: 100%;
        display: table;
        border-collapse: collapse;
        border-spacing: 0;
    }

    table.striped tr {
        border-bottom: none;
    }

    table.striped > tbody > tr:nth-child(odd) {
        background-color: rgba(242, 242, 242, 0.5);
    }

    table.striped > tbody > tr > td {
        border-radius: 0;
    }

    table.highlight > tbody > tr {
        -webkit-transition: background-color .25s ease;
        transition: background-color .25s ease;
    }

    table.highlight > tbody > tr:hover {
        background-color: rgba(242, 242, 242, 0.5);
    }

    table.centered thead tr th, table.centered tbody tr td {
        text-align: center;
    }

    tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    td, th {
        padding: 15px 5px;
        display: table-cell;
        text-align: left;
        vertical-align: middle;
        border-radius: 2px;
    }

    nav {
        position: fixed;
        width: 100%;
        height: 48px;
        background: white;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    body {
        font-family: Arial, Lantinghei SC, sans-serif, serif;
        user-select: none;
    }

    [v-cloak] {
        display: none;
    }

    .mainColor {
        color: #357aeb;
    }

    .shadowForInsPanel {
        -webkit-box-shadow: 0 10px 10px 0 rgba(138, 181, 253, 0.08);

        box-shadow: 0 10px 10px 0 rgba(138, 181, 253, 0.08);

    }

    .right-panel {
        z-index: 1000;
        right: 0;
        position: fixed;
        bottom: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 340px;
    }

    .spl {
        width: 19px;
        height: 1px;
        border-bottom: 0.4px solid #357aeb;
        margin-top: 13px;
        margin-left: 26px;
        box-shadow: 0 3px 6px 0 rgba(54, 122, 235, 0.4);
    }

    #instruction {
        margin: 0;
        height: 39px;
        font-size: 24px;
        padding: 4px 12px;
        color: #357aeb;
        width: 100%;
    }

    .inputArea {
        width: 100%;
        padding-right: 36px;
    }

    .mainColor-text {
        color: #367aeb !important;
    }

    body {
        background: #f5f6fa;
        box-shadow: none;
    }

    .shadow-1 {
        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12),
        0 1px 5px 0 rgba(0, 0, 0, 0.2);

    }

    .timeFont {
        color: #357aeb;
        font-size: 14px;
        font-weight: 600;
    }

    .appName {
        font-weight: 600;
    }

    body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        overflow: hidden;
        color: #4b4b4b;

    }

    .tableDisplay {

    }

    .footer-copyright {
        padding: 10px;
    }

    .page-footer {
        padding: 4px;
    }

    .timeDisplay {

    }

    .kellerDisplay {

        padding: 0 10px;
    }

    .ik-btn:focus {
        background: red;
    }

    .ik-200 {
        margin-right: 10px;
    }

    .flex-Container {
        display: flex;
        justify-content: center;
    }

    .floatMenuPanel {
        display: flex;
        flex-wrap: wrap;
    }

    .indexTab {
        cursor: pointer;
    }

    .floatMenuPanelItem {
        cursor: pointer;
    }

    nav {
        position: fixed;
        top: 0;
        z-index: 1001;
    }

    .floatMenuPanelItem {
        background: white;
        text-align: center;
        font-weight: 600;
        font-size: 12px;
        padding: 8px 0;
        width: calc(33% - 6px);
        margin-right: 6px;
        margin-top: 6px;

    }

    .floatMenuPanelItem.focus {
        border-radius: 12px;
        background: #367aeb;
        color: white;
        box-shadow: 0 3px 4px 0 rgba(0, 86, 255, 0.15);
    }

    .floatMenuPanelItem:hover {
        border-radius: 12px;
        background: #367aeb;
        color: white;
        box-shadow: 0 3px 4px 0 rgba(0, 86, 255, 0.15);
    }

    .floatMenuPanelItem:hover .innerItem {
        color: white;
    }

    .innerItem {
        background: center / contain no-repeat;
        width: 100px;
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

    .splitter-no-margin {
        width: 1px;
        height: 14px;
        border: 1px solid cadetblue;
    }

    .splitter {
        margin-left: 8px;
        margin-right: 8px;
        margin-top: 17px;
        width: 1px;
        height: 14px;
        border: 1px solid cadetblue;
    }

    main {
        flex: 1 0 auto;
        margin-top: 48px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    nav {
        height: 48px;
    }

    .avesNav {
        padding: 0 12px;
        color: #4b4b4b;
        line-height: 48px;
    }

    .indexTabs {
        height: 36px;
    }

    .indexTab {
        font-size: 16px;
        color: #4b4b4b;
        font-weight: 600;
        margin: 0 12px;
        padding-bottom: 4px;
    }

    .indexTab.active {
        border-bottom: 1px solid #367aeb;
    }

    .infoPanel {
        width: 100%;
        min-width: 340px;
        border-radius: 0 0 0 80px;
    }

    .insPanel {
        width: 100%;

        padding: 12px;
        padding-bottom: 18px;
    }

    .hintPanel {
        padding-bottom: 24px;
    }

    .infoContainer {
        margin: 12px;
        border-radius: 5px;
    }

    .infoRow {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;

    }

    .infoLabel {
        font-size: 18px;
    }

    .infoContext {
        font-size: 24px;
        font-weight: 600;
    }

    .important {
        font-weight: 600;
    }

    .hintRow {
        margin-top: 10px;
        font-size: 12px;
        opacity: 0.5;
    }

    .input-field {
        margin: 0;
    }

    .noBorder {
        border: none;
    }

    .rightLittlePopContainer {
        z-index: 8;
        right: 449px;
        width: 625px;
        min-height: 351px;
        max-height: 600px;
        position: fixed;
        top: 546px;
        padding: 40px 60px;
        padding-right: 0;
        border-radius: 14px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
    }

    .leftLittlePopContainer {

        width: 493.5px;
        height: 747px;
        border-radius: 5px;
        box-shadow: 10px 10px 10px 0 rgba(138, 181, 253, 0.08);
        z-index: 8;
        left: 174px;
        position: fixed;
        top: 190px;

        padding-right: 0;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);

    }

    .popTitle {
        color: #367aeb;
        font-size: 18px;
        font-weight: 600;
        padding: 7px 4px;
        width: fit-content;
        border-bottom: 0.5px solid rgba(54, 122, 235, 0.3);
    }

    .popContent {
        margin-top: 36px;
        width: 100%;
        padding: 0px 4px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 7;
        background: #A4A6AF;
        opacity: 0.49;

    }

    .confirmContainer {
        cursor: pointer;
        margin-top: 51px;
        width: 95px;
        padding: 8px 32px;
        height: 36px;
        background: rgba(255, 255, 255, 1);
        border: none;
        box-shadow: 0px 3px 6px rgba(0, 86, 255, 0.08);
        opacity: 1;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        line-height: 19px;
        color: rgba(54, 122, 235, 0.8);
    }

    .confirmContainer:focus {
        background: #367aeb;
        color: white;
    }

    .passwordInput {

        width: 225px !important;
        height: 40px !important;
        border: 1px solid rgba(54, 122, 235, 1) !important;
        opacity: 1;
        border-radius: 23px !important;
        padding-left: 16px !important;
        box-shadow: none !important;
    }

    .rightLittlePopContainer.sizeOfPassword {
        width: 473px;
        height: 234px;
    }

    .rightLittlePopContainer.takeAway {
        bottom: 0 !important;
        min-height: 200px;
        height: fit-content;
        top: auto;
        right: auto;
        left: 100px;

    }

    .newInput {
        border-bottom: 1px dashed #367aeb !important;
        box-shadow: none !important;

    }

    .reservationRow {
        height: 110px;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f5f6fa;

    }

    .surface {
        box-shadow: 0px 4px 10px 0 #d0d2d9;
        background-color: #ffffff;
        border-radius: 5px;
    }

    .reservationRowContainer {
        margin-top: 24px;
        overflow-y: scroll;
        height: 440px;
    }

    .lastNameContainer {
        height: 64px;
        max-width: 148px;
        width: 148px;

    }

    .firstLetterOfLastName {
        margin-top: 12px;
        margin-left: 65px;
        font-size: 30px;
        font-weight: 900;
        line-height: 1.4;
    }

    .restOfTheLastName {
        font-weight: 600;
        margin-left: 65px;
        margin-top: -6px;
        font-size: 10px;
    }

    .reservationInfoRowContainer {
        margin-top: 10px;
    }

    .reservationInfoRow {
        font-weight: 600;
        display: flex;
        justify-content: left;
        font-size: 13px;
        padding: 0px;

        line-height: 16px;

    }

    .reservationInfoIcon .material-icons {
        font-size: 16px;
        line-height: 14px;
    }

    .reservationInfoContext {
        margin-left: 24.5px;
        font-weight: 100;
    }

    .todayReservationLabel {
        margin-top: 34px;
        margin-left: 40px;
    }

    .languageSwitch {
        display: flex;
        justify-content: space-between;
        min-width: 60px;
        font-weight: 600;

    }

    .languageSwitch div {
        cursor: pointer;
        margin-left: 4px;

    }

    .languageSwitch .active {
        color: #367aeb;
    }

    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .littleIcon {
        font-size: 18px !important;
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
        border-radius: 5px;
        cursor: pointer;
    }

    .collapse .tableCard.notUsed {
        background: white;
        font-weight: 400;
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

    .dishCard {
        margin-top: 8px;
        background: white;
        border-radius: 5px;
        box-shadow: 0px 3px 4px 0 rgba(220, 224, 239, 0.59);
    }

    .dishInfo {
        width: 100%;
        font-size: 18px;
    }

    .basicInfo {
        padding: 8px 30px;
        width: 100%;
        justify-content: space-between;
    }

    .codeRow {
        font-weight: 900;
        width: 48px;
    }

    .dishMod {
        margin-left: 48px;
        padding: 8px 30px;
    }

</style>
