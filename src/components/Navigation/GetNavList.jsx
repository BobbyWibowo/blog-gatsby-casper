import { Link } from 'gatsby'

function GetNavList (config) {
  const NavList = [
    {
      primaryText: 'Home',
      component: Link,
      to: '/'
    },
    {
      divider: true
    }
  ]

  if (config.userLinks)
    config.userLinks.forEach(link => {
      NavList.push({
        primaryText: link.label,
        component: 'a',
        href: link.url,
        targte: '_blank',
        rel: 'noopener'
      })
    })

  /*
  NavList.push({ divider: true })

  NavList.push({
    primaryText: 'About',
    component: Link,
    to: '/about/'
  })
  */
  return NavList
}
export default GetNavList
