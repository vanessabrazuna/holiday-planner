import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  createVacation,
  deleteVacation,
  getAllVacations,
  updateVacation,
} from '../lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const validationSchema = z.object({
  id: z.number(),
  title: z.string().min(3, { message: 'Título é obrigatório' }),
  description: z.string().min(5, { message: 'Descrição é obrigatória' }),
  date: z.date().transform((value) => new Date(value)),
  location: z.string().min(3, { message: 'Local é obrigatório' }),
  participants: z
    .number()
    .min(1, 'Número de participantes deve ser maior que 0')
    .int()
    .positive('Número de participantes deve ser um inteiro positivo'),
})

type ValidationFormData = z.infer<typeof validationSchema>

export function VacationManager() {
  const { data: vacations } = useQuery<ValidationFormData[]>({
    queryKey: ['vacations'],
    queryFn: () => getAllVacations(),
  })

  const queryClient = useQueryClient()

  const [_, setVacationsGranted] = useState<ValidationFormData[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllVacations()
      setVacationsGranted(data)
    }

    fetchData()
  }, [])

  const { mutateAsync: createVacationFn } = useMutation({
    mutationFn: createVacation,
    onSuccess(_, variables) {
      const cached = queryClient.getQueryData(['vacations'])

      console.log(cached)

      toast.success('Plano salvo com sucesso!')

      queryClient.setQueryData(['vacations'], (data) => {
        return [
          ...data,
          {
            id: crypto.randomUUID(),
            title: variables.title,
            description: variables.description,
            date: variables.date,
            location: variables.location,
            participants: variables.participants,
          },
        ]
      })
    },
  })

  async function handleVacationPlans(data: ValidationFormData) {
    try {
      await createVacationFn({
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        participants: data.participants,
      })

      toast.success('Férias cadastrada com sucesso!')
    } catch (err) {
      toast.error('Não foi possível cadastrar as férias.')
    }

    setVacationsGranted(await getAllVacations())
  }

  const handleDelete = async (id: number) => {
    console.log(id)

    await deleteVacation(id)
    setVacationsGranted(await getAllVacations())
  }

  const setVacationToEdit = (vacation: ValidationFormData) => {
    setVacationToEdit(vacation)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5 flex flex-col p-6 dark:bg-zinc-200 bg-zinc-900 dark:text-zinc-800 text-zinc-50 shadow-lg shadow-zinc-600 rounded-md">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Gerenciador de Planos de Férias
      </h1>
      <form
        onSubmit={handleSubmit(handleVacationPlans)}
        className="flex flex-col space-y-3"
      >
        <input
          type="hidden"
          {...register('id')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          {...register('description')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          {...register('date')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <label htmlFor="location">Local:</label>
        <input
          type="text"
          id="location"
          {...register('location')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}

        <label htmlFor="participants">Participantes:</label>
        <input
          type="number"
          id="participants"
          {...register('participants')}
          className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.participants && (
          <p className="text-red-500">{errors.participants.message}</p>
        )}

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-zinc-50 font-bold h-12 rounded-sm transition-all"
        >
          Salvar
        </button>
      </form>

      <h2 className="text-1xl font-bold mb-4">Planos de Férias</h2>
      <ul>
        {vacations &&
          vacations.map((vacation) => (
            <li key={vacation.id}>
              <h3>{vacation.title}</h3>
              <p>{vacation.description}</p>
              <p>{new Date(vacation.date).toLocaleDateString()}</p>
              <p>{vacation.location}</p>
              <p>{vacation.participants}</p>
              <button onClick={() => handleDelete(Number(vacation.id))}>
                Excluir
              </button>
              <button onClick={() => setVacationToEdit(vacation)}>
                Editar
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}
