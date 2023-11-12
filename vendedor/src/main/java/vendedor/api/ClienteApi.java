package vendedor.api;

import java.io.IOException;
import java.net.*;

import com.google.gson.Gson;

import vendedor.api.models.ResponseToken;

public class ClienteApi extends BaseApi {
  protected static String BASE_PATH = "user";

  public static ResponseToken login(String email, String senha) throws Exception {
    String result = post(BASE_PATH+"/login", null, null, null, String.format("{\"email\": \"%s\", \"senha\": \"%s\"}", email, senha));
    System.out.println("test"+result);
    return new Gson().fromJson(result, ResponseToken.class);
  }
}
