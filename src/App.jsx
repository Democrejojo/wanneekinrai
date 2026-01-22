import React, { useState, useEffect } from 'react';

// --------------------------------------------------------
// DATABASE: ปลอดภัยจากไก่และน้ำส้ม 100%
// --------------------------------------------------------
const foodDatabase = [
    // --- ของโปรดที่รัก (Favorites) ---
    { name: "แกงส้มชะอมกุ้งไข่ทอด", type: "curry", mood: "zesty", spicy: true, emoji: "🥘" },
    { name: "ข้าวหมกเนื้อ (หอมเครื่องเทศ)", type: "rice", mood: "hungry", spicy: true, emoji: "🍛" },
    { name: "กุ้งดองซีอิ๊วเกาหลี", type: "salad", mood: "zesty", spicy: true, emoji: "🦐" },
    { name: "แซลมอนซาซิมิ / ดอง", type: "salad", mood: "fancy", spicy: false, emoji: "🍣" },
    { name: "ปลาหมึกผัดไข่เค็ม", type: "stirfry", mood: "comfort", spicy: false, emoji: "🦑" },
    { name: "ผัดผักบล็อกโคลี่กุ้งสด", type: "stirfry", mood: "healthy", spicy: false, emoji: "🥦" },

    // --- ต้ม / ซุป (Soup) ---
    { name: "ต้มยำกุ้งน้ำข้น", type: "soup", mood: "zesty", spicy: true, emoji: "🦐" },
    { name: "ต้มยำทะเลน้ำใส", type: "soup", mood: "zesty", spicy: true, emoji: "🐙" },
    { name: "ต้มโคล้งปลากรอบ", type: "soup", mood: "zesty", spicy: true, emoji: "🐟" },
    { name: "ต้มแซ่บกระดูกหมู", type: "soup", mood: "zesty", spicy: true, emoji: "🍖" },
    { name: "ต้มแซ่บเอ็นแก้ว", type: "soup", mood: "zesty", spicy: true, emoji: "🍲" },
    { name: "ต้มจืดเต้าหู้หมูสับ", type: "soup", mood: "comfort", spicy: false, emoji: "🥣" },
    { name: "ต้มจืดสาหร่ายหมูสับ", type: "soup", mood: "comfort", spicy: false, emoji: "🥬" },
    { name: "ต้มจืดผักกาดขาวเห็ดหอม", type: "soup", mood: "healthy", spicy: false, emoji: "🍄" },
    { name: "ต้มจืดมะระยัดไส้", type: "soup", mood: "healthy", spicy: false, emoji: "🥒" },
    { name: "ต้มยำปลาน้ำใส", type: "soup", mood: "zesty", spicy: true, emoji: "🐟" },
    { name: "ต้มข่าเห็ดรวม", type: "soup", mood: "comfort", spicy: false, emoji: "🥥" },
    { name: "ซุปเห็ดหอม", type: "soup", mood: "healthy", spicy: false, emoji: "🍄" },
    { name: "ซุปผักรวม", type: "soup", mood: "healthy", spicy: false, emoji: "🥕" },
    { name: "ซุปสาหร่ายไข่ขาว", type: "soup", mood: "healthy", spicy: false, emoji: "🥣" },

    // --- แกง (Curry) ---
    { name: "แกงเขียวหวานหมู", type: "curry", mood: "hungry", spicy: true, emoji: "🥘" },
    { name: "แกงเขียวหวานลูกชิ้นปลา", type: "curry", mood: "hungry", spicy: true, emoji: "🍡" },
    { name: "แกงเผ็ดหมู", type: "curry", mood: "hungry", spicy: true, emoji: "🍛" },
    { name: "แกงเผ็ดเป็ดย่าง", type: "curry", mood: "fancy", spicy: true, emoji: "🦆" },
    { name: "แกงพะแนงหมู", type: "curry", mood: "comfort", spicy: true, emoji: "🍛" },
    { name: "แกงพะแนงเนื้อ", type: "curry", mood: "comfort", spicy: true, emoji: "🥩" },
    { name: "แกงมัสมั่นเนื้อ", type: "curry", mood: "heavy", spicy: true, emoji: "🥔" },
    { name: "แกงมัสมั่นหมู", type: "curry", mood: "heavy", spicy: true, emoji: "🥓" },
    { name: "แกงส้มผักรวม", type: "curry", mood: "healthy", spicy: true, emoji: "🥘" },
    { name: "แกงเลียงกุ้งสด", type: "curry", mood: "healthy", spicy: true, emoji: "🦐" },
    { name: "แกงเลียงผักรวม", type: "curry", mood: "healthy", spicy: true, emoji: "🥬" },
    { name: "แกงเห็ดสามอย่าง", type: "curry", mood: "healthy", spicy: true, emoji: "🍄" },
    { name: "แกงหน่อไม้", type: "curry", mood: "zesty", spicy: true, emoji: "🎍" },
    { name: "แกงจืดวุ้นเส้นหมูสับ", type: "curry", mood: "comfort", spicy: false, emoji: "🍲" },

    // --- ผัด (Stir-fry) ---
    { name: "ผัดกะเพราหมูสับ", type: "stirfry", mood: "angry", spicy: true, emoji: "🍳" },
    { name: "ผัดกะเพราเนื้อ", type: "stirfry", mood: "angry", spicy: true, emoji: "🥩" },
    { name: "ผัดกะเพราทะเล", type: "stirfry", mood: "angry", spicy: true, emoji: "🦑" },
    { name: "ผัดพริกเกลือกุ้ง", type: "stirfry", mood: "zesty", spicy: true, emoji: "🦐" },
    { name: "ผัดพริกเกลือหมึก", type: "stirfry", mood: "zesty", spicy: true, emoji: "🐙" },
    { name: "ผัดคะน้าหมูกรอบ", type: "stirfry", mood: "hungry", spicy: true, emoji: "🥬" },
    { name: "ผัดคะน้าน้ำมันหอย", type: "stirfry", mood: "healthy", spicy: false, emoji: "🥬" },
    { name: "ผัดผักรวมมิตร", type: "stirfry", mood: "healthy", spicy: false, emoji: "🥦" },
    { name: "ผัดผักบุ้งไฟแดง", type: "stirfry", mood: "hungry", spicy: true, emoji: "🌿" },
    { name: "ผัดซีอิ๊วหมู", type: "stirfry", mood: "comfort", spicy: false, emoji: "🥢" },
    { name: "ผัดซีอิ๊วทะเล", type: "stirfry", mood: "comfort", spicy: false, emoji: "🦐" },
    { name: "ผัดมะเขือยาวหมูสับ", type: "stirfry", mood: "healthy", spicy: true, emoji: "🍆" },
    { name: "ผัดเห็ดน้ำมันหอย", type: "stirfry", mood: "healthy", spicy: false, emoji: "🍄" },
    { name: "ผัดถั่วงอกเต้าหู้", type: "stirfry", mood: "healthy", spicy: false, emoji: "🌱" },
    { name: "ผัดวุ้นเส้นทะเล", type: "stirfry", mood: "comfort", spicy: false, emoji: "🍝" },

    // --- ทอด (Fried) ---
    { name: "หมูทอดกระเทียม", type: "fried", mood: "hungry", spicy: false, emoji: "🐷" },
    { name: "หมูทอดน้ำปลา", type: "fried", mood: "hungry", spicy: false, emoji: "🥓" },
    { name: "ปลาทอดน้ำปลา", type: "fried", mood: "comfort", spicy: false, emoji: "🐟" },
    { name: "ปลาทอดขมิ้น", type: "fried", mood: "comfort", spicy: false, emoji: "🐠" },
    { name: "ปลาทอดราดพริก", type: "fried", mood: "zesty", spicy: true, emoji: "🌶️" },
    { name: "กุ้งทอดกระเทียม", type: "fried", mood: "hungry", spicy: false, emoji: "🦐" },
    { name: "หมึกทอดกระเทียม", type: "fried", mood: "hungry", spicy: false, emoji: "🦑" },
    { name: "หมูแดดเดียว", type: "fried", mood: "hungry", spicy: false, emoji: "🥩" },
    { name: "เนื้อแดดเดียว", type: "fried", mood: "hungry", spicy: false, emoji: "🥩" },
    { name: "ไข่เจียวหมูสับ", type: "fried", mood: "comfort", spicy: false, emoji: "🍳" },
    { name: "ไข่เจียวสมุนไพร", type: "fried", mood: "healthy", spicy: false, emoji: "🌿" },
    { name: "เต้าหู้ทอด", type: "fried", mood: "healthy", spicy: false, emoji: "🧊" },
    { name: "เฟรนช์ฟรายส์", type: "fried", mood: "party", spicy: false, emoji: "🍟" },
    { name: "ปอเปี๊ยะทอดไส้ผัก", type: "fried", mood: "party", spicy: false, emoji: "🌯" },

    // --- ยำ / สลัด (Salad/Yum) ---
    { name: "ยำวุ้นเส้นทะเล", type: "salad", mood: "zesty", spicy: true, emoji: "🍋" },
    { name: "ยำหมูยอ", type: "salad", mood: "zesty", spicy: true, emoji: "🥓" },
    { name: "ยำปลาดุกฟู", type: "salad", mood: "party", spicy: true, emoji: "🐟" },
    { name: "ยำปลากระป๋อง", type: "salad", mood: "lazy", spicy: true, emoji: "🥫" },
    { name: "ยำไข่เค็ม", type: "salad", mood: "comfort", spicy: true, emoji: "🥚" },
    { name: "ยำเห็ดรวม", type: "salad", mood: "healthy", spicy: true, emoji: "🍄" },
    { name: "ยำสาหร่ายญี่ปุ่น", type: "salad", mood: "chill", spicy: false, emoji: "🥗" },
    { name: "ยำถั่วพู", type: "salad", mood: "zesty", spicy: true, emoji: "🥜" },
    { name: "ยำทะเล", type: "salad", mood: "zesty", spicy: true, emoji: "🦐" },
    { name: "ยำมะม่วงปลากรอบ", type: "salad", mood: "zesty", spicy: true, emoji: "🥭" },
    { name: "สลัดผักน้ำใส", type: "salad", mood: "healthy", spicy: false, emoji: "🥗" },
    { name: "สลัดทูน่า", type: "salad", mood: "healthy", spicy: false, emoji: "🐟" },
    { name: "สลัดเต้าหู้", type: "salad", mood: "healthy", spicy: false, emoji: "🧊" },

    // --- ข้าว / เส้น (Rice/Noodle) ---
    { name: "ข้าวผัดหมู", type: "rice", mood: "chill", spicy: false, emoji: "🍛" },
    { name: "ข้าวผัดกุ้ง", type: "rice", mood: "chill", spicy: false, emoji: "🍤" },
    { name: "ข้าวผัดทะเล", type: "rice", mood: "chill", spicy: false, emoji: "🐙" },
    { name: "ข้าวผัดไข่", type: "rice", mood: "lazy", spicy: false, emoji: "🍳" },
    { name: "ข้าวคลุกกะปิ (ไม่ใส่ไก่หวาน)", type: "rice", mood: "fancy", spicy: false, emoji: "🍛" },
    { name: "ข้าวหมูทอดกระเทียม", type: "rice", mood: "hungry", spicy: false, emoji: "🐷" },
    { name: "ข้าวหมูแดง", type: "rice", mood: "heavy", spicy: false, emoji: "🍖" },
    { name: "ข้าวหมูกรอบ", type: "rice", mood: "heavy", spicy: false, emoji: "🥓" },
    { name: "ข้าวหน้าเนื้อ", type: "rice", mood: "heavy", spicy: false, emoji: "🥩" },
    { name: "ข้าวหน้าไข่ข้น", type: "rice", mood: "comfort", spicy: false, emoji: "🍳" },
    { name: "ราดหน้าหมู", type: "noodle", mood: "comfort", spicy: false, emoji: "🍜" },
    { name: "ราดหน้าทะเล", type: "noodle", mood: "comfort", spicy: false, emoji: "🦐" },
    { name: "ผัดไทยกุ้งสด", type: "noodle", mood: "fancy", spicy: false, emoji: "🍝" },
    { name: "ก๋วยเตี๋ยวคั่วทะเล", type: "noodle", mood: "slurpy", spicy: false, emoji: "🍳" },
    { name: "เส้นใหญ่ผัดซีอิ๊ว", type: "noodle", mood: "hungry", spicy: false, emoji: "🥢" },

    // --- มังสวิรัติ / สุขภาพ (Healthy) ---
    { name: "ต้มจืดเต้าหู้ผัก", type: "healthy", mood: "healthy", spicy: false, emoji: "🥬" },
    { name: "ผัดผักรวม (น้ำมันน้อย)", type: "healthy", mood: "healthy", spicy: false, emoji: "🥦" },
    { name: "ผัดเห็ดสามอย่าง", type: "healthy", mood: "healthy", spicy: false, emoji: "🍄" },
    { name: "ผัดเต้าหู้ซอสเห็ด", type: "healthy", mood: "healthy", spicy: false, emoji: "🍱" },
    { name: "แกงเห็ด (เจ)", type: "healthy", mood: "healthy", spicy: true, emoji: "🍲" },
    { name: "ซุปผัก", type: "healthy", mood: "healthy", spicy: false, emoji: "🥣" },
    { name: "ข้าวผัดผัก", type: "healthy", mood: "healthy", spicy: false, emoji: "🥕" },
    { name: "เต้าหู้ทอดสมุนไพร", type: "healthy", mood: "healthy", spicy: false, emoji: "🧊" },

    // --- ของหวาน (Dessert) ---
    { name: "เค้กสตรอว์เบอร์รี่ครีมสด", type: "dessert", mood: "happy", spicy: false, emoji: "🍰" },
    { name: "บราวนี่ดาร์กช็อกโกแลต", type: "dessert", mood: "happy", spicy: false, emoji: "🍫" },
    { name: "ฮันนี่โทสต์ไอศกรีม", type: "dessert", mood: "party", spicy: false, emoji: "🍞" },
    { name: "บิงซูผลไม้รวม", type: "dessert", mood: "chill", spicy: false, emoji: "🍧" }
];

const App = () => {
    const [step, setStep] = useState(0); // 0:Intro, 1:Mood, 2:Type, 3:Result, 4:LoveNote
    const [answers, setAnswers] = useState({ mood: "", type: "" });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // คำถาม Step 1: Mood
    const moodOptions = [
        { id: "angry", label: "หงุดหงิด/เครียด", icon: "😤", desc: "ขอรสจัดๆ แก้เครียด" },
        { id: "hungry", label: "หิวโซมาก", icon: "🐻", desc: "ขอกินเอาอิ่มจุกๆ" },
        { id: "chill", label: "ชิลๆ อะไรก็ได้", icon: "😌", desc: "กินง่ายๆ สบายท้อง" },
        { id: "fancy", label: "อยากทำตัวแพง", icon: "💅", desc: "ขอดีๆ มื้อนี้พิเศษ" },
        { id: "comfort", label: "นอยด์ๆ / ป่วย", icon: "🥺", desc: "ขอกินของร้อนๆ ปลอบใจ" }
    ];

    // คำถาม Step 2: Type (Grouped for better UI)
    const typeOptions = [
        { id: "rice_noodle", label: "ข้าว & เส้น", icon: "🍛", desc: "อาหารจานเดียว จบๆ" },
        { id: "soup_curry", label: "ต้ม & แกง", icon: "🍲", desc: "ซดน้ำร้อนๆ คล่องคอ" },
        { id: "stirfry_fried", label: "ผัด & ทอด", icon: "🍳", desc: "กับข้าวแห้งๆ กินเพลิน" },
        { id: "salad_healthy", label: "ยำ & สุขภาพ", icon: "🥗", desc: "แซ่บๆ หรือ คลีนๆ" },
        { id: "dessert", label: "ของหวาน", icon: "🍰", desc: "ร่างกายต้องการน้ำตาล" },
        { id: "surprise", label: "สุ่มมาเลย!", icon: "🎲", desc: "วัดดวงไปเลยค่ะพี่" }
    ];

    const handleStart = () => setStep(1);

    const handleMoodSelect = (moodId) => {
        setAnswers({ ...answers, mood: moodId });
        setTimeout(() => setStep(2), 300);
    };

    const handleTypeSelect = (typeId) => {
        setAnswers({ ...answers, type: typeId });
        setLoading(true);
        setStep(3);
        
        // Simulate processing time for effect
        setTimeout(() => {
            generateFood(answers.mood, typeId);
            setLoading(false);
        }, 1500);
    };

    const generateFood = (selectedMood, selectedType) => {
        // Logic การกรองแบบยืดหยุ่น
        let filtered = foodDatabase;

        // 1. กรองตามประเภท (Map ปุ่ม UI -> Database Types)
        if (selectedType !== 'surprise') {
            if (selectedType === 'rice_noodle') {
                filtered = filtered.filter(f => f.type === 'rice' || f.type === 'noodle');
            } else if (selectedType === 'soup_curry') {
                filtered = filtered.filter(f => f.type === 'soup' || f.type === 'curry');
            } else if (selectedType === 'stirfry_fried') {
                filtered = filtered.filter(f => f.type === 'stirfry' || f.type === 'fried');
            } else if (selectedType === 'salad_healthy') {
                filtered = filtered.filter(f => f.type === 'salad' || f.type === 'healthy');
            } else if (selectedType === 'dessert') {
                filtered = filtered.filter(f => f.type === 'dessert');
            }
        } else {
            // ถ้าสุ่ม (Surprise) จะไม่เอาของหวานรวมไปด้วย
            filtered = filtered.filter(f => f.type !== 'dessert');
        }

        // 2. กรองตามอารมณ์ (Weighted Random)
        const moodMatches = filtered.filter(f => {
            if (selectedType === 'dessert') return true; 
            
            // Logic อารมณ์ที่ฉลาดขึ้น
            if (selectedMood === 'angry') return f.spicy === true || f.mood === 'angry';
            if (selectedMood === 'hungry') return f.mood === 'hungry' || f.mood === 'heavy' || f.type === 'rice' || f.type === 'fried';
            if (selectedMood === 'comfort') return f.mood === 'comfort' || f.type === 'soup';
            if (selectedMood === 'chill') return !f.spicy;
            if (selectedMood === 'fancy') return f.mood === 'fancy' || f.name.includes('เนื้อ') || f.name.includes('ซูชิ') || f.name.includes('แซลมอน');
            
            return true;
        });

        const candidatePool = moodMatches.length > 0 ? moodMatches : filtered;
        
        // Random Selection
        const randomItem = candidatePool[Math.floor(Math.random() * candidatePool.length)];
        setResult(randomItem);
    };

    const resetGame = () => {
        setStep(0);
        setAnswers({ mood: "", type: "" });
        setResult(null);
    };

    const reSpin = () => {
        setLoading(true);
        setTimeout(() => {
            generateFood(answers.mood, answers.type);
            setLoading(false);
        }, 800);
    };

    // --- Styles ---
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap');
        
        .font-prompt {
            font-family: 'Prompt', sans-serif;
        }
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .emoji-bounce {
            animation: bounce 2s infinite;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;

    return (
        <div className="font-prompt min-h-screen bg-pink-50 text-gray-800 selection:bg-rose-200">
            <style>{styles}</style>

            {/* Screen 0: Intro */}
            {step === 0 && (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-pink-50 to-rose-100">
                    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full fade-in border-4 border-pink-200">
                        <div className="text-6xl mb-4 emoji-bounce">👧🏻🐷</div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">เบบี๋กินไรดี?</h1>
                        <p className="text-gray-500 mb-8 text-sm">ไม่ต้องคิดเองเดี๋ยวเค้าช่วยเลือก<br/>ตามใจหนูทุกอย่างเลยครับ</p>
                        <button 
                            onClick={handleStart}
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95 text-lg"
                        >
                            เริ่มสุ่มเลย! 🚀
                        </button>
                    </div>
                </div>
            )}

            {/* Screen 1 & 2: Questionnaire */}
            {(step === 1 || step === 2) && (
                <div className="min-h-screen flex flex-col items-center pt-8 px-4 bg-pink-50 pb-8">
                    <div className="max-w-md w-full fade-in">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-gray-600 font-medium">
                                &larr; ย้อนกลับ
                            </button>
                            <span className="text-rose-400 font-bold">Step {step}/2</span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                            {step === 1 ? "ตอนนี้อารมณ์ไหนคะ?" : "อยากกินแนวไหนดี?"}
                        </h2>
                        <p className="text-gray-500 text-center mb-6">
                            {step === 1 ? "บอกเค้าหน่อยน้าาเตง" : "เลือกมาเลย ตามใจเธอ"}
                        </p>

                        <div className={`grid ${step === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                            {(step === 1 ? moodOptions : typeOptions).map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => step === 1 ? handleMoodSelect(opt.id) : handleTypeSelect(opt.id)}
                                    className={`w-full bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent hover:border-rose-300 hover:bg-rose-50 transition-all flex items-center group text-left ${opt.id === 'dessert' ? 'border-pink-200 bg-pink-50' : ''} ${step === 2 ? 'flex-col items-center text-center justify-center h-32' : ''}`}
                                >
                                    <span className={`${step === 2 ? 'text-4xl mb-2' : 'text-4xl mr-4'} group-hover:scale-110 transition-transform`}>{opt.icon}</span>
                                    <div>
                                        <div className={`font-bold ${step === 2 ? 'text-base' : 'text-lg'} ${opt.id === 'dessert' ? 'text-pink-600' : 'text-gray-800'}`}>{opt.label}</div>
                                        <div className={`text-gray-400 text-xs ${step === 2 ? 'hidden' : 'block'}`}>{opt.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Screen 3: Loading */}
            {loading && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
                    <div className="text-6xl animate-spin mb-4">🌪️</div>
                    <h2 className="text-xl font-bold text-gray-700">กำลังประมวลผลความถูกใจที่รัก...</h2>
                    <p className="text-rose-400 text-sm mt-2">คัดกรองไก่และน้ำส้มออกแล้ว ✅</p>
                </div>
            )}

            {/* Screen 3: Result */}
            {step === 3 && result && !loading && (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-rose-100 to-pink-50">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full text-center fade-in border-4 border-white relative overflow-hidden">
                        
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-rose-100 rounded-tr-full -ml-4 -mb-4 opacity-50"></div>

                        <div className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-4">Menu Selected</div>
                        
                        <div className="mb-6 transform transition hover:scale-110 duration-300 cursor-pointer">
                            <div className="text-8xl mb-2 drop-shadow-md">{result.emoji}</div>
                        </div>
                        
                        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-2">
                            {result.name}
                        </h1>
                        
                        <div className="flex justify-center gap-2 mb-8">
                            <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">
                                {result.type === 'dessert' ? '🍰 ของหวาน' : (result.spicy ? "🌶️ รสจัดจ้าน" : "😋 รสกลมกล่อม")}
                            </span>
                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                                No Chicken 🐔❌
                            </span>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setStep(4)}
                                className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-rose-600 shadow-lg transform transition hover:scale-105 mb-2"
                            >
                                ตกลง เลือกเมนูนี้! ❤️
                            </button>
                            <button 
                                onClick={reSpin}
                                className="w-full bg-white border-2 border-rose-500 text-rose-500 font-bold py-3 px-6 rounded-xl hover:bg-rose-50 transition"
                            >
                                ไม่เอาอ่า... สุ่มใหม่ 🎲
                            </button>
                            <button 
                                onClick={resetGame}
                                className="w-full bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition text-sm"
                            >
                                เล่นใหม่ตั้งแต่ต้น 🔄
                            </button>
                        </div>
                        
                        <div className="mt-6 text-xs text-gray-400">
                            "กินให้อร่อยนะค้าบคนเก่ง" ❤️
                        </div>
                    </div>
                </div>
            )}

            {/* Screen 4: Final Love Message */}
            {step === 4 && (
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-rose-100 to-pink-200">
                    <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full fade-in border-4 border-rose-300 relative overflow-hidden">
                        
                        {/* Floating Hearts Animation */}
                        <div className="text-6xl mb-6 emoji-bounce">👩‍❤️‍💋‍👨</div>
                        
                        <h1 className="text-2xl font-bold text-rose-600 mb-4">เค้ารักเทอนะคะ ❤️</h1>
                        
                        <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                            ไม่ว่าเทอจะเลือกกินอะไร ก็ขอให้กินอย่างอร่อยยยมากกเหมือนมีเค้านั่งกินอยุ่ด้วยเลยยย
                        </p>
                        
                        <div className="bg-rose-50 p-4 rounded-xl mb-8 border border-rose-100 relative">
                            {/* Decorative Quote mark */}
                            <span className="absolute top-0 left-2 text-4xl text-rose-200 -mt-2">"</span>
                            <p className="text-rose-500 italic text-sm font-semibold relative z-10">
                                "เค้าอาจจะเลือกไม่ถูกใจ...<br/>
                                เเต่คนใดที่โดนเจียว คือคนเดียวที่โดนใจ ฮิ้ววว~" 😘
                            </p>
                        </div>

                        <button 
                            onClick={resetGame}
                            className="w-full bg-white border-2 border-rose-400 text-rose-500 font-bold py-3 px-6 rounded-xl hover:bg-rose-50 transition"
                        >
                            เล่นใหม่อีกรอบ 🔄
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;