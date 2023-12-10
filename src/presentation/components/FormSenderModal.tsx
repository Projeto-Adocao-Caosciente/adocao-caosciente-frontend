import React, { useEffect, useState } from 'react'
import { Button, Chip, Input } from '@nextui-org/react'
import { FaCirclePlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

export const FormSenderModal = (props: {
    onClose: () => void
    onSendTriggered: (_: string[]) => void
}) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [shouldShowError, setShouldShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [emails, setEmails] = useState<string[]>([])

    const sendEmails = () => {
        props.onSendTriggered(emails)
    }

    const addEmail = () => {
        if (errorMessage == null) {
            setEmails([...emails, email])

            setEmail('')
        }
    }

    const removeEmail = (emailToBeRemoved: string) => {
        setEmails((prevEmails) =>
            prevEmails.filter((email) => email !== emailToBeRemoved)
        )
    }

    const buildChosenEmails = () => {
        if (emails.length > 0) {
            return (
                <div className={'flex flex-wrap items-center gap-2 mb-2'}>
                    {emails.map((current, index) => {
                        return (
                            <Chip
                                key={index}
                                data-selector={`destination-${current}`}
                                onClose={() => removeEmail(current)}
                                isCloseable
                            >
                                {current}
                            </Chip>
                        )
                    })}
                </div>
            )
        } else {
            return <div data-selector="empty-emails-container"></div>
        }
    }

    const buildActions = () => {
        if (emails.length > 0) {
            return (
                <Button
                    fullWidth
                    color={'primary'}
                    variant={'flat'}
                    onClick={sendEmails}
                >
                    Enviar e-mails
                </Button>
            )
        }

        return (
            <div>
                <Button
                    fullWidth
                    color={'danger'}
                    variant={'flat'}
                    onClick={() => {
                        props.onClose()
                    }}
                >
                    Voltar
                </Button>
            </div>
        )
    }

    useEffect(() => {
        if (email.length <= 0 || !email.includes('@')) {
            setErrorMessage('Preencha um email válido')
        } else {
            setErrorMessage(null)
        }
    }, [email])

    return (
        <div className={'my-5'}>
            <h3 className={'text-2xl font-bold mb-3'}>
                Formulário criado com sucesso
            </h3>
            <p className={'mb-5'}>
                Envie esse formulário para os adotantes para dar continuidade na
                adoção do animal
            </p>

            <p className={'text-xs mb-5'}>
                Você pode fazer esse disparo de e-mails mais tarde
            </p>

            <div className={'flex items-center gap-2 mb-5'}>
                <Input
                    label={'E-mail'}
                    type={'email'}
                    variant={'underlined'}
                    onValueChange={setEmail}
                    onFocusChange={setShouldShowError}
                    errorMessage={shouldShowError ? errorMessage : null}
                    isInvalid={shouldShowError ? errorMessage != null : false}
                    value={email}
                    required
                    isRequired
                />
                <Button isIconOnly onClick={addEmail}>
                    <FaCirclePlus />
                </Button>
            </div>

            {buildChosenEmails()}

            <div className={'mt-10'}>{buildActions()}</div>
        </div>
    )
}
