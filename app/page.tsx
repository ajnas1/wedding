"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown, CalendarDays, Clock3, MapPin, Music2, Pause, Play,
  Heart, Flower2, Copy, ExternalLink, Menu, X, Sparkles, Images
} from "lucide-react";
import { WEDDING } from "@/lib/wedding";

function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 34" fill="none" aria-hidden="true">
      <path d="M3 17h75c13 0 15-12 27-12 8 0 10 12 15 12s7-12 15-12c12 0 14 12 27 12h75" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M120 3c-5 6-10 9-10 14s5 8 10 14c5-6 10-9 10-14S125 9 120 3Z" stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="120" cy="17" r="3" fill="currentColor"/>
      <circle cx="91" cy="17" r="2" fill="currentColor"/><circle cx="149" cy="17" r="2" fill="currentColor"/>
    </svg>
  );
}

function Lamp({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 110" fill="none" aria-hidden="true">
      <path d="M40 5c-7 9-8 16 0 24 8-8 7-15 0-24Z" fill="#E7A94B"/>
      <path d="M40 24c-4 7-4 12 0 17 4-5 4-10 0-17Z" fill="#FFF0B8"/>
      <path d="M20 43h40l-5 10H25l-5-10Z" fill="#B57B2A" stroke="#F2CE80" strokeWidth="1.5"/>
      <path d="M25 53h30l-5 9H30l-5-9Z" fill="#D8A44D"/>
      <path d="M36 62h8l4 29H32l4-29Z" fill="#B57B2A" stroke="#F2CE80" strokeWidth="1.5"/>
      <path d="M22 91h36l8 7H14l8-7Z" fill="#D8A44D" stroke="#F2CE80" strokeWidth="1.5"/>
      <path d="M10 101h60" stroke="#B57B2A" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="40" cy="47" r="2" fill="#FFF0B8"/>
    </svg>
  );
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicMissing, setMusicMissing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [wishError, setWishError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const target = useMemo(() => new Date(`${WEDDING.dateISO}T${WEDDING.time24}:00`), []);
  const countdown = useMemo(() => {
    const diff = Math.max(0, target.getTime() - now);
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [target, now]);

  const mapsUrl = WEDDING.mapsUrl;
  const shareText = `With joy and blessings, you are invited to the wedding of ${WEDDING.groom} & ${WEDDING.bride} on ${WEDDING.dateDisplay} (${WEDDING.malayalamDate}), Muhoortham ${WEDDING.timeDisplay.replace("Muhoortham ", "")}, at the ${WEDDING.venue}. Invitation: ${typeof window !== "undefined" ? window.location.href : ""}`;

  async function toggleMusic(forcePlay = false) {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn && !forcePlay) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    if (musicOn) return;
    try {
      await audio.play();
      setMusicOn(true);
      setMusicMissing(false);
    } catch {
      setMusicOn(false);
      setMusicMissing(true);
    }
  }

  // Scroll animations: reveal sections as they enter the screen + a gold scroll-progress bar.
  useEffect(() => {
    const groups: [string, string][] = [
      [".invitation > *", "up"],
      [".couple-names > div:first-child", "left"],
      [".couple-names > div:last-child", "right"],
      [".celebration > .section-overline, .celebration > .section-title, .celebration > .section-subtitle", "up"],
      [".count-box", "zoom"],
      [".event-card, .events-heading", "up"],
      [".mini-event", "zoom"],
      [".venue-info > *", "up"],
      [".gallery-section > :not(.gallery-grid)", "up"],
      [".photo-tile", "zoom"],
      [".wishes-section > *", "up"],
      [".closing > *", "up"],
    ];
    const targets: HTMLElement[] = [];
    groups.forEach(([selector, kind]) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
        el.setAttribute("data-reveal", kind);
        el.style.setProperty("--d", `${Math.min(i, 6) * 0.12}s`);
        targets.push(el);
      });
    });
    document.documentElement.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  // Try to start the song as soon as the page opens. Browsers usually block sound until the
  // visitor interacts, so if that happens we start it on their first tap / key press instead.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let done = false;
    const events = ["pointerdown", "touchstart", "keydown", "click"] as const;
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    function onFirstInteraction() {
      if (done) return;
      audio!.play().then(() => { done = true; setMusicOn(true); cleanup(); }).catch(() => {});
    }
    audio.play().then(() => { done = true; setMusicOn(true); }).catch(() => {
      events.forEach((e) => window.addEventListener(e, onFirstInteraction, { passive: true }));
    });
    return () => { done = true; cleanup(); };
  }, []);

  function sendWish(e: React.FormEvent) {
    e.preventDefault();
    if (!wishText.trim()) { setWishError(true); return; }
    setWishError(false);
    const text = `Wishes for ${WEDDING.groom} & ${WEDDING.bride}\n\n${wishText.trim()}\n\n- ${wishName.trim() || "A well-wisher"}`;
    const base = WEDDING.wishesPhone ? `https://wa.me/${WEDDING.wishesPhone}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf6e9] text-[#4c211d]">
      <div className="scroll-progress" ref={progressRef} />
      <div className="topline" />
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Wedding home"><span className="brand-mark"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(0 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(45 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(90 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(135 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(180 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(225 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(270 12 12)" /><ellipse cx="12" cy="6" rx="2.2" ry="4.2" transform="rotate(315 12 12)" /></svg></span><span>{WEDDING.groom} <i>&</i> {WEDDING.bride}</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {[["Our Invitation", "#invitation"], ["The Celebration", "#celebration"], ["Venue", "#venue"], ["Gallery", "#gallery"], ["Send Wishes", "#wishes"]].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#venue" onClick={() => setMenuOpen(false)}>Wedding Details <span>↗</span></a>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-pattern" />
        <div className="arch arch-outer"><div className="arch arch-inner" /></div>
        <div className="hero-garland garland-left">✿　❀　✿　❀　✿</div>
        <div className="hero-garland garland-right">✿　❀　✿　❀　✿</div>
        <Lamp className="hero-lamp lamp-left" /><Lamp className="hero-lamp lamp-right" />
        <div className="hero-content">
          <div className="ganesha">ॐ</div>
          <p className="eyebrow">|| श्री गणेशाय नमः ||</p>
          <Ornament className="ornament hero-ornament" />
          <p className="hero-kicker">Together with our families</p>
          <p className="hero-invite">We joyfully invite you to celebrate the wedding of</p>
          <h1><span>{WEDDING.groom}</span><em>&</em><span>{WEDDING.bride}</span></h1>
          <p className="hero-date">{WEDDING.dateDisplay} <b>·</b> {WEDDING.malayalamDate}</p>
          <button className="gold-button" onClick={() => { setOpened(true); void toggleMusic(true); document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Flower2 size={17} /> {opened ? "Invitation Opened" : "Open Invitation"} <ArrowDown size={16} />
          </button>
          <p className="hero-blessing">A new beginning, blessed by tradition and love</p>
        </div>
        <div className="hero-bottom"><span>WITH LOVE & BLESSINGS</span><span className="bottom-flower"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" /></svg></span><span>KERALA · INDIA</span></div>
      </section>

      <section id="invitation" className="invitation section-pad">
        <div className="section-overline"><span /> A JOYOUS BEGINNING <span /></div>
        <p className="sanskrit">॥ मंगलम् भगवान विष्णुः ॥</p>
        <h2 className="section-title">With the blessings of <i>the Divine</i></h2>
        <Ornament className="ornament" />
        <p className="invitation-copy">With the blessings of our elders and the love of our families, we request the pleasure of your gracious presence as we begin a beautiful new chapter of togetherness.</p>
        <div className="couple-names">
          <div><span className="name-label">THE GROOM</span><h3>{WEDDING.groom}</h3><p>{WEDDING.groomParents}</p></div>
          <div className="name-ampersand">and</div>
          <div><span className="name-label">THE BRIDE</span><h3>{WEDDING.bride}</h3><p>{WEDDING.brideParents}</p></div>
        </div>
        <div className="blessing">“May your life together be filled with love, laughter, harmony and countless blessings.”</div>
      </section>

      <section id="celebration" className="celebration section-pad">
        <div className="section-overline"><span /> SAVE THE DATE <span /></div>
        <h2 className="section-title">The <i>Celebration</i></h2>
        <p className="section-subtitle">A sacred ceremony, a joyful gathering, a lifetime of memories.</p>
        <div className="countdown">
          {Object.entries(countdown).map(([unit, value]) => <div className="count-box" key={unit}><strong>{String(value).padStart(2, "0")}</strong><span>{unit}</span></div>)}
        </div>
        <div className="event-card">
          <div className="event-icon"><CalendarDays size={24} /></div>
          <div className="event-details"><span className="event-label">THE WEDDING CEREMONY</span><h3>{WEDDING.dateDisplay}</h3><p><Clock3 size={15} /> {WEDDING.timeDisplay}</p><p><MapPin size={15} /> {WEDDING.venue}</p><p className="malayalam-date"><CalendarDays size={15} /> {WEDDING.malayalamDate}</p></div>
          <div className="event-side"><span>YOU ARE</span><strong>INVITED</strong><span>WITH LOVE</span></div>
        </div>
        <p className="events-heading">ALSO CELEBRATING WITH US</p>
        <div className="events-grid">
          {WEDDING.events.map((e) => (
            <div className="mini-event" key={e.name}>
              <span className="mini-day">{e.day}</span>
              <strong>{e.date}</strong>
              <h4>{e.name}</h4>
              {e.time && <p>{e.time}</p>}
              {e.place && <p className="mini-place"><MapPin size={12} /> {e.place}</p>}
            </div>
          ))}
        </div>
      </section>

      <section id="venue" className="venue-section venue-hero section-pad">
        <div className="venue-info">
          <div className="section-overline"><span /> JOIN US <span /></div>
          <h2 className="section-title">The <i>Venue</i></h2>
          <p className="venue-venue">{WEDDING.venue}</p>
          <p className="venue-address">{WEDDING.venueNote}</p>
          {(WEDDING.address || WEDDING.city) && <div className="venue-meta"><MapPin size={18} /><span>{[WEDDING.address, WEDDING.city].filter(Boolean).join(", ")}</span></div>}
          {mapsUrl && <a className="outline-button" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17} /> Get Directions <ExternalLink size={15} /></a>}
          <p className="venue-note">Your presence and blessings will make our day even more special.</p>
        </div>
      </section>

      <section id="gallery" className="gallery-section section-pad">
        <div className="section-overline"><span /> LITTLE MOMENTS, BIG LOVE <span /></div>
        <h2 className="section-title">A glimpse of <i>tradition</i></h2>
        <p className="section-subtitle">A celebration rooted in culture, family and forever.</p>
        <div className="gallery-grid photo-gallery">
          <button className="photo-tile photo-tall" onClick={() => window.open("/images/couple-1.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 1"><img src="/images/couple-1.jpg" alt="Nandakumar and Adithya holding hands outdoors" /><span className="photo-caption">A moment together</span></button>
          <button className="photo-tile" onClick={() => window.open("/images/couple-2.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 2"><img src="/images/couple-2.jpg" alt="Nandakumar and Adithya walking together" /><span className="photo-caption">Side by side</span></button>
          <button className="photo-tile photo-tall" onClick={() => window.open("/images/couple-3.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 3"><img src="/images/couple-3.jpg" alt="Nandakumar and Adithya sharing a tender moment" /><span className="photo-caption">A little closer</span></button>
          <button className="photo-tile" onClick={() => window.open("/images/couple-5.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 5"><img src="/images/couple-5.jpg" alt="Nandakumar and Adithya holding hands on a trail" /><span className="photo-caption">Every step together</span></button>
          <button className="photo-tile" onClick={() => window.open("/images/couple-4.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 4"><img src="/images/couple-4.jpg" alt="Nandakumar and Adithya walking in nature" /><span className="photo-caption">Our favourite days</span></button>
          <button className="photo-tile photo-wide" onClick={() => window.open("/images/couple-6.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 6"><img src="/images/couple-6.jpg" alt="Nandakumar and Adithya smiling together" /><span className="photo-caption">A lifetime of memories</span></button>
          <button className="photo-tile" onClick={() => window.open("/images/couple-7.jpg", "_blank", "noopener,noreferrer")} aria-label="Open couple photo 7"><img src="/images/couple-7.jpg" alt="A close portrait of Nandakumar and Adithya" /><span className="photo-caption">Forever starts here</span></button>
        </div>
        <p className="gallery-note"><Images size={15} /> Our story, captured in moments.</p>
      </section>

      <section id="wishes" className="wishes-section section-pad">
        <div className="section-overline"><span /> WITH LOVE <span /></div>
        <h2 className="section-title">Send your <i>Wishes</i></h2>
        <p className="section-subtitle">Your blessings and kind words mean the world to us.</p>
        <form className="wish-form" onSubmit={sendWish}>
          <label htmlFor="wish-name">Your name</label>
          <input id="wish-name" type="text" value={wishName} onChange={(e) => setWishName(e.target.value)} placeholder="Enter your name" maxLength={60} autoComplete="name" />
          <label htmlFor="wish-text">Your wishes</label>
          <textarea id="wish-text" value={wishText} onChange={(e) => { setWishText(e.target.value); setWishError(false); }} placeholder={`Write a message for ${WEDDING.groom} & ${WEDDING.bride}...`} rows={5} maxLength={500} />
          <div className="wish-chips" aria-label="Quick wishes">
            {["Wishing you a lifetime of love and happiness!", "May God bless you both abundantly.", "Congratulations on your big day!"].map((w) => (
              <button type="button" key={w} onClick={() => { setWishText(w); setWishError(false); }}>{w}</button>
            ))}
          </div>
          {wishError && <p className="wish-error" role="alert">Please write a short message first.</p>}
          <button type="submit" className="gold-button wish-send"><Heart size={16} /> Send Wishes on WhatsApp</button>
          <p className="wish-hint">This opens WhatsApp with your message ready to send.</p>
        </form>
      </section>

      <section className="closing section-pad">
        <div className="closing-decoration">✿　❀　✿</div>
        <p className="eyebrow">YOUR PRESENCE IS OUR PRESENT</p>
        <h2>We can’t wait to<br /><i>celebrate with you.</i></h2>
        <Ornament className="ornament" />
        <p>With love, gratitude and blessings</p>
        <div className="closing-names">{WEDDING.groom} <span>&</span> {WEDDING.bride}</div>
        <a className="gold-button share-button" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"><Heart size={16} /> Share the Invitation</a>
        <button className="copy-button" onClick={copyLink}><Copy size={14} /> {copied ? "Link copied!" : "Copy invitation link"}</button>
      </section>

      <footer className="footer"><span>MADE WITH LOVE</span><span className="footer-flower">✿</span><span>{WEDDING.groom} & {WEDDING.bride} · {WEDDING.year}</span></footer>
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop autoPlay preload="auto" onError={() => { setMusicOn(false); setMusicMissing(true); }} />
      <button className="music-button" onClick={() => void toggleMusic()} aria-label="Toggle music"><span className={musicOn ? "music-bars playing" : "music-bars"}><i /><i /><i /><i /></span>{musicOn ? <Pause size={15} /> : <Play size={15} />}<span>{musicOn ? "Music on" : "Music"}</span></button>
      {musicMissing && <div className="music-notice"><Music2 size={16} /> Song file not found. Add it as public/audio/wedding-song.mp3</div>}
    </main>
  );
}
