export type FormResponse = {
    title: string
    animal_id: string
    questions: QuestionResponse[]
}

export type QuestionResponse = {
    question: string
    choices: ChoiceResponse[]
}

export type ChoiceResponse = {
    id: number
    label: string
    is_correct: boolean
}
