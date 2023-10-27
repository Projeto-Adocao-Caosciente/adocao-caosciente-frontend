import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from '@nextui-org/react'
import { AppRoutes } from '../../routes/app-routes'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducer/authReducer'
import useNotify from '../hooks/use-notify'

export default function NavbarComponent() {
    const navigate = useNavigate()
    const {notify} = useNotify()

    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )
    
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('access_token')
        navigate(AppRoutes.login)
        notify("success", "Você foi deslogado com sucesso!")
    }

    return (
        <Navbar isBordered={false} className="mb-5 py-2 flex items-center">
            <NavbarBrand
                onClick={() => navigate(AppRoutes.home)}
                className="cursor-pointer"
            >
                <img src={Logo} />
            </NavbarBrand>

            {isAuthenticated && (
                <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Chico Little"
                                size="md"
                                src="https://unsplash.it/200/200"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Logado como </p>
                                <p className="font-semibold">
                                    email@adocaosciente.com.br
                                </p>
                            </DropdownItem>
                            <DropdownItem
                                key="edit"
                                onPress={() => navigate(AppRoutes.ongEdit)}
                            >
                                Editar cadastro
                            </DropdownItem>
                            <DropdownItem
                                key="configurations"
                                onPress={() => navigate('#')}
                            >
                                Configurações
                            </DropdownItem>
                            <DropdownItem
                                key="about_the_project"
                                onPress={() => navigate('#')}
                            >
                                Sobre o projeto
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                                Sair
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}
        </Navbar>
    )
}
