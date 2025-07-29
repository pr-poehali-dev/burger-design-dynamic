import React, { useState, useEffect } from 'react';

const Index = () => {
  const [inputValue, setInputValue] = useState('');
  const maxChars = 50;
  const bitePercentage = (inputValue.length / maxChars) * 100;

  // Генерируем рандомные укусы (фиксированные на основе символов)
  const generateBites = (text: string) => {
    const bites = [];
    const textHash = text.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    
    for (let i = 0; i < text.length; i++) {
      if (i % 8 === 0 || (i > 0 && text[i-1] === ' ')) { // Новый укус каждые 8 символов или после пробела
        const biteHash = textHash + i;
        const side = biteHash % 4; // 0=слева, 1=справа, 2=сверху, 3=снизу
        const depth = 15 + (biteHash % 25); // глубина 15-40%
        const position = 20 + (biteHash % 60); // позиция 20-80%
        
        bites.push({
          side,
          depth,
          position,
          startChar: i
        });
      }
    }
    return bites;
  };

  const topBites = generateBites(inputValue).filter((_, i) => i % 2 === 0);
  const bottomBites = generateBites(inputValue).filter((_, i) => i % 2 === 1);
  
  // Создаем форму с множественными укусами и следами зубов
  const createMultipleBitesShape = (bites: any[], isTop: boolean) => {
    if (bites.length === 0) return 'none';
    
    let points = [];
    
    if (isTop) {
      // Верхняя булка
      points = ['0% 0%'];
      
      for (let x = 0; x <= 100; x += 2) {
        let y = 0;
        
        // Проверяем все укусы
        for (const bite of bites) {
          const biteCenter = bite.position;
          const biteWidth = bite.depth;
          
          if (Math.abs(x - biteCenter) < biteWidth / 2) {
            const distFromCenter = Math.abs(x - biteCenter) / (biteWidth / 2);
            const biteDepth = Math.sin((1 - distFromCenter) * Math.PI) * (bite.depth * 0.6);
            
            // Добавляем неровности от зубов
            const toothPattern = Math.sin(x * 0.8) * 3 + Math.sin(x * 1.2) * 2;
            y = Math.max(y, biteDepth + toothPattern);
          }
        }
        
        points.push(`${x}% ${y}%`);
      }
      
      points.push('100% 0%', '100% 100%', '0% 100%');
    } else {
      // Нижняя булка
      points = ['0% 0%', '100% 0%', '100% 100%'];
      
      for (let x = 100; x >= 0; x -= 2) {
        let y = 100;
        
        // Проверяем все укусы
        for (const bite of bites) {
          const biteCenter = bite.position;
          const biteWidth = bite.depth;
          
          if (Math.abs(x - biteCenter) < biteWidth / 2) {
            const distFromCenter = Math.abs(x - biteCenter) / (biteWidth / 2);
            const biteDepth = Math.sin((1 - distFromCenter) * Math.PI) * (bite.depth * 0.6);
            
            // Добавляем неровности от зубов
            const toothPattern = Math.sin(x * 0.8) * 3 + Math.sin(x * 1.2) * 2;
            y = Math.min(y, 100 - biteDepth - toothPattern);
          }
        }
        
        points.push(`${x}% ${y}%`);
      }
      
      points.push('0% 100%');
    }
    
    return `polygon(${points.join(', ')})`;
  };

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
        <h1 className="text-6xl font-bold mb-16 text-gray-800">
          БУРГЕР
        </h1>

        {/* Бургер контейнер */}
        <div className="relative">
          {/* Верхняя булка */}
          <div className="relative mb-2">
            <div 
              className="w-80 h-20 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-full relative overflow-hidden shadow-lg shadow-yellow-500/50"
              style={{
                clipPath: createMultipleBitesShape(topBites, true)
              }}
            >
              {/* Неоновое свечение булки */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 animate-pulse"></div>
              
              {/* Кунжут на булке */}
              {[...Array(12)].map((_, i) => {
                const seedLeft = 15 + (i * 6) + (i % 3) * 3;
                const seedTop = 25 + (i % 4) * 12;
                
                // Проверяем, попадает ли кунжут в область укуса
                const isEaten = topBites.some(bite => {
                  const distance = Math.abs(seedLeft - bite.position);
                  return distance < bite.depth / 2;
                });
                
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-amber-800 rounded-full transition-opacity duration-300"
                    style={{
                      left: `${seedLeft}%`,
                      top: `${seedTop}%`,
                      opacity: isEaten ? 0 : 1
                    }}
                  ></div>
                );
              })}
              
              {/* Следы от зубов */}
              {topBites.map((bite, i) => (
                <div key={i}>
                  {/* Основной след */}
                  <div 
                    className="absolute top-0 h-full bg-amber-900/20 rounded-full"
                    style={{
                      left: `${bite.position - bite.depth/2}%`,
                      width: `${bite.depth}%`,
                      clipPath: `ellipse(50% 40% at 50% 20%)`
                    }}
                  ></div>
                  {/* Отдельные следы зубов */}
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute w-1 h-3 bg-amber-900/40 rounded-full"
                      style={{
                        left: `${bite.position - bite.depth/4 + j * bite.depth/6}%`,
                        top: '10%'
                      }}
                    ></div>
                  ))}
                </div>
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
                className="w-80 h-16 px-6 text-xl font-bold bg-white border-4 border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/50 transition-all duration-300"
                style={{
                  textShadow: '0 0 10px currentColor',
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 20px rgba(255, 0, 128, 0.1)'
                }}
              />
              
              {/* Неоновый эффект вокруг инпута */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-pulse pointer-events-none"></div>
            </div>
            
            {/* Счетчик символов */}
            <div className="absolute -bottom-8 right-0 text-gray-600 text-sm font-mono">
              {inputValue.length}/{maxChars}
            </div>
          </div>

          {/* Нижняя булка */}
          <div className="relative">
            <div 
              className="w-80 h-20 bg-gradient-to-r from-yellow-700 to-orange-600 rounded-full relative overflow-hidden shadow-lg shadow-orange-500/50"
              style={{
                clipPath: createMultipleBitesShape(bottomBites, false)
              }}
            >
              {/* Неоновое свечение булки */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 animate-pulse"></div>
              
              {/* Следы от зубов */}
              {bottomBites.map((bite, i) => (
                <div key={i}>
                  {/* Основной след */}
                  <div 
                    className="absolute bottom-0 h-full bg-amber-900/20 rounded-full"
                    style={{
                      left: `${bite.position - bite.depth/2}%`,
                      width: `${bite.depth}%`,
                      clipPath: `ellipse(50% 40% at 50% 80%)`
                    }}
                  ></div>
                  {/* Отдельные следы зубов */}
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="absolute w-1 h-3 bg-amber-900/40 rounded-full"
                      style={{
                        left: `${bite.position - bite.depth/4 + j * bite.depth/6}%`,
                        bottom: '10%'
                      }}
                    ></div>
                  ))}
                </div>
              ))}
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
          <div className="text-center text-gray-700 text-lg font-bold mb-2">
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
        <div className="mt-8 text-center text-gray-600 text-sm max-w-md">
          <p>Введите текст в поисковую строку и наблюдайте, как бургер постепенно съедается!</p>
          <p className="mt-2 text-gray-500">Максимум 50 символов = полностью съеденный бургер</p>
        </div>
      </div>
    </div>
  );
};

export default Index;