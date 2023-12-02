import { Button, Card, Divider, Input, Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import CheckMarkIcon from '../assets/CheckMarkIcon'
import TrashCanIcon from '../assets/TrashCanIcon'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import CancelRoundedFillIcon from '../assets/CancelRoundedFilledIcon'
import {
    QuestionModel,
    QuestionOptionModel,
} from '../../domain/models/question-model'
import useNotify from '../hooks/use-notify'
import { FormModel } from '../../domain/models/form-model'
import { v4 as uuid } from 'uuid'
import { FaRegCircleXmark, FaCirclePlus, FaRegTrashCan  } from "react-icons/fa6";

interface QuestionCardProps {
    id: string
    setFormQuestions: React.Dispatch<React.SetStateAction<FormModel>>
    deleteQuestion: (id: string) => void
    className?: string
}

export default function QuestionCard({ id, setFormQuestions, deleteQuestion, className }: QuestionCardProps) {
    const { notify } = useNotify()
    const initialState: QuestionOptionModel[] = [{
        id: uuid(),
        label: '',
        isCorrect: false
    }]
    const [questionOptions, setQuestionOptions] = useState(initialState)

    const MAX_OPTIONS = 10
    function handleAddOption() {
        if (questionOptions.length >= MAX_OPTIONS) {
            notify('error', 'Você atingiu o limite de alternativas')
            return
        }
        const questionId = uuid()
        setQuestionOptions([...questionOptions, { id: questionId, label: '', isCorrect: false }])
    }

    function handleDeleteOption(id: string) {
        if (questionOptions.length === 1){
            notify('error', 'Você precisa ter ao menos uma alternativa')
            return
        }
        setQuestionOptions((prev) => prev.filter((option) => option.id !== id))
    }

    function handleCheckOption(id: string) {
        setQuestionOptions((prev) => prev.map((option) => {
            if (option.id === id) {
                return { ...option, isCorrect: !option.isCorrect }
            }
            return option
        }))
    }

    function handleEditQuestion(id: string, text: string) {
        setQuestionOptions((prev) => prev.map((option) => {
            if (option.id === id) {
                return { ...option, label: text }
            }
            return option
        }))
    }

    function handleEditQuestionTitle(id: string, text: string) {
        setFormQuestions((prev: FormModel) => {
            return {
                ...prev,
                questions: prev.questions.map((question: QuestionModel) => {
                    if (question.id === id) {
                        return { ...question, title: text }
                    }
                    return question
                })
            }
        })
    }

    useEffect(() => {
        setFormQuestions((prev: FormModel) => {
            return {
                ...prev,
                questions: prev.questions.map((question: QuestionModel) => {
                    if (question.id === id) {
                        return { ...question, options: questionOptions }
                    }
                    return question
                })
            }
        })
    }, [questionOptions])
    return (
        <Card className={`md:px-6 py-8 shadow-none md:shadow-medium ${className}`}>
            <div className="sm:flex sm:justify-center">
                <Input
                    placeholder="Pergunta..."
                    variant="underlined"
                    className="sm:w-96 mb-6"
                    onChange={(e: any) => handleEditQuestionTitle(id, e.target.value)}
                />
            </div>
            <div className="sm:flex flex-col sm:justify-center">
                {questionOptions.map((option) => (
                    <span className="flex gap-4 mb-3" key={option.id}>
                        <Button isIconOnly color="danger" aria-label="Remover" onClick={() => handleDeleteOption(option.id)}>
                            <FaRegTrashCan  />
                        </Button>
                        <Input 
                            placeholder="Resposta..." 
                            className="sm:w-96" 
                            onChange={(e: any) => handleEditQuestion(option.id, e.target.value)} 
                        />
                        <Switch
                            color="success"
                            size="lg"
                            thumbIcon={<CheckMarkIcon />}
                            aria-label="Marcar como correta"
                            isSelected={option.isCorrect}
                            onValueChange={() => handleCheckOption(option.id)}
                        />
                    </span>
                ))}
            </div>
            <div className="flex justify-center mb-6">
                <Button
                    color="primary"
                    variant="flat"
                    size="md"
                    type="submit"
                    endContent={<FaCirclePlus />}
                    onClick={handleAddOption}
                >
                    Adicionar Alternativa
                </Button>
            </div>
            <Divider className="mb-6"/>
            <section className="flex justify-center">
                {/* <Button
                    color="primary"
                    variant="solid"
                    size="md"
                    type="submit"
                    endContent={<AddCircleSolidIcon />}
                    // onClick={handdleAddQuestion}
                >
                    Inserir Pergunta
                </Button> */}
                <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                    endContent={<FaRegCircleXmark />}
                    onClick={() => deleteQuestion(id)}
                >
                    Deletar Pergunta
                </Button>
            </section>
        </Card>
    )
}
