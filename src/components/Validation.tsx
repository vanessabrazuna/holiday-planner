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

export function Validation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormData>({
    resolver: zodResolver(validationSchema),
  })

  async function handleFormValidation(data: ValidationFormData) {
    console.log(data)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Enviado sucesso!')
    } catch {
      toast.error('Não foi possível fazer o envio.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormValidation)}
      className="max-w-6xl mx-auto space-y-4 flex flex-col px-6 text-zinc-800 dark:text-zinc-50 shadow-md shadow-zinc-600 rounded-md"
    >
      <label htmlFor="title" className="font-bold">
        Título:
      </label>
      <input
        type="text"
        id="title"
        {...register('title')}
        className="w-full h-10 rounded-sm p-2 text-zinc-700 outline-none"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <label htmlFor="description" className="font-bold mb-4">
        Descrição:
      </label>
      <textarea
        id="description"
        {...register('description')}
        className="w-full h-10 rounded-sm p-2 text-zinc-700 outline-none"
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <label htmlFor="date" className="font-bold mb-4">
        Data:
      </label>
      <input
        type="date"
        id="date"
        {...register('date')}
        className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
      />
      {errors.date && <p className="text-red-500">{errors.date.message}</p>}

      <label htmlFor="location" className="font-bold mb-4">
        Local:
      </label>
      <input
        type="text"
        id="location"
        {...register('location')}
        className="h-10 rounded-sm p-2 text-zinc-700 outline-none"
      />
      {errors.location && (
        <p className="text-red-500">{errors.location.message}</p>
      )}

      <label htmlFor="participants" className="font-bold mb-4">
        Participantes:
      </label>
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
        className="bg-green-700 hover:bg-green-800 font-bold h-12 rounded-sm transition-all"
      >
        Enviar
      </button>
    </form>
  )
}
