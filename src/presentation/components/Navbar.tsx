import React, { memo, useMemo } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducer/user-reducer'
import useNotify from '../hooks/use-notify'
import { OngModel } from '../models/ong-model'
import useAuth from '../hooks/use-auth'

export default function NavbarComponent() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { isAuthenticated, removeToken } = useAuth()
    const { notify } = useNotify()

    const dispatch = useDispatch()
    const handleLogoClick = () => {
        if (pathname !== AppRoutes.login && pathname !== AppRoutes.ongRegister)
            navigate(AppRoutes.home)
        else navigate(AppRoutes.login)
    }

    const handleLogout = () => {
        dispatch(logout())
        removeToken()
        navigate(AppRoutes.login)
        notify('success', 'Você foi deslogado com sucesso!')
    }
    console.log('I re-render')
    const ongData: OngModel = useSelector((state: any) => state.user.ong)
    return (
        <Navbar isBordered={false} className="mb-7 pt-2 flex items-center">
            <NavbarBrand onClick={handleLogoClick} className="cursor-pointer">
                <img src={Logo} />
            </NavbarBrand>

            {isAuthenticated() && (
                <NavbarContent as="div" justify="end">
                    
                    <span>{ongData.name}</span>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                color="default"
                                name={ongData.name}
                                size="md"
                                src={ongData.logo}
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Logado como </p>
                                <p className="font-semibold">{ongData.email}</p>
                            </DropdownItem>
                            <DropdownItem
                                key="edit"
                                onPress={() => navigate(AppRoutes.ongEdit)}
                            >
                                Editar cadastro
                            </DropdownItem>
                            <DropdownItem
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
