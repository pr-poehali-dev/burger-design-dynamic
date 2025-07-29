import React, { useState, useEffect } from 'react';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const maxChars = 50;
  const bitePercentage = (inputValue.length / maxChars) * 100;

  // Рассчитываем размер укуса для каждой булки
  const topBiteSize = Math.min(bitePercentage * 0.8, 80);
  const bottomBiteSize = Math.min(bitePercentage * 0.6, 60);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Неоновый фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/30 via-white to-pink-100/30"></div>
      
      {/* Неоновые частицы */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Заголовок */}
        <h1 className="text-6xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-neon-pulse">
          БУРГЕР
        </h1>

        {/* Бургер контейнер */}
        <div className="relative">
          {/* Верхняя булка */}
          <div className="relative mb-2">
            <div 
              className="w-80 h-20 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-full relative overflow-hidden shadow-lg shadow-yellow-500/50"
              style={{
                clipPath: topBiteSize > 0 
                  ? `polygon(0% 0%, ${100 - topBiteSize}% 0%, ${100 - topBiteSize * 0.8}% 30%, ${100 - topBiteSize * 0.6}% 70%, ${100 - topBiteSize}% 100%, 0% 100%)`
                  : 'none'
              }}
            >
              {/* Неоновое свечение булки */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 animate-pulse"></div>
              
              {/* Кунжут на булке */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-amber-800 rounded-full"
                  style={{
                    left: `${20 + (i * 8)}%`,
                    top: `${30 + (i % 2) * 20}%`,
                    opacity: topBiteSize > (i * 10) ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Поисковая строка (котлета) */}
          <div className="relative mb-2">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.slice(0, maxChars))}
                placeholder="Введите ваш запрос..."
                className="w-80 h-16 px-6 text-xl font-bold bg-gradient-to-r from-cyan-900 to-pink-900 border-4 border-cyan-400 rounded-full text-white placeholder-cyan-200 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-cyan-400/50 transition-all duration-300"
                style={{
                  textShadow: '0 0 10px currentColor',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(255, 0, 128, 0.1)'
                }}
              />
              
              {/* Неоновый эффект вокруг инпута */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-pulse pointer-events-none"></div>
            </div>
            
            {/* Счетчик символов */}
            <div className="absolute -bottom-8 right-0 text-cyan-400 text-sm font-mono">
              {inputValue.length}/{maxChars}
            </div>
          </div>

          {/* Нижняя булка */}
          <div className="relative">
            <div 
              className="w-80 h-20 bg-gradient-to-r from-yellow-700 to-orange-600 rounded-full relative overflow-hidden shadow-lg shadow-orange-500/50"
              style={{
                clipPath: bottomBiteSize > 0 
                  ? `polygon(0% 0%, 100% 0%, 100% 100%, ${bottomBiteSize}% 100%, ${bottomBiteSize * 0.6}% 70%, ${bottomBiteSize * 0.8}% 30%, ${bottomBiteSize}% 0%)`
                  : 'none'
              }}
            >
              {/* Неоновое свечение булки */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 animate-pulse"></div>
            </div>
          </div>

          {/* Эффект съедания */}
          {bitePercentage > 80 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-green-400 animate-bounce">
                СЪЕДЕН! 🍔
              </div>
            </div>
          )}
        </div>

        {/* Прогресс бар поедания */}
        <div className="mt-12 w-80">
          <div className="text-center text-cyan-400 text-lg font-bold mb-2">
            Прогресс поедания: {Math.round(bitePercentage)}%
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-cyan-400/50">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 transition-all duration-300 ease-out"
              style={{ 
                width: `${bitePercentage}%`,
                boxShadow: '0 0 10px currentColor'
              }}
            ></div>
          </div>
        </div>

        {/* Инструкция */}
        <div className="mt-8 text-center text-cyan-300/80 text-sm max-w-md">
          <p>Введите текст в поисковую строку и наблюдайте, как бургер постепенно съедается!</p>
          <p className="mt-2 text-pink-300/60">Максимум 50 символов = полностью съеденный бургер</p>
        </div>
      </div>
    </div>
  );
};

export default Index;