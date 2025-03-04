export const formatPhone = (value: string): string => {
    value = value.replace(/\D/g, '') // Remove caracteres não numéricos
  
    if (value.length > 11) value = value.slice(0, 11) // Limita a 11 dígitos
  
    if (value.length > 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
    } else if (value.length > 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`
    } else if (value.length > 2) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`
    } else if (value.length > 0) {
      return `(${value}`
    }
  
    return value
  }
  
  // Remove a mascara para salvar no banco de dados
  export const unmaskPhone = (value: string): string => {
    return value.replace(/\D/g, '') // Remove todos os caracteres não numéricos
  }