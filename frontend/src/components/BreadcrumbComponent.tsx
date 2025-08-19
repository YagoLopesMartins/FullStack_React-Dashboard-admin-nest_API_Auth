import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbComponentProps {
    items: BreadcrumbItem[]
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item: BreadcrumbItem, index: number) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>{item.label}</BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbComponent
