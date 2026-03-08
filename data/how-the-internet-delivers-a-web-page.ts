import type {
  Concept,
  GlossaryTerm,
  PipelineExplainer,
  Source,
  Stage,
} from "@/lib/concept-schema";

const sources: Source[] = [
  {
    title: "MDN: What happens when you type a URL into your browser?",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_happens_when_you_type_a_URL_into_your_browser",
    note: "High-level overview of DNS, HTTP, and browser rendering.",
  },
  {
    title: "Cloudflare Learning Center: What is DNS?",
    url: "https://www.cloudflare.com/learning/dns/what-is-dns/",
    note: "Short explanation of how domain names are resolved to network addresses.",
  },
  {
    title: "MDN: Critical rendering path",
    url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path",
    note: "Reference for parsing, layout, paint, and render-blocking resources.",
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: "dns",
    term: "DNS",
    definition:
      "The Domain Name System translates a human-readable domain into the network address a browser can contact.",
    stageIds: ["dns"],
  },
  {
    id: "tls",
    term: "TLS",
    definition:
      "The security protocol that helps the browser verify the server and encrypt the connection.",
    stageIds: ["request"],
  },
  {
    id: "html",
    term: "HTML",
    definition:
      "The document structure the browser parses first before it can fetch and arrange the rest of the page.",
    stageIds: ["response", "render"],
  },
  {
    id: "cache",
    term: "Cache",
    definition:
      "Previously stored files or responses that let the browser avoid repeating the full network trip.",
    stageIds: ["address", "render", "speed"],
  },
  {
    id: "cdn",
    term: "CDN",
    definition:
      "A content delivery network serves files from a nearby edge location to reduce latency.",
    stageIds: ["speed"],
  },
];

const stages: Stage[] = [
  {
    id: "address",
    label: "Stage 1",
    goal: "Start with the browser and the page address the user wants.",
    headline: "A page load starts with a URL and a quick cache check.",
    body:
      "The browser reads the address, checks whether it already has reusable files, and decides which parts still need the network.",
    actionLabel: "Compare the browser's local memory with the new request.",
    visibleLayerIds: ["browser", "cache"],
    activeHotspotIds: ["url", "cache"],
    statePatch: {
      highlightedLayerIds: ["browser", "cache"],
      note: "Fast page loads often begin with reuse, not a full trip across the internet.",
      metrics: [
        { label: "Starts with", value: "URL plus local cache", tone: "accent" },
        { label: "Goal", value: "find what still needs the network", tone: "neutral" },
      ],
    },
  },
  {
    id: "dns",
    label: "Stage 2",
    goal: "Show how a domain name becomes an address the browser can reach.",
    headline: "DNS turns a name like example.com into a reachable destination.",
    body:
      "The browser asks a resolver where the site lives. DNS does not fetch the page itself. It only tells the browser where to send the next request.",
    actionLabel: "Follow the name lookup before any HTML arrives.",
    visibleLayerIds: ["browser", "dns", "edge"],
    activeHotspotIds: ["dns", "resolver"],
    statePatch: {
      highlightedLayerIds: ["browser", "dns"],
      note: "Names are for humans. Network addresses are what routers and servers need.",
      metrics: [
        { label: "Human form", value: "domain name", tone: "neutral" },
        { label: "Network form", value: "IP destination", tone: "accent" },
      ],
    },
  },
  {
    id: "request",
    label: "Stage 3",
    goal: "Make the network request feel like a real browser-to-server exchange.",
    headline: "The browser opens a secure connection and sends an HTTP request.",
    body:
      "Once the destination is known, the browser connects through the nearest edge or directly to the origin and asks for the page and its assets.",
    actionLabel: "Track the request from the browser to the server path.",
    visibleLayerIds: ["browser", "dns", "edge", "origin", "response"],
    activeHotspotIds: ["tls", "request"],
    statePatch: {
      highlightedLayerIds: ["browser", "edge", "origin"],
      note: "This is the point where latency starts to matter. The request still has to travel and come back.",
      metrics: [
        { label: "Connection", value: "HTTP over TLS", tone: "accent" },
        { label: "Asks for", value: "document plus assets", tone: "neutral" },
      ],
    },
  },
  {
    id: "response",
    label: "Stage 4",
    goal: "Show the server turning the request into bytes the browser can use.",
    headline: "The server responds with HTML first, then the rest of the page assets.",
    body:
      "The origin or edge returns the initial document. That response can include references to CSS, JavaScript, images, and fonts the browser still needs to collect.",
    actionLabel: "Inspect the response before the page is actually painted.",
    visibleLayerIds: ["browser", "edge", "origin", "response", "renderer"],
    activeHotspotIds: ["server", "html"],
    statePatch: {
      highlightedLayerIds: ["origin", "response", "renderer"],
      outputLabel: "HTML, CSS, JS, images",
      note: "The network returns bytes. The browser still has to understand and organize them.",
      metrics: [
        { label: "First payload", value: "HTML document", tone: "accent" },
        { label: "Often includes", value: "more files to fetch", tone: "neutral" },
      ],
    },
  },
  {
    id: "render",
    label: "Stage 5",
    goal: "Keep the browser, not the server, as the place where the screen is built.",
    headline: "The browser parses, arranges, and paints the page into visible pixels.",
    body:
      "The renderer turns HTML into a DOM, combines it with CSS, runs layout, and paints what belongs on screen. Extra scripts and images can delay parts of that work.",
    actionLabel: "Watch the browser transform files into a visual page.",
    visibleLayerIds: ["browser", "cache", "response", "renderer", "page"],
    activeHotspotIds: ["dom", "subresources"],
    statePatch: {
      highlightedLayerIds: ["renderer", "page", "cache"],
      outputLabel: "Rendered page",
      note: "A browser does more than display files. It interprets them and constructs the visual result.",
      metrics: [
        { label: "Browser builds", value: "structure, style, layout", tone: "accent" },
        { label: "Can stall on", value: "extra blocking resources", tone: "warning" },
      ],
    },
  },
  {
    id: "speed",
    label: "Stage 6",
    goal: "Bring caching and distance back into the main story as speed controls.",
    headline: "Speed depends on what can be reused and how far the request has to travel.",
    body:
      "CDNs, caches, compression, and smaller files reduce waiting. Long distances, cold caches, and heavy scripts make the same basic page load feel slower.",
    actionLabel: "Compare nearby cached delivery with slower cold-start delivery.",
    visibleLayerIds: [
      "browser",
      "cache",
      "edge",
      "origin",
      "renderer",
      "page",
      "latency",
    ],
    activeHotspotIds: ["cdn", "latency"],
    statePatch: {
      highlightedLayerIds: ["cache", "edge", "latency", "page"],
      outputLabel: "Fast when nearby and reusable",
      note: "Performance work often means reducing repeated work, moving files closer, and shipping less.",
      metrics: [
        { label: "Faster with", value: "cache hits and nearby edge", tone: "accent" },
        { label: "Slower with", value: "cold starts and heavy assets", tone: "warning" },
      ],
    },
  },
];

export const webPageExplainer = {
  id: "web-page-pipeline",
  type: "pipeline",
  title: "Browser-to-page walkthrough",
  summary:
    "Follow one page request from URL and DNS to the server response and the browser render path.",
  intro:
    "Use this guided view first. Each stage shows which part of the page load changed and why the result appears on screen.",
  defaultStageId: stages[0].id,
  heroKicker: "Guided pipeline",
  heroTitle: "Watch the web turn a URL into pixels.",
  heroSummary:
    "The browser names the destination, asks the network, receives files, and then does the work of rendering the page.",
  layers: [
    {
      id: "browser",
      label: "Browser",
      shortLabel: "Browser",
      kind: "input",
      tone: "neutral",
      position: { x: 7, y: 56, width: 20, height: 18 },
      description: "The user's browser starts the request and later paints the result.",
    },
    {
      id: "cache",
      label: "Local cache",
      shortLabel: "Cache",
      kind: "data",
      tone: "secondary",
      position: { x: 8, y: 18, width: 18, height: 16 },
      description: "Reusable files and responses the browser already has on the device.",
    },
    {
      id: "dns",
      label: "DNS lookup",
      shortLabel: "DNS",
      kind: "process",
      tone: "accent",
      position: { x: 34, y: 18, width: 18, height: 16 },
      description: "The name lookup that resolves a domain into a reachable destination.",
    },
    {
      id: "edge",
      label: "Edge network",
      shortLabel: "Edge",
      kind: "process",
      tone: "secondary",
      position: { x: 31, y: 54, width: 18, height: 18 },
      description: "A nearby edge or CDN location that can accept the request or serve cached files.",
    },
    {
      id: "origin",
      label: "Origin server",
      shortLabel: "Server",
      kind: "model",
      tone: "accent",
      position: { x: 55, y: 32, width: 18, height: 22 },
      description: "The application or server that generates the canonical response.",
    },
    {
      id: "response",
      label: "Response payload",
      shortLabel: "HTML",
      kind: "output",
      tone: "accent",
      position: { x: 77, y: 18, width: 15, height: 16 },
      description: "The returned HTML and references to the rest of the page assets.",
    },
    {
      id: "renderer",
      label: "Render engine",
      shortLabel: "Render",
      kind: "process",
      tone: "secondary",
      position: { x: 74, y: 54, width: 16, height: 16 },
      description: "The browser pipeline that parses files and turns them into a layout.",
    },
    {
      id: "page",
      label: "Visible page",
      shortLabel: "Pixels",
      kind: "output",
      tone: "neutral",
      position: { x: 89, y: 47, width: 8, height: 20 },
      description: "The final painted result on screen.",
    },
    {
      id: "latency",
      label: "Latency pressure",
      shortLabel: "Delay",
      kind: "warning",
      tone: "warning",
      position: { x: 62, y: 77, width: 26, height: 10 },
      description: "Waiting caused by distance, repeated work, or heavy assets.",
    },
  ],
  connections: [
    { id: "browser-cache", sourceLayerId: "browser", targetLayerId: "cache" },
    { id: "browser-dns", sourceLayerId: "browser", targetLayerId: "dns" },
    { id: "dns-edge", sourceLayerId: "dns", targetLayerId: "edge" },
    { id: "browser-edge", sourceLayerId: "browser", targetLayerId: "edge" },
    { id: "edge-origin", sourceLayerId: "edge", targetLayerId: "origin" },
    { id: "origin-response", sourceLayerId: "origin", targetLayerId: "response" },
    { id: "response-renderer", sourceLayerId: "response", targetLayerId: "renderer" },
    { id: "browser-renderer", sourceLayerId: "browser", targetLayerId: "renderer" },
    { id: "renderer-page", sourceLayerId: "renderer", targetLayerId: "page" },
    { id: "edge-latency", sourceLayerId: "edge", targetLayerId: "latency" },
    { id: "origin-latency", sourceLayerId: "origin", targetLayerId: "latency" },
  ],
  hotspots: [
    {
      id: "url",
      anchor: { x: 17, y: 64 },
      label: "URL",
      body:
        "The browser starts with a location string that includes the domain, path, and sometimes query data.",
      media: "That address tells the browser what it wants, but not yet where to find it on the network.",
      revealsInStages: ["address"],
      tone: "neutral",
    },
    {
      id: "cache",
      anchor: { x: 17, y: 25 },
      label: "Cache hit",
      body:
        "If the browser already has valid copies of files, it can skip or shorten part of the network trip.",
      media: "Performance often improves by avoiding work, not by making every step faster.",
      revealsInStages: ["address", "render", "speed"],
      relatedGlossaryTermIds: ["cache"],
      tone: "secondary",
    },
    {
      id: "dns",
      anchor: { x: 43, y: 26 },
      label: "DNS lookup",
      body:
        "DNS answers the question, 'Which destination should handle this domain name?' It does not deliver the page content itself.",
      media: "Resolvers, caches, and authoritative records all help fill in that answer.",
      revealsInStages: ["dns"],
      relatedGlossaryTermIds: ["dns"],
      tone: "accent",
    },
    {
      id: "resolver",
      anchor: { x: 36, y: 18 },
      label: "Resolver",
      body:
        "The browser usually asks a DNS resolver first. That resolver may already know the answer or fetch it from upstream records.",
      media: "Good DNS caching reduces repeated name lookups.",
      revealsInStages: ["dns"],
      tone: "secondary",
    },
    {
      id: "tls",
      anchor: { x: 41, y: 63 },
      label: "TLS handshake",
      body:
        "Before the browser sends or receives page data securely, it has to verify the server and agree on encryption keys.",
      media: "That extra setup protects the connection, but it still adds round trips.",
      revealsInStages: ["request"],
      relatedGlossaryTermIds: ["tls"],
      tone: "accent",
    },
    {
      id: "request",
      anchor: { x: 63, y: 44 },
      label: "HTTP request",
      body:
        "The browser asks for a specific document or file. Headers tell the server what the browser accepts and what it may already have cached.",
      media: "The same origin can return HTML, JSON, images, or scripts depending on the route.",
      revealsInStages: ["request"],
      tone: "neutral",
    },
    {
      id: "server",
      anchor: { x: 63, y: 35 },
      label: "Origin work",
      body:
        "The origin can read templates, query a database, personalize content, and decide what response to return.",
      media: "Even a simple page may involve application code before the first byte leaves the server.",
      revealsInStages: ["response"],
      tone: "accent",
    },
    {
      id: "html",
      anchor: { x: 84, y: 26 },
      label: "HTML response",
      body:
        "HTML gives the browser the page structure first. That document usually points to additional CSS, JavaScript, fonts, and images.",
      media: "The first response rarely contains the whole experience by itself.",
      revealsInStages: ["response", "render"],
      relatedGlossaryTermIds: ["html"],
      tone: "secondary",
    },
    {
      id: "dom",
      anchor: { x: 82, y: 61 },
      label: "DOM and layout",
      body:
        "The browser builds an internal structure, combines it with styles, then computes how every visible box should be placed.",
      media: "Rendering is a browser-side pipeline, not a static file dump.",
      revealsInStages: ["render"],
      tone: "accent",
    },
    {
      id: "subresources",
      anchor: { x: 92, y: 57 },
      label: "Subresources",
      body:
        "Images, fonts, CSS, and JavaScript can trigger more requests before the final page feels complete.",
      media: "This is why one page load often becomes many coordinated fetches.",
      revealsInStages: ["render"],
      tone: "neutral",
    },
    {
      id: "cdn",
      anchor: { x: 40, y: 62 },
      label: "CDN edge",
      body:
        "A CDN keeps copies of static files closer to the user so the response does not always have to come from the origin.",
      media: "It shortens distance and offloads repeat traffic from the main server.",
      revealsInStages: ["speed"],
      relatedGlossaryTermIds: ["cdn"],
      tone: "secondary",
    },
    {
      id: "latency",
      anchor: { x: 75, y: 80 },
      label: "Latency",
      body:
        "Every lookup, handshake, and file request adds waiting. More round trips and larger files usually mean a slower page.",
      media: "Front-end performance work is largely the art of removing avoidable delay.",
      revealsInStages: ["speed"],
      tone: "warning",
    },
  ],
  stages,
  sources,
  glossary,
} satisfies PipelineExplainer;

export const webPageConcept = {
  slug: "how-the-internet-delivers-a-web-page",
  title: "How the Internet Delivers a Web Page",
  question: "How does a browser turn a URL into a rendered page?",
  summary:
    "A compact walkthrough of DNS, request routing, server response, and the browser render path.",
  thumbnail: "Browser-to-page pipeline",
  estimatedMinutes: 4,
  tags: ["Internet", "Web", "Networking", "Interactive"],
  status: "published",
  defaultExplainerId: webPageExplainer.id,
  theme: {
    accent: "#8dc0ff",
    accentSecondary: "#5bdfe0",
    glow: "rgba(141, 192, 255, 0.18)",
    canvas:
      "radial-gradient(circle at 20% 18%, rgba(141,192,255,0.2), rgba(141,192,255,0) 34%), radial-gradient(circle at 82% 22%, rgba(91,223,224,0.14), rgba(91,223,224,0) 30%), linear-gradient(180deg, rgba(7,11,28,0.98), rgba(5,9,22,0.96))",
  },
  glossary,
  sources,
  explainers: [webPageExplainer],
} satisfies Concept;
