const nodemailer = require('nodemailer');

export default async function sendMail(req, res) {
	const { method, body } = req;

	const { userEmail } = body;

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

				let userMailOptions = {
					from: process.env.NEXT_PUBLIC_EMAIL,
					to: userEmail,
					subject: 'Event confirmation email',
					text: `Thank you for using hevently. Your event has been created successfully. Please check below for more details.`,
				};

				transporter.sendMail(userMailOptions, (error, info) => {
					if (error) {
						res.status(500).json({
							ok: false,
							message: 'Error sending confirmation mail to user.',
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
