import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { styled, useTheme } from '@mui/material/styles'
import {
    Divider,
    Drawer,
    List,
    ListItem,
    Typography,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Button,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import AssessmentIcon from '@mui/icons-material/Assessment'
import BarChartIcon from '@mui/icons-material/BarChart'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleIcon from '@mui/icons-material/People'
import PieChartIcon from '@mui/icons-material/PieChart'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import Toolbar from '@mui/material/Toolbar'
import ViewListIcon from '@mui/icons-material/ViewList'

import { SecurityContext } from '@/core/security'
import DrawerHeader from '@/core/layout/DrawerHeader'
import {
    IListItem,
    homeItems,
    userListItems,
    bloggerListItems,
    adminUsersListItems,
    adminReportsListItems,
    adminBlogListItems,
} from './app-drawer-list-items'

const appTitle = 'DemoApp'
const drawerWidth = 330

const appPages = [
    { title: `Home`, path: `/`, id: 'home' },
    { title: `Blog`, path: `/blog`, id: 'blog' },
    { title: `FAQ`, path: `/frequently-asked-questions`, id: 'faq' },
    { title: `Contact Us`, path: `/contact-us`, id: 'contact-us' },
]

const settings = ['Profile', 'Account', 'Dashboard', 'Sign Out']

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

export default function AppDrawer({ children }: { children: ReactNode }) {
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    )

    const auth = useContext(SecurityContext)

    useEffect(() => {
        // Open drawer automatically if user is logged in and has admin role
        if (hasAdministrativeRole()) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [auth.user])

    const hasAdministrativeRole = () => {
        if (
            (auth.user && auth.hasRole('ROLE_ADMIN')) ||
            auth.hasRole('ROLE_EDITOR') ||
            auth.hasRole('ROLE_MODERATOR') ||
            auth.hasRole('ROLE_BLOGGER')
        ) {
            return true
        }

        return false
    }

    const hasBlogAdminRole = () => {
        if (
            (auth.user && auth.hasRole('ROLE_ADMIN')) ||
            auth.hasRole('ROLE_EDITOR') ||
            auth.hasRole('ROLE_MODERATOR')
        ) {
            return true
        }

        return false
    }

    const ItemIcon = (iconType: string) => {
        switch (iconType) {
            case 'home':
                return <HomeIcon />
            case 'list':
                return <ViewListIcon />
            case 'people':
                return <PeopleIcon />
            case 'report':
                return <AssessmentIcon />
            case 'bar-chart':
                return <BarChartIcon />
            case 'pie-chart':
                return <PieChartIcon />
            case 'stats':
                return <QueryStatsIcon />
            default:
                return <ViewListIcon />
        }
    }

    const ListItems = (items: IListItem[]) => {
        return (
            <List>
                {items.map((item: IListItem) => (
                    <ListItem
                        key={item.index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            id={item.testId}
                            data-testid={item.testId}
                            component={Link}
                            to={item.path}
                            selected={selectedIndex === item.index}
                            onClick={(event) =>
                                handleListItemClick(event, item.index)
                            }
                        >
                            <ListItemIcon>{ItemIcon(item.icon)}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        )
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleListItemClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index)
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <React.Fragment>
            <AppBar
                id="app-bar"
                data-testid="app-bar"
                position="fixed"
                open={open}
            >
                <Toolbar>
                    {auth.user && auth.hasRole('ROLE_ADMIN') && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        data-testid="app-title"
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {appTitle}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {appPages.map((page) => (
                            <Link
                                data-testid={`${page.id}-link`}
                                key={page.title}
                                to={page.path}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    data-testid={`${page.id}-btn`}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                        {!auth.user && (
                            <Link
                                data-testid="sign-up-link"
                                to="/sign-up"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    data-testid="sign-up-btn"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        )}
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {auth.user && (
                            <>
                                <Link
                                    data-testid="my-account-link"
                                    to="/my-account"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        data-testid="my-account-btn"
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        My Account
                                    </Button>
                                </Link>
                            </>
                        )}
                        {/*{auth.user && auth.hasRole('ROLE_ADMIN') && (
                            <Link
                                data-testid="admin-link"
                                to="/admin"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    data-testid="admin-btn"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Admin
                                </Button>
                            </Link>
                        )}*/}
                        {!auth.user && (
                            <Link
                                data-testid="sign-in-link"
                                to="/sign-in"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    data-testid="sign-in-btn"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Link>
                        )}
                        {auth.user && (
                            <Link
                                data-testid="sign-out-link"
                                to="/sign-out"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    data-testid="sign-out-btn"
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </Link>
                        )}

                        {/*<Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>*/}
                    </Box>
                </Toolbar>
            </AppBar>
            {hasAdministrativeRole() && (
                <Drawer
                    id="app-drawer"
                    data-testid="app-drawer"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {ListItems(homeItems)}
                    <Divider />
                    {ListItems(userListItems)}
                    {auth.hasRole('ROLE_BLOGGER') && (
                        <>
                            <Divider />
                            {ListItems(bloggerListItems)}
                        </>
                    )}
                    {hasBlogAdminRole() && (
                        <React.Fragment>
                            <Divider />
                            {ListItems(adminBlogListItems)}
                        </React.Fragment>
                    )}
                    {auth.hasRole('ROLE_ADMIN') && (
                        <React.Fragment>
                            <Divider />
                            {ListItems(adminUsersListItems)}
                        </React.Fragment>
                    )}
                    <Divider />
                    {ListItems(adminReportsListItems)}
                </Drawer>
            )}
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </React.Fragment>
    )
}
