package modelo;

public class EmpregadoProxy implements Model {
    private Empregado empregado;

    public EmpregadoProxy(String nome, String dataNascimento, String numeroCarteiraMotorista) {
        this.empregado = new Empregado(nome, dataNascimento, numeroCarteiraMotorista);
    }

    @Override
    public void manobrarCarro(Carro carro) {
        if (empregado.getIdade() >= 18 && !empregado.getNumeroCarteiraMotorista().isEmpty()) {
            empregado.manobrarCarro(carro);
        } else {
            System.out.println("Acesso negado: Empregado não possui autorização para manobrar carros.");
        }
    }
}
