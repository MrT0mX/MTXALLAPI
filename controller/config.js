module.exports.htmlRegister = (urlVerif) => `<!DOCTYPE html>
		 <html>
				<head>
	<title>MTX Verification</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
	<style type="text/css">
		/* CLIENT-SPECIFIC STYLES */
		body,
		table,
		td,
		a {
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
		}

		table,
		td {
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		/* RESET STYLES */
		img {
			border: 0;
			height: auto;
			line-height: 100%;
			outline: none;
			text-decoration: none;
		}

		table {
			border-collapse: collapse !important;
		}

		body {
			height: 100% !important;
			margin: 0 !important;
			padding: 0 !important;
			width: 100% !important;
		}

		/* iOS BLUE LINKS */
		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		/* MOBILE STYLES */
		@media screen and (max-width:600px) {
			h1 {
				font-size: 25px !important;
				line-height: 25px !important;
			}
		}

		/* ANDROID CENTER FIX */
		div[style*="margin: 16px 0;"] {
			margin: 0 !important;
		}
	</style>
</head>

<body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;">
	<!-- HIDDEN PREHEADER TEXT -->
	<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Acme', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<!-- LOGO -->
		<tr>
			<td bgcolor="#1746e0" align="center">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Acme', sans-serif; font-size: 20px; font-weight: 200; letter-spacing: 2px; line-height: 48px;">
							<h1 style="font-size: 15px; font-weight: 200; margin: 2;">MrTomXxX Free API</h1> <img src="https://i.pinimg.com/originals/cb/39/26/cb3926914e31158f04e7d04ede2f5d3a.gif" width="150" height="150" style="display: block; border: 0px;" />
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;">thanks for register, please klick button for verification.</p>
						</td>
					</tr>
					<tr>
						<td bgcolor="#ffffff" align="left">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
										<table border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="border-radius: 3px; outline: transparent" bgcolor="#1746e0"><a href="${urlVerif}" target="_blank" style="font-size: 16px; font-family: 'Acme', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">Submit</a></td>
											</tr>
										</table>
									</td>
								</tr	>
							</table>
						</td>
					</tr> <!-- COPY -->
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;">this url invalid after 1 hour</p>
						</td>
					</tr> <!-- COPY -->
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 13px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
						</td>
					</tr> <!-- COPY -->
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 12px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;"><a href="${urlVerif}" target="_blank" style="color: #1746e0;">${urlVerif}</a></p>
						</td>
					</tr>
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Acme', sans-serif; font-size: 10px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;">Cheers,<br>MTX-Project</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#e1e1e1" align="center" style="padding: 30px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
				</table>
			</td>
		</tr>
	</table>
	</body>
</html>`;

module.exports.htmlPassword = (url) => `
<!DOCTYPE html>
		 <html>
				<head>
	<title>MTX Verification</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
	<style type="text/css">
		/* CLIENT-SPECIFIC STYLES */
		body,
		table,
		td,
		a {
			-webkit-text-size-adjust: 100%;
			-ms-text-size-adjust: 100%;
		}

		table,
		td {
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}

		img {
			-ms-interpolation-mode: bicubic;
		}

		/* RESET STYLES */
		img {
			border: 0;
			height: auto;
			line-height: 100%;
			outline: none;
			text-decoration: none;
		}

		table {
			border-collapse: collapse !important;
		}

		body {
			height: 100% !important;
			margin: 0 !important;
			padding: 0 !important;
			width: 100% !important;
		}

		/* iOS BLUE LINKS */
		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: none !important;
			font-size: inherit !important;
			font-family: inherit !important;
			font-weight: inherit !important;
			line-height: inherit !important;
		}

		/* MOBILE STYLES */
		@media screen and (max-width:600px) {
			h1 {
				font-size: 25px !important;
				line-height: 25px !important;
			}
		}

		/* ANDROID CENTER FIX */
		div[style*="margin: 16px 0;"] {
			margin: 0 !important;
		}
	</style>
</head>

<body style="background-color: #e1e1e1; margin: 0 !important; padding: 0 !important;">
	<!-- HIDDEN PREHEADER TEXT -->
	<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Acme', sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
	<table border="0" cellpadding="0" cellspacing="0" width="100%">
		<!-- LOGO -->
		<tr>
			<td bgcolor="#1746e0" align="center">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#1746e0" align="center" style="padding: 0px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Acme', sans-serif; font-size: 20px; font-weight: 200; letter-spacing: 2px; line-height: 48px;">
							<h1 style="font-size: 15px; font-weight: 200; margin: 2;">MTX Free API</h1> <img src="https://giffiles.alphacoders.com/988/9881.gif" width="180" height="180" style="display: block; border: 0px;" />
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#e1e1e1" align="center" style="padding: 0px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
							<center><p style="margin: 0;">Please click the button below to continue.</p></center>
						</td>
					</tr>
					<tr>
						<td bgcolor="#ffffff" align="left">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
										<table border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="border-radius: 3px; outline: transparent" bgcolor="#1746e0"><a href="${url}" target="_blank" style="font-size: 16px; font-family: 'Acme', sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #1746e0; display: inline-block;">Submit</a></td>
											</tr>
										</table>
									</td>
								</tr	>
							</table>
						</td>
					</tr>
					<tr>
					<td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Acme', sans-serif; font-size: 14px; font-weight: 400; line-height: 25px;">
					<p style="margin: 0;">For user convenience, we admin provide this page. thank you for always supporting.</p>
					</td>
					</tr>
					<tr>
						<td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Acme', sans-serif; font-size: 10px; font-weight: 400; line-height: 25px;">
							<p style="margin: 0;">Cheers,<br>MTX-Project</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td bgcolor="#e1e1e1" align="center" style="padding: 30px 10px 0px 10px;">
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
				</table>
			</td>
		</tr>
	</table>
	</body>
</html>`;
