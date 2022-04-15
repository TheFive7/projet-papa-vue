import http from './http-common'

class RessourceDataService {
  getAll () {
    return http.get('/ressource')
  }

  create (data) {
    return http.post('/ressource', data)
  }

  delete (id) {
    return http.delete(`/ressource/${id}`)
  }

  get (id) {
    return http.get(`/ressource/${id}`)
  }

  update (id, data) {
    return http.put(`/ressource/${id}`, data)
  }
}

export default new RessourceDataService()
