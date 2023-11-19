import { Button, Card, Divider, Input, Switch } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import CheckMarkIcon from '../assets/CheckMarkIcon'
import TrashCanIcon from '../assets/TrashCanIcon'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import CancelRoundedFillIcon from '../assets/CancelRoundedFilledIcon'
import { QuestionModel, QuestionOptionModel } from '../models/question-model'

interface QuestionCardProps {
    id : number;
    setQuestion : React.Dispatch<React.SetStateAction<QuestionModel[]>>;
}

export default function QuestionCard({ id, setQuestion } : QuestionCardProps)
{
    function handleDeleteQuestion()
    {
        setQuestion((prev : any) => prev.filter((question : any) => question.id !== id));
        console.log(id);
    }

    const [questionTitle, setQuestionTitle] = useState("");
    const [questionOptions, setQuestionOptions] = useState<QuestionOptionModel[]>([]);

    function handleQuestionAdd()
    {
        setQuestion((prev : QuestionModel[]) => prev.map((question) => question.id === id ? {
            id: id,
            title: questionTitle,
            options: questionOptions
        } : question));
        console.log(questionTitle);
    }

    useEffect(() => {
        console.log(questionTitle, " ", questionOptions);
        //handleQuestionChange();
    }, [questionTitle, questionOptions]);

    return(
    <Card className="md:px-6 py-8 shadow-none md:shadow-medium">
                <div className="sm:flex sm:justify-center">
                    <Input
                        placeholder="Pergunta..." 
                        variant="underlined"
                        className="sm:w-96"
                        onChange={(e : any) => setQuestionTitle(e.target.value)}
                    />
                </div>
                <div className="sm:flex sm:justify-center">
                    <Switch
                        color="success"
                        size="lg"
                        thumbIcon={<CheckMarkIcon />}
                        aria-label="Marcar como correta"
                        value='correta'
                    />
                    <Input
                        placeholder="Resposta..." 
                        className="sm:w-96"
                    />
                    <Button
                        isIconOnly
                        color='danger'
                        aria-label="Remover"
                    >
                        <TrashCanIcon />
                    </Button>
                </div>
                <div className="flex justify-center ">
                    <Button
                        color="primary"
                        variant="bordered"
                        size="md"
                        type="submit"
                        endContent={<AddCircleSolidIcon />}
                    >
                        Adicionar Alternativa
                    </Button>
                </div>
                <Divider/>
                <section className="sm:flex sm:justify-evenly">
                    <Button 
                        color="danger" 
                        variant="solid" 
                        size="md"
                        endContent={<CancelRoundedFillIcon />}
                        onClick={handleDeleteQuestion}
                    >
                        Cancelar
                    </Button>
                    <Button
                            color="primary"
                            variant="solid"
                            size="md"
                            type="submit"
                            endContent={<AddCircleSolidIcon />}
                            onClick={handleQuestionAdd}
                    >
                            Inserir Pergunta
                    </Button>
                </section>
            </Card>
    )
}