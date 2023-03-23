export interface Cookies {
  [key: string]: string
}

export class CookieUtils {
  private cookies: Cookies

  constructor(cookieStr?: string) {
    this.cookies = this.parse(cookieStr || '')
  }

  private parse(str: string): Cookies {
    const cookies: Cookies = {}

    if (!str) {
      return cookies
    }

    const cookieArr = str.split(/;+/)

    for (const cookie of cookieArr) {
      const [cookieName, ...cookieValueParts] = cookie.split('=').map(s => s.trim())
      const cookieValue = cookieValueParts.join('=')
      if (cookieName) {
        cookies[cookieName] = decodeURIComponent(cookieValue)
      }
    }

    return cookies
  }

  public stringify(): string {
    return Object.keys(this.cookies)
      .map(key => `${key}=${encodeURIComponent(this.cookies[key])}`)
      .join('; ')
  }

  public set(name: string, value: string): void {
    this.cookies = {
      ...this.cookies,
      [name]: value
    }
  }

  public get(name: string): string | null {
    return this.cookies[name] || null
  }

  public delete(name: string): void {
    const { [name]: _, ...remainingCookies } = this.cookies
    this.cookies = remainingCookies
  }

  public has(name: string): boolean {
    return this.cookies.hasOwnProperty(name)
  }
}
