import React, { useState, useEffect } from 'react';
import { PartyPopper, Gift, Heart, Star, Flame, Sparkles } from 'lucide-react';

function App() { // เปลี่ยนชื่อเป็น App เพื่อให้ตรงกับไฟล์เดิม
  const [stage, setStage] = useState('start'); // start, decorate, blow, message
  const [toppings, setToppings] = useState([]);
  const [selectedTopping, setSelectedTopping] = useState('🍓');
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [shakeGift, setShakeGift] = useState(false);

  // --- Logic for Balloons ---
  useEffect(() => {
    if (stage === 'message') {
      const interval = setInterval(() => {
        const id = Math.random().toString(36).substr(2, 9);
        const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 90; // percentage

        setBalloons((prev) => [
          ...prev,
          { id, color: randomColor, left, bottom: -10, popped: false }
        ]);
      }, 800);

      const cleanup = setInterval(() => {
        setBalloons((prev) => prev.filter(b => b.bottom < 110 && !b.popped));
      }, 2000);

      const moveBalloons = setInterval(() => {
        setBalloons((prev) => prev.map(b => ({ ...b, bottom: b.bottom + 0.5 })));
      }, 50);

      return () => {
        clearInterval(interval);
        clearInterval(cleanup);
        clearInterval(moveBalloons);
      };
    }
  }, [stage]);

  const popBalloon = (id) => {
    setBalloons((prev) => prev.filter(b => b.id !== id));
  };

  // --- Logic for Cake Decoration ---
  const handleAddTopping = (e) => {
    if (stage !== 'decorate') return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (y > 50 && y < 250) {
        setToppings([...toppings, { id: Date.now(), x, y, icon: selectedTopping }]);
    }
  };

  // --- Screens ---

  const StartScreen = () => (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in space-y-6 text-center p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-md mb-4">
        Happy Birthday!
      </h1>
      <div className="text-2xl font-bold text-pink-600 mb-8 animate-bounce">
        น้องฟอร์จูน
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-yellow-300 max-w-sm">
        <p className="text-lg text-gray-700 mb-4 font-medium">
          พี่มีการ์ดวิเศษมาฝาก! <br/>แต่ต้องช่วยพี่ทำเค้กก่อนนะ
        </p>
        <button 
          onClick={() => setStage('decorate')}
          className="bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto w-full"
        >
          <PartyPopper size={24} /> เริ่มงานปาร์ตี้!
        </button>
      </div>
    </div>
  );

  const DecorateScreen = () => (
    <div className="flex flex-col items-center h-full pt-4 w-full">
      <h2 className="text-2xl font-bold text-purple-700 mb-2">แต่งหน้าเค้กกันเถอะ!</h2>
      <p className="text-sm text-gray-500 mb-4">เลือกของแต่งแล้วจิ้มที่เค้กเลย</p>

      <div className="flex gap-4 mb-4 bg-white p-3 rounded-2xl shadow-md">
        {['🍓', '🍫', '⭐️', '❤️', '🍪'].map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopping(t)}
            className={`text-3xl p-2 rounded-lg transition transform hover:scale-110 ${selectedTopping === t ? 'bg-yellow-100 ring-2 ring-yellow-400' : ''}`}
          >
            {t}
          </button>
        ))}
        <button 
            onClick={() => setToppings([])} 
            className="text-sm text-red-500 font-bold border border-red-200 rounded px-2 hover:bg-red-50"
        >
            ล้าง
        </button>
      </div>

      <div 
        className="relative w-72 h-64 cursor-pointer group" 
        onClick={handleAddTopping}
      >
        <div className="absolute bottom-0 w-full h-32 bg-amber-200 rounded-lg shadow-xl border-b-8 border-amber-300"></div>
        <div className="absolute bottom-32 w-full h-12 bg-white rounded-t-lg opacity-80 z-10"></div>
        <div className="absolute bottom-24 w-64 left-4 h-24 bg-pink-300 rounded-lg shadow-inner border-b-8 border-pink-400"></div>
        <div className="absolute bottom-48 w-64 left-4 h-10 bg-white rounded-t-lg opacity-90 z-20"></div> 

        {toppings.map((t) => (
            <div 
                key={t.id} 
                className="absolute text-2xl pointer-events-none animate-pop-in"
                style={{ left: t.x - 12, top: t.y - 12, zIndex: 30 }}
            >
                {t.icon}
            </div>
        ))}
        
        {toppings.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <span className="bg-white px-2 py-1 rounded text-xs text-gray-400">จิ้มตรงนี้เพื่อแต่งเค้ก</span>
            </div>
        )}
      </div>

      <button 
        onClick={() => setStage('blow')}
        disabled={toppings.length < 3}
        className={`mt-8 py-3 px-8 rounded-full text-xl font-bold text-white shadow-lg transition-all ${toppings.length < 3 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:scale-105'}`}
      >
        {toppings.length < 3 ? 'แต่งอีกนิดนะ...' : 'เสร็จแล้ว! จุดเทียนเลย'}
      </button>
    </div>
  );

  const BlowScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h2 className="text-3xl font-bold text-orange-600">
        {candlesBlown ? "เย้! เก่งมาก!" : "เป่าเทียนเลย!"}
      </h2>

      <div className="relative w-72 h-64 mt-10">
        <div className="absolute bottom-0 w-full h-32 bg-amber-200 rounded-lg shadow-xl border-b-8 border-amber-300"></div>
        <div className="absolute bottom-24 w-64 left-4 h-24 bg-pink-300 rounded-lg shadow-inner border-b-8 border-pink-400"></div>
        
        {toppings.map((t) => (
            <div key={t.id} className="absolute text-2xl" style={{ left: t.x - 12, top: t.y - 12, zIndex: 30 }}>
                {t.icon}
            </div>
        ))}

        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex gap-6 z-40">
            {[1, 2, 3].map((i) => (
                <div key={i} className="relative flex flex-col items-center">
                    <div className={`transition-opacity duration-1000 ${candlesBlown ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-4 h-4 bg-yellow-400 rounded-full blur-[2px] animate-pulse absolute -top-4 left-1"></div>
                        <Flame className="text-orange-500 w-6 h-6 animate-flicker" fill="orange" />
                    </div>
                    <div className="w-4 h-12 bg-gradient-to-b from-blue-300 to-blue-500 border border-blue-600 rounded-sm"></div>
                </div>
            ))}
        </div>
      </div>

      {!candlesBlown ? (
        <button 
          onClick={() => {
            setCandlesBlown(true);
            setTimeout(() => setStage('gift'), 2500);
          }}
          className="bg-blue-500 text-white text-xl font-bold py-4 px-10 rounded-full shadow-xl hover:bg-blue-600 transform active:scale-95 animate-pulse"
        >
          💨 เป่าเทียน (กดตรงนี้)
        </button>
      ) : (
        <div className="text-xl text-gray-600 animate-fade-in font-medium">
            รอรับของขวัญแปปนึงนะ...
        </div>
      )}
    </div>
  );

  const GiftScreen = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
       <h2 className="text-2xl font-bold text-purple-600">ของขวัญสำหรับน้องฟอร์จูน</h2>
       <p className="text-gray-500">แตะที่กล่องเพื่อเปิดเลย!</p>
       
       <button 
         onClick={() => {
           setShakeGift(true);
           setTimeout(() => setStage('message'), 800);
         }}
         className={`relative group transition-transform ${shakeGift ? 'animate-shake' : 'hover:scale-105'}`}
       >
            <div className="w-48 h-48 bg-red-500 rounded-xl shadow-2xl flex items-center justify-center relative border-4 border-red-700">
                <div className="absolute inset-y-0 w-12 bg-yellow-400 left-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-x-0 h-12 bg-yellow-400 top-1/2 -translate-y-1/2"></div>
                <Gift className="w-24 h-24 text-white z-10" />
            </div>
            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-52 h-12 bg-red-600 rounded-lg shadow-md border-b-4 border-red-800 ${shakeGift ? 'origin-bottom-left rotate-12 transition-transform duration-300' : ''}`}></div>
       </button>
    </div>
  );

  const MessageScreen = () => (
    <div className="flex flex-col items-center h-full w-full relative overflow-hidden">
        {balloons.map((b) => (
            <div 
                key={b.id}
                onClick={(e) => { e.stopPropagation(); popBalloon(b.id); }}
                className={`absolute w-16 h-20 rounded-full cursor-pointer transition-transform active:scale-90 opacity-90 shadow-lg flex items-center justify-center ${b.color} border-b-8 border-black/10`}
                style={{ left: `${b.left}%`, bottom: `${b.bottom}%`, transition: 'bottom 0.1s linear' }}
            >
                <div className="w-2 h-6 bg-white/30 rounded-full absolute top-2 right-4 rotate-12"></div>
                <span className="text-white font-bold opacity-50 select-none">POP!</span>
                <div className="absolute top-full left-1/2 w-0.5 h-12 bg-gray-400"></div>
            </div>
        ))}

        <div className="z-10 bg-white/90 backdrop-blur-sm p-6 m-4 mt-12 rounded-3xl shadow-2xl border-4 border-pink-300 max-w-lg text-center animate-scale-up">
            <div className="flex justify-center -mt-16 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-200 to-pink-200 flex items-center justify-center text-4xl shadow-md border-4 border-white">
                    🎂
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-pink-600 mb-2">HBD น้องฟอร์จูน!</h1>
            <p className="text-xl font-bold text-purple-600 mb-4">อายุ 8 ขวบแล้วนะ (ป.2)</p>
            
            <div className="text-gray-700 space-y-2 mb-6 text-lg leading-relaxed">
                <p>ขอให้มีความสุขมากๆ นะครับ</p>
                <p>เป็นเด็กดี เรียนเก่งๆ สุขภาพแข็งแรง</p>
                <p className="font-semibold text-indigo-600">วันที่ 27 นี้ขอให้ได้ของขวัญเยอะๆ เลย!</p>
            </div>

            <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-1"><Sparkles className="text-blue-500" /></div>
                    <span className="text-xs text-gray-500">สดใส</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-pink-100 p-3 rounded-full mb-1"><Heart className="text-pink-500" /></div>
                    <span className="text-xs text-gray-500">น่ารัก</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-yellow-100 p-3 rounded-full mb-1"><Star className="text-yellow-500" /></div>
                    <span className="text-xs text-gray-500">เก่งมาก</span>
                </div>
            </div>
        </div>

        <div className="z-10 mt-auto mb-4 bg-white/80 px-4 py-2 rounded-full text-sm font-medium text-gray-600">
            🎈 จิ้มลูกโป่งให้แตกเลย! 🎈
        </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden font-sans select-none relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
         <div className="absolute top-10 left-10 text-pink-300 animate-spin-slow text-6xl">✿</div>
         <div className="absolute bottom-20 right-10 text-blue-300 animate-bounce text-6xl">★</div>
         <div className="absolute top-1/2 left-20 text-yellow-300 animate-pulse text-4xl">●</div>
      </div>

      {stage === 'start' && <StartScreen />}
      {stage === 'decorate' && <DecorateScreen />}
      {stage === 'blow' && <BlowScreen />}
      {stage === 'gift' && <GiftScreen />}
      {stage === 'message' && <MessageScreen />}
      
      {stage !== 'start' && (
         <button 
           onClick={() => {
               setStage('start');
               setToppings([]);
               setCandlesBlown(false);
               setBalloons([]);
               setShakeGift(false);
           }}
           className="absolute top-4 right-4 bg-white/50 p-2 rounded-full hover:bg-white text-gray-500 z-50"
         >
            🔄
         </button>
      )}
    </div>
  );
}

export default App;
