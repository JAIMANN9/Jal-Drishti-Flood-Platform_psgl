import { ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BentoGrid = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
                className,
            )}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
}: {
    name: string;
    className: string;
    background: ReactNode;
    Icon: any;
    description: string;
    href: string;
    cta: string;
}) => (
    <div
        key={name}
        className={cn(
            "group relative flex flex-col justify-between overflow-hidden rounded-3xl",
            // light styles
            "bg-white border border-slate-200 shadow-xl shadow-slate-200/50",
            // dark styles (kept for reference but mainly using light mode now)
            "transform-gpu dark:bg-black dark:border-white/10",
            className,
        )}
    >
        <div className="absolute inset-0 z-0">{background}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 pointer-events-none" />

        <div className="pointer-events-none z-20 flex transform-gpu flex-col gap-1 p-8 transition-all duration-300 group-hover:-translate-y-10 mt-auto">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white">
                <Icon className="h-6 w-6 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
            </div>
            <h3 className="text-2xl font-bold text-white">
                {name}
            </h3>
            <p className="max-w-lg text-slate-200">{description}</p>
        </div>

        <div
            className={cn(
                "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-30",
            )}
        >
            <Button variant="secondary" asChild size="sm" className="pointer-events-auto bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 border border-white/20">
                <Link href={href}>
                    {cta}
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]" />
    </div>
);

export { BentoCard, BentoGrid };
