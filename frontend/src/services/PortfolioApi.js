// this file contains api calls for Job Record Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Job Record
export const portfolioApi = {
  getPortfolioByID (portfolioId) {
    return service.get(`${API.portfolio('')}${portfolioId}`)
  },
  getAllPortfoliosForUser () {
    return service.get(`${API.portfolio('')}`)
  },
  getAllPortfolios () {
    return service.get(`${API.portfolio('all-portfolios')}`)
  },
  createPortfolio (data) {
    return service.post(`${API.portfolio('')}`, data)
  },
  deletePortfolio(portfolioId) {
    return service.delete(`${API.portfolio('')}${portfolioId}`)
  }
}
