import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookmarkIcon, BriefcaseBusinessIcon, DollarSignIcon, EyeOffIcon, MapPinIcon, NewspaperIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const NaukriStyleJobCard = () => {
    return (
        <Link
            href={"#"}
            className="flex items-center max-w-3xl w-full gap-4 flex-col"
        >
            <Card className="rounded-2xl shadow bg-background hover:shadow-2xs transition-all ease-in-out duration-200">
                <CardContent className="space-y-3">
                    <div className="flex flex-row items-center justify-between">
                        <div className="inline-flex flex-col justify-start">
                            <CardTitle className="leading-snug tracking-wide">
                                Frontend developer
                            </CardTitle>
                            <span className="font-medium text-xs leading-5 tracking-wide dark:text-accent-foreground/75">
                                Company name
                            </span>
                        </div>
                        <div className="w-12 h-fit border rounded-sm">
                            <Image
                                src={"/next.svg"}
                                width={50}
                                height={50}
                                className="h-full w-full dark:brightness-75 dark:contrast-125 dark:invert aspect-square object-center ring-1"
                                alt="company_profile"
                            />
                        </div>
                    </div>
                    <div className="grid w-full items-start line-clamp-1 text-nowrap gap-1">
                        <div className="flex flex-row flex-1 items-center">
                            <div className="flex flex-row h-3 gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <BriefcaseBusinessIcon className="size-4 text-gray-600" />
                                    <span className="font-normal dark:text-accent-foreground/75 text-sm">
                                        1-3 Yrs
                                    </span>
                                </div>
                                <Separator orientation="vertical" className="mr-2" />
                            </div>
                            <div className="flex flex-row h-3 gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <DollarSignIcon className="size-4 text-gray-600" />
                                    <span className="font-normal dark:text-accent-foreground/75 text-sm">
                                        Not disclosed
                                    </span>
                                </div>
                                <Separator orientation="vertical" className="mr-2" />
                            </div>
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="size-4 text-gray-600" />
                                    <span className="font-normal dark:text-accent-foreground/75 text-sm">
                                        Remote
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 flex-1 items-center">
                            <NewspaperIcon className="size-4 text-gray-600" />
                            <span className="font-normal dark:text-accent-foreground/75 text-sm">
                                Experiene : 1-3 yrs
                            </span>
                            <span className="font-normal dark:text-accent-foreground/75 inline-block text-sm">
                                Eduation : Bachelors / Master in software development
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row text-nowrap line-clamp-1 gap-2 flex-1 items-center">
                        {[
                            "Frontend development",
                            "Redux",
                            "JavaScript",
                            "TypeScript",
                            "Nextjs",
                            "CSS/SCSS",
                            "HTML",
                        ].map((item) => (
                            <span
                                key={`jobs-skills-${item}`}
                                className="font-normal dark:text-accent-foreground/75 text-sm"
                            >
                                {item},
                            </span>
                        ))}
                    </div>
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="font-normal tracking-wide text-xs text-gray-400">
                            2 days ago
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="hover:text-blue-500 p-0 text-black inline-flex items-center text-xs font-normal"
                            >
                                <EyeOffIcon /> Hide
                            </Button>
                            <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="hover:text-blue-500 p-0 text-black inline-flex items-center text-xs font-normal"
                            >
                                <BookmarkIcon /> Save
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default NaukriStyleJobCard;
