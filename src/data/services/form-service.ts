import { FormModel } from "../../domain/models/form-model"
import { QuestionModel, QuestionOptionModel } from "../../domain/models/question-model";
import { AxiosHttpClient, HttpResponse } from "../http/http-client";
import { FormResponse } from "../model/form-response"

export interface FormService {
    saveForm: (form: FormModel, animal_id: string) => Promise<HttpResponse<void>>
    getForm: (id: string) => Promise<HttpResponse<FormResponse>>
}

export class FormServiceImpl implements FormService {
    constructor(private readonly httpClient: AxiosHttpClient) {}
    
    private readonly savePath = '/form'
    private readonly getPath = '/form'
    // private readonly getAllPath = '/form'

    saveForm(form: FormModel, animal_id: string): Promise<HttpResponse<void>> {
        const formParsed = {
            title: form.formTitle,
            animal_id: animal_id,
            questions: form.questions.map((question: QuestionModel) => {
                return {
                    question: question.title,
                    choices: question.options.map((option: QuestionOptionModel) => {
                        return {
                            label: option.label,
                            is_correct: option.isCorrect
                        }
                    })
                }
            })
        }        
        return this.httpClient.request({
            path: this.savePath,
            method: 'post',
            body: formParsed
        })
    }
    getForm(id: string): Promise<HttpResponse<FormResponse>> {
        throw new Error("Method not implemented.");
    }
}