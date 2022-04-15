<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="ressources"
      :search="search"
      sort-by="nom"
      class="elevation-1"
    >

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

      <!-- PRENOM -->
      <template v-slot:[`item.prenom`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.prenom"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.prenom }}
          <template v-slot:input>
            <v-text-field
              v-model="item.prenom"
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

      <!-- ASSIGNATION -->
      <template v-slot:[`item.assignation`]="{ item }">
        <v-edit-dialog
          :return-value.sync="item.assignation"
          @save="saveText(item)"
          @cancel="cancelText"
          @open="openText"
          @close="closeText"
        >
          {{ item.assignation }}
          <template v-slot:input>
            <v-text-field
              v-model="item.assignation"
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
          <v-toolbar-title>Ressources</v-toolbar-title>
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
            max-width="500px"
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
                <span class="text-h5">{{ formTitle }} une ressource</span>
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
                        v-model="currentItem.prenom"
                        label="Prénom"
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
                      md="4"
                    >
                      <v-text-field
                        v-model="currentItem.assignation"
                        label="Assignation"
                      ></v-text-field>
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

import RessourceDataService from '@/services/RessourceDataService'

export default {
  name: 'RessourceView',
  data: () => {
    return {
      search: '',
      snack: false,
      snackColor: '',
      snackText: '',
      editedIndex: -1,
      ressources: [],
      dialog: false,
      headers: [
        { text: 'Nom', align: 'start', value: 'nom' },
        { text: 'Prénom', value: 'prenom' },
        { text: 'Description', value: 'description' },
        { text: 'Assignation', value: 'assignation' },
        { text: 'Actions', value: 'actions' }
      ],
      currentItem: {
        id: 0,
        nom: '',
        prenom: '',
        description: '',
        assignation: ''
      },
      defaultItem: {
        id: 0,
        nom: '',
        prenom: '',
        description: '',
        assignation: ''
      }
    }
  },
  methods: {
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

    refreshList () {
      this.retrieveRessource()
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

    editItem (item) {
      this.currentItem = Object.assign({}, item)
      this.editedIndex = this.ressources.indexOf(item)
      this.dialog = true
      console.log(this.currentItem)
    },

    deleteItem (item) {
      this.currentItem = Object.assign({}, item)
      this.deleteRessource()
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
        this.saveRessource()
      } else {
        this.updateRessource()
      }
      this.close()
      this.currentItem = this.defaultItem
      this.editedIndex = -1
    },

    // CREATE
    saveRessource () {
      const data = this.currentItem
      RessourceDataService.create(data)
        .then((response) => {
          this.ressources.id = response.data.id
          this.submitted = true
          this.openSnack('green', 'Ressource créée')
        })
        .catch((e) => {
          // console.log(e)
          this.openSnack('red', 'Erreur')
        })
    },

    // UPDATE
    updateRessource () {
      RessourceDataService.update(this.currentItem.id, this.currentItem)
        .then((response) => {
          this.ressources.id = response.data.id
          this.openSnack('green', 'Ressource mise à jour')
        })
        .catch((e) => {
          // console.log(e)
          this.openSnack('red', 'Erreur')
        })
    },

    // DELETE
    deleteRessource () {
      RessourceDataService.delete(this.currentItem.id)
        .then((response) => {
          console.log(response.data)
          this.openSnack('red', 'Ressource supprimée')
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
      this.updateRessource()
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
