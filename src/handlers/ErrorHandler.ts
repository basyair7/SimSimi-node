type ErrorMap = { [key: string]: string };

export class ErrorHandler {
    private static errorMap: ErrorMap = {
        'ENOTFOUND': 'Kesalahan getaddrinfo ENOTFOUND, menghentikan bot...',
        'ECONNREFUSED': 'Koneksi ditolak oleh server, menghentikan bot...',
        'ETIMEDOUT': 'Permintaan ke server melebihi batas waktu, menghentikan bot...',
        'ECONNRESET': 'Koneksi direset oleh server, menghentikan bot...',
        'EAI_AGAIN': 'Kesalahan DNS sementara, menghentikan bot...',
        'EHOSTUNREACH': 'Host tidak dapat dijangkau, menghentikan bot...',
        '401 Unauthorized': 'ETELEGRAM: 401 Unauthorized, token bot tidak valid, menghentikan bot...'
    };

    static getErrorMessage(error: Error): string {
        for (const key in this.errorMap) {
            if (error.message.includes(key)) {
                return this.errorMap[key];
            }
        }

        return `Kesalahan tidak diketahui: ${error.message}`;
    }
}