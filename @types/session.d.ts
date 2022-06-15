type Role = 'admin' | 'operator'

type User = {
    name: string
    email: string
    role?: Role
}
