import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, Input, Switch } from '@nextui-org/react'
import AddCircleSolidIcon from '../assets/AddCircleSolidIcon'
import QuestionCard from '../components/QuestionCard'
import CheckMarkIcon from '../assets/CheckMarkIcon'
import TrashCanIcon from '../assets/TrashCanIcon'
import CancelRoundedFillIcon from '../assets/CancelRoundedFilledIcon'
import { useForm } from 'react-hook-form'
import { OngFormFields } from '../validations/ong/form-fields-type'
import { yupResolver } from '@hookform/resolvers/yup'
import { set } from 'vue/types/umd'
import { QuestionModel } from '../models/question-model'

export default function Form({})
{

    const [numero_de_perguntas, setNumeroDePerguntas] = useState(1);
    let tituloPergunta = " ";
    let resposta = " ";
    let correta = false;

    let respostaMetaData = [{Resposta: resposta, ehCorreta: correta}]
    let listaDeRespostas = [{respostaMetaData}];
    let perguntaMetadata = [{Titulo: tituloPergunta, listaDeRespostas}];
    let listaDePerguntas = [{perguntaMetadata}];

    const [questionID, setQuestionID] = useState(0);
    const [formQuestions, setFormQuestions] = useState<QuestionModel[]>([]);
    
    function handleAddQuestion()
    {
        setFormQuestions((prev : any) => ([...prev, {id : questionID}]));
        setQuestionID(questionID + 1);
        respostaMetaData.push({Resposta: resposta, ehCorreta: correta})
    }

    useEffect(() => {
        console.log(formQuestions);
    }, [formQuestions]);
    
    return(
        <main className={"container-form mb-10"}>
            <header className="mb-12">
                <div className="sm:flex sm:justify-center">
                    <Input
                        placeholder="Título do Formulário..." 
                        variant="underlined"
                        className="sm:w-96 font-medium text-lg"
                    />
                </div>
            </header>

            <section>
                {
                    formQuestions.map((question : QuestionModel) => 
                        <QuestionCard key={questionID + Math.random()}
                        id = {question.id}
                        setQuestion = {setFormQuestions}/>)
                }
            </section>

            <section className="flex flex-col gap-6">
                <Button className='font-medium text-lg'
                    color="primary"
                    variant="bordered"
                    size="md"
                    type="submit"
                    endContent={<AddCircleSolidIcon />}
                    onClick={handleAddQuestion}
                >
                    Nova pergunta
                </Button>
                <Divider className="my-6"/>
                <Button className='font-medium text-lg'
                        color="primary"
                        variant="solid"
                        size="md"
                        type="submit"
                >
                        Finalizar Formulário
                </Button>
                <Button className='font-medium text-lg' 
                    color="danger" 
                    variant="flat" 
                    size="md">

                    Cancelar
                </Button>
            </section>
        </main>
    )
}