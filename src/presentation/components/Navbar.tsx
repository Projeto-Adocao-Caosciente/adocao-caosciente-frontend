import React, { useContext } from 'react'
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
import { AuthContext } from '../contexts/AuthContext'
import useNotify from '../hooks/use-notify'

export default function NavbarComponent() {
    const { notify } = useNotify()
    const navigate = useNavigate()

    const { isAuthenticated, user, logout } = useContext(AuthContext)

    const handleLogoClick = () => {
        if (isAuthenticated()) navigate(AppRoutes.home)
        else navigate(AppRoutes.login)
    }

    const handleLogout = () => {
        logout()
        notify('success', 'Você foi deslogado com sucesso!')
    }

    return (
        <Navbar isBordered={false} className="mb-7 pt-2 flex items-center">
            <NavbarBrand onClick={handleLogoClick} className="cursor-pointer">
                <img src={Logo} alt={'Logo'} />
            </NavbarBrand>

            {isAuthenticated() && (
                <NavbarContent as="div" justify="end">
                    <div className={'hidden sm:flex sm:flex-col'}>
                        <span
                            data-selector="navbar-user-name"
                            className={'font-bold'}
                        >
                            {user?.name}
                        </span>
                        <span data-selector="navbar-user-type">
                            {user?.typeName}
                        </span>
                    </div>
                    <Dropdown
                        data-selector="navbar-toggle"
                        placement="bottom-end"
                    >
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                color="default"
                                name={user?.name}
                                size="lg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Logado como </p>
                                <p
                                    data-selector="navbar-toggle-user-email"
                                    className="font-semibold"
                                >
                                    {user?.email}
                                </p>
                            </DropdownItem>
                            <DropdownItem
                                data-selector="navbar-about"
                                key="about"
                                onClick={() => navigate(AppRoutes.about)}
                            >
                                Sobre nós
                            </DropdownItem>
                            <DropdownItem
                                data-selector="navbar-edit-profile"
                                key="edit"
                                onClick={() => navigate(AppRoutes.edit)}
                            >
                                Editar cadastro
                            </DropdownItem>
                            <DropdownItem
                                data-selector="navbar-logout"
                                key="logout"
                                color="danger"
                                onClick={handleLogout}
                            >
                                Sair
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}
        </Navbar>
    )
}
