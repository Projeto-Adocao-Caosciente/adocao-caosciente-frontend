import { FormService, FormServiceImpl } from "../../data/services/form-service";
import { makeAxiosHttpClient } from "../http/http-client-factory";

export const makeFormService = (): FormService => 
    new FormServiceImpl(makeAxiosHttpClient())