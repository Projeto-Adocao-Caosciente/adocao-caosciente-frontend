import React, { useEffect } from 'react'
import {
    Button,
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
                    <h1
                        className={
                            'sm:text-xl md:text-3xl font-bold text-center sm:mb-4 md:mb-8'
                        }
                    >
                        {formViewFetch.state.data?.title}
                    </h1>

                    <div className={'bg-white pt-5 sticky top-16 z-20 mb-16'}>
                        <Button
                            fullWidth
                            variant={'solid'}
                            color={'primary'}
                            isLoading={sendEmailFetch.isLoading()}
                            onClick={() => formSenderModal.onOpen()}
                        >
                            {sendEmailFetch.isLoading()
                                ? 'Enviando...'
                                : 'Enviar formulário'}
                        </Button>
                    </div>

                    <div>
                        {(formViewFetch.state.data?.questions ?? []).map(
                            (question, index) => {
                                return (
                                    <div className={'mb-8'} key={index}>
                                        <p
                                            className={
                                                'text-lg leading-7 font-semibold pb-2'
                                            }
                                        >
                                            {question.title}
                                        </p>
                                        <div>
                                            {(question?.options ?? []).map(
                                                (option, index) => {
                                                    return (
                                                        <div
                                                            className={
                                                                'flex items-center gap-2 mb-2'
                                                            }
                                                            key={index}
                                                        >
                                                            <Checkbox
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
