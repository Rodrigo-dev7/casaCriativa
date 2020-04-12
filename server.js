// usei o express pra criar e configurar meu servidor
const express = require("express");
const server = express();
const db = require("./db");

// const ideas = [
//     {
//         img: 'https://image.flaticon.com/icons/svg/2728/2728995.svg',
//         title: 'Cursos de Programação',
//         category: 'Estudos',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://rocketseat.com.br'
//     },

//     {
//         img: 'https://image.flaticon.com/icons/svg/1787/1787074.svg',
//         title: 'Exercícios',
//         category: 'Saúde',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://www.smartfit.com.br/'
//     },

//     {
//         img: 'https://image.flaticon.com/icons/svg/2597/2597239.svg',
//         title: 'Meditação',
//         category: 'Mentalidade',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://www.youtube.com/user/MOVAFILMES'
//     },

//     {
//         img: 'https://www.flaticon.com/premium-icon/icons/svg/2586/2586771.svg',
//         title: 'Filmes',
//         category: 'Ciname',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://seriesflixtv.net/'
//     },

//     {
//         img: 'https://image.flaticon.com/icons/svg/2784/2784128.svg',
//         title: 'Tocar Vioção',
//         category: 'Musical',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://www.youtube.com/user/CifraClub'
//     },

//     {
//         img: 'https://image.flaticon.com/icons/svg/2424/2424648.svg',
//         title: 'Karaokê',
//         category: 'Diversão em Familía',
//         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//         url: 'https://www.youtube.com/results?search_query=karaok%C3%AA'
//     },
// ]

// configura arquivos extáticos (css, script ,imagens)
server.use(express.static("public"));

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return res.send("Error no banco de dados!");
    }

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    // lastIdeas = lastIdeas.reverse();

    return res.render("index.html", { ideas: lastIdeas });
  });
});

server.get("/ideias", function(req, res) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return res.send("Error no banco de dados!");
    }

    const reversedIdeas = [...rows].reverse();

    return res.render("ideias.html", { ideas: reversedIdeas });
  });
});

server.post("/", function(req, res) {
  //   Inserir dado na tabela
  const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);

  `;
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ];
  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.send("Error no banco de dados!");
    }

    return res.redirect("./ideias");
  });
});

server.listen(4000);
