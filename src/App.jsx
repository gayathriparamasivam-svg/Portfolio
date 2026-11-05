import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ThemeProvider, createTheme, useTheme, CssBaseline, GlobalStyles, AppBar, Toolbar, Box, Container,
  Typography, Button, IconButton, Chip, Stack, TextField, Snackbar, LinearProgress,
  Dialog, Drawer, List, ListItemButton, ListItemText,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

/* ---------- Your content: edit links here ---------- */
const EMAIL = 'gayathriparamasivam55@gmail.com';
const LINKS = {
  github: 'https://github.com/gayathriparamasivam-svg/',
  linkedin: 'https://www.linkedin.com/in/gayathri-paramasivam-311937324/',
  resume: '/Gayathri_Resume.pdf', // put the PDF in your /public folder
};
const ROLES = ['Full Stack Developer', 'React Developer', 'Python & AI Builder'];

const SKILLS = {
  Frontend: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Material UI'],
  Backend: ['Node.js', 'REST API Integration'],
  Programming: ['Python', 'Java'],
  'AI / Libraries': ['RAG', 'Embeddings', 'Gemini API', 'Streamlit', 'TensorFlow', 'OpenCV'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Vercel'],
};
const ALIAS = { HTML5: 'CSS', CSS3: 'CSS' }; // chip label -> project tech name

const PROJECTS = [
  {
    title: 'Cracker Shop Website', kind: 'Personal project',
    desc: 'Responsive shopping site with product displays, reusable components and friendly layouts, deployed on Vercel.',
    tech: ['React.js', 'Material UI', 'JavaScript', 'CSS', 'Vercel'], live: 'https://cracker-shop-ten.vercel.app/',
  },
  {
    title: 'Python RAG Chatbot for PDFs', kind: 'Personal project',
    desc: 'Answers questions from a PDF using text extraction, overlapping chunking, embeddings and cosine similarity retrieval, with Gemini writing the final answer.',
    tech: ['Python', 'Streamlit', 'Gemini API', 'NumPy', 'PyPDF', 'RAG', 'Embeddings'], live: 'https://python-rag-chatbot-59jlxzajrf8fhldnfekyaq.streamlit.app/',
  },
  {
    title: 'Deaf Companion System', kind: 'Academic project',
    desc: 'AI sign language recognition that supports communication between deaf and hearing people, with speech-to-text and text-to-sign translation through an animated avatar.',
    tech: ['Python', 'TensorFlow', 'OpenCV'], live: null,
  },
];

const EDUCATION = [
  ['B.E. Computer Science and Engineering (Honours)', 'Anna University', '2021 – 2025', 'CGPA 8.69 / 10'],
  ['Higher Secondary Education (HSC)', '', '2020 – 2021', '90%'],
  ['SSLC', '', '2018 – 2019', '87%'],
];
const CERTS = [
  ['Java Programming', 'eTechnologies', 'Aug 2023'],
  ['Java', 'National Skill Development & Certification Authority', 'Jan 2024'],
  ['UI/UX Design', 'Retech Solutions', 'Aug 2024'],
];

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

/* ---------- Typed role line ---------- */
function useTyped(words) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let w = 0, i = 0, del = false, id;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let delay = del ? 40 : 85;
      if (!del && i === word.length) { del = true; delay = 1400; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; delay = 300; }
      id = setTimeout(tick, delay);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

/* ---------- Kolam: moving over it reveals my skills ---------- */
function Kolam() {
  const ref = useRef(null);
  const color = useTheme().palette.primary.main;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const S = 36;        // lattice spacing
    const RANGE = 150;   // cursor influence on dots and lines
    const LRANGE = 170;  // cursor distance that reveals a skill
    const ptr = { x: -9999, y: -9999 };
    const SKILL_NAMES = Object.values(SKILLS).flat();
    let w = 0, h = 0, raf, labels = [], marks = new Map(), narrow = false;

    const near = (x, y, r = RANGE) => Math.max(0, 1 - Math.hypot(x - ptr.x, y - ptr.y) / r);

    // Place skills on lattice points. Desktop: right half of the hero. Phone/tablet: reserved strip at the bottom.
    function layout() {
      narrow = window.matchMedia('(max-width: 899.95px)').matches; // same breakpoint as MUI "md"
      const x0 = narrow ? w * 0.04 : w * 0.56, x1 = narrow ? w * 0.96 : w - 24;
      const y0 = narrow ? h - 296 : 70, y1 = narrow ? h - 16 : h - 50;
      const cellW = narrow ? 110 : 150, cellH = narrow ? 52 : 76;
      const cols = Math.max(1, Math.floor((x1 - x0) / cellW)), rows = Math.max(1, Math.floor((y1 - y0) / cellH));
      const cw = (x1 - x0) / cols, ch = (y1 - y0) / rows;
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
      const cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ cx: x0 + (c + 0.5) * cw + (r % 2 ? 1 : -1) * cw * 0.12, cy: y0 + (r + 0.5) * ch });
        }
      }
      cells.sort((a, b) => Math.hypot(a.cx - mx, a.cy - my) - Math.hypot(b.cx - mx, b.cy - my));
      labels = []; marks = new Map();
      SKILL_NAMES.slice(0, cells.length).forEach((text, k) => {
        let i = Math.round(cells[k].cx / S);
        const j = Math.round(cells[k].cy / S);
        if ((i + j) % 2) i += 1;
        labels.push({ text, x: i * S, y: j * S });
        marks.set(`${i},${j}`, true);
      });
    }

    function drawLabels() {
      ctx.font = `600 ${narrow ? 14 : 16}px Figtree, sans-serif`;
      ctx.fillStyle = color;
      ctx.textBaseline = 'middle';
      for (const L of labels) {
        const a = reduce ? 0.8 : Math.min(1, near(L.x, L.y, LRANGE) * 1.6);
        if (a < 0.03) continue;
        ctx.globalAlpha = a;
        const flip = L.x + ctx.measureText(L.text).width + 18 > w - 8; // keep text inside the screen
        ctx.textAlign = flip ? 'right' : 'left';
        ctx.fillText(L.text, L.x + (flip ? -12 : 12), L.y);
      }
      ctx.globalAlpha = 1;
    }

    const bias = (x) => Math.min(1, Math.max(0, (x / w - 0.4) / 0.4)); // lattice grows stronger toward the right

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      const cols = Math.ceil(w / S) + 1;
      const rows = Math.ceil(h / S) + 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          if ((i + j) % 2) continue; // diamond lattice, like a pulli kolam
          const x = i * S, y = j * S, n = near(x, y), b = narrow ? 0.4 : bias(x);
          const mark = marks.has(`${i},${j}`) ? 1 : 0; // dots that hide a skill
          const pulse = reduce ? 0 : Math.sin(now / 1100 + i * 0.45 + j * 0.3) * 0.5;
          ctx.globalAlpha = Math.min(1, 0.2 + b * 0.35 + n * 0.45 + mark * 0.25);
          ctx.beginPath();
          ctx.arc(x, y, 2 + b * 1.2 + mark * 1.5 + pulse * 0.6 + n * 3.5, 0, Math.PI * 2);
          ctx.fill();
          for (const dj of [1, -1]) {
            const x2 = x + S, y2 = y + dj * S;
            const m = Math.min(n, near(x2, y2));
            const a = Math.max(m * 0.8, narrow ? 0.08 : Math.min(b, bias(x2)) * 0.28);
            if (a > 0.02) {
              ctx.globalAlpha = a;
              ctx.lineWidth = 1 + m * 1.5;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;
      drawLabels();
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
      if (reduce) draw(0);
    };
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
    };
    const leave = () => { ptr.x = -9999; ptr.y = -9999; };
    const loop = (now) => { draw(now); raf = requestAnimationFrame(loop); };

    resize();
    window.addEventListener('resize', resize);
    if (!reduce) {
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerdown', move);
      document.addEventListener('pointerleave', leave);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [color]);

  return (
    <Box component="canvas" ref={ref} aria-hidden="true" sx={{
      position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none',
      maskImage: { xs: 'none', md: 'linear-gradient(to bottom, #000 88%, transparent)' },
    }} />
  );
}

/* ---------- Quick jump (Ctrl/⌘ + K) ---------- */
function CommandPalette({ open, onClose, actions }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const list = actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (open) { setQ(''); setIdx(0); } }, [open]);

  const run = (a) => { if (!a) return; onClose(); setTimeout(a.run, 120); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, list.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); run(list[idx]); }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-label="Quick jump"
      PaperProps={{ sx: { alignSelf: 'flex-start', mt: { xs: 8, md: 12 }, mx: { xs: 2, sm: 4 }, borderRadius: 3 } }}>
      <TextField autoFocus fullWidth placeholder="Jump to a section or action" value={q}
        onChange={(e) => { setQ(e.target.value); setIdx(0); }} onKeyDown={onKey}
        variant="standard" InputProps={{ disableUnderline: true, sx: { px: 3, py: 2, fontSize: 18 } }} />
      <List sx={{ borderTop: 1, borderColor: 'divider', maxHeight: 340, overflow: 'auto', py: 1 }}>
        {list.length === 0 && <Typography color="text.secondary" sx={{ px: 3, py: 2 }}>Nothing matches “{q}”.</Typography>}
        {list.map((a, i) => (
          <ListItemButton key={a.label} selected={i === idx} onMouseEnter={() => setIdx(i)} onClick={() => run(a)} sx={{ px: 3 }}>
            <ListItemText primary={a.label} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}

/* ---------- Layout pieces ---------- */
function Section({ id, title, children }) {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 56 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 6 }}>{title}</Typography>
        {children}
      </Container>
    </Box>
  );
}

function Hero() {
  const role = useTyped(ROLES);
  return (
    <Box id="home" sx={{ position: 'relative', overflow: 'hidden', minHeight: { xs: '80vh', md: '94vh' }, display: 'flex', alignItems: 'center', pt: 10, pb: 8 }}>
      <Kolam />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Typography variant="h1" color="primary">Gayathri P</Typography>
        <Typography variant="h4" component="p" sx={{ mt: 2, minHeight: '1.3em', fontSize: 'clamp(1.4rem, 5vw, 2.125rem)' }} aria-label={ROLES.join(', ')}>
          {role}<Box component="span" aria-hidden="true" sx={{ color: 'secondary.main', animation: 'blink 1s steps(1) infinite', '@keyframes blink': { '50%': { opacity: 0 } } }}>|</Box>
        </Typography>
        <Typography sx={{ mt: 3, maxWidth: 520, fontSize: { xs: 16, sm: 18 } }} color="text.secondary">
          I build React and Node.js products and side projects in Python and AI. I spent 10 months at The Logical Monks
          shipping an e-learning platform, and I'm now looking for a junior full stack or React role in Chennai.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4, flexWrap: 'wrap', rowGap: 2 }}>
          <Button variant="contained" size="large" onClick={() => goTo('projects')}>See my work</Button>
          <Button variant="outlined" size="large" startIcon={<DownloadIcon />} href={LINKS.resume} download>Download resume</Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <IconButton aria-label="GitHub" href={LINKS.github} target="_blank" rel="noreferrer"><GitHubIcon /></IconButton>
          <IconButton aria-label="LinkedIn" href={LINKS.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /></IconButton>
          <IconButton aria-label="Email" onClick={() => goTo('contact')}><EmailIcon /></IconButton>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 6 }}>
          Move your cursor or finger over the kolam dots to reveal my skills.
        </Typography>
        <Box aria-hidden="true" sx={{ height: { xs: 300, md: 0 } }} /> {/* room for the skills on phones and tablets */}
      </Container>
    </Box>
  );
}

function Work() {
  const [picked, setPicked] = useState(null);   // skill chip clicked
  const [hover, setHover] = useState(null);     // project row hovered or focused
  const inProject = (p, skill) => p.tech.includes(ALIAS[skill] || skill);
  const matches = (p) => !picked || inProject(p, picked);
  const hits = PROJECTS.filter(matches).map((p) => p.title);

  return (
    <Section id="projects" title="Skills and projects">
      <Box sx={{ display: 'grid', gap: { xs: 6, md: 8 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1.7fr' }, alignItems: 'start' }}>
        <Box sx={{ position: { md: 'sticky' }, top: 88 }}>
          <Typography color="text.secondary" sx={{ mb: 3 }} aria-live="polite">
            {picked
              ? `${picked} is used in: ${hits.length ? hits.join(', ') : 'no listed project yet'}.`
              : 'Select a skill to filter projects, or hover a project to light up its skills.'}
          </Typography>
          <Stack spacing={3}>
            {Object.entries(SKILLS).map(([group, items]) => (
              <Box key={group}>
                <Typography variant="h6" sx={{ mb: 1.5 }}>{group}</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {items.map((s) => {
                    const chosen = picked === s;
                    const lit = hover && inProject(hover, s);
                    return (
                      <Chip key={s} label={s} clickable onClick={() => setPicked(chosen ? null : s)}
                        color={chosen ? 'primary' : lit ? 'secondary' : 'default'}
                        variant={chosen || lit ? 'filled' : 'outlined'} />
                    );
                  })}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          {PROJECTS.map((p) => (
            <Box key={p.title} tabIndex={0}
              onMouseEnter={() => setHover(p)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p)} onBlur={() => setHover(null)}
              sx={{
                py: 4, pl: hover === p ? 2 : 0, borderTop: 2, outline: 'none',
                borderColor: hover === p || (picked && matches(p)) ? 'secondary.main' : 'divider',
                opacity: matches(p) ? 1 : 0.3,
                transition: 'opacity .3s, padding-left .25s, border-color .25s',
                '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.main', outlineOffset: 4 },
              }}>
              <Typography variant="body2" color="text.secondary">{p.kind}</Typography>
              <Typography variant="h4" sx={{ mt: 0.5 }}>{p.title}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 620 }}>{p.desc}</Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
                {p.tech.map((t) => <Chip key={t} label={t} size="small" />)}
              </Stack>
              {p.live && (
                <Button endIcon={<OpenInNewIcon />} href={p.live} target="_blank" rel="noreferrer" sx={{ mt: 1.5, ml: -1 }}>Live demo</Button>
              )}
            </Box>
          ))}
          <Box sx={{ borderTop: 2, borderColor: 'divider' }} />
        </Box>
      </Box>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <Box sx={{ borderLeft: 3, borderColor: 'primary.main', pl: { xs: 2.5, md: 4 }, maxWidth: 800 }}>
        <Typography variant="h5">Full Stack Developer</Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>The Logical Monks, T. Nagar, Chennai · June 2025 – April 2026</Typography>
        <Stack component="ul" spacing={1} sx={{ pl: 2.5, m: 0 }}>
          <li>Developed e-learning platform features using React.js and Node.js.</li>
          <li>Built responsive UI components using HTML, CSS and JavaScript.</li>
          <li>Integrated REST APIs and contributed to backend functionality, course management and subscription plans.</li>
        </Stack>
      </Box>
    </Section>
  );
}

function Background() {
  return (
    <Section id="education" title="Education and certifications">
      <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Stack spacing={3}>
          {EDUCATION.map(([deg, school, years, score]) => (
            <Box key={deg}>
              <Typography variant="h6">{deg}</Typography>
              <Typography color="text.secondary">{[school, years, score].filter(Boolean).join(' · ')}</Typography>
            </Box>
          ))}
        </Stack>
        <Stack spacing={3}>
          {CERTS.map(([name, org, date]) => (
            <Box key={name}>
              <Typography variant="h6">{name}</Typography>
              <Typography color="text.secondary">{org} · {date}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Section>
  );
}

function Contact({ notify }) {
  const [form, setForm] = useState({ name: '', message: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const subject = `Portfolio message from ${form.name.trim()}`;
  const body = `${form.message.trim()}\n\n${form.name.trim()}`;
  const enc = encodeURIComponent;

  const valid = () => {
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Enter your name.';
    if (form.message.trim().length < 10) err.message = 'Write at least 10 characters.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Gmail compose in a new tab: works in any browser, no mail app needed
  const viaGmail = (e) => {
    e?.preventDefault();
    if (!valid()) return;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${enc(subject)}&body=${enc(body)}`, '_blank', 'noopener');
  };
  // mailto: only works if the device has a mail app set up
  const viaMailApp = () => {
    if (!valid()) return;
    window.location.href = `mailto:${EMAIL}?subject=${enc(subject)}&body=${enc(body)}`;
  };
  const copy = async (text, ok) => {
    try { await navigator.clipboard.writeText(text); notify(ok); }
    catch { notify(text); }
  };

  return (
    <Section id="contact" title="Let's talk">
      <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
            I'm looking for a junior full stack or React role. Write a message and it opens in Gmail, ready to send.
          </Typography>
          <Button startIcon={<EmailIcon />} onClick={() => copy(EMAIL, 'Email address copied')} sx={{ textAlign: 'left', overflowWrap: 'anywhere' }}>{EMAIL}</Button>
          <Button startIcon={<PhoneIcon />} href="tel:+918870322567">+91 88703-22567</Button>
          <Button startIcon={<PlaceIcon />} disabled sx={{ '&.Mui-disabled': { color: 'text.secondary' } }}>K K Nagar, Chennai</Button>
        </Stack>
        <Box component="form" onSubmit={viaGmail} noValidate sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Your name" value={form.name} onChange={set('name')} error={!!errors.name} helperText={errors.name} />
          <TextField label="Message" multiline minRows={4} value={form.message} onChange={set('message')} error={!!errors.message} helperText={errors.message} />
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
            <Button type="submit" variant="contained" size="large" sx={{ width: { xs: '100%', sm: 'auto' } }}>Send with Gmail</Button>
            <Button variant="outlined" size="large" onClick={viaMailApp} sx={{ width: { xs: '100%', sm: 'auto' } }}>Use my mail app</Button>
            <Button size="large" sx={{ width: { xs: '100%', sm: 'auto' } }} onClick={() => valid() && copy(`To: ${EMAIL}\nSubject: ${subject}\n\n${body}`, 'Message copied')}>Copy message</Button>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
}

/* ---------- App shell, theme and scroll progress ---------- */
const PALETTE = {
  light: {
    mode: 'light',
    primary: { main: '#6A0F1F', contrastText: '#F5EBD6' },   // maroon
    secondary: { main: '#B8863B', contrastText: '#2B0A10' }, // antique gold
    background: { default: '#EBDCBF', paper: '#F5EBD6' },    // sandal
    text: { primary: '#2B0A10', secondary: '#6B4A45' },
    divider: 'rgba(106,15,31,.25)',
  },
  dark: {
    mode: 'dark',
    primary: { main: '#E0C79B', contrastText: '#3A0B14' },
    secondary: { main: '#D9A441', contrastText: '#2B0A10' },
    background: { default: '#24080D', paper: '#33101A' },
    text: { primary: '#EBDCBF', secondary: '#C9B38F' },
    divider: 'rgba(224,199,155,.25)',
  },
};

const ICON = { light: '#A8505F', dark: '#E2909F' }; // light maroon for icons

export default function App() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('mode') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    catch { return 'light'; }
  });
  const [progress, setProgress] = useState(0);
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Gloock&display=swap';
    document.head.appendChild(l);
    return () => l.remove();
  }, []);
  useEffect(() => { try { localStorage.setItem('mode', mode); } catch { /* ignore */ } }, [mode]);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((o) => !o); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);

  const theme = useMemo(() => createTheme({
    palette: PALETTE[mode],
    shape: { borderRadius: 10 },
    components: { MuiSvgIcon: { styleOverrides: { root: { color: ICON[mode] } } } },
    typography: {
      fontFamily: '"Figtree", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
      h1: { fontFamily: '"Gloock", serif', fontWeight: 400, fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', lineHeight: 1 },
      h2: { fontFamily: '"Gloock", serif', fontWeight: 400, fontSize: 'clamp(2rem, 5vw, 3rem)' },
      h4: { fontFamily: '"Gloock", serif', fontWeight: 400 },
      h5: { fontFamily: '"Gloock", serif', fontWeight: 400 },
      h6: { fontFamily: '"Gloock", serif', fontWeight: 400 },
    },
  }), [mode]);

  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');
  const actions = [
    { label: 'Go to Work', run: () => goTo('projects') },
    { label: 'Go to Experience', run: () => goTo('experience') },
    { label: 'Go to Education', run: () => goTo('education') },
    { label: 'Go to Contact', run: () => goTo('contact') },
    { label: `Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`, run: toggleMode },
    { label: 'Copy email address', run: () => navigator.clipboard?.writeText(EMAIL).then(() => setToast('Email address copied'), () => setToast(EMAIL)) },
    { label: 'Open GitHub', run: () => window.open(LINKS.github, '_blank', 'noopener') },
    { label: 'Open LinkedIn', run: () => window.open(LINKS.linkedin, '_blank', 'noopener') },
    { label: 'Download resume', run: () => { const a = document.createElement('a'); a.href = LINKS.resume; a.download = ''; a.click(); } },
  ];
  const nav = [['projects', 'Work'], ['experience', 'Experience'], ['education', 'Education'], ['contact', 'Contact']];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { overflowX: 'hidden' }, html: { scrollBehavior: 'smooth' }, '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } } }} />
      <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1301, height: 3, bgcolor: 'transparent' }} aria-hidden="true" />
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(12px)', bgcolor: mode === 'dark' ? 'rgba(36,8,13,.8)' : 'rgba(235,220,191,.82)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography component="a" href="#home" variant="h6" sx={{ color: 'text.primary', textDecoration: 'none' }}>Gayathri P</Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            {nav.map(([id, label]) => (
              <Button key={id} href={`#${id}`} color="inherit" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary' }}>{label}</Button>
            ))}
            <Button startIcon={<SearchIcon />} onClick={() => setPalette(true)} variant="outlined" size="small" color="inherit"
              sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.secondary', borderColor: 'divider' }}>Ctrl K</Button>
            <IconButton aria-label="Quick jump" onClick={() => setPalette(true)} sx={{ display: { xs: 'none', sm: 'inline-flex', md: 'none' }, color: 'text.primary' }}><SearchIcon /></IconButton>
            <IconButton aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} onClick={toggleMode} sx={{ color: 'text.primary' }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton aria-label="Open menu" onClick={() => setMenu(true)} sx={{ display: { md: 'none' }, color: 'text.primary' }}><MenuIcon /></IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={menu} onClose={() => setMenu(false)}>
        <Box component="nav" sx={{ width: 250, pt: 2 }}>
          <List>
            {nav.map(([id, label]) => (
              <ListItemButton key={id} onClick={() => { setMenu(false); setTimeout(() => goTo(id), 200); }}>
                <ListItemText primary={label} primaryTypographyProps={{ fontFamily: '"Gloock", serif', fontSize: 20 }} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => { setMenu(false); setTimeout(() => setPalette(true), 200); }}>
              <ListItemText primary="Quick jump" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <main>
        <Hero />
        <Work />
        <Experience />
        <Background />
        <Contact notify={setToast} />
      </main>

      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Gayathri P · Built with React and Material UI</Typography>
      </Box>

      <CommandPalette open={palette} onClose={() => setPalette(false)} actions={actions} />
      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast('')} message={toast} />
    </ThemeProvider>
  );
}
