export interface Cookies {
  [key: string]: string
}

export class CookieUtil {
  private cookies: Cookies

  constructor(cookieStr?: string) {
    this.cookies = this.parse(cookieStr || '')
  }

  private parse(str: string): Cookies {
    const cookies: Cookies = {}

    if (!str.trim()) {
      return cookies
    }

    const hasEqual = str.indexOf('=') !== -1
    const cookieArr = str.split(/;+/)

    if (!hasEqual) {
      throw new Error(`Malformed cookie: ${str}`)
    }

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

  public get(name: string): string | undefined {
    return this.cookies[name]
  }

  public delete(name: string): string | undefined {
    const { [name]: deletedValue, ...remainingCookies } = this.cookies
    this.cookies = remainingCookies
    return deletedValue
  }

  public has(name: string): boolean {
    return this.cookies.hasOwnProperty(name)
  }
}
