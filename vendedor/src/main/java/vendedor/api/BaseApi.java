package vendedor.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.*;
import java.time.Duration;
import java.util.Map;

import vendedor.api.utils.IConvertJson;

public class BaseApi {
  private static Duration TIMEOUT = Duration.ofSeconds(5000);
  protected static String BASE_URL = "http://localhost:3028";


  private static String handlePath(String path, Map<String, String> params) {
    if(params == null || params.isEmpty())
      return path;
    String newPath = path;
    for (Map.Entry<String, String> entry : params.entrySet()) {
      newPath = newPath.replace(":"+entry.getKey()+":", entry.getValue());
    }
    return newPath;
  }

  private static String handleQuery(Map<String, String> query) {
    if(query == null || query.isEmpty())
      return "";

    String newQuery = "";
    for (Map.Entry<String, String> entry : query.entrySet()) {
      newQuery += entry.getKey() + "=" + entry.getValue() + "&";
    }
    return "?"+newQuery;
  }

  static String get(String path, Map<String, String> params, Map<String, String> query, String token) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+handlePath(path, params)+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("GET");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição GET - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String post(String path, Map<String, String> params, Map<String, String> query, String token, IConvertJson data) throws Exception {
    return post(path, params, query, token, data.toJson());
  }

  static String post(String path, Map<String, String> params, Map<String, String> query, String token, String data) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+handlePath(path, params)+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("POST");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.getOutputStream().write(data.getBytes());
    conn.getOutputStream().flush();
    conn.getOutputStream().close();
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição POST - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String put(String path, Map<String, String> params, Map<String, String> query, String token, IConvertJson data) throws Exception {
    return put(path, params, query, token, data.toJson());
  }

  static String put(String path, Map<String, String> params, Map<String, String> query, String token, String data) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+handlePath(path, params)+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("PUT");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.getOutputStream().write(data.getBytes());
    conn.getOutputStream().flush();
    conn.getOutputStream().close();
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição PUT - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }

  static String delete(String path, Map<String, String> params, Map<String, String> query, String token) throws Exception {
    if(path == null || path.isEmpty())
      throw new Exception("Path não pode ser nulo ou vazio");
    HttpURLConnection conn = (HttpURLConnection) new URL(BASE_URL+"/"+handlePath(path, params)+handleQuery(query)).openConnection();
    conn.setDoOutput(true);
    conn.setRequestMethod("DELETE");

    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("Accept", "application/json");
    if(token != null && !token.isEmpty())
      conn.setRequestProperty("Authorization", "Bearer "+token);

    conn.setConnectTimeout((int) TIMEOUT.toMillis());
    conn.connect();

    if(conn.getResponseCode() != 200) {
      conn.disconnect();
      throw new Exception(String.format("Erro [%d] ao fazer requisição DELETE - [%s]", conn.getResponseCode(), conn.getURL()));
    }

    BufferedReader bodyReader = new BufferedReader(new InputStreamReader((conn.getInputStream())));

    String output = "";
    String line;
    while ((line = bodyReader.readLine()) != null) {
      output += line;
    }

    conn.disconnect();

    return output;
  }
}