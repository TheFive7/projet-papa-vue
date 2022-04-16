<template>
  <v-app>
    <v-main>
      <div>
        <v-card
          class="mx-auto overflow-hidden"
        >
          <v-app-bar
            color='green'
            dark
          >
            <v-toolbar-title>Projet Papa</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click.stop="drawer = !drawer">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
              <v-tabs
                align-with-title
              >
                <v-tab v-for="(t,index) in $store.state.titles" :key="index" :style="{margin : '20px'}" @click="$router.push({path:t.path})">
                  {{ t.text }}
                </v-tab>
                <v-tabs-slider color="blue"></v-tabs-slider>
              </v-tabs>
            </template>
          </v-app-bar>
        </v-card>
      </div>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => {
    return {
      drawer: false,
      group: null
    }
  }
}
</script>
