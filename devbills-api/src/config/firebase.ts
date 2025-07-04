import admin from "firebase-admin";

const initializeFirebaseAdmin = (): void => {
	if (admin.apps.length > 0) return;

	if (
		!process.env.FIREBASE_CLIENT_EMAIL ||
		!process.env.FIREBASE_PRIVATE_KEY ||
		!process.env.FIREBASE_PROJECT_ID
	) {
		throw new Error(
			"Falha ao iniciar o Firebase Admin SDK: Variáveis de ambiente não definidas.",
		);
	}

	try {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.FIREBASE_PRIVATE_KEY,
			}),
		});
	} catch (err) {
		console.error("Erro ao inicializar o Firebase Admin SDK:", err);
		process.exit(1);
	}
};

export default initializeFirebaseAdmin;