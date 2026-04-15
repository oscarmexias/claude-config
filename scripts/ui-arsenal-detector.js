#!/usr/bin/env node
/**
 * Proactive Skill Advisor — UserPromptSubmit hook
 * Detects domain keywords and injects context for Claude to act
 * as a proactive expert, surfacing the right skill for the task.
 */

const input = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf8'));
const prompt = (input.prompt || '').toLowerCase();

const domains = [
  {
    name: 'UI_DESIGN',
    keywords: [
      'diseña', 'diseño', 'design', 'interfaz', 'interface', 'pantalla', 'screen',
      'layout', 'componente', 'component', 'visual', 'estético', 'aesthetic',
      'look', 'apariencia', 'estilo', 'style', 'color', 'tipografía', 'typography',
      'fuente', 'font', 'hero', 'landing', 'navbar', 'modal', 'card', 'button',
      'botón', 'sidebar', 'dashboard', 'formulario', 'form', 'icono', 'icon',
      'svg', 'logo', 'animación', 'animation', 'transición', 'transition', 'hover',
      'motion', 'efecto', 'effect', 'parallax', 'frontend', 'front-end', 'página',
      'page', 'sección', 'section', 'tailwind', 'responsive', 'mejora visual',
      'bonito', 'beautiful', 'impresionante', 'nivel', 'level up',
    ],
    message:
      '[SKILL-ADVISOR:UI/UX] Design keywords detected. Act proactively as a UI/UX expert: ' +
      'assess what is being built, surface the 1-3 most relevant skills from the arsenal ' +
      '(awwwards-animations, threejs-animation, ui-animation, svg-animation-engineer, ' +
      'canvas-design, stitch-design, stitch-loop, design-md, frontend-design, ' +
      'interface-design, component-scout, fixing-motion-performance, technical-constraints). ' +
      'Suggest top pick with one-line rationale. Offer to activate via /user:{skill-name}.',
  },
  {
    name: 'BACKEND_API',
    keywords: [
      'api', 'endpoint', 'route', 'ruta', 'backend', 'servidor', 'server',
      'middleware', 'rest', 'graphql', 'webhook', 'request', 'response',
      'petición', 'respuesta', 'handler', 'controller', 'service', 'servicio',
      'microservice', 'arquitectura', 'architecture', 'next.js api', 'api route',
      'edge function', 'error handling', 'manejo de errores', 'retry', 'timeout',
      'rate limit', 'autenticación', 'authentication', 'auth', 'jwt', 'session',
    ],
    message:
      '[SKILL-ADVISOR:BACKEND] Backend/API keywords detected. Proactively suggest relevant skills: ' +
      'api-design-principles (REST/GraphQL design patterns), ' +
      'error-handling-patterns (resilient error flows), ' +
      'vercel-react-best-practices (Next.js API routes + Edge Functions), ' +
      'systematic-debugging (if diagnosing issues). ' +
      'Recommend the most relevant one with rationale. Offer to activate via /user:{skill-name}.',
  },
  {
    name: 'DATABASE',
    keywords: [
      'database', 'base de datos', 'db', 'sql', 'query', 'tabla', 'table',
      'schema', 'migración', 'migration', 'índice', 'index', 'supabase',
      'postgres', 'postgresql', 'rls', 'row level security', 'foreign key',
      'relación', 'relation', 'join', 'transaction', 'transacción', 'orm',
      'prisma', 'drizzle', 'consulta', 'performance de db', 'n+1',
    ],
    message:
      '[SKILL-ADVISOR:DATABASE] Database keywords detected. Proactively suggest: ' +
      'supabase-postgres-best-practices (RLS, query optimization, schema design, indexing). ' +
      'This is the primary DB skill. Activate via /user:supabase-postgres-best-practices.',
  },
  {
    name: 'SECURITY',
    keywords: [
      'seguridad', 'security', 'vulnerabilidad', 'vulnerability', 'exploit',
      'xss', 'csrf', 'injection', 'inyección', 'sql injection', 'auth bypass',
      'secret', 'secreto', 'api key', 'credential', 'credencial',
      'leak', 'filtración', 'exposed', 'expuesto', 'scan', 'audit', 'auditoría',
      'git secret', 'env', '.env', 'owasp', 'penetration', 'pentest',
      'web3 security',
    ],
    message:
      '[SKILL-ADVISOR:SECURITY] Security keywords detected. Proactively suggest: ' +
      'secrets-scanner (find exposed keys/tokens in code), ' +
      'git-security-2025 (git history auditing, pre-commit guards), ' +
      'semgrep MCP (static analysis — already connected). ' +
      'For Web3: security-guidance plugin covers wallet/signing flows. ' +
      'Recommend the right tool with rationale.',
  },
  {
    name: 'MARKETING_GTM',
    keywords: [
      'marketing', 'lanzamiento', 'launch', 'gtm', 'go-to-market', 'estrategia',
      'strategy', 'audiencia', 'audience', 'usuario', 'user', 'cliente', 'customer',
      'growth', 'crecimiento', 'conversión', 'conversion', 'funnel', 'embudo',
      'copy', 'copywriting', 'texto', 'mensaje', 'message', 'propuesta de valor',
      'value proposition', 'posicionamiento', 'positioning', 'competencia',
      'competitor', 'mercado', 'market', 'substack', 'redes sociales', 'social',
      'viral', 'distribución', 'distribution', 'canal', 'channel', 'pitch',
      'inversión', 'investment', 'mvp', 'validar', 'validate',
    ],
    message:
      '[SKILL-ADVISOR:MARKETING] Marketing/GTM keywords detected. Proactively suggest: ' +
      'go-to-market-plan (launch strategy, channels, GTM phases), ' +
      'copywriting (messaging, value prop, anti-AI-voice copy), ' +
      'competitive-visual-audit (competitor analysis), ' +
      'brand-strategist (brand positioning), ' +
      'product-strategist (product-market fit, growth). ' +
      'Recommend the most relevant one for the specific ask.',
  },
  {
    name: 'WEB3_CRYPTO',
    keywords: [
      'web3', 'crypto', 'blockchain', 'nft', 'mint', 'wallet', 'billetera',
      'ethereum', 'solana', 'base', 'polygon', 'evm', 'smart contract',
      'contrato inteligente', 'wagmi', 'viem', 'ethers', 'metamask',
      'connect wallet', 'signature', 'firma', 'transaction', 'gas', 'ipfs',
      'token', 'erc-20', 'erc-721', 'defi', 'dapp', 'on-chain',
    ],
    message:
      '[SKILL-ADVISOR:WEB3] Web3/crypto keywords detected. Proactively suggest: ' +
      'wagmi (React hooks for EVM — wallet connect, contract reads/writes), ' +
      'viem (low-level EVM client — transactions, ABI encoding), ' +
      'wallets (multi-wallet strategy, WalletConnect, Privy). ' +
      'Stack recommendation: wagmi + viem for EVM chains. ' +
      'Activate via /user:wagmi or /user:viem.',
  },
  {
    name: 'TESTING_QA',
    keywords: [
      'test', 'testing', 'prueba', 'qa', 'calidad', 'quality', 'e2e',
      'end-to-end', 'unit test', 'integration test', 'playwright', 'cypress',
      'jest', 'vitest', 'cobertura', 'coverage', 'mock', 'stub', 'assertion',
      'regresión', 'regression', 'flaky', 'ci/cd', 'pipeline',
    ],
    message:
      '[SKILL-ADVISOR:TESTING] Testing/QA keywords detected. Proactively suggest: ' +
      'test-driven-development (TDD approach, test structure, coverage strategy), ' +
      'mobile-testing (device/browser matrix, Playwright mobile config). ' +
      'Playwright MCP is also connected for live browser automation. ' +
      'Recommend based on what type of testing is needed.',
  },
];

// Word-boundary check without dynamic RegExp (avoids ReDoS).
// For short/collision-prone keywords, verify surrounding chars are non-alphanumeric.
const WORD_BOUNDARY_KW = new Set([
  'api', 'db', 'sql', 'rls', 'orm', 'xss', 'env', 'qa', 'ci',
  'e2e', 'bug', 'rest', 'jwt', 'mvp', 'gtm', 'svg', 'css', 'gas', 'evm',
  'base', 'token', 'form', 'page', 'auth', 'scan', 'mock', 'stub',
  'copy', 'user', 'canal', 'firma', 'look',
]);

function isNonAlpha(ch) {
  return ch === undefined || !/[a-z0-9áéíóúüñ]/.test(ch);
}

function matchesWord(str, kw) {
  let idx = str.indexOf(kw);
  while (idx !== -1) {
    if (isNonAlpha(str[idx - 1]) && isNonAlpha(str[idx + kw.length])) return true;
    idx = str.indexOf(kw, idx + 1);
  }
  return false;
}

function matches(prompt, kw) {
  return WORD_BOUNDARY_KW.has(kw) ? matchesWord(prompt, kw) : prompt.includes(kw);
}

const triggered = domains.filter(domain =>
  domain.keywords.some(kw => matches(prompt, kw))
);

if (triggered.length > 0) {
  const messages = triggered.map(d => d.message).join('\n');
  process.stdout.write(messages);
}

process.exit(0);
