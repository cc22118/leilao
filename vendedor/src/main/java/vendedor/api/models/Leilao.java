package vendedor.api.models;

import java.util.Date;

import com.google.gson.Gson;

import vendedor.api.utils.IConvertJson;

public class Leilao implements IConvertJson {
  private int id;
  private int idProduto;
  private Date dataInicio;
  private Date dataFim;

  public Leilao() {}

  public Leilao(int id, int idProduto, Date dataInicio, Date dataFim) {
    if(id <= 0)
      throw new IllegalArgumentException("id não pode ser menor ou igual a 0");
    if(idProduto <= 0)
      throw new IllegalArgumentException("idProduto não pode ser menor ou igual a 0");
    if(dataInicio == null)
      throw new IllegalArgumentException("dataInicio não pode ser nulo");
    if(dataFim == null)
      throw new IllegalArgumentException("dataFim não pode ser nulo");

    this.id = id;
    this.idProduto = idProduto;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }

  public int getId() { return id; }
  public int getIdProduto() { return idProduto; }
  public Date getDataInicio() { return dataInicio; }
  public Date getDataFim() { return dataFim; }

  public void setDataInicio(Date dataInicio) {
    if(dataInicio == null)
      throw new IllegalArgumentException("dataInicio não pode ser nulo");
    this.dataInicio = dataInicio;
  }
  public void setDataFim(Date dataFim) {
    if(dataFim == null)
      throw new IllegalArgumentException("dataFim não pode ser nulo");
    this.dataFim = dataFim;
  }

  public String toJson() {
    return new Gson().toJson(this);
  }
}
