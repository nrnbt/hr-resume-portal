export interface AdminAuthContext {
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: boolean
  admin?: Admin | null
  loaded: boolean
}

export interface Admin {
  userId: string
  email: string
  username: string
}

export interface AdminData {
  username: string
  passWord: string
}