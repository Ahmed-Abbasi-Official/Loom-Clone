import { ReactNode } from "react";

export interface SideBarLinks{
    label:string,
    route:string,
    imgUrl:string;
}

export interface HomeCardType{
    img:string,
    title:string;
    description:string;
    className:string;
    handleClick:()=>void;

}

export interface MeetingModalProps {
    isOpen:boolean;
    className?:string;
    title:string;
    children?:ReactNode
    buttonText?:string
    image?:string
    buttonIcon?:string
    handleClick:()=>void;
    onClose:()=>void;
}

export  const sideBarLinks:SideBarLinks[] = [
    {
        label:"Home",
        route:"/",
        imgUrl:"/icons/Home.svg"
    },
    {
        label:"Upcoming",
        route:"/upcoming",
        imgUrl:"/icons/upcoming.svg"
    },
    {
        label:"Previous",
        route:"/previous",
        imgUrl:"/icons/previous.svg"
    },
    {
        label:"Recordings",
        route:"/recordings",
        imgUrl:"/icons/Video.svg"
    },
    {
        label:"Personal Room",
        route:"/personal-room",
        imgUrl:"/icons/add-personal.svg"
    },
]

export const avatarImages = [
    '/images/avatar-1.jpeg', 
    '/images/avatar-2.jpeg', 
    '/images/avatar-3.png', 
    '/images/avatar-4.png', 
    '/images/avatar-5.png', 
]