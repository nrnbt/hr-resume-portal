'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { Avatar, ClickAwayListener, IconButton, MenuList, Paper, Popper } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import cn from 'classnames'

const navItems = [{
  name: 'Анкет',
  href: '/resume',
}];

const AppAppBar: React.FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [accountOpen, setAccountOpen] = React.useState(false);

  const router = useRouter()
  const { isLoggedIn, logout } = useAuthContext()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setAccountOpen(!accountOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAccountOpen(false);
  };

  const handleLogout = () => {
    handleClose()
    logout()
    router.push('/resume')
  }

  const renderRightSide = () => {
    return isLoggedIn ? (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
        <IconButton onClick={handleClick}>
          <Avatar sizes='small' sx={{ bgcolor: 'primary.main' }}>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
        <Popper id={'simple-popper'} open={accountOpen} anchorEl={anchorEl} placement="bottom-start">
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <MenuList>
                {/* <MenuItem key={'profile'} onClick={handleGoProfile}>Профайл</MenuItem> */}
                <MenuItem key={'logout'} onClick={handleLogout}>Гарах</MenuItem>
              </MenuList>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    ) : (
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        <Button 
          color="primary"
          variant="text" 
          size='small'
        >
          <Link  href="/login">Нэвтрэх</Link>
        </Button>
        <Button color="primary" variant='contained' size='small'>
          <Link href="/register">Бүртгүүлэх</Link>
        </Button>
      </Box>
    )
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                px: 0,
              }}
            >
              <Typography className='' variant="body1" color="text.secondary">
                Logo | Хүний нөөц
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex', paddingLeft: '20px', gap: '10px' } }}>
                {navItems.map((item) => (
                  <Button size='small' key={item.name} variant='text' color='info'>
                    <Link 
                      className={cn('border-b-2 transition-colors duration-300',
                        pathname === '/login' ? 'text-slate-300 border-slate-300' : 'border-[#757ce8]'
                      )}
                      href={item.href}>
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </Box>
            </Box>
            {renderRightSide()}
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                  {navItems.map((item, idx) => (
                    <MenuItem key={idx}>
                      <Button key={item.name} variant='outlined'>
                        <Link href={item.href}>{item.name}</Link>
                      </Button>
                    </MenuItem>
                  ))}
                  {renderRightSide()}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;