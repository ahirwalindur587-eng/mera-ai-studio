import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Film, Image, Mic, WandSparkles, Download, Smartphone, Globe, Sparkles, Upload, Play, CircleHelp, ExternalLink } from 'lucide-react';
import './style.css';

const kinds = [
  { id: 'text', icon: WandSparkles, title: 'टेक्स्ट से वीडियो', desc: 'अपना आइडिया लिखें' },
  { id: 'photo', icon: Image, title: 'फोटो से वीडियो', desc: 'तस्वीर चुनें' },
  { id: 'real', icon: Film, title: 'Realistic AI', desc: 'असली जैसे दृश्य' },
  { id: 'cartoon', icon: Sparkles, title: 'कार्टून / एनिमेशन', desc: 'रंगीन कहानियाँ' },
  { id: 'horror', icon: CircleHelp, title: 'हॉरर / कहानी', desc: 'सीन और कहानी' },
];

function App() {
  const [kind, setKind] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [ratio, setRatio] = useState('9:16');
  const [duration, setDuration] = useState('5');
  const [voice, setVoice] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [notice, setNotice] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  function chooseImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setKind('photo');
    setNotice('');
  }

  function startGeneration() {
    if (!prompt.trim() && !imageFile) {
      setNotice('पहले अपना वीडियो आइडिया लिखें या फोटो अपलोड करें।');
      return;
    }
    setNotice('यह शुरुआती डेमो UI है। असली AI वीडियो बनाने के लिए किसी वीडियो मॉडल/सेवा को जोड़ना होगा। अभी कोई वीडियो जनरेट नहीं हुआ है।');
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" aria-label="Mera AI Studio home"><span className="brand-icon"><Film size={21}/></span><span>Mera <b>AI Studio</b></span></a>
      <div className="platform-badges"><span><Smartphone size={15}/> Android</span><span><Globe size={15}/> Web</span></div>
    </header>

    <main>
      <section className="hero">
        <div className="eyebrow"><Sparkles size={15}/> आपका क्रिएटिव AI स्टूडियो</div>
        <h1>आपका आइडिया.<br/><span>आपका वीडियो.</span></h1>
        <p>टेक्स्ट, फोटो, कार्टून या कहानी — अपना अगला वीडियो बनाने की शुरुआत यहाँ से करें।</p>
        <div className="hero-pills"><span>✓ हिंदी फ्रेंडली</span><span>✓ Shorts & Reels</span><span>✓ मोबाइल + कंप्यूटर</span></div>
      </section>

      <section className="workspace">
        <div className="section-heading"><div><span className="step">01</span><h2>वीडियो का प्रकार चुनें</h2></div><span className="muted">अपनी स्टाइल चुनें</span></div>
        <div className="kind-grid">
          {kinds.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`kind-card ${kind === item.id ? 'selected' : ''}`} onClick={() => {setKind(item.id); setNotice('');}}>
              <span className="kind-icon"><Icon size={21}/></span><span className="kind-title">{item.title}</span><span className="kind-desc">{item.desc}</span>
            </button>
          })}
        </div>

        <div className="section-heading second"><div><span className="step">02</span><h2>अपना वीडियो बनाएँ</h2></div></div>
        <label className="field-label" htmlFor="prompt">वीडियो में क्या दिखाना है?</label>
        <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="उदाहरण: बारिश वाली रात में एक रहस्यमयी पुराने महल के बाहर खड़ा लड़का, सिनेमैटिक लाइटिंग..." rows="4"/>
        <div className="field-row">
          <div className="field-group"><label className="field-label" htmlFor="ratio">वीडियो का आकार</label><select id="ratio" value={ratio} onChange={e => setRatio(e.target.value)}><option value="9:16">9:16 — Shorts / Reels</option><option value="16:9">16:9 — YouTube</option><option value="1:1">1:1 — Square</option></select></div>
          <div className="field-group"><label className="field-label" htmlFor="duration">लंबाई</label><select id="duration" value={duration} onChange={e => setDuration(e.target.value)}><option value="5">5 सेकंड</option><option value="10">10 सेकंड</option><option value="15">15 सेकंड</option><option value="30">30 सेकंड</option></select></div>
        </div>

        <label className="field-label">फोटो जोड़ें (वैकल्पिक)</label>
        <label className="upload-box">
          {previewUrl ? <img className="upload-preview" src={previewUrl} alt="अपलोड की गई फोटो"/> : <span className="upload-icon"><Upload size={22}/></span>}
          <span><b>{imageFile ? imageFile.name : 'फोटो चुनने के लिए टैप करें'}</b><small>JPG, PNG, WEBP — फोटो से वीडियो के लिए</small></span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseImage}/>
        </label>

        <label className="voice-option"><span className="voice-icon"><Mic size={18}/></span><span><b>हिंदी AI वॉइस</b><small>वीडियो में वॉइस जोड़ने का विकल्प</small></span><input type="checkbox" checked={voice} onChange={e => setVoice(e.target.checked)}/><span className="switch"></span></label>
        <button className="generate-btn" onClick={startGeneration}><WandSparkles size={19}/> वीडियो बनाने की तैयारी करें <span>→</span></button>
        {notice && <div className="notice" role="status">{notice}</div>}
        <p className="fine-print">डेमो वर्जन: यह इंटरफ़ेस अभी असली वीडियो जनरेट नहीं करता। असली जनरेशन के लिए चुनी गई AI सेवा, उसकी फ्री लिमिट और इंटरनेट कनेक्शन की ज़रूरत होगी।</p>
      </section>

      <section className="how">
        <div className="section-heading"><div><span className="step">03</span><h2>इसे चलाने का तरीका</h2></div></div>
        <div className="how-grid">
          <article><span>01</span><b>कंप्यूटर पर</b><p>ZIP फ़ाइल डाउनलोड करें, Node.js इंस्टॉल करके निर्देशों के अनुसार चलाएँ।</p></article>
          <article><span>02</span><b>मोबाइल पर</b><p>वेबसाइट होस्ट होने के बाद Android Chrome में खोलें और “Add to Home screen” चुनें।</p></article>
          <article><span>03</span><b>AI जोड़ें</b><p>असली वीडियो बनाने के लिए किसी उपलब्ध मॉडल या सेवा को बैकएंड से जोड़ना होगा।</p></article>
        </div>
      </section>
    </main>
    <footer><div className="brand small-brand"><span className="brand-icon"><Film size={17}/></span><span>Mera <b>AI Studio</b></span></div><span>आपके आइडिया से शुरुआत ✨</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);