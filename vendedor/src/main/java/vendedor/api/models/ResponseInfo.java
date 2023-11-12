package vendedor.api.models;

import com.google.gson.Gson;

import vendedor.api.utils.IConvertJson;

public class ResponseInfo implements IConvertJson {
  private Integer id;
  private String nome;
  private String cargo;

  public ResponseInfo() {}

  public ResponseInfo(Integer id, String nome, String cargo) {
    this.id = id;
    this.nome = nome;
    this.cargo = cargo;
  }

  public Integer getId() { return id; }
  public String getNome() { return nome; }
  public String getCargo() { return cargo; }

  public void setId(Integer id) { this.id = id; }
  public void setNome(String nome) { this.nome = nome; }
  public void setCargo(String cargo) { this.cargo = cargo; }

  public String toJson() {
    return new Gson().toJson(this);
  }
}
