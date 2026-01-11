"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: { text: string; image: string; name: string; role: string }[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-8 rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow max-w-xs w-full" key={i}>
                                    <div className="text-slate-600 leading-relaxed text-sm mb-4">"{text}"</div>
                                    <div className="flex items-center gap-3">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-bold text-slate-900 text-sm tracking-tight">{name}</div>
                                            <div className="text-xs text-slate-500 font-medium">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
