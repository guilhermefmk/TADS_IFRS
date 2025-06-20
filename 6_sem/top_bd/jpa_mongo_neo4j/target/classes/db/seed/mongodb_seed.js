// UUIDs fixos para garantir correspondência entre MongoDB e Neo4j
const userUUIDs = {
    "Alice":   "b1e1a1e0-1111-4a1a-9a1a-111111111111",
    "Bob":     "b2e2a2e0-2222-4a2a-9a2a-222222222222",
    "Charlie": "b3e3a3e0-3333-4a3a-9a3a-333333333333",
    "Diana":   "b4e4a4e0-4444-4a4a-9a4a-444444444444",
    "Eve":     "b5e5a5e0-5555-4a5a-9a5a-555555555555"
};

const postUUIDs = {
    "p1": "post-1",
    "p2": "post-2",
    "p3": "post-3",
    "p4": "post-4",
    "p5": "post-5"
};

db.users.deleteMany({});
db.posts.deleteMany({});

db.users.insertMany([
    {
        _id: userUUIDs["Alice"],
        name: "Alice",
        bio: "Amo viajar e explorar novos lugares.",
        interests: ["viagens", "fotografia", "tecnologia"]
    },
    {
        _id: userUUIDs["Bob"],
        name: "Bob",
        bio: "Entusiasta de tecnologia e programação.",
        interests: ["programação", "música", "jogos"]
    },
    {
        _id: userUUIDs["Charlie"],
        name: "Charlie",
        bio: "Gosto de esportes e atividades ao ar livre.",
        interests: ["esportes", "natureza", "caminhadas"]
    },
    {
        _id: userUUIDs["Diana"],
        name: "Diana",
        bio: "Apaixonada por leitura e cinema.",
        interests: ["livros", "cinema", "arte"]
    },
    {
        _id: userUUIDs["Eve"],
        name: "Eve",
        bio: "Cozinheira de mão cheia e gamer nas horas vagas.",
        interests: ["culinária", "games", "tecnologia"]
    }
]);

db.posts.insertMany([
    {
        _id: postUUIDs["p1"],
        usuarioId: userUUIDs["Alice"],
        conteudo: "Visitando o Parque Ibirapuera!",
        hashtags: ["#parque", "#natureza", "#esportes"],
        dataCriacao: new Date("2025-05-25T10:00:00Z"),
        comentarios: [
            { usuarioId: userUUIDs["Bob"], texto: "Que legal!", dataCriacao: new Date("2025-05-25T11:00:00Z") }
        ]
    },
    {
        _id: postUUIDs["p2"],
        usuarioId: userUUIDs["Bob"],
        conteudo: "Aprendendo a programar em Java!",
        hashtags: ["#programming", "#Java"],
        dataCriacao: new Date("2025-05-26T12:00:00Z"),
        comentarios: [
            { usuarioId: userUUIDs["Alice"], texto: "Boa sorte!", dataCriacao: new Date("2025-05-26T13:00:00Z") }
        ]
    },
    {
        _id: postUUIDs["p3"],
        usuarioId: userUUIDs["Charlie"],
        conteudo: "Fui correr no parque hoje, foi incrível!",
        hashtags: ["#esportes", "#saude"],
        dataCriacao: new Date("2025-05-27T08:00:00Z"),
        comentarios: []
    },
    {
        _id: postUUIDs["p4"],
        usuarioId: userUUIDs["Diana"],
        conteudo: "Acabei de ler um livro maravilhoso!",
        hashtags: ["#livros", "#leitura"],
        dataCriacao: new Date("2025-05-28T15:00:00Z"),
        comentarios: [
            { usuarioId: userUUIDs["Eve"], texto: "Qual o nome do livro?", dataCriacao: new Date("2025-05-28T16:00:00Z") }
        ]
    },
    {
        _id: postUUIDs["p5"],
        usuarioId: userUUIDs["Eve"],
        conteudo: "Fiz um bolo de chocolate delicioso hoje!",
        hashtags: ["#culinaria", "#bolo"],
        dataCriacao: new Date("2025-05-29T18:00:00Z"),
        comentarios: []
    }
]);