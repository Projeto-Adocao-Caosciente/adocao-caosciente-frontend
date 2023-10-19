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

export default function NavbarComponent() {
  // TODO: Ajeitar a navbar (margem errada, se possível definir margem global)
  return (
    <Navbar isBordered={false}>
      <NavbarBrand>
        {/* TODO: Adicionar LOGO aqui  */}
        {/* <AdocaoscienteLogo />  */}
        <p className="font-bold text-inherit">Projeto Adocação Cãosciente</p>
      </NavbarBrand>

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
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Logado como </p>
              <p className="font-semibold">email@adocaosciente.com.br</p>
            </DropdownItem>
            <DropdownItem key="configurations">Configurações</DropdownItem>
            <DropdownItem key="about_the_project">Sobre o projeto</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}