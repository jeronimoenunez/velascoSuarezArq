export const searchData = [
  { title: "Casa en la Sierra", type: "Proyecto", url: "/proyectos/casa-sierra"},
  { title: "Equipo Principal", type: "Sección", url: "/contacto#equipo"},
  { title: "Noticias 2024", type: "Noticia", url: "/contacto#noticias"},
  { title: "Valores y Ética", type: "Nosotros", url: "/nosotros#etica"},
  { title: "Contacto Directo", type: "Sección", url: "/contacto"},
  { title: "Premios Recientes", type: "Historia", url: "/nosotros#premios"}
];

// ✅ Esto va fuera del array, como una constante separada
const redirects = {
  proyectos: "/proyectos",
  nosotros: "/nosotros",
  contacto: "/contacto",
  noticias: "/contacto#noticias",
  equipo: "/contacto#equipo",
  about: "/nosotros#about",
  servicios: "/nosotros#servicios",
  premios: "/nosotros#premios",
  careers: "/contacto#careers"
};
