import http from './http-common'

class TacheDataService {
  getAll () {
    return http.get('/tache')
  }

  create (data) {
    console.log(data)
    return http.post('/tache', data)
  }

  delete (id) {
    return http.delete(`/tache/${id}`)
  }

  get (id) {
    return http.get(`/tache/${id}`)
  }

  update (id, data) {
    return http.put(`/tache/${id}`, data)
  }
}

export default new TacheDataService()
