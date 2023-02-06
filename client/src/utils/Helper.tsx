import { IoAlbumsOutline, IoWalletOutline, IoPersonOutline } from 'react-icons/io5'

export const onPageTitleChnage = (location: any, setFunction: any) => {
  if (location['pathname'] === '/dashboard') {
    setFunction('Welcome To CryptoFolio')
  }
  if (location['pathname'] === '/portfolio') {
    setFunction('My Portfollio')
  }
  if (location['pathname'] === '/profile') {
    setFunction('My Profile')
  }
}

export const NavListItems = [
  {
    icon: IoAlbumsOutline,
    path: 'dashboard',
    text: 'Dashboard',
  },
  {
    icon: IoWalletOutline,
    path: 'portfolio',
    text: 'Portfolio',
  },
  {
    icon: IoPersonOutline,
    path: 'profile',
    text: 'Profile',
  },
]
