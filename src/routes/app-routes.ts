enum AppRoutes {
    home = '/',
    login = '/login',
    edit = '/edit',
    ongRegister = '/ong-register',
    pet = '/pet/:id',
    adopterPet = '/adopter/pet/:id',
    petRegister = '/pet-register',
    formRegister = '/pet/:animalId/form',
    formView = '/pet/form/:formId',
    adopterRegister = '/adopter-register',
    about = '/about',
    notFound = '*',
}

export { AppRoutes }
