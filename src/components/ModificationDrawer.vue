<template>
    <v-navigation-drawer color="#f5f6fa" width="480px" right fixed temporary v-model="modificationShow">
        <div style="margin-top: 64px">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <h2>
                            {{dishName}}
                        </h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <template v-for="item in computedOption">
                            <v-sheet elevation="1" class="pa-2 my-2" :key="'mod2'+item.id">
                                <h4>{{`${item.name}${item.required==='1'?`:${item.select[0].text}`:``}`}}</h4>
                                <v-chip-group
                                        v-model="mod['mod'+item.id]"
                                        :mandatory="item.required==='1'" column
                                        :multiple="item.multiSelect==='1'"
                                        active-class="primary--text">
                                    <v-chip label x-large filter :key="'mod111'+index"
                                            v-for="(s,index) in item.select">
                                        {{s.text}}
                                    </v-chip>
                                </v-chip-group>
                            </v-sheet>
                        </template>
                    </v-col>
                </v-row>
                <v-spacer class="mx-4"/>
                <v-row>
                    <v-col cols="6">
                        <v-btn outlined block @click="cancel" color="error" text>取消</v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn block @click="submitModification" color="primary">确认</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'ModificationDrawer'
}
</script>

<style scoped>

</style>
