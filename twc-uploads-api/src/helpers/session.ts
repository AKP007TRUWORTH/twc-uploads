import { v4 as uuid_v4 } from "uuid"
import { UserLoginSession } from "../models/UserLoginSession"

interface SessionData {
    userId: string
    ip?: string
    sessionStartTime: string
    source: string
    loginMethod: string
}

export const generateSession = async (sessionData: SessionData) => {
    const sessionId = uuid_v4()

    await UserLoginSession.create({
        userId: sessionData.userId,
        sessionId,
        ipAddress: sessionData.ip,
        source: sessionData.source,
        loginMethod: sessionData.loginMethod,
        isActive: true
    })

    return sessionId
}

export const deleteSession = async (sessionId: string) => {

    const session = await UserLoginSession.findOne({
        where: {
            sessionId
        }
    })

    if (session) {
        await session.update({
            isActive: false,
            loggedOutAt: new Date()
        })
    }
}