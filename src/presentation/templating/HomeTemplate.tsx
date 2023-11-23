import { Input } from '@nextui-org/react'
import React from 'react'

type HomeTemplateFilter = {
    label: string
    onChange: (filterValue: string) => void
}

type HomeTemplateHeading = {
    title: string
    rightContent: React.JSX.Element
    mobileRightContent: React.JSX.Element
}

type HomeTemplateProps = {
    name: string
    filter: HomeTemplateFilter
    heading: HomeTemplateHeading
    content: React.JSX.Element
}

export default function HomeTemplate({
    name,
    heading,
    content,
    filter,
}: HomeTemplateProps) {
    return (
        <main className="container mb-10">
            <h1 className="text-center xs:text-2xl md:text-3xl font-bold my-16">
                Bem-vindo de volta
                <br />
                {name}
            </h1>
            <section className="flex mb-4 md:justify-between">
                <h2 className="text-3xl">{heading.title}</h2>

                {heading.rightContent}
            </section>
            <section className="flex gap-4 mb-8">
                <Input
                    variant="bordered"
                    placeholder={filter.label}
                    onChange={(event) => filter.onChange(event.target.value)}
                    size="lg"
                />
                {heading.mobileRightContent}
            </section>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 md:gap-8 xs:gap-4">
                {content}
            </section>
        </main>
    )
}
