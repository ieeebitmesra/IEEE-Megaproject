const nodemailer = require('nodemailer');

export default async function sendMail(req, res) {
	const { method, body } = req;

	const { emails } = body;

	switch (method) {
		case 'POST':
			try {
				let transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: process.env.NEXT_PUBLIC_EMAIL,
						pass: process.env.NEXT_PUBLIC_PASSWORD,
					},
				});

				let guestsMailOptions = {
					from: process.env.NEXT_PUBLIC_EMAIL,
					to: emails,
					subject: 'Invite to attend the event',
					text: `You have been invited to wedding.`,
				};

				transporter.sendMail(guestsMailOptions, (error, info) => {
					if (error) {
						res.status(500).json({
							ok: false,
							message: 'Error sending invitation mail to guests.',
							error,
						});
					} else {
						res.status(200).json({
							ok: true,
							message: 'Mail sent to guests and user.',
						});
					}
				});
				break;
			} catch (error) {
				res.status(500).json({
					ok: false,
					message: 'Server error.',
					error,
				});
			}

		default:
			res.status(400).json({
				ok: false,
				message: 'Bad request',
			});
			break;
	}
}
