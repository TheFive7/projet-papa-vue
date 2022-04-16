<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Aujourd'hui
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semaine</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mois</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @change="updateRange"
        ></v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mois',
      week: 'Semaine'
    },
    events: [],
    colors: [
      'red', 'red lighten-1', 'red darken-4', 'red accent-4',
      // 'deep-purple', 'deep-purple lighten-1', 'deep-purple darken-4', 'deep-purple accent-4',
      // 'indigo', 'indigo lighten-1', 'indigo darken-4', 'indigo accent-4',
      'blue', 'blue lighten-1', 'blue darken-4', 'blue accent-4',
      'light-blue', 'light-blue lighten-1', 'light-blue darken-4', 'light-blue accent-4',
      'cyan', 'cyan lighten-1', 'cyan darken-4', 'cyan accent-4',
      'teal', 'teal lighten-1', 'teal darken-4', 'teal accent-4',
      'green', 'green lighten-1', 'green darken-4', 'green accent-4',
      'light-green', 'light-green lighten-1', 'light-green darken-4', 'light-green accent-4',
      // 'lime', 'lime lighten-1', 'lime darken-4', 'lime accent-4',
      // 'yellow', 'yellow lighten-1', 'yellow darken-4', 'yellow accent-4',
      // 'amber', 'amber lighten-1', 'amber darken-4', 'amber accent-4',
      'orange', 'orange lighten-1', 'orange darken-4', 'orange accent-4'
    ]
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateRange () {
      const events = []

      this.$store.state.taches.forEach(tache => {
        const allDay = this.rnd(0, 3) === 0
        const first = tache.dateDebut
        const second = tache.dateFin

        events.push({
          name: tache.numero + ' : ' + tache.ressources,
          start: first,
          end: second,
          color: this.colors[tache.id % 30],
          timed: !allDay
        })
      })

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>

<style scoped>

</style>
