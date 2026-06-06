import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { IoIosLogOut } from 'react-icons/io';
import { HeaderLogo, PageHeader, HeaderBrand, HeaderActions } from './styles';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <PageHeader>
      <HeaderBrand>
        <Link href="/pets" prefetch={false}>
          <HeaderLogo src="/img/logo-pet.png" alt="Logo" />
        </Link>
      </HeaderBrand>

      {isAuthenticated && (
        <HeaderActions>
          <IoIosLogOut
            onClick={logout}
            size={22}
            style={{ cursor: 'pointer' }}
          />
        </HeaderActions>
      )}
    </PageHeader>
  );
};

export default Header;
