import React, { useEffect } from 'react'
import { Button, Checkbox, Input, Skeleton } from '@nextui-org/react'
import useNotify from '../hooks/use-notify'
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/use-fetch'
import { AnimalFormModel } from '../../domain/models/animal-form-model'

type FormPageProps = {
    interactor: FormInteractor
}

export default function FormViewPage({ interactor }: FormPageProps) {
    const navigate = useNavigate()
    const formId = useParams().formId ?? ''
    const { notify } = useNotify()

    const onFormFetchFailed = (_?: Error) => {
        notify('error', 'Não foi possível visualizar esse formulário')
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
                            'text-3xl leading-9 font-bold text-center mb-16'
                        }
                    >
                        {formViewFetch.state.data?.title}
                    </h1>
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
    )
}
