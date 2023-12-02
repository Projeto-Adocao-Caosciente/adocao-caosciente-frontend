import { FormInteractor, FormInteractorImpl } from "../../domain/interactors/form-interactor";
import { makeFormService } from "../services/form-service-factory";

export const makeFormInteractor = (): FormInteractor =>
    new FormInteractorImpl(
        makeFormService(),
    )
