import React from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const sidebarData =[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Personnel',
        path: '/personnel',
        icon: <IoIcons.IoMdPerson/>,
        cName: 'nav-text'
    },
    {
        title: 'Congé',
        path: '/conge',
        icon: <FaIcons.FaBookmark/>,
        cName: 'nav-text'
    },
    {
        title: 'Présence',
        path: '/presence',
        icon: <FaIcons.FaIdBadge/>,
        cName: 'nav-text'
    },
    {
        title: 'Demande',
        path: '/demande',
        icon: <FaIcons.FaRegQuestionCircle/>,
        cName: 'nav-text'
    }
]