import { LogoutBnt } from './Clients';
import './Header.scss';
import Link from 'next/link'
const Header = () => {
  return (
    <div className='Header'>
      <>
        <div>
            <h2>Todo</h2>
        </div>
        <section>
            <Link href={"/"}>Home</Link>
            <Link href={"/profile"}>Profile</Link>
            <LogoutBnt/>
        </section>
      </>
    </div>
  )
}

export default Header;