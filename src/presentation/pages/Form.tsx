import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    Tooltip,
    useDisclosure,
} from '@nextui-org/react'
import useNotify from '../hooks/use-notify'
import { v4 as uuid } from 'uuid'
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { FaCirclePlus } from 'react-icons/fa6'
import { useFetch } from '../hooks/use-fetch'
import { QuestionCard } from '../components/QuestionCard'
import { QuestionFieldsValue } from '../../domain/models/question-field-model'
import { FormSenderModal } from '../components/FormSenderModal'

type FormPageProps = {
    interactor: FormInteractor
}

export default function FormPage({ interactor }: FormPageProps) {
    const navigate = useNavigate()
    const animalId = useParams().animalId ?? ''
    const { notify } = useNotify()

    const [formId, setFormId] = useState<string>()
    const [formTitle, setFormTitle] = useState<string>('')
    const [formQuestionsIds, setFormQuestionsIds] = useState<string[]>([])
    const [formQuestions, setFormQuestions] = useState<QuestionFieldsValue[]>(
        []
    )
    const [focusedQuestionsId, setFocusedQuestion] = useState<string>()

    const formSenderModal = useDisclosure()

    const formSenderErrorModal = useDisclosure()

    const MIN_TITLE_LENGTH: number = 2

    const addQuestionId = () => {
        const id = uuid()
        setFormQuestionsIds([...formQuestionsIds, id])
        setFocusedQuestion(id)
    }

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

    const onFormSubmitFailed = (_?: Error) => {
        notify(
            'error',
            'Houve um problema ao criar o formulário. Por favor, tente novamente mais tarde.'
        )
        formSubmitFetch.setIdle()
    }

    const formSubmitFetch = useFetch<string>({
        fn: (formQuestions, formTitle, animalId) =>
            interactor.saveForm(formQuestions, formTitle, animalId),
        successListener: (formId) => {
            notify('success', 'Formulário criado com sucesso!')
            formSubmitFetch.setIdle()
            setFormId(formId ?? '')
        },
        errorListener: onFormSubmitFailed,
    })

    const sendEmailFetch = useFetch<void>({
        fn: (args) => interactor.sendFormToAdopters({ ...args }),
        successListener: (_) => {
            formSenderModal.onClose()
            sendEmailFetch.setIdle()
            navigate(-1)
        },
        errorListener: (_) => {
            sendEmailFetch.setIdle()
            formSenderModal.onClose()
            formSenderErrorModal.onOpen()
        },
    })

    const handleFormCreation = () => {
        if (formTitle.length < MIN_TITLE_LENGTH) {
            notify(
                'error',
                'O título do formulário deve ter pelo menos 2 caracteres.'
            )
            return
        }
        formSubmitFetch.fetch(formQuestions, formTitle, animalId).then()
    }

    const onUnfocused = () => {
        setFocusedQuestion(undefined)
    }

    const onFocused = (id: string) => {
        if (focusedQuestionsId != id) {
            setFocusedQuestion(id)
        }
    }
    const isFocused = (id: string) => {
        return focusedQuestionsId == id
    }

    useEffect(() => {
        if ((formId ?? '').length > 0) {
            formSenderModal.onOpen()
        }
    }, [formId])

    const buildFormQuestions = () => {
        if (formQuestionsIds.length > 0) {
            return formQuestionsIds.map((id) => {
                return (
                    <QuestionCard
                        key={id}
                        id={id}
                        notify={(message, error) =>
                            notify(error ? 'error' : 'success', message)
                        }
                        onCancelled={removeQuestion}
                        onSubmitted={addFormQuestion}
                        onFocused={onFocused}
                        isFocused={isFocused(id)}
                    />
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
        <>
            <Modal
                isOpen={formSenderErrorModal.isOpen}
                onOpenChange={formSenderErrorModal.onOpenChange}
                isDismissable={false}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(_) => (
                        <>
                            <ModalBody>
                                <div className={'my-5'}>
                                    <h3 className={'text-2xl font-bold mb-3'}>
                                        Ocorreu um erro
                                    </h3>
                                    <strong>
                                        Não foi possível enviar os e-mails para
                                        todos os adotantes em potencial
                                    </strong>
                                    <p className={'mt-5 mb-10'}>
                                        Não se preocupe, você pode realizar os
                                        disparos novamente na tela de
                                        visualização desse formulário
                                    </p>
                                    <Button
                                        fullWidth
                                        color={'danger'}
                                        variant={'flat'}
                                        onClick={() => navigate(-1)}
                                    >
                                        Certo, entendi
                                    </Button>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={formSenderModal.isOpen}
                onOpenChange={formSenderModal.onOpenChange}
                isDismissable={false}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <FormSenderModal
                                    onClose={() => {
                                        onClose()
                                        navigate(-1)
                                    }}
                                    onSendTriggered={(emails: string[]) => {
                                        sendEmailFetch
                                            .fetch({
                                                formId,
                                                emails,
                                            })
                                            .then()
                                        onClose()
                                    }}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <main className={'container-form mb-10'}>
                <header className="mb-12 sm:flex sm:justify-center">
                    <Input
                        data-selector="form-title-input"
                        placeholder="Título do Formulário..."
                        variant="underlined"
                        className="sm:w-96 font-medium text-lg"
                        onChange={(event) =>
                            updateFormTitle(event.target.value)
                        }
                    />
                </header>
                <section>{buildFormQuestions()}</section>

                <section className="flex flex-col items-center gap-6">
                    <Tooltip content="Adicionar pergunta">
                        <Button
                            data-selector="add-question-button"
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
                        data-selector="finish-form-button"
                        fullWidth
                        color="primary"
                        variant="solid"
                        size="md"
                        isDisabled={isFinishButtonDisabled}
                        isLoading={
                            formSubmitFetch.isLoading() ||
                            sendEmailFetch.isLoading()
                        }
                        onClick={() => handleFormCreation()}
                    >
                        {sendEmailFetch.isLoading()
                            ? 'Enviando e-mails...'
                            : 'Finalizar Formulário'}
                    </Button>
                    <Button
                        data-selector="cancel-form-button"
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
        </>
    )
}
