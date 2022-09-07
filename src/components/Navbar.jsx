import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import baseStyle from '../styles/baseStyle';
import axios from 'axios';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  // 로그아웃
  const handleLogoutClick = async () => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/logout`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogin(false);
      setIsAdmin(false);

      alert('로그아웃 되었습니다.');
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      if (cookie.includes('userRole=user')) {
        setIsLogin(true);
        setIsAdmin(false);
      }
      if (cookie.includes('userRole=admin')) {
        setIsLogin(true);
        setIsAdmin(true);

        navigate('/admin');
      }
    });
    if (!cookies[0]) {
      setIsLogin(false);
      setIsAdmin(false);
      if (
        location.pathname.includes('/mypage') ||
        location.pathname.includes('/admin')
      ) {
        navigate('/');
      }
    }
  }, [document.cookie]);

  useEffect(() => {
    if (location.pathname.includes('/about')) {
      setCurrentPage('about');
    } else if (location.pathname.includes('/site')) {
      setCurrentPage('site');
    } else if (location.pathname.includes('/reservation')) {
      setCurrentPage('reservation');
    } else {
      setCurrentPage('');
    }
  });

  return (
    <>
      <Modal open={loginModalOpen} close={() => setLoginModalOpen(false)}>
        <LoginForm close={() => setLoginModalOpen(false)} />
      </Modal>
      <Modal open={registerModalOpen} close={() => setRegisterModalOpen(false)}>
        <RegisterForm close={() => setRegisterModalOpen(false)} />
      </Modal>
      <NavigationBarWrap>
        <NavigationBar>
          <LogoWrap>
            <Logo
              src="/images/logo.png"
              alt="logo"
              onClick={() => navigate('/')}
            />
          </LogoWrap>
          <HamburgerButton onClick={() => setMobileMenuOpen(true)}>
            <GiHamburgerMenu size="100%" color={baseStyle.navbarColor} />
          </HamburgerButton>
          <ResponsiveMenuBackground
            show={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(false)}
          />
          <ResponsiveMenuWrap show={mobileMenuOpen}>
            <ResponsiveMenu
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/about');
              }}
            >
              About
            </ResponsiveMenu>
            <ResponsiveMenu
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/site');
              }}
            >
              Cabins
            </ResponsiveMenu>
            <ResponsiveMenu
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/reservation');
              }}
            >
              Reservation
            </ResponsiveMenu>
            <ResponsiveBar />
            {isLogin ? (
              <>
                {isAdmin ? (
                  <ResponsiveMenu
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/admin');
                    }}
                  >
                    Admin
                  </ResponsiveMenu>
                ) : (
                  <ResponsiveMenu
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/mypage');
                    }}
                  >
                    MyPage
                  </ResponsiveMenu>
                )}
                <ResponsiveMenu
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogoutClick();
                  }}
                >
                  Logout
                </ResponsiveMenu>
              </>
            ) : (
              <>
                <ResponsiveMenu
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLoginClick();
                  }}
                >
                  Login
                </ResponsiveMenu>
                <ResponsiveMenu
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleRegisterClick();
                  }}
                >
                  Register
                </ResponsiveMenu>
              </>
            )}
          </ResponsiveMenuWrap>
          <NavigationMenuWrap>
            <NavigationMunu
              active={currentPage === 'about'}
              onClick={() => navigate('/about')}
            >
              About
            </NavigationMunu>
            <NavigationMunu
              active={currentPage === 'site'}
              onClick={() => navigate('/site')}
            >
              Cabins
            </NavigationMunu>
            <NavigationMunu
              active={currentPage === 'reservation'}
              onClick={() => navigate('/reservation')}
            >
              Reservation
            </NavigationMunu>
          </NavigationMenuWrap>
          <SignWrap>
            {isLogin ? (
              <>
                {isAdmin ? (
                  <Sign onClick={() => navigate('/admin')}>Admin</Sign>
                ) : (
                  <Sign onClick={() => navigate('/mypage')}>MyPage</Sign>
                )}
                <Sign onClick={handleLogoutClick}>Logout</Sign>
              </>
            ) : (
              <>
                <Sign onClick={handleLoginClick}>Login</Sign>
                <Sign onClick={handleRegisterClick}>Register</Sign>
              </>
            )}
          </SignWrap>
        </NavigationBar>
      </NavigationBarWrap>
    </>
  );
};

export default Navbar;

const NavigationBarWrap = styled.header`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 999;
  background-color: white;
`;

const NavigationBar = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;

  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const LogoWrap = styled.div`
  width: 200px;
  height: 90%;
`;

const Logo = styled.img`
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const HamburgerButton = styled.div`
  display: none;
  width: 2rem;
  height: 2rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const ResponsiveMenuBackground = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99996;
`;

const ResponsiveMenuWrap = styled.ul`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60%;
  height: 100%;
  padding: 0;
  list-style: none;
  background-color: white;
  z-index: 99997;
`;

const ResponsiveMenu = styled.li`
  width: 100%;
  text-align: center;
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  padding: 0.5rem;

  &:first-child {
    margin-top: 1rem;
  }
`;

const ResponsiveBar = styled.div`
  width: 90%;
  height: 1px;
  margin: 1rem 0;
  border-bottom: 1px solid lightgray;
`;

const NavigationMenuWrap = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavigationMunu = styled.li`
  height: 100%;
  padding: 1rem 1.5rem;
  margin: 0 0.5rem;
  text-align: center;
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  border-bottom: 4px solid
    ${(props) => (props.active ? baseStyle.mainColor : 'white')};

  &:hover {
    cursor: pointer;
    color: ${baseStyle.navbarHoverColor};
  }
`;

const SignWrap = styled.ul`
  display: flex;
  margin: 0;
  justify-content: end;
  list-style: none;
  width: 200px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Sign = styled.li`
  font-size: ${baseStyle.navbarFontSize};
  color: ${baseStyle.navbarColor};
  transition: color 0.5s;

  &:hover {
    cursor: pointer;
    color: ${baseStyle.mainHoverColor};
  }

  & + & {
    margin-left: 2rem;
  }
`;
