import React, { useState } from 'react'
import { Button, Divider, Input} from '@nextui-org/react'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import QuestionCard from '../components/QuestionCard'
import { QuestionModel } from '../../domain/models/question-model'
import { FormModel } from '../../domain/models/form-model'
import useNotify from '../hooks/use-notify'
import { v4 as uuid } from 'uuid'
import { FormInteractor } from '../../domain/interactors/form-interactor'
import { useFetch } from '../hooks/use-fetch'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { FaCirclePlus } from "react-icons/fa6";

type FormPageProps = {
    interactor: FormInteractor
}

export default function FormPage({
    interactor,
}: FormPageProps) {
    const navigate = useNavigate()
    const petId = useParams().id ?? ''
    const { notify } = useNotify()
    const initialState: FormModel = {
        formTitle: "",
        questions: [
            {
                id : uuid(),
                title: "",
                isRequired: false,
                isEditing: true,
                questionType: "multipleChoice",
                options: []
            }
        ]
    }
    const [formQuestions, setFormQuestions] = useState<FormModel>(initialState)

    function handleAddQuestion() {
        const questionId = uuid()
        const newQuestion: QuestionModel = {
            id: questionId,
            title: "",
            isRequired: false,
            isEditing: true,
            questionType: "multipleChoice",
            options: []
        }
        setFormQuestions((prev: FormModel) => {
            return { ...prev, questions: [...prev.questions, newQuestion] }
        })
    }

    function handleDeleteQuestion(id: string) {
        console.log(formQuestions.questions)
        if (formQuestions.questions.length === 1){
            notify('error', 'Não é possível deletar a única pergunta do formulário')
            return
        }
        const questionsWithoutDeleted = formQuestions.questions.filter((question: QuestionModel) => question.id !== id)
        setFormQuestions((prev: FormModel) => {
            return { ...prev, questions: questionsWithoutDeleted }
        })
    }

    const onFormSubmitSuccess = () => {
        notify('success', 'Formulário criado com sucesso!')
        formSubmit.setIdle()
        navigate(-1)
    }

    const onFormSubmitFailed = (_?: Error) => {
        notify('error', 'Erro ao criar formulário')
        formSubmit.setIdle()
    }

    const formSubmit = useFetch<void>({
        fn: (form, animal_id) => interactor.saveForm(form, animal_id),
        successListener: onFormSubmitSuccess,
        errorListener: onFormSubmitFailed,
    })

    function handleFormSubmit() {
        formSubmit.fetch(formQuestions, petId)
    }

    return (
        <main className={'container-form mb-10'}>
            <header className="mb-12 sm:flex sm:justify-center">
                <Input
                    placeholder="Título do Formulário..."
                    variant="underlined"
                    className="sm:w-96 font-medium text-lg"
                />
            </header>

            <section>
                {formQuestions?.questions.map((question: QuestionModel) => (
                    <QuestionCard
                        key={question.id}
                        id={question.id}
                        setFormQuestions={setFormQuestions}
                        deleteQuestion={handleDeleteQuestion}
                        className="mb-6"
                    />
                ))}
            </section>

            <section className="flex flex-col gap-6">
                <Button
                    className="font-medium text-lg"
                    color="primary"
                    variant="bordered"
                    size="md"
                    type="submit"
                    endContent={<FaCirclePlus />}
                    onClick={handleAddQuestion}
                >
                    Nova pergunta
                </Button>
                <Divider className="my-6" />
                <Button
                    className="font-medium text-lg"
                    color="primary"
                    variant="solid"
                    size="md"
                    type="submit"
                    onClick={() => handleFormSubmit()}
                >
                    Finalizar Formulário
                </Button>
                <Button
                    className="font-medium text-lg"
                    color="danger"
                    variant="flat"
                    size="md"
                >
                    Cancelar
                </Button>
            </section>
        </main>
    )
}
