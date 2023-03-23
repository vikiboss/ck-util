import { CookieUtils } from '.'

describe('CookieUtils', () => {
  it('should parse cookies correctly', () => {
    const cookieStr = 'name=John%20Doe; age=25; city=New%20York; empty='
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('name')).toBe('John Doe')
    expect(cookies.get('age')).toBe('25')
    expect(cookies.get('city')).toBe('New York')
    expect(cookies.get('empty')).toBeNull()
  })

  it('should handle empty constructor', () => {
    const cookies = new CookieUtils()

    expect(cookies.stringify()).toBe('')
  })

  it('should handle empty cookie string', () => {
    const cookies = new CookieUtils('')

    expect(cookies.stringify()).toBe('')
  })

  it('should set and stringify cookies correctly', () => {
    const cookies = new CookieUtils()
    cookies.set('name', 'John Doe')
    cookies.set('age', '25')
    cookies.set('city', 'New York')

    const cookieStr = cookies.stringify()
    expect(cookieStr).toContain('name=John%20Doe')
    expect(cookieStr).toContain('age=25')
    expect(cookieStr).toContain('city=New%20York')
  })

  it('should delete cookies correctly', () => {
    const cookieStr = 'name=John%20Doe; age=25; city=New%20York'
    const cookies = new CookieUtils(cookieStr)
    cookies.delete('age')

    expect(cookies.get('age')).toBe(null)
    expect(cookies.stringify()).not.toContain('age=25')
  })

  it('should check if a cookie exists correctly', () => {
    const cookieStr = 'name=John%20Doe; age=25; city=New%20York'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.has('name')).toBeTruthy()
    expect(cookies.has('nonexistent')).toBeFalsy()
  })

  it('should not include empty cookies in the output', () => {
    const cookieStr = 'name=John%20Doe; age=25;;; city=New%20York;;;;'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.stringify()).not.toContain(';;')
  })

  it('should handle cookies with equal signs in the value', () => {
    const cookieStr = 'key1=value1=with=equals; key2=value2=with=equals'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('key1')).toBe('value1=with=equals')
    expect(cookies.get('key2')).toBe('value2=with=equals')
  })

  it('should handle cookies with spaces in the name', () => {
    const cookieStr = 'name with spaces=John%20Doe'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('name with spaces')).toBe('John Doe')
  })

  it('should handle cookies with special characters in the name', () => {
    const cookieStr = 'na!me$%^with&*()special=John%20Doe'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('na!me$%^with&*()special')).toBe('John Doe')
  })

  it('should handle cookies with special characters in the value', () => {
    const cookieStr = 'name=John%20Doe%21%40%23%24%25%5E%26*%28%29_%2B%7C%60%7E'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('name')).toBe('John Doe!@#$%^&*()_+|`~')
  })

  it('should ignore cookies with no name', () => {
    const cookieStr = '=John%20Doe; age=25'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.stringify()).toBe('age=25')
  })

  it('should handle cookies with only spaces as the name', () => {
    const cookieStr = '   =John%20Doe; age=25'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.stringify()).toBe('age=25')
  })

  it('should handle cookies with only special characters as the name', () => {
    const cookieStr = '!@#$%^&*()_+=John%20Doe; age=25'
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.stringify()).toBe('!@#$%^&*()_+=John%20Doe; age=25')
  })

  it('should handle very long cookie strings', () => {
    const cookieStr = 'a'.repeat(1000) + '=b'.repeat(1000)
    const cookies = new CookieUtils(cookieStr)

    expect(cookies.get('a'.repeat(1000))).toBe('b='.repeat(1000).slice(0, -1))
  })
})
