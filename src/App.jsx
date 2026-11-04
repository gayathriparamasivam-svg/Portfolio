import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Box, Container, Typography,
  Button, IconButton, Chip, Stack, Card, CardContent, TextField, Snackbar, LinearProgress, Fade,
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

/* ---------- Your content: edit links here ---------- */
const EMAIL = 'gayathriparamasivam55@gmail.com';
const LINKS = {
  github: 'https://github.com/your-username',
  linkedin: 'https://www.linkedin.com/in/your-profile',
  resume: '/Gayathri_Resume.pdf',
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
    tech: ['React.js', 'Material UI', 'JavaScript', 'CSS', 'Vercel'], live: 'https://your-cracker-shop.vercel.app',
  },
  {
    title: 'Python RAG Chatbot for PDFs', kind: 'Personal project',
    desc: 'Answers questions from a PDF using text extraction, overlapping chunking, embeddings and cosine similarity retrieval, with Gemini writing the final answer.',
    tech: ['Python', 'Streamlit', 'Gemini API', 'NumPy', 'PyPDF', 'RAG', 'Embeddings'], live: 'https://your-app.streamlit.app',
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

/* ---------- Small helpers ---------- */
function Reveal({ children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Box ref={ref}><Fade in={on} timeout={700}><Box>{children}</Box></Fade></Box>;
}

function Count({ to, decimals = 0 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1200, 1);
      setV(to * p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toFixed(decimals)}</>;
}

function useTyped(words) {
  const [text, setText] = useState('');
  useEffect(() => {
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

function Section({ id, title, children }) {
  return (
    <Box component="section" id={id} sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 56 }}>
      <Container maxWidth="lg">
        <Reveal>
          <Typography variant="h2" sx={{ mb: 5 }}>{title}</Typography>
          {children}
        </Reveal>
      </Container>
    </Box>
  );
}

/* ---------- Sections ---------- */
function Hero() {
  const role = useTyped(ROLES);
  const mono = { fontFamily: '"JetBrains Mono", monospace', fontSize: { xs: 13, sm: 15 }, lineHeight: 1.9 };
  return (
    <Box id="home" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, alignItems: 'center' }}>
        <Box>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Chennai, Tamil Nadu · open to new roles</Typography>
          <Typography variant="h1">Gayathri P</Typography>
          <Typography sx={{ mt: 3, maxWidth: 520, fontSize: 18 }} color="text.secondary">
            Computer Science graduate with 10 months of professional experience building React and Node.js
            products, plus personal projects in Python and AI. I like interfaces that feel quick and clear.
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 4, flexWrap: 'wrap', rowGap: 2 }}>
            <Button variant="contained" color="secondary" size="large" href="#projects">See my projects</Button>
            <Button variant="outlined" size="large" startIcon={<DownloadIcon />} href={LINKS.resume} download>Download resume</Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <IconButton aria-label="GitHub" href={LINKS.github} target="_blank" rel="noreferrer"><GitHubIcon /></IconButton>
            <IconButton aria-label="LinkedIn" href={LINKS.linkedin} target="_blank" rel="noreferrer"><LinkedInIcon /></IconButton>
            <IconButton aria-label="Email" href={`mailto:${EMAIL}`}><EmailIcon /></IconButton>
          </Stack>
        </Box>

        <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 3, p: { xs: 2.5, sm: 4 } }} aria-label="Developer profile snippet">
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: c }} />)}
          </Box>
          <Box sx={mono}>
            <div>const gayathri = {'{'}</div>
            <div>&nbsp;&nbsp;role: "<Box component="span" sx={{ color: 'secondary.main' }}>{role}</Box><Box component="span" sx={{ animation: 'blink 1s steps(1) infinite', '@keyframes blink': { '50%': { opacity: 0 } } }}>|</Box>",</div>
            <div>&nbsp;&nbsp;stack: ["React", "Node.js", "Python"],</div>
            <div>&nbsp;&nbsp;experience: "10 months",</div>
            <div>&nbsp;&nbsp;openToWork: true,</div>
            <div>{'};'}</div>
          </Box>
        </Card>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, maxWidth: 560 }}>
          {[[10, 0, 'months in industry'], [3, 0, 'projects shipped'], [8.69, 2, 'CGPA']].map(([n, d, label]) => (
            <Box key={label}>
              <Typography variant="h3" color="secondary"><Count to={n} decimals={d} /></Typography>
              <Typography variant="body2" color="text.secondary">{label}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function SkillsAndProjects() {
  const [picked, setPicked] = useState(null);
  const matches = (p) => !picked || p.tech.includes(ALIAS[picked] || picked);
  const hits = PROJECTS.filter(matches).map((p) => p.title);

  return (
    <>
      <Section id="skills" title="Skills">
        <Typography color="text.secondary" sx={{ mb: 3 }} aria-live="polite">
          {picked ? `${picked} is used in: ${hits.length ? hits.join(', ') : 'no listed project yet'}.` : 'Select a skill to see which projects use it.'}
        </Typography>
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          {Object.entries(SKILLS).map(([group, items]) => (
            <Box key={group}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>{group}</Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                {items.map((s) => (
                  <Chip key={s} label={s} clickable onClick={() => setPicked(picked === s ? null : s)}
                    color={picked === s ? 'secondary' : 'default'} variant={picked === s ? 'filled' : 'outlined'} />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
      </Section>

      <Section id="projects" title="Projects">
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          {PROJECTS.map((p) => (
            <Card key={p.title} variant="outlined" sx={{
              borderRadius: 3, opacity: matches(p) ? 1 : 0.3, transition: 'opacity .3s, transform .25s, border-color .25s',
              borderColor: picked && matches(p) ? 'secondary.main' : 'divider', '&:hover': { transform: 'translateY(-4px)' },
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                <Typography variant="body2" color="text.secondary">{p.kind}</Typography>
                <Typography variant="h5">{p.title}</Typography>
                <Typography color="text.secondary">{p.desc}</Typography>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
                  {p.tech.map((t) => <Chip key={t} label={t} size="small" />)}
                </Stack>
                {p.live && <Button endIcon={<OpenInNewIcon />} href={p.live} target="_blank" rel="noreferrer" sx={{ alignSelf: 'flex-start' }}>Live demo</Button>}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Section>
    </>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <Box sx={{ borderLeft: 3, borderColor: 'secondary.main', pl: { xs: 2.5, md: 4 }, maxWidth: 800 }}>
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
    <Section id="education" title="Education & certifications">
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

function Contact() {
  const [form, setForm] = useState({ name: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Enter your name.';
    if (form.message.trim().length < 10) err.message = 'Write at least 10 characters.';
    setErrors(err);
    if (Object.keys(err).length) return;
    const body = `${form.message}\n\n${form.name}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + form.name)}&body=${encodeURIComponent(body)}`;
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setToast('Email address copied'); }
    catch { setToast(EMAIL); }
  };

  return (
    <Section id="contact" title="Let's talk">
      <Box sx={{ display: 'grid', gap: 6, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
            I'm looking for a junior full stack or React role. Send a message and your email app opens with it ready to send.
          </Typography>
          <Button startIcon={<EmailIcon />} onClick={copy}>{EMAIL}</Button>
          <Button startIcon={<PhoneIcon />} href="tel:+918870322567">+91 88703-22567</Button>
          <Button startIcon={<PlaceIcon />} disabled sx={{ '&.Mui-disabled': { color: 'text.secondary' } }}>K K Nagar, Chennai</Button>
        </Stack>
        <Box component="form" onSubmit={submit} noValidate sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Your name" value={form.name} onChange={set('name')} error={!!errors.name} helperText={errors.name} />
          <TextField label="Message" multiline minRows={4} value={form.message} onChange={set('message')} error={!!errors.message} helperText={errors.message} />
          <Button type="submit" variant="contained" color="secondary" size="large">Open in email app</Button>
        </Box>
      </Box>
      <Snackbar open={!!toast} autoHideDuration={2500} onClose={() => setToast('')} message={toast} />
    </Section>
  );
}

/* ---------- App shell, theme and scroll progress ---------- */
export default function App() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('mode') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
    catch { return 'light'; }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => { try { localStorage.setItem('mode', mode); } catch { /* ignore */ } }, [mode]);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const theme = useMemo(() => createTheme({
    palette: mode === 'dark'
      ? { mode, primary: { main: '#1B2447' }, secondary: { main: '#FFC933', contrastText: '#161B33' }, background: { default: '#0E1226', paper: '#151B36' }, text: { primary: '#EEF0FA', secondary: '#A5ABC8' } }
      : { mode, primary: { main: '#1B2447' }, secondary: { main: '#F2A900', contrastText: '#161B33' }, background: { default: '#F5F6FB', paper: '#FFFFFF' }, text: { primary: '#161B33', secondary: '#555C7A' } },
    shape: { borderRadius: 10 },
    typography: {
      fontFamily: '"Figtree", sans-serif',
      button: { textTransform: 'none', fontWeight: 600 },
      h1: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 800, fontSize: 'clamp(3rem, 9vw, 5.5rem)', lineHeight: 1 },
      h2: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)' },
      h3: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700, fontSize: '2.4rem' },
      h5: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 },
      h6: { fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: 700 },
    },
  }), [mode]);

  const nav = [['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact']];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1301, height: 3, bgcolor: 'transparent' }} aria-hidden="true" />
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(12px)', bgcolor: mode === 'dark' ? 'rgba(14,18,38,.75)' : 'rgba(245,246,251,.8)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography component="a" href="#home" variant="h6" sx={{ color: 'text.primary', textDecoration: 'none' }}>Gayathri P</Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            {nav.map(([id, label]) => (
              <Button key={id} href={`#${id}`} color="inherit" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary' }}>{label}</Button>
            ))}
            <IconButton aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`} onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} color="inherit" sx={{ color: 'text.primary' }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <main>
        <Hero />
        <SkillsAndProjects />
        <Experience />
        <Background />
        <Contact />
      </main>

      <Box component="footer" sx={{ py: 4, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} Gayathri P · Built with React and Material UI</Typography>
      </Box>
    </ThemeProvider>
  );
}
