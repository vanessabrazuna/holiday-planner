import axios from 'axios'

const API_URL = 'http://localhost:3000/vacations'

export const getAllVacations = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createVacation = async (vacation: {
  id: number
  title: string
  description: string
  date: Date
  location: string
  participants: number
}) => {
  const response = await axios.post(API_URL, vacation)
  return response.data
}

// export const updateVacation = async (
//   id: {
//     title: string
//     description: string
//     date: Date
//     location: string
//     participants: number
//   },
//   vacation: undefined,
// ) => {
//   const response = await axios.put(`${API_URL}/${id}`, vacation)
//   return response.data
// }

export const deleteVacation = async (id: {
  title: string
  description: string
  date: Date
  location: string
  participants: number
}) => {
  await axios.delete(`${API_URL}/${id}`)
}
