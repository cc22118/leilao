export default function validateToken(): boolean {
  return localStorage.getItem('token') != null
}