import { useFieldArray, useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import {
    Button,
    Card,
    Checkbox,
    Divider,
    Input,
    Tooltip,
} from '@nextui-org/react'
import { FaCirclePlus, FaRegTrashCan } from 'react-icons/fa6'
import React, { useEffect } from 'react'
import { QuestionFieldsValue } from '../../domain/models/question-field-model'

export interface QuestionCardProps {
    id: string
    notify: (message: string, error: boolean) => void
    onSubmitted: (questionFields: QuestionFieldsValue) => void
    onCancelled: (questionId: string) => void
    onFocused: (questionId: string) => void
    isFocused: boolean
}

export function QuestionCard({
    id,
    notify,
    onSubmitted,
    onCancelled,
    onFocused,
    isFocused,
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
                'É necessário definir ao menos duas opções para cada pergunta.',
                true
            )
            return
        }

        if (correctOption) {
            onSubmitted(data)
        } else {
            notify(
                'É necessário definir ao menos uma opção correta para cada pergunta.',
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
                        <Tooltip content="Marcar opção como correta/válida">
                            <Checkbox
                                color="success"
                                size="lg"
                                aria-label="Marcar opção como correta/válida"
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
                        </Tooltip>
                        <Input
                            key={field.id}
                            minLength={2}
                            maxLength={60}
                            placeholder="Editar opção..."
                            variant="bordered"
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
                        <Tooltip content="Remover opção">
                            <Button isIconOnly onClick={() => remove(index)}>
                                <FaRegTrashCan />
                            </Button>
                        </Tooltip>
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

    useEffect(() => {
        onFocused(id)
    }, [])

    return (
        <Card
            className={`shadow-none md:shadow-small ${
                isFocused ? 'opacity-100 scale-100' : 'opacity-50 scale-80'
            }`}
        >
            <div onClick={() => onFocused(id)}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${
                        !isFocused
                            ? 'pointer-events-none'
                            : 'pointer-events-auto'
                    }`}
                >
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
                        <Tooltip content="Deletar a pergunta do formulário.">
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'danger'}
                                type="button"
                                onClick={() => onCancelled(id)}
                            >
                                Deletar pergunta
                            </Button>
                        </Tooltip>
                        <Tooltip content="Inserir e/ou atualizar a pergunta no formulário.">
                            <Button
                                fullWidth
                                variant={'flat'}
                                color={'primary'}
                                type="submit"
                            >
                                Confirmar
                            </Button>
                        </Tooltip>
                    </div>
                </form>
            </div>
        </Card>
    )
}
