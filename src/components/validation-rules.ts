export default {
  textMax15: (value: string) => (value == '' || value.length <= 15),
  textMax64: (value: string) => (value == '' || value.length <= 64),
  textMax256: (value: string) => (value == '' ||  value.length <= 256),
  textMax500: (value: string) => (value == '' ||  value.length <= 500),
  mobile: (value: string) => (value == '' || /^0[0-8]\d{8}$/g.test(value)),
  required: (value: string) => (value && value.length > 0),
  notRequired: (value: string | null) => (value || 1),
}