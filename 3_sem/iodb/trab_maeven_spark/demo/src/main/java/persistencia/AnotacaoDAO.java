/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package persistencia;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import negocio.Anotacao;


public class AnotacaoDAO {

    public Anotacao obter(int id) throws SQLException {
        try {
            Anotacao anotacao = new Anotacao();
            String sql = "select * from anotacoes where id = ?;";
            Connection connection = new ConexaoPostgreSQL().getConexao();

            PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
            instrucaoSQL.setInt(1, id);
            ResultSet rs = instrucaoSQL.executeQuery();
            System.out.println(rs);
            if (rs.next()) {
                anotacao.setId(rs.getInt("id"));
                anotacao.setTitulo(rs.getString("titulo"));
                anotacao.setDescricao(rs.getString("descricao"));
                if (rs.getString("dt_hora").matches(".*\\..*")) {
                    anotacao.setDt_hora(rs.getString("dt_hora").split("\\.")[0]);
                } else {
                    anotacao.setDt_hora(rs.getString("dt_hora"));
                }
                anotacao.setCor(rs.getString("cor"));
            }
            instrucaoSQL.close();
            connection.close();
            return anotacao;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public ArrayList<Anotacao> listar() throws SQLException{
        ArrayList<Anotacao> vetAnotacao = new ArrayList<Anotacao>();
        String sql = "select * from anotacoes where trash = 'f';";
        Connection connection = new ConexaoPostgreSQL().getConexao();
       
        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        ResultSet rs = instrucaoSQL.executeQuery();
        while(rs.next()){
            Anotacao p = new Anotacao();
            p.setId(rs.getInt("id"));
            p.setTitulo(rs.getString("titulo"));
            if (rs.getString("dt_hora").matches(".*\\..*")) {
                p.setDt_hora(rs.getString("dt_hora").split("\\.")[0]);
            } else {
                p.setDt_hora(rs.getString("dt_hora"));
            }
            p.setDescricao(rs.getString("descricao"));
            p.setCor(rs.getString("cor"));
            vetAnotacao.add(p);
        }
        connection.close();
        instrucaoSQL.close();
        return vetAnotacao;
    }

    public ArrayList<Anotacao> listarOrderBy() throws SQLException{
        ArrayList<Anotacao> vetAnotacao = new ArrayList<Anotacao>();
        String sql = "select * from anotacoes where trash = 'f' order by dt_hora;";
        Connection connection = new ConexaoPostgreSQL().getConexao();
       
        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        ResultSet rs = instrucaoSQL.executeQuery();
        while(rs.next()){
            Anotacao p = new Anotacao();
            p.setId(rs.getInt("id"));
            p.setTitulo(rs.getString("titulo"));
            if (rs.getString("dt_hora").matches(".*\\..*")) {
                p.setDt_hora(rs.getString("dt_hora").split("\\.")[0]);
            } else {
                p.setDt_hora(rs.getString("dt_hora"));
            }
            p.setDescricao(rs.getString("descricao"));
            p.setCor(rs.getString("cor"));
            vetAnotacao.add(p);
        }
        connection.close();
        instrucaoSQL.close();
        return vetAnotacao;
    }

    public ArrayList<Anotacao> listarLixeira() throws SQLException{
        ArrayList<Anotacao> vetAnotacao = new ArrayList<Anotacao>();
        String sql = "select * from anotacoes where trash = 't';";
        Connection connection = new ConexaoPostgreSQL().getConexao();
       
        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        ResultSet rs = instrucaoSQL.executeQuery();
        while(rs.next()){
            Anotacao p = new Anotacao();
            p.setId(rs.getInt("id"));
            p.setTitulo(rs.getString("titulo"));
            if (rs.getString("dt_hora").matches(".*\\..*")) {
                p.setDt_hora(rs.getString("dt_hora").split("\\.")[0]);
            } else {
                p.setDt_hora(rs.getString("dt_hora"));
            }
            p.setDescricao(rs.getString("descricao"));
            p.setCor(rs.getString("cor"));
            vetAnotacao.add(p);
        }
        connection.close();
        instrucaoSQL.close();
        return vetAnotacao;
    }
    
    public void inserir(Anotacao anotacao) throws SQLException, ParseException {
        try {
            SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
            String dt_hora = anotacao.getDt_hora();
            Date date;
            
            if (dt_hora.contains("T")) {
                SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
                date = inputFormat.parse(dt_hora);
            } else {
                SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                date = inputFormat.parse(dt_hora);
            }
    
            String formattedDate = outputFormat.format(date);
    
            String sql = "INSERT INTO anotacoes (titulo, dt_hora, descricao, cor) VALUES (?, TO_TIMESTAMP(?, 'YYYY-MM-DD\\\"T\\\"HH24:MI'), ?, ?) RETURNING id;";
            Connection connection = new ConexaoPostgreSQL().getConexao();
            PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
            instrucaoSQL.setString(1, anotacao.getTitulo());
            instrucaoSQL.setString(2, formattedDate);
            instrucaoSQL.setString(3, anotacao.getDescricao());
            instrucaoSQL.setString(4, anotacao.getCor());
    
            System.out.println(instrucaoSQL);
            ResultSet rs = instrucaoSQL.executeQuery();
            if (rs.next()) {
                anotacao.setId(rs.getInt("id"));
            }
            instrucaoSQL.close();
            connection.close();
    
        } catch (ParseException | SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean deletar(int id) throws SQLException {

        String sql = "DELETE from anotacoes WHERE id = ?;";
        Connection connection = new ConexaoPostgreSQL().getConexao();

        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        instrucaoSQL.setInt(1, id);
        int resultado = instrucaoSQL.executeUpdate();
        instrucaoSQL.close();
        connection.close();
        return resultado == 1;
    }

    public boolean inserirLixeira(int id) throws SQLException {

        String sql = "UPDATE anotacoes SET trash = true WHERE id = ?;";
        Connection connection = new ConexaoPostgreSQL().getConexao();

        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        instrucaoSQL.setInt(1, id);
        int resultado = instrucaoSQL.executeUpdate();
        instrucaoSQL.close();
        connection.close();
        return resultado == 1;
    }

    public boolean removerLixeira(int id) throws SQLException {

        String sql = "UPDATE anotacoes SET trash = false WHERE id = ?;";
        Connection connection = new ConexaoPostgreSQL().getConexao();

        PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
        instrucaoSQL.setInt(1, id);
        int resultado = instrucaoSQL.executeUpdate();
        instrucaoSQL.close();
        connection.close();
        return resultado == 1;
    }

    public boolean atualizar(Anotacao anotacao) throws SQLException, ParseException {
        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date date = inputFormat.parse(anotacao.getDt_hora());
            String formattedDate = outputFormat.format(date);

            String sql = "UPDATE anotacoes SET titulo = ?, dt_hora = TO_TIMESTAMP(?, 'YYYY-MM-DD\\\\\\\"T\\\\\\\"HH24:MI'), descricao = ? , cor = ? WHERE id = ?;";
            Connection connection = new ConexaoPostgreSQL().getConexao();

            PreparedStatement instrucaoSQL = connection.prepareStatement(sql);
            instrucaoSQL.setString(1, anotacao.getTitulo());
            instrucaoSQL.setString(2, formattedDate);
            instrucaoSQL.setString(3, anotacao.getDescricao());
            instrucaoSQL.setString(4, anotacao.getCor());
            
            instrucaoSQL.setInt(5, anotacao.getId());
            int resultado = instrucaoSQL.executeUpdate();
            instrucaoSQL.close();
            connection.close();
            return resultado == 1;
        } catch (ParseException | SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
}
