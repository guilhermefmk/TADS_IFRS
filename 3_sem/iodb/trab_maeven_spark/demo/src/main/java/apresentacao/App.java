package apresentacao;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import negocio.Anotacao;
import persistencia.AnotacaoDAO;
import spark.ModelAndView;
import static spark.Spark.get;
import static spark.Spark.post;

import spark.template.mustache.MustacheTemplateEngine;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        get("/", (request, response) -> {
            Map map = new HashMap();
            map.put("vetAnotacao", new AnotacaoDAO().listar());
            return new ModelAndView(map, "index.html"); // hello.mustache file is in resources/templates directory'
        }, new MustacheTemplateEngine());

        get("/ordenada", (request, response) -> {
            Map map = new HashMap();
            map.put("vetAnotacao", new AnotacaoDAO().listarOrderBy());
            return new ModelAndView(map, "index.html"); // hello.mustache file is in resources/templates directory'
        }, new MustacheTemplateEngine());

        get("/lixeira", (request, response) -> {
            Map map = new HashMap();
            map.put("vetAnotacao", new AnotacaoDAO().listarLixeira());
            return new ModelAndView(map, "lixeira.html"); // hello.mustache file is in resources/templates directory'
        }, new MustacheTemplateEngine());


         get("/tela_adicionar", (request, response) -> {
            Map map = new HashMap();
            return new ModelAndView(map, "tela_adicionar.html"); // hello.mustache file is in resources/templates directory
        }, new MustacheTemplateEngine());

        post("/adicionar", (rq, rs) -> {
            Anotacao c = new Anotacao();
            c.setTitulo(rq.queryParams("titulo"));
            c.setDt_hora(rq.queryParams("data"));
            c.setDescricao(rq.queryParams("descricao"));
            c.setCor(rq.queryParams("cor"));
            new AnotacaoDAO().inserir(c);
            rs.redirect("/");
            return null;
        });
        
        
        post("/alterar", (rq, rs) -> {
            Anotacao c = new Anotacao();
            c.setId(Integer.parseInt(rq.queryParams("id")));
            c.setTitulo(rq.queryParams("titulo"));
            c.setDt_hora(rq.queryParams("data"));
            c.setDescricao(rq.queryParams("descricao"));
            c.setCor(rq.queryParams("cor"));
            new AnotacaoDAO().atualizar(c);
            rs.redirect("/");
            return null;
        });

        get("/deletar/:id", (request, response) -> {            
            new AnotacaoDAO().deletar(Integer.parseInt(request.params(":id")));
            response.redirect("/");
            return null;
        });
        
        get("/inserir_lixeira/:id", (request, response) -> {            
            new AnotacaoDAO().inserirLixeira(Integer.parseInt(request.params(":id")));
            response.redirect("/");
            return null;
        });
        
        get("/remover_lixeira/:id", (request, response) -> {            
            new AnotacaoDAO().removerLixeira(Integer.parseInt(request.params(":id")));
            response.redirect("/");
            return null;
        });

        get("/tela_alterar/:id", (request, response) -> {            
            Map map = new HashMap();
            Anotacao Anotacao = new AnotacaoDAO().obter(Integer.parseInt(request.params(":id")));
            map.put("id", Anotacao.getId());
            map.put("titulo", Anotacao.getTitulo());
            map.put("data", Anotacao.getDt_hora());
            map.put("descricao", Anotacao.getDescricao());
            map.put("cor", Anotacao.getCor());
            return new ModelAndView(map, "tela_alterar.html"); // hello.mustache file is in resources/templates directory
        }, new MustacheTemplateEngine());
        
        get("/duplicar/:id", (rq, rs) -> {
           Anotacao c = new Anotacao();
           Anotacao Anotacao = new AnotacaoDAO().obter(Integer.parseInt(rq.params(":id")));
           c.setTitulo(Anotacao.getTitulo());
           c.setDt_hora(Anotacao.getDt_hora());
           c.setDescricao(Anotacao.getDescricao());
           c.setCor(Anotacao.getCor());
           new AnotacaoDAO().inserir(c);
           rs.redirect("/");
           return null;
        });
    }
}
