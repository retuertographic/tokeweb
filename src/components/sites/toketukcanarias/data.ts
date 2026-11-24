// Content extracted from https://toketukcanarias.com/ (Spanish homepage).
export const SITE = "https://toketukcanarias.com";
export const A = "/sites/toketukcanarias";

export type NavItem = { label: string; href?: string; children?: NavItem[] };

export const nav: NavItem[] = [
  {
    label: "Tours",
    href: "/tours/",
    children: [
      { label: "Tenerife", href: "/tours-tenerife/" },
      { label: "Gran Canaria", href: "/tours-gran-canaria/" },
      // "Lanzarote" is shown without a link on the source (coming soon).
      { label: "Lanzarote" },
    ],
  },
  {
    label: "Quienes Somos",
    href: "/quienes-somos/",
    children: [{ label: "Colaboraciones especiales", href: "/colaboraciones-especiales/" }],
  },
];

export const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
] as const;

export type Tour = { title: string; text: string; image: string; href: string };

export const toursTenerife: Tour[][] = [
  [
    {
      title: "Santa Cruz Exprés",
      text: "Desde la Plaza de España hasta el océano, parques y calles con encanto. Historia, naturaleza y cultura local en un paseo cómodo y panorámico en Tuk Tuk. Ideal para cruceristas y exploradores con poco tiempo.",
      image: `${A}/images/tour-santa-cruz-expres.jpg`,
      href: "/cruz-expres-capital-con-encanto/",
    },
    {
      title: "Santa Cruz: Cultural y Moderna",
      text: "Explora historia, arte urbano y vistas espectaculares en un cómodo paseo en TukTuk. Incluye miradores, mercado local, arquitectura tradicional y moderna, y rincones llenos de cultura viva. Perfecto para amantes del arte, la historia y la autenticidad canaria.",
      image: `${A}/images/tour-santa-cruz-cultural.jpg`,
      href: "/cruz-cultural-y-moderna/",
    },
    {
      title: "Santa Cruz, San Andrés & Las Teresitas",
      text: "Descubre lo mejor de Santa Cruz y su costa en una experiencia completa en TukTuk: ciudad, cultura, miradores y el famoso arenal dorado de Las Teresitas. Ideal para cruceristas con escala larga o viajeros que no quieren perderse nada.",
      image: `${A}/images/tour-santa-cruz-teresitas.jpg`,
      href: "/santa-cruz-esencial-san-andres-teresitas/",
    },
  ],
  [
    {
      title: "Costa y Miradores",
      text: "Recorre Costa Adeje en 1 hora panorámica: miradores, playas, zonas comerciales y vistas a La Gomera. Ideal para cruceristas, recién llegados y familias que quieren una primera impresión cómoda y completa.",
      image: `${A}/images/tour-costa-miradores.jpg`,
      href: "/sur-de-tenerife-costa-y-miradores/",
    },
    {
      title: "Historia y Mar",
      text: "Descubre lo mejor del sur de Tenerife: playas, historia local y miradores costeros. Una ruta panorámica y cultural que conecta Costa Adeje, Las Américas y Los Cristianos. Ideal para parejas y grupos curiosos.",
      image: `${A}/images/tour-historia-mar.jpg`,
      href: "/sur-de-tenerife-historia-y-mar/",
    },
    {
      title: "Tenerife Esencial Sur",
      text: "Una ruta completa por el sur de Tenerife: pueblos históricos, paisajes naturales, playas y miradores. Ideal para quienes buscan conocerlo todo sin prisas y sin alquilar coche.",
      image: `${A}/images/tour-esencial-sur.jpg`,
      href: "/sur-de-tenerife-tenerife-esencial-sur/",
    },
  ],
  [
    {
      title: "Norte de Tenerife - Puerto de la Cruz Clásico",
      text: "Descubre la esencia de Puerto de la Cruz en este tour exprés por sus rincones más emblemáticos. Desde la Plaza del Charco recorrerás la costa pasando por el Lago Martiánez y el Mirador de San Telmo, con vistas al Atlántico. El recorrido continúa por calles tradicionales y finaliza junto al histórico Jardín Botánico.",
      image: `${A}/images/tour-puerto-clasico.jpg`,
      href: "/norte-de-tenerife-puerto-de-la-cruz-clasico/",
    },
    {
      title: "Norte de Tenerife - Puerto y Jardines",
      text: "Descubre el lado más verde y auténtico de Puerto de la Cruz en este tour de 2 horas. Visita el Lago Martiánez, el Mirador de San Telmo y el histórico Jardín Botánico, rodeado de especies tropicales. Disfruta de vistas desde el Mirador de La Paz, zonas de plataneras tradicionales y finaliza junto al Castillo de San Felipe.",
      image: `${A}/images/tour-puerto-jardines.jpg`,
      href: "/norte-de-tenerife-puerto-y-jardines/",
    },
    {
      title: "Norte de Tenerife - Puerto + La Orotava Colonial",
      text: "Vive una experiencia completa por el norte de Tenerife en este tour de 3 horas. Recorre Puerto de la Cruz y continúa hacia la histórica La Orotava, con sus calles coloniales, la Casa de los Balcones y los Jardines Victoria. Disfruta de arquitectura canaria, cultura local y vistas panorámicas del valle de La Orotava.",
      image: `${A}/images/tour-puerto-orotava.jpg`,
      href: "/norte-de-tenerife-puerto-la-orotava-colonial/",
    },
  ],
  [
    {
      title: "Candelaria - Historia, Mar y Cultura",
      text: "Descubre la historia de Candelaria, su Basílica, sus tradiciones y algunos de sus rincones más emblemáticos junto al mar.",
      image: `${A}/images/tour-candelaria.png`,
      href: "/candelaria-en-tuk-tuk-historia-mar-y-cultura-60-min/",
    },
    {
      title: "Ruta VIP: Despedida de Soltero/a en Tuk Tuk por Santa Cruz (4 horas)",
      text: "Celebra el último gran plan de soltero/a de tu amigo/a con una experiencia inolvidable, llena de música, copas, risas y los mejores paisajes de Tenerife a bordo de nuestros Tuk Tuks! Ver más",
      image: `${A}/images/tour-despedida.jpg`,
      href: "/despedida-de-soltero/",
    },
  ],
];

export const toursGranCanaria: Tour[][] = [
  [
    {
      title: "Descubre la Costa & Ciudad Moderna de Las Palmas (GC) en Tuk Tuk (1 hora)",
      text: "Descubre Las Palmas de Gran Canaria desde un tuk tuk ecológico: costa atlántica, miradores con vistas únicas y el corazón moderno de la ciudad en una hora de pura aventura urbana.",
      image: `${A}/images/tour-gc-costa.jpg`,
      href: "/ciudad-moderna-las-palmas-gran-canaria/",
    },
    {
      title: "Descubre la Historia y Miradores de Las Palmas (GC) en Tuk Tuk (90 min.)",
      text: "Viaja en tuk tuk por el corazón histórico de Las Palmas de Gran Canaria: barrios con siglos de historia, catedrales, museos y miradores con vistas panorámicas que te dejarán sin palabras.",
      image: `${A}/images/tour-gc-historia.jpg`,
      href: "/historia-miradores-las-palmas-tuk-tuk/",
    },
  ],
];

export const steps = [
  { step: "Paso 1", icon: "shippingFast", title: "Elige tu tour", text: "Selecciona o personaliza una de nuestras opciones." },
  { step: "Paso 2", icon: "wifi", title: "Reserva Online", text: "Elige día y hora." },
  { step: "Paso 3", icon: "smileBeam", title: "¡Disfruta!", text: "Relájate y déjate llevar mientras descubres Tenerife en nuestros Tuktuks." },
] as const;

export const gallery = [2, 6, 1, 3, 7].map((n) => `${A}/images/gallery-${n}.jpg`);

export const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJWwm33C3NQQwRRRFPErTt8Rg";

export type GoogleReview = { name: string; avatar: string; date: string; text?: string; truncated?: boolean };

export const googleReviews: GoogleReview[] = [
  { name: "Nadia Landais", avatar: "nadia-landais", date: "04.09.2026", text: "Super promenade en tuc tuc !!! guide très gentil." },
  { name: "josselin christiane", avatar: "josselin-christiane", date: "03.09.2026", text: "Très belle balade avec Ewdardo,très sympathique et à l écoute", truncated: true },
  { name: "Jessica Hills", avatar: "jessica-hills", date: "28.08.2026", text: "Had a great experience yesterday. Our tour guide was Edouard,", truncated: true },
  { name: "AntonioAM", avatar: "antonioam", date: "24.08.2026", text: "Espectacular visita a Las Palmas Muy recomendable" },
  { name: "Gianluca", avatar: "gianluca", date: "03.08.2026" },
  { name: "Anaëlle Ferion", avatar: "anaelle-ferion", date: "01.08.2026", text: "Une excursion très sympa avec Eduardo, un super guide. Plusieurs", truncated: true },
  { name: "Lina Dinas", avatar: "lina-dinas", date: "04.07.2026", text: "Super giro a Santa Cruz, grazie per questa splendida esperienza!", truncated: true },
  { name: "ALICIA GOMEZ", avatar: "alicia-gomez", date: "21.06.2026" },
  { name: "Enrique Hernández Bossa", avatar: "enrique-hernandez-bossa", date: "21.06.2026", text: "Vehículos cómodos y potentes y conductores y guías super amables." },
  { name: "Xavi Fresnesan", avatar: "xavi-fresnesan", date: "21.06.2026", text: "Una experiencia muy positiva y espectacular. Subir en los Tuk", truncated: true },
];

export const whyUs = [
  { icon: "laughBeam", title: "Diversión", text: "Experiencia en tuktuk amena y divertida para todas las edades." },
  { icon: "leaf", title: "Sostenibilidad", text: "Los tuktuk son 100% eléctricos apoyando el turismo sostenible." },
  { icon: "mapMarkedAlt", title: "Cultura", text: "Rutas culturales de la ciudad para fomentar el conocimiento y apoyar la cultura" },
] as const;

export const faqs = [
  { q: "¿Cuántas personas caben en un Tuktuk?", a: "Cada tuk tuk tiene capacidad máxima para 4 pasajeros." },
  { q: "¿Cuántos Tuktuk puedo reservar?", a: "Puedes reservar varios Tuktuk al mismo tiempo. Para grupos grandes, contáctanos con antelación y organizaremos el mejor recorrido para ti." },
  { q: "¿Puedo cancelar mi tour?", a: "Sí, puedes cancelar tu tour con 24 horas de antelación para obtener un reembolso completo. Para cancelaciones fuera de este plazo, consulta nuestras políticas." },
  { q: "¿Puedo cambiar el día y hora de la reserva?", a: "Sí, puedes modificar tu reserva con al menos 2 horas de antelación, sujeto a disponibilidad. Escríbenos o llámanos para gestionar el cambio." },
  { q: "¿Dónde es el punto de encuentro?", a: "El punto de encuentro y finalización del tour es en una ubicación indicada en el tour." },
];

export const testimonials = [
  { name: "María", country: "España", text: "Una experiencia maravillosa para descubrir costa Adeje y el sur de Tenerife. La ruta por la costa y los miradores fue espectacular, con vistas increíbles al océano. El conductor fue muy amable y atento en todo momento. Es una forma diferente y muy cómoda de conocer la zona. Sin duda, lo recomiendo." },
  { name: "Jack", country: "España", text: "A fantastic way to discover Santa Cruz de Tenerife. The tuk tuk tour is comfortable, fun, and very enjoyable, making it an effortless way to explore the city. The audio guide is well organized, and we were offered water and a small thoughtful detail that made the experience even more comfortable. A perfect way to enjoy Santa Cruz from a different perspective. Highly recommended for any visitor." },
  { name: "Melanie", country: "España", text: "Ich habe die Tuk-Tuk-Tour durch Santa Cruz gemacht und sie hat mir sehr gefallen. Es ist eine andere, bequeme und unterhaltsame Art, die Stadt kennenzulernen. Der Audioguide ist sehr gut gemacht, klar und spannend und erklärt während der Fahrt die interessantesten Punkte. Der Fahrer war sehr freundlich und professionell und sorgte jederzeit für eine angenehme und sichere Fahrt. Eine absolut empfehlenswerte Erfahrung, um Santa Cruz auf eine besondere Art zu entdecken!" },
  { name: "Michael", country: "Estados Unidos", text: "Wonderful company. Clean, brand new vehicles. This tour allows you to see a lot of the city and island if you are short on time. Everyone was so polite, courteous and accommodating. We enjoyed the excursion. Highly recommend!" },
  { name: "Laura", country: "Reino Unido", text: "Great experience exploring Santa Cruz by tuk tuk! It’s a comfortable and relaxed way to see the highlights in a short amount of time. The guide was knowledgeable and friendly, and the vehicle was spotless and modern. We especially appreciated the little details that made the tour feel personal. Would definitely recommend!" },
  { name: "Thomas R.", country: "Alemania", text: "Die Tour mit dem Tuk-Tuk durch Santa Cruz war wirklich eine tolle Erfahrung. Man sieht viele interessante Orte und bekommt gleichzeitig spannende Informationen über die Stadt und ihre Geschichte. Unser Fahrer war sehr freundlich und professionell, sodass wir uns jederzeit sicher gefühlt haben. Eine klare Empfehlung für alle, die Santa Cruz auf eine besondere Weise entdecken möchten!" },
  { name: "Sophie", country: "France", text: "A really nice and fun way to explore the city! The tuktuk was very comfortable and perfect for taking photos along the way. The audio explanations were clear and informative, and the driver was extremely welcoming. It’s ideal if you want to see the main sights without walking too much. Highly recommended!" },
];

export const OFFICE_MAPS_URL =
  "https://www.google.com/maps/place/C.+de+Fern%C3%A1ndez+Navarro,+7,+38003+Santa+Cruz+de+Tenerife,+Spain/@28.462465,-16.253288,15z/data=!4m6!3m5!1s0xc41cc9d4946b635:0xb7b1b31b0d6b70c4!8m2!3d28.4624654!4d-16.253288!16s%2Fg%2F11c4vxt19c?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D";

export const legalLinks = [
  { label: "Política de privacidad", href: "/politica-de-privacidad/" },
  { label: "Aviso legal", href: "/aviso-legal/" },
  { label: "Política de cookies", href: "/politica-de-cookies/" },
  { label: "Condiciones Generales de Contratación (CGC)", href: "/condiciones-generales-de-contratacion-cgc/" },
];
