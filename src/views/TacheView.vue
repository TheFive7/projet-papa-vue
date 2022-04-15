<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="$store.state.taches"
      :search="search"
      sort-by="nom"
      class="elevation-1"
    >

      <!-- NUMERO -->
      <template v-slot:[`item.numero`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.numero"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.numero }}
          <template v-slot:input>
            <v-text-field
              v-model="item.numero"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- OT -->
      <template v-slot:[`item.ordreTravail`]="{ item }">
        <v-checkbox v-model="item.ordreTravail" disabled></v-checkbox>
      </template>

      <!-- Avis -->
      <template v-slot:[`item.avis`]="{ item }">
        <v-checkbox v-model="item.avis" disabled></v-checkbox>
      </template>

      <!-- NOM -->
      <template v-slot:[`item.nom`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.nom"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.nom }}
          <template v-slot:input>
            <v-text-field
              v-model="item.nom"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- DESCRIPTION -->
      <template v-slot:[`item.description`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.description"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.description }}
          <template v-slot:input>
            <v-text-field
              v-model="item.description"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <!-- Ressources -->
      <template v-slot:[`item.ressources`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.ressources"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.ressources }}
          <template v-slot:input>
            <v-text-field
              v-model="item.ressources"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Taches</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>

          <!-- AJOUTER -->
          <v-dialog
            v-model="dialog"
            max-width="700px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                style="margin-left: 20px"
              >
                {{ formTitle }}
              </v-btn>
            </template>

            <v-card v-click-outside="refreshList">
              <v-card-title>
                <span class="text-h5">{{ formTitle }} une tache</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="currentItem.numero"
                        label="Numéro"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-checkbox
                        v-model="currentItem.ordreTravail"
                        label="OT"
                      ></v-checkbox>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-checkbox
                        v-model="currentItem.avis"
                        label="Avis"
                      ></v-checkbox>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="currentItem.nom"
                        label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="currentItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-autocomplete
                        :items="ressourceDisplay()"
                        color="white"
                        multiple
                        chips
                        deletable-chips
                        item-text="name"
                        label="Ressources"
                        v-model="choosenRessources"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="10"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menuDateDebut"
                        :close-on-content-click="false"
                        :return-value.sync="currentItem.dateDebut"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="currentItem.dateDebut"
                            label="Date de début"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="currentItem.dateDebut"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDateDebut = false"
                          >
                            Retour
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(currentItem.dateDebut)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="10"
                    >
                      <v-menu
                        ref="menu"
                        v-model="menuDateFin"
                        :close-on-content-click="false"
                        :return-value.sync="currentItem.dateFin"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="currentItem.dateFin"
                            label="Date de début"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="currentItem.dateFin"
                          no-title
                          scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="menuDateFin = false"
                          >
                            Retour
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(currentItem.dateFin)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Fermer
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Sauvegarder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snack"
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="snack = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import TacheDataService from '@/services/TacheDataService'
import RessourceDataService from '@/services/RessourceDataService'

export default {
  name: 'TacheView',
  data: () => {
    return {
      search: '',
      snack: false,
      snackColor: '',
      snackText: '',
      editedIndex: -1,
      ressources: [],
      choosenRessources: [],
      menuDateDebut: false,
      menuDateFin: false,
      dialog: false,
      headers: [
        { text: 'Numéro', align: 'start', value: 'numero' },
        { text: 'OT', value: 'ordreTravail' },
        { text: 'Avis', value: 'avis' },
        { text: 'Nom', value: 'nom' },
        { text: 'Description', value: 'description' },
        { text: 'Date de début', value: 'dateDebut' },
        { text: 'Date de fin', value: 'dateFin' },
        { text: 'Ressources', value: 'ressources' },
        { text: 'Actions', value: 'actions' }
      ],
      currentItem: {
        id: 0,
        numero: 0,
        ordreTravail: false,
        avis: false,
        nom: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        ressources: ''
      },
      defaultItem: {
        id: 0,
        numero: 0,
        ordreTravail: false,
        avis: false,
        nom: '',
        description: '',
        dateDebut: '',
        dateFin: '',
        ressources: ''
      }
    }
  },
  methods: {
    retrieveTache () {
      TacheDataService.getAll()
        .then((response) => {
          // console.log(response.data)
          this.$store.state.taches = response.data.map(this.getDisplayTache)
          this.$store.state.taches.forEach(e => {
            this.$store.state.dates.push(e.dateDebut)
            this.$store.state.dates.push(e.dateFin)
          })
        })
        .catch((e) => {
          console.log(e)
        })
    },

    retrieveRessource () {
      RessourceDataService.getAll()
        .then((response) => {
          // console.log(response.data)
          this.ressources = response.data.map(this.getDisplayRessource)
        })
        .catch((e) => {
          console.log(e)
        })
    },

    ressourceDisplay () {
      const tab = []
      this.ressources.forEach(e => {
        tab.push(e.nom)
      })
      return tab
    },

    getDisplayRessource (ressource) {
      return {
        id: ressource.id,
        nom: ressource.nom,
        prenom: ressource.prenom,
        description: ressource.description,
        assignation: ressource.assignation
      }
    },

    refreshList () {
      this.retrieveTache()
      this.retrieveRessource()
    },

    getDisplayTache (tache) {
      return {
        id: tache.id,
        numero: tache.numero,
        ordreTravail: tache.ordreTravail,
        avis: tache.avis,
        nom: tache.nom,
        description: tache.description,
        dateDebut: tache.dateDebut,
        dateFin: tache.dateFin,
        ressources: tache.ressources
      }
    },

    editItem (item) {
      this.currentItem = Object.assign({}, item)
      this.editedIndex = this.$store.state.taches.indexOf(item)
      this.dialog = true
      console.log(this.currentItem)
    },

    deleteItem (item) {
      this.currentItem = Object.assign({}, item)
      this.deleteTache()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem)
      })
      this.refreshList()
    },

    save () {
      if (this.editedIndex === -1) {
        this.saveTache()
      } else {
        this.updateTache()
      }
      this.close()
      this.currentItem = this.defaultItem
      this.editedIndex = -1
    },

    // CREATE
    saveTache () {
      const data = this.currentItem
      this.choosenRessources.forEach(e => {
        data.ressources += e + '\n'
      })
      data.numero = parseInt(this.currentItem.numero)
      data.dateDebut = this.$store.state.dates[0]
      data.dateFin = this.$store.state.dates[1]
      console.log(data)
      TacheDataService.create(data)
        .then((response) => {
          this.$store.state.taches.id = response.data.id
          this.submitted = true
          this.openSnack('green', 'Tache créée')
          this.choosenRessources = []
          this.dates = []
        })
        .catch((e) => {
          console.log(e)
          this.openSnack('red', 'Erreur')
        })
    },

    // UPDATE
    updateTache () {
      TacheDataService.update(this.currentItem.id, this.currentItem)
        .then((response) => {
          this.$store.state.taches.id = response.data.id
          this.openSnack('green', 'Tache mise à jour')
        })
        .catch((e) => {
          // console.log(e)
          this.openSnack('red', 'Erreur')
        })
    },

    // DELETE
    deleteTache () {
      TacheDataService.delete(this.currentItem.id)
        .then((response) => {
          console.log(response.data)
          this.openSnack('red', 'Tache supprimée')
        })
        .catch((e) => {
          // console.log(e)
          this.openSnack('red', 'Erreur')
        })
    },

    openSnack (color, text) {
      this.snack = true
      this.snackColor = color
      this.snackText = text
    },

    saveText (item) {
      this.snack = true
      this.snackColor = 'success'
      this.snackText = 'Sauvegardé'
      this.currentItem = item
      this.updateTache()
    },

    cancelText () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Erreur'
    },

    openText () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Ouvert'
    },

    closeText () {
      console.log('Dialog closed')
    }
  },
  mounted () {
    this.refreshList()
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Ajouter' : 'Modifier'
    }
  }
}
</script>

<style scoped>

</style>
