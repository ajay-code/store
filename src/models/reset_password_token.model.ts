export interface ResetPasswordToken {
    user_id: number
    reset_password_token?: string
    reset_password_expires?: Date
}
