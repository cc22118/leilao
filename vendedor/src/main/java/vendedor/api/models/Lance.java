package vendedor.api.models;

import java.util.Date;

import com.google.gson.Gson;

import vendedor.api.utils.IConvertJson;

public class Lance implements IConvertJson {
  private int id;
  private int idLeilao;
  private int idCliente;
  private double valor;
  private Date atualizadoEm;

  public Lance() {}

  public Lance(int id, int idLeilao, int idCliente, double valor, Date atualizadoEm) {
    if(id <= 0)
      throw new IllegalArgumentException("id não pode ser menor ou igual a 0");
    if(idLeilao <= 0)
      throw new IllegalArgumentException("idLeilao não pode ser menor ou igual a 0");
    if(idCliente <= 0)
      throw new IllegalArgumentException("idCliente não pode ser menor ou igual a 0");
    if(valor < 0)
      throw new IllegalArgumentException("valor não pode ser menor que 0");
    if(atualizadoEm == null)
      throw new IllegalArgumentException("atualizadoEm não pode ser nulo");

    this.id = id;
    this.idLeilao = idLeilao;
    this.idCliente = idCliente;
    this.valor = valor;
    this.atualizadoEm = atualizadoEm;
  }

  public int getId() { return id; }
  public int getIdLeilao() { return idLeilao; }
  public int getIdCliente() { return idCliente; }
  public double getValor() { return valor; }
  public Date getAtualizadoEm() { return atualizadoEm; }

  public void setValor(double valor) {
    if(valor < 0)
      throw new IllegalArgumentException("valor não pode ser menor que 0");
    this.valor = valor;
  }

  public String toJson() {
    return new Gson().toJson(this);
  }
}
