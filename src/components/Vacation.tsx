import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

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

export function Vacation() {
  const [vacations, setVacations] = useState<ValidationFormData[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
  })

  async function handleVacationRegistration(data: ValidationFormData) {
    setVacations((prevVacations) => [
      ...prevVacations,
      data as ValidationFormData,
    ])

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Plano salvo com sucesso!')
    } catch {
      toast.error('Erro no cadastramento')
    }
  }

  const deleteVacation = (id: number | string) => {
    const updatedVacations = vacations.filter((vacation) => vacation.id !== id)
    setVacations(updatedVacations)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-5 flex flex-col p-6 dark:bg-zinc-200 bg-zinc-900 dark:text-zinc-800 text-zinc-50 shadow-lg shadow-zinc-600 rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Gerenciamento de Planos de Férias
      </h1>
      <form
        onSubmit={handleSubmit(handleVacationRegistration)}
        className="flex flex-col space-y-4"
      >
        <input
          {...register('title')}
          placeholder="Título"
          className="h-12 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input
          {...register('description')}
          placeholder="Descrição"
          className="h-12 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <input
          {...register('date')}
          placeholder="Data"
          type="date"
          className="h-12 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <input
          {...register('location')}
          placeholder="Local"
          className="h-12 rounded-sm p-2 text-zinc-700 outline-none"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}

        <input
          {...register('participants')}
          placeholder="Participantes"
          className="h-12 rounded-sm p-2 text-zinc-700 outline-none"
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

      <div className="mt-4">
        {vacations.map((vacation) => (
          <div key={vacation.id} className="p-4 rounded mb-4">
            <h2>{vacation.title}</h2>
            <p>{vacation.description}</p>
            <p>{vacation.date.toDateString()}</p>
            <p>{vacation.location}</p>
            <p>{vacation.participants}</p>
            <button onClick={() => deleteVacation(vacation.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
