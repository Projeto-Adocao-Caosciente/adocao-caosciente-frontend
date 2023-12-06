enum AppRoutes {
    home = '/',
    login = '/login',
    edit = '/edit',
    ongRegister = '/ong-register',
    pet = '/pet/:id',
    petRegister = '/pet-register',
    formRegister = '/pet/:animalId/form',
    formView = '/pet/form/:formId',
    adopterRegister = '/adopter-register',
    notFound = '*',
}

export { AppRoutes }
