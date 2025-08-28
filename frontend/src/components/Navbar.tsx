import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, ChatBubbleLeftRightIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: '홈', href: '/', icon: HomeIcon },
    { name: '패턴', href: '/patterns', icon: BookOpenIcon },
    { name: '커뮤니티', href: '/community', icon: ChatBubbleLeftRightIcon },
    { name: '계산기', href: '/calculator', icon: CalculatorIcon },
  ];
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🧶</span>
              <span className="text-xl font-bold text-primary-600">스마뜨</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="btn btn-secondary btn-sm">로그인</button>
            <button className="btn btn-primary btn-sm">회원가입</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
