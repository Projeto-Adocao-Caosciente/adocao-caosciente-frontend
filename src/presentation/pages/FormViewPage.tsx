import React, { useEffect } from 'react'
import {
    Button,
    Card,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    Skeleton,
    useDisclosure,
} from '@nextui-org/react'
import useNotify from '../hooks/use-notify'
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/use-fetch'
import { AnimalFormModel } from '../../domain/models/animal-form-model'
import { FormSenderModal } from '../components/FormSenderModal'
import { FaPaperPlane } from 'react-icons/fa6'

type FormPageProps = {
    interactor: FormInteractor
}

export default function FormViewPage({ interactor }: FormPageProps) {
    const navigate = useNavigate()
    const formId = useParams().formId ?? ''
    const { notify } = useNotify()

    const formSenderModal = useDisclosure()

    const sendEmailFetch = useFetch<void>({
        fn: (args) => interactor.sendFormToAdopters({ ...args }),
        successListener: (_) => {
            formSenderModal.onClose()
            sendEmailFetch.setIdle()
            notify('success', 'E-mails disparados com sucesso')
        },
        errorListener: (_) => {
            sendEmailFetch.setIdle()
            formSenderModal.onClose()
            notify('error', 'Não foi possível enviar os e-mails')
        },
    })

    const onFormFetchFailed = (_?: Error) => {
        notify(
            'error',
            'Não foi possível encontrar o formulário desejado. Por favor, tente novamente mais tarde.'
        )
        navigate(-1)
    }

    const formViewFetch = useFetch<AnimalFormModel>({
        fn: (formId) => interactor.getForm(formId),
        errorListener: onFormFetchFailed,
    })

    useEffect(() => {
        formViewFetch.fetch(formId).then()
    }, [])

    function buildBasedOnState() {
        if (formViewFetch.isLoading()) {
            return (
                <div>
                    <div className={'mb-16'}>
                        <Skeleton>
                            <div className={'h-12'} />
                        </Skeleton>
                    </div>

                    <div className={'mb-8'}>
                        <div className={'w-3/5'}>
                            <Skeleton>
                                <div className={'h-8'} />
                            </Skeleton>
                        </div>
                    </div>
                    <div className={'mb-2'}>
                        <Skeleton>
                            <div className={'h-12'} />
                        </Skeleton>
                    </div>
                    <div className={'mb-2'}>
                        <Skeleton>
                            <div className={'h-12'} />
                        </Skeleton>
                    </div>
                    <div className={'mb-2'}>
                        <Skeleton>
                            <div className={'h-12'} />
                        </Skeleton>
                    </div>
                    <div className={'mb-12'}>
                        <Skeleton>
                            <div className={'h-12'} />
                        </Skeleton>
                    </div>

                    <Skeleton>
                        <div className={'h-12'} />
                    </Skeleton>
                </div>
            )
        }

        if (formViewFetch.hasSucceeded()) {
            return (
                <div>
                    <Card
                        className={
                            'bg-white sticky top-20 z-20 p-2 md:p-4 mb-16'
                        }
                    >
                        <div
                            className={
                                'flex items-center justify-between gap-1 sm:gap-2'
                            }
                        >
                            <h1
                                data-selector={'form-title'}
                                className={
                                    'text-xl md:text-2xl font-bold mb-0 line-clamp-1'
                                }
                            >
                                {formViewFetch.state.data?.title}
                            </h1>

                            <Button
                                data-selector={'send-email-button'}
                                variant={'solid'}
                                color={'primary'}
                                endContent={<FaPaperPlane />}
                                isLoading={sendEmailFetch.isLoading()}
                                onClick={() => formSenderModal.onOpen()}
                            >
                                {sendEmailFetch.isLoading()
                                    ? 'Enviando...'
                                    : 'Enviar'}
                            </Button>
                        </div>
                    </Card>

                    <div data-selector={'form-list'}>
                        {(formViewFetch.state.data?.questions ?? []).map(
                            (question, index) => {
                                return (
                                    <div data-selector={'question-form'} className={'mb-8'} key={index}>
                                        <p
                                            className={
                                                'text-lg leading-7 font-semibold pb-2'
                                            }
                                            data-selector={'question-title-input'}
                                        >
                                            {question.title}
                                        </p>
                                        <div>
                                            {(question?.options ?? []).map(
                                                (option, index) => {
                                                    return (
                                                        <div
                                                            data-selector={'question-option'}
                                                            className={
                                                                'flex items-center gap-2 mb-2'
                                                            }
                                                            key={index}
                                                        >
                                                            <Checkbox
                                                                data-selector={'question-option-checkbox'}
                                                                size={'lg'}
                                                                isSelected={
                                                                    option.isCorrect
                                                                }
                                                                color={
                                                                    'success'
                                                                }
                                                                isDisabled
                                                                disabled
                                                            />
                                                            <Input
                                                                data-selector={'question-option-input'}
                                                                size={'lg'}
                                                                defaultValue={
                                                                    option.label
                                                                }
                                                                variant={
                                                                    'bordered'
                                                                }
                                                                isDisabled
                                                                disabled
                                                            />
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                        <hr className="mt-8"></hr>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            )
        }
    }

    return (
        <>
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
                                    onClose={onClose}
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
                <section className={'mb-10'}>{buildBasedOnState()}</section>

                <section>
                    <Skeleton isLoaded={!formViewFetch.isLoading()}>
                        <Button
                            data-selector={'cancel-form-button'}
                            fullWidth
                            color="danger"
                            variant="flat"
                            size="md"
                            onClick={() => navigate(-1)}
                        >
                            Voltar
                        </Button>
                    </Skeleton>
                </section>
            </main>
        </>
    )
}
