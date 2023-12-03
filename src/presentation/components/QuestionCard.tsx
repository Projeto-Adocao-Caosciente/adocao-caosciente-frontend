import { useFieldArray, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { Button, Card, Checkbox, Divider, Input } from '@nextui-org/react'
import { FaCirclePlus, FaRegTrashCan } from 'react-icons/fa6'
import React from 'react'
import { QuestionFieldsValue } from '../../domain/models/question-field-model'

export interface QuestionCardProps {
    id: string
    notify: (message: string, error: boolean) => void
    onSubmitted: (questionFields: QuestionFieldsValue) => void
    onCancelled: (questionId: string) => void
}

export function QuestionCard({
    id,
    notify,
    onSubmitted,
    onCancelled,
}: QuestionCardProps) {
    const {
        register,
        control,
        handleSubmit,
        getFieldState,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<QuestionFieldsValue>({
        defaultValues: {
            id: id,
            title: '',
            options: [
                {
                    id: uuid(),
                    label: '',
                    isCorrect: false,
                },
            ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: 'options',
        control,
    })

    const onSubmit = (data: QuestionFieldsValue) => {
        const correctOption = data.options.find((option) => option.isCorrect)

        if (data.options.length < 2) {
            notify(
                'Você deve definir ao menos 2 opções para essa pergunta',
                true
            )
            return
        }

        if (correctOption) {
            onSubmitted(data)
        } else {
            notify(
                'Ao menos uma opção deve ser definida como a opção correta',
                true
            )
        }
    }

    const buildOptions = () => {
        if (fields.length > 0) {
            return fields.map((field, index) => {
                return (
                    <div
                        className={
                            'flex items-center justify-center gap-2 mb-5'
                        }
                        key={field.id}
                    >
                        <Checkbox
                            color="success"
                            size="lg"
                            aria-label="Marcar como correta"
                            isSelected={
                                getValues(`options.${index}.isCorrect`) ?? false
                            }
                            onValueChange={() =>
                                setValue(
                                    `options.${index}.isCorrect`,
                                    !getValues(`options.${index}.isCorrect`),
                                    { shouldValidate: true }
                                )
                            }
                            disableAnimation
                        />
                        <Input
                            key={field.id}
                            minLength={2}
                            maxLength={60}
                            placeholder="Editar opção..."
                            variant="underlined"
                            isInvalid={
                                getFieldState(`options.${index}.label` as const)
                                    .invalid
                            }
                            errorMessage={errors?.options?.[index]?.message}
                            {...register(`options.${index}.label` as const, {
                                required: true,
                                minLength: 2,
                                maxLength: 60,
                            })}
                        />
                        <Button isIconOnly onClick={() => remove(index)}>
                            <FaRegTrashCan />
                        </Button>
                    </div>
                )
            })
        } else {
            return (
                <p className={'mb-5 font-light'}>
                    Defina opções para essa pergunta
                </p>
            )
        }
    }

    return (
        <Card className={`shadow-none md:shadow-small`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'md:px-6 py-8'}>
                    <div className={'flex justify-center'}>
                        <Input
                            minLength={2}
                            maxLength={60}
                            placeholder="Título da Pergunta"
                            variant="underlined"
                            className={'w-1/2 mb-10'}
                            isInvalid={getFieldState('title').invalid}
                            errorMessage={errors?.title?.message}
                            {...register('title', {
                                required: true,
                                minLength: 2,
                                maxLength: 60,
                            })}
                        />
                    </div>

                    {buildOptions()}
                    <Button
                        fullWidth
                        type="button"
                        variant={'flat'}
                        onClick={() =>
                            append({
                                id: uuid(),
                                label: '',
                                isCorrect: false,
                            })
                        }
                        endContent={<FaCirclePlus />}
                    >
                        Adicionar opção
                    </Button>
                </div>
                <Divider />
                <div className={'flex gap-2 md:px-6 py-4'}>
                    <Button
                        fullWidth
                        variant={'flat'}
                        color={'danger'}
                        type="button"
                        onClick={() => onCancelled(id)}
                    >
                        Deletar pergunta
                    </Button>
                    <Button
                        fullWidth
                        variant={'flat'}
                        color={'primary'}
                        type="submit"
                    >
                        Inserir pergunta
                    </Button>
                </div>
            </form>
        </Card>
    )
}
