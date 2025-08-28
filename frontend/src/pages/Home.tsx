import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparklesIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      name: '패턴 공유',
      description: '나만의 뜨개질 패턴을 업로드하고 다른 사람들과 공유해보세요.',
      icon: ShareIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: '커뮤니티',
      description: '뜨개질 애호가들과 소통하며 팁과 경험을 나눠보세요.',
      icon: HeartIcon,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
    {
      name: '스마트 계산기',
      description: '프로젝트에 필요한 실의 양과 재료를 정확히 계산해드립니다.',
      icon: SparklesIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🧶 스마뜨
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              뜨개질 애호가들을 위한 패턴 공유 및 커뮤니티 플랫폼
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/patterns"
                className="btn btn-lg bg-white text-primary-600 hover:bg-gray-50 inline-flex items-center"
              >
                패턴 둘러보기
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/patterns/create"
                className="btn btn-lg bg-primary-800 text-white hover:bg-primary-900 border border-primary-500"
              >
                패턴 업로드하기
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 스마뜨인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              뜨개질을 더 즐겁고 쉽게 만들어주는 다양한 기능들을 제공합니다
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="card text-center hover:shadow-md transition-shadow">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-4`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            지금 시작해보세요!
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            무료로 계정을 만들고 뜨개질 커뮤니티에 참여해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community" className="btn btn-primary btn-lg">
              커뮤니티 둘러보기
            </Link>
            <Link to="/calculator" className="btn btn-secondary btn-lg">
              재료 계산기 사용하기
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">🧶</span>
              <span className="text-xl font-bold">스마뜨</span>
            </div>
            <p className="text-gray-400 mb-2">뜨개질 애호가들을 위한 커뮤니티 플랫폼</p>
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-sm text-gray-500">
                Made by <span className="text-primary-400 font-semibold">지현정</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                © 2024 스마뜨. 뜨개질을 더 즐겁게.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
