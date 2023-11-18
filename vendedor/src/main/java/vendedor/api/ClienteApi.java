package vendedor.api;

import com.google.gson.Gson;

import vendedor.api.models.Cliente;
import vendedor.api.models.ResponseInfo;
import vendedor.api.models.ResponseToken;

public class ClienteApi extends BaseApi {
  protected static String BASE_PATH = "user";

  public static ResponseToken login(String email, String senha) throws Exception {
    String result = post(BASE_PATH+"/login", null, null, String.format("{\"email\": \"%s\", \"senha\": \"%s\"}", email, senha));
    return new Gson().fromJson(result, ResponseToken.class);
  }

  public static boolean criarConta(Cliente cliente) throws Exception {
    post(BASE_PATH+"/", null, null, cliente);
    return true;
  }

  public static ResponseInfo info(ResponseToken token) throws Exception {
    String result = get(BASE_PATH+"/info", null, token.getToken());
    return new Gson().fromJson(result, ResponseInfo.class);
  }
}
