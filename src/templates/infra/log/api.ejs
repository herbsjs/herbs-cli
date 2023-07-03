function logException({ error, endpoint, transport }) {
    console.error(
        `🛑`, `🔌`, `\x1b[90m`, endpoint, `(${transport})`, `\x1b[0m`, `\n`,
        error)
}

function logOK({ uc, response, transport, endpoint, }) {
    const elapsedTime = uc?.auditTrail?.elapsedTime || 0n
    const errorMessages = response.isErr ? response?.err?.message || JSON.stringify(response?.err) : null
    console.info(
        response.isOk ? `😊` : `🥵`, uc.description,
        `\x1b[90m`,
        `(${elapsedTime / 1000000n}ms)`,
        errorMessages ? `🟣 ${errorMessages}` : ``,
        `🔌`, endpoint, `(${transport})`,
        `\x1b[0m`)
}

module.exports = { logException, logOK }