package vendedor.api.models;

import com.google.gson.Gson;

import vendedor.api.utils.IConvertJson;

public class ResponseToken implements IConvertJson {
  public String message;
  public String token;

  public ResponseToken() {}

  public ResponseToken(String message, String token) {
    this.message = message;
    this.token = token;
  }

  public String getMessage() { return message; }
  public String getToken() { return token; }

  public void setMessage(String message) { this.message = message; }
  public void setToken(String token) { this.token = token; }

  @Override
  public String toJson() {
    return new Gson().toJson(this);
  }
}
