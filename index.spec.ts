import { CookieUtil } from '.'

describe('CookieUtil', () => {
  it('should parse cookies correctly', () => {
    const cookieStr = 'name=John%20Moe; age=25; city=New%20York; empty='
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('name')).toBe('John Moe')
    expect(cookies.get('age')).toBe('25')
    expect(cookies.get('city')).toBe('New York')
    expect(cookies.get('empty')).toBeUndefined()
  })

  it('should handle empty constructor', () => {
    const cookies = new CookieUtil()

    expect(cookies.stringify()).toBe('')
  })

  it('should handle empty cookie string', () => {
    const cookies = new CookieUtil('')

    expect(cookies.stringify()).toBe('')
  })

  it('should set and stringify cookies correctly', () => {
    const cookies = new CookieUtil()
    cookies.set('name', 'John Moe')
    cookies.set('age', '25')
    cookies.set('city', 'New York')

    const cookieStr = cookies.stringify()
    expect(cookieStr).toContain('name=John%20Moe')
    expect(cookieStr).toContain('age=25')
    expect(cookieStr).toContain('city=New%20York')
  })

  it('should delete a cookie and return the deleted value', () => {
    const cookies = new CookieUtil('name=John%20Moe; age=25; city=New%20York')
    const deletedValue = cookies.delete('name')
    expect(deletedValue).toBe('John Moe')
    expect(cookies.get('name')).toBeUndefined()
  })

  it('should return undefined when deleting a non-existing cookie', () => {
    const cookies = new CookieUtil('name=John%20Moe; age=25; city=New%20York')
    const deletedValue = cookies.delete('nonExisting')
    expect(deletedValue).toBeUndefined()
  })

  it('should check if a cookie exists correctly', () => {
    const cookieStr = 'name=John%20Moe; age=25; city=New%20York'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.has('name')).toBeTruthy()
    expect(cookies.has('nonexistent')).toBeFalsy()
  })

  it('should not include empty cookies in the output', () => {
    const cookieStr = 'name=John%20Moe; age=25;;; city=New%20York;;;;'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.stringify()).not.toContain(';;')
  })

  it('should handle cookies with equal signs in the value', () => {
    const cookieStr = 'key1=value1=with=equals; key2=value2=with=equals'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('key1')).toBe('value1=with=equals')
    expect(cookies.get('key2')).toBe('value2=with=equals')
  })

  it('should handle cookies with spaces in the name', () => {
    const cookieStr = 'name with spaces=John%20Moe'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('name with spaces')).toBe('John Moe')
  })

  it('should handle cookies with special characters in the name', () => {
    const cookieStr = 'na!me$%^with&*()special=John%20Moe'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('na!me$%^with&*()special')).toBe('John Moe')
  })

  it('should handle cookies with special characters in the value', () => {
    const cookieStr = 'name=John%20Moe%21%40%23%24%25%5E%26*%28%29_%2B%7C%60%7E'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('name')).toBe('John Moe!@#$%^&*()_+|`~')
  })

  it('should ignore cookies with no name', () => {
    const cookieStr = '=John%20Moe; age=25'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.stringify()).toBe('age=25')
  })

  it('should handle cookies with only spaces as the name', () => {
    const cookieStr = '   =John%20Moe; age=25'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.stringify()).toBe('age=25')
  })

  it('should handle cookies with only special characters as the name', () => {
    const cookieStr = '!@#$%^&*()_+=John%20Moe; age=25'
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.stringify()).toBe('!@#$%^&*()_+=John%20Moe; age=25')
  })

  it('should handle very long cookie strings', () => {
    const cookieStr = 'a'.repeat(1000) + '=b'.repeat(1000)
    const cookies = new CookieUtil(cookieStr)

    expect(cookies.get('a'.repeat(1000))).toBe('b='.repeat(1000).slice(0, -1))
  })

  it('should return an empty object for an empty string', () => {
    const cookies = new CookieUtil('')
    expect(cookies).toBeDefined()
    expect(cookies.stringify()).toBe('')
    expect(cookies.get('anything')).toBeUndefined()
    expect(cookies.has('anything')).toBeFalsy()
  })

  it('should throw an error for a malformed cookie string', () => {
    expect(() => {
      new CookieUtil('not a cookie')
    }).toThrow('Malformed cookie: not a cookie')
  })

  it('should parse a single cookie', () => {
    const cookies = new CookieUtil('name=John%20Doe')
    expect(cookies).toBeDefined()
    expect(cookies.stringify()).toBe('name=John%20Doe')
    expect(cookies.get('name')).toBe('John Doe')
    expect(cookies.has('name')).toBeTruthy()
  })

  it('should parse multiple cookies', () => {
    const cookies = new CookieUtil('name=John%20Doe; age=25; city=New%20York')
    expect(cookies).toBeDefined()
    expect(cookies.stringify()).toBe('name=John%20Doe; age=25; city=New%20York')
    expect(cookies.get('name')).toBe('John Doe')
    expect(cookies.get('age')).toBe('25')
    expect(cookies.get('city')).toBe('New York')
    expect(cookies.has('name')).toBeTruthy()
    expect(cookies.has('age')).toBeTruthy()
    expect(cookies.has('city')).toBeTruthy()
  })

  it('should set a cookie', () => {
    const cookies = new CookieUtil('name=John%20Doe')
    expect(cookies).toBeDefined()
    cookies.set('age', '25')
    expect(cookies.stringify()).toBe('name=John%20Doe; age=25')
    expect(cookies.get('age')).toBe('25')
    expect(cookies.has('age')).toBeTruthy()
  })

  it('should delete a cookie', () => {
    const cookies = new CookieUtil('name=John%20Doe; age=25; city=New%20York')
    expect(cookies).toBeDefined()
    cookies.delete('age')
    expect(cookies.stringify()).toBe('name=John%20Doe; city=New%20York')
    expect(cookies.get('age')).toBeUndefined()
    expect(cookies.has('age')).toBeFalsy()
  })
})
