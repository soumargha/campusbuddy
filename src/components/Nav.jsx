import React, { useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    //   Firebase logics
    const [openNav, setOpenNav] = useState(false);
    const { user, logOut } = UserAuth();


    const navigate = useNavigate()

    const signOut = () => {
        logOut();
        navigate('/')
    };
    const navigateToProfile = () => {
        navigate('/profile')
    }
    const navigateToChats = () => {
        navigate('/chats')
    }



    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src={user?.photoURL}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={label==="Sign Out"? signOut : label==="My Profile"? navigateToProfile : label==="Inbox"? navigateToChats : closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// nav list menu

// nav list component


export function Nav() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    //   Firebase logics
    const [openNav, setOpenNav] = useState(false);
    const { user, logOut } = UserAuth();

    const navigate = useNavigate()




    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:pl-6 bg-transparent text-white border-gray-600 shadow-lg shadow-cyan-500/50">
            <div className="relative mx-auto flex items-center justify-between ">
                <Typography
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-extrabold text-xl"
                ><Link to="/">Campus Buddy</Link>
                </Typography>


                {user ? <ProfileMenu /> :
                    <Button size="sm" variant="text" className="bg-">
                        <Link to={"/login"} className="text-white">Log In</Link>
                    </Button>}
            </div>
        </Navbar>
    );
}