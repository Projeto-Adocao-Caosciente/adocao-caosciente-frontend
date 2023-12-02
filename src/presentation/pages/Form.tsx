import React, { useState } from 'react'
import { Button, Divider, Input} from '@nextui-org/react'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import QuestionCard from '../components/QuestionCard'
import { QuestionModel, QuestionOptionModel } from '../../domain/models/question-model'
import { FormModel } from '../../domain/models/form-model'
import useNotify from '../hooks/use-notify'
import { v4 as uuid } from 'uuid'

export default function Form({}) {
    const { notify } = useNotify()
    const initialState: FormModel = {
        formTitle: "",
        questions: [
            {
                id : uuid(),
                title: "",
                isRequired: false,
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

    function handleFormSubmit() {
        // {
        // "title": "",
        // "animal_id": "",
        // "questions": [{
        //     "question": "Name",
        //     "choices": [{"id": 0, "label": "label da questao, "is_correct" : true}]
        // }]
        // }
        const form = {
            title: formQuestions.formTitle,
            animal_id: "1",
            questions: formQuestions.questions.map((question: QuestionModel) => {
                return {
                    question: question.title,
                    choices: question.options.map((option: QuestionOptionModel) => {
                        return {
                            id: option.id,
                            label: option.label,
                            is_correct: option.isCorrect
                        }
                    })
                }
            })
        }

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
                    endContent={<AddCircleSolidIcon />}
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
