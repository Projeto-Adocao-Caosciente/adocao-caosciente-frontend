import React, { useState } from 'react'
import { Button, Divider, Input, Tooltip } from '@nextui-org/react'
import useNotify from '../hooks/use-notify'
import { v4 as uuid } from 'uuid'
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { FaCirclePlus } from 'react-icons/fa6'
import { useFetch } from '../hooks/use-fetch'
import { QuestionCard } from '../components/QuestionCard'
import { QuestionFieldsValue } from '../../domain/models/question-field-model'

type FormPageProps = {
    interactor: FormInteractor
}

export default function FormPage({ interactor }: FormPageProps) {
    const navigate = useNavigate()
    const animalId = useParams().animalId ?? ''
    const { notify } = useNotify()

    const [formTitle, setFormTitle] = useState<string>('')
    const [formQuestionsIds, setFormQuestionsIds] = useState<string[]>([])
    const [formQuestions, setFormQuestions] = useState<QuestionFieldsValue[]>(
        []
    )
    const [focusedQuestionsId, setFocusedQuestion] = useState<string>()

    const MIN_TITLE_LENGTH: number = 2

    const addQuestionId = () =>
        setFormQuestionsIds([...formQuestionsIds, uuid()])

    const addFormQuestion = (formQuestion: QuestionFieldsValue) => {
        const updatedFormQuestions = formQuestions.map((_formQuestion) =>
            _formQuestion.id === formQuestion.id ? formQuestion : _formQuestion
        )

        const alreadyAdded = updatedFormQuestions.some(
            (_formQuestion) => _formQuestion.id === formQuestion.id
        )

        if (alreadyAdded) {
            setFormQuestions(updatedFormQuestions)
            notify('success', 'Pergunta atualizada')
        } else {
            updatedFormQuestions.push(formQuestion)
            setFormQuestions(updatedFormQuestions)
            notify('success', 'Pergunta adicionada')
        }

        onUnfocused()
    }

    const updateFormTitle = (title: string) => setFormTitle(title)

    const removeQuestion = (id: string) => {
        setFormQuestions((prevQuestions) =>
            prevQuestions.filter((question) => question.id !== id)
        )

        setFormQuestionsIds((prevQuestionsIds) =>
            prevQuestionsIds.filter((questionId) => questionId !== id)
        )

        onUnfocused()
    }

    const onFormSubmitSuccess = () => {
        notify('success', 'Formulário criado com sucesso!')
        formSubmitFetch.setIdle()
        navigate(-1)
    }

    const onFormSubmitFailed = (_?: Error) => {
        notify('error', 'Houve um problema ao criar o formulário. Por favor, tente novamente mais tarde.')
        formSubmitFetch.setIdle()
    }

    const formSubmitFetch = useFetch<void>({
        fn: (formQuestions, formTitle, animalId) =>
            interactor.saveForm(formQuestions, formTitle, animalId),
        successListener: onFormSubmitSuccess,
        errorListener: onFormSubmitFailed,
    })

    const handleFormCreation = () => {
        if (formTitle.length < MIN_TITLE_LENGTH) {
            notify('error', 'O título do formulário deve ter pelo menos 2 caracteres.')
            return
        }
        formSubmitFetch.fetch(formQuestions, formTitle, animalId).then()
    }

    const onUnfocused = () => {
        setFocusedQuestion(undefined)
    }

    const onFocused = (id: string) => {
        setFocusedQuestion(id)
    }
    const isFocused = (id: string) => {
        return focusedQuestionsId == id
    }
    const buildFormQuestions = () => {
        if (formQuestionsIds.length > 0) {
            return formQuestionsIds.map((id) => {
                return (
                    <div key={id}>
                        <QuestionCard
                            id={id}
                            notify={(message, error) =>
                                notify(error ? 'error' : 'success', message)
                            }
                            onCancelled={removeQuestion}
                            onSubmitted={addFormQuestion}
                            onFocused={onFocused}
                            isFocused={isFocused(id)}
                        />
                    </div>
                )
            })
        } else {
            return (
                <p className={'mb-5 font-light text-center'}>
                    Defina questões para esse formulário de adoção
                </p>
            )
        }
    }

    const isFinishButtonDisabled =
        formQuestions.length != formQuestionsIds.length ||
        formQuestionsIds.length == 0

    return (
        <main className={'container-form mb-10'}>
            <header className="mb-12 sm:flex sm:justify-center">
                <Input
                    placeholder="Título do Formulário..."
                    variant="underlined"
                    className="sm:w-96 font-medium text-lg"
                    onChange={(event) => updateFormTitle(event.target.value)}
                />
            </header>
            <section>{buildFormQuestions()}</section>

            <section className="flex flex-col items-center gap-6">
                <Tooltip content="Adicionar pergunta">
                    <Button
                        color="primary"
                        variant="solid"
                        size="md"
                        isIconOnly
                        className={'mt-5'}
                        onClick={() => addQuestionId()}
                    >
                        <FaCirclePlus />
                    </Button>
                </Tooltip>

                <Divider className="my-6" />
                <Button
                    fullWidth
                    color="primary"
                    variant="solid"
                    size="md"
                    isDisabled={isFinishButtonDisabled}
                    isLoading={formSubmitFetch.isLoading()}
                    onClick={() => handleFormCreation()}
                >
                    Finalizar Formulário
                </Button>
                <Button
                    fullWidth
                    color="danger"
                    variant="flat"
                    size="md"
                    onClick={() => navigate(-1)}
                >
                    Cancelar
                </Button>
            </section>
        </main>
    )
}
